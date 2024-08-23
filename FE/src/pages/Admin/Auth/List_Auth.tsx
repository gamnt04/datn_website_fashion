import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button, Image, Skeleton, Spin, Table, Modal, Form, Input } from "antd";
import { list_Auth } from "../../../_lib/Auth/Auth";
import SearchComponent from "./Search";
import { LoadingOutlined } from "@ant-design/icons";
import { useSearchUserByUsername } from "../../../common/hooks/Auth/querry_Auth";
interface UpdateField {
  field: string;
  value: string;
  time: string;
}

const List_Auth = () => {
  const [data, setData] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUpdate, setSelectedUpdate] = useState<any>(null);
  const [searchName, setSearchName] = useState("");
  const { data: searchData } = useSearchUserByUsername(searchName);
  const { data: initialData, isLoading } = useQuery({
    queryKey: ["LIST_AUTH"],
    queryFn: async () => {
      const data = await list_Auth();
      return data;
    }
  });

  const onHandleSearch = () => {
    setSearchName(searchName.trim());
  };

  const dataSource = (searchName ? searchData : initialData?.data)?.map(
    (auth: any) => {
      return {
        key: auth._id,
        ...auth
      };
    }
  );
  const columns = [
    {
      title: "Ảnh người dùng",
      dataIndex: "avatar",
      key: "avatar",
      render: (_: any, auth: any) =>
        isLoading ? (
          <Skeleton.Avatar active size="large" shape="square" />
        ) : (
          <Image src={auth.avatar} alt="" width={70} />
        )
    },
    {
      title: "Tên người dùng",
      dataIndex: "userName",
      key: "userName",
      render: (_: any, auth: any) =>
        isLoading ? (
          <Skeleton.Input style={{ width: 150 }} active size="small" />
        ) : (
          auth.userName
        )
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (_: any, auth: any) =>
        isLoading ? (
          <Skeleton.Input style={{ width: 200 }} active size="small" />
        ) : (
          auth.email
        )
    },
    {
      title: "Cập nhật gần đây",
      dataIndex: "updatedFields",
      key: "updatedFields",
      render: (updatedFields) => {
        if (updatedFields && updatedFields.length > 0) {
          const latestUpdate = updatedFields[updatedFields.length - 1].time;
          return new Date(latestUpdate).toLocaleString(); // Chuyển đổi sang định dạng ngày giờ
        }
        return "Chưa có cập nhật";
      }
    },

    {
      title: "Nội dung cập nhật",
      dataIndex: "updatedFields",
      key: "updatedFields",
      render: (updatedFields: any) => {
        if (updatedFields && updatedFields.length > 0) {
          return (
            <Button onClick={() => showModal(updatedFields)}>
              Xem chi tiết
            </Button>
          );
        } else {
          return "Chưa có cập nhật";
        }
      }
    },
    {
      title: "Quyền",
      dataIndex: "role",
      key: "role",
      render: (_: any, auth: any) =>
        isLoading ? (
          <Skeleton.Input style={{ width: 100 }} active size="small" />
        ) : (
          auth.role
        )
    }
  ];

  const showModal = (updatedFields) => {
    if (updatedFields && updatedFields.length > 0) {
      setSelectedUpdate(updatedFields);
      setIsModalVisible(true);
    }
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const getUpdateDetails = (updatedFields: UpdateField[]) => {
    if (!updatedFields || updatedFields.length === 0) {
      return "Không có thông tin cập nhật";
    }

    const latestUpdatesByField: {
      [key: string]: {
        field: string;
        value: string;
        time: string;
        date: string;
      };
    } = {};

    updatedFields.forEach((update) => {
      const date = new Date(update.time).toLocaleDateString();
      const time = new Date(update.time).toLocaleTimeString();
      const key = `${date}-${update.field}`;

      latestUpdatesByField[key] = {
        field: update.field,
        value: update.value,
        time,
        date
      };
    });

    // Sử dụng reduce để nhóm và định dạng kết quả, sau đó chuyển đối tượng thành mảng các chuỗi
    const result = Object.values(latestUpdatesByField).reduce(
      (acc, { date, field, value, time }) => {
        if (!acc[date]) {
          acc[date] = `Ngày cập nhật:\n ${date}\n \nNội dung cập nhật:\n`;
        }
        acc[date] += `${field}: ${value} (${time})\n`;
        return acc;
      },
      {} as { [key: string]: string }
    );

    // Chuyển đối tượng thành mảng các chuỗi và nối chúng
    return Object.values(result).join("\n");
  };
  return (
    <>
      <div className="flex justify-between my-5">
        <h1 className="text-xl font-bold">Danh sách tài khoản</h1>
        {initialData && (
          <SearchComponent initialData={initialData} setData={setData} />
        )}
      </div>
      <div className="">
        <Input
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <Button onSubmit={() => onHandleSearch}>Tìm kiếm</Button>
      </div>
      <Spin
        spinning={isLoading}
        indicator={<LoadingOutlined spin />}
        size="large"
      >
        <Table columns={columns} dataSource={dataSource} />
      </Spin>

      <Modal
        title="Chi tiết cập nhật"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={500}
        style={{ maxHeight: "80vh", overflowY: "auto" }}
      >
        {selectedUpdate ? (
          <Form style={{ maxWidth: 500 }}>
            <Form.Item>
              <Input.TextArea
                value={getUpdateDetails(selectedUpdate)}
                readOnly
                rows={15}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Form>
        ) : (
          <p>Không có thông tin cập nhật</p>
        )}
      </Modal>
    </>
  );
};

export default List_Auth;
