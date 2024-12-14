import { LoadingOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Form,
  Image,
  Input,
  message,
  Modal,
  Skeleton,
  Spin,
  Switch,
  Table,
  Typography,
} from "antd";

import { useState } from "react";
import { list_Auth } from "../../../_lib/Auth/Auth";
import { useSearchUserByUsername } from "../../../common/hooks/Auth/querry_Auth";
import { CheckAuths } from "../../../common/hooks/Auth/useAuthorization";
import instance from "../../../configs/axios";

interface UpdateField {
  field: string;
  value: string;
  time: string;
}

const List_Auth = () => {
  const queryClient = useQueryClient();
  const [blockReason, setBlockReason] = useState("");
  const [unblockReason, setUnblockReason] = useState("");
  const [userToBlock, setUserToBlock] = useState<any>(null);
  const [isLoadingBlock, setIsLoadingBlock] = useState(false);

  const [isBlockModalVisible, setIsBlockModalVisible] = useState(false);
  const [isUnblockModalVisible, setIsUnblockModalVisible] = useState(false);

  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [selectedUpdate, setSelectedUpdate] = useState<UpdateField[] | null>(
    null
  );

  const [searchName, setSearchName] = useState("");
  const [isUserDetailModalVisible, setIsUserDetailModalVisible] =
    useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  // Hàm mở modal với thông tin người dùng
  const showUserDetailModal = (user: any) => {
    setSelectedUser(user);
    setIsUserDetailModalVisible(true);
  };

  // Hàm đóng modal chi tiết
  const handleCancelUserDetail = () => {
    setIsUserDetailModalVisible(false);
    setSelectedUser(null);
  };
  const { data: searchData } = useSearchUserByUsername(searchName);
  const { data: initialData, isLoading } = useQuery({
    queryKey: ["LIST_AUTH"],
    queryFn: async () => {
      const data = await list_Auth();
      return data;
    },
  });

  console.log(initialData);

  const onHandleSearch = () => {
    setSearchName(searchName.trim());
  };

  const { mutate: changeBlock } = useMutation({
    mutationFn: async ({
      userId,
      isBlock,
      reason,
    }: {
      userId: string;
      isBlock: boolean;
      reason: string;
    }) => {
      const payload = isBlock
        ? { isBlock, reasonBlock: reason }
        : { isBlock, reasonUnblock: reason };
      const response = await instance.put(
        `/auth/block_user/${userId}`,
        payload
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["LIST_AUTH"],
      });
      message.success(data.message);
      setIsLoadingBlock(false); // Reset trạng thái loading khi thất bại
    },
    onError: (error: any) => {
      message.error(
        error.message || "Có lỗi xảy ra khi thay đổi trạng thái block"
      );
      setIsLoadingBlock(false); // Reset trạng thái loading khi thất bại
    },
  });

  const handleBlockChange = (userId: string, isBlock: boolean) => {
    setUserToBlock(userId);
    if (isBlock) {
      setBlockReason("");
      setIsBlockModalVisible(true);
    } else {
      setUnblockReason("");
      setIsUnblockModalVisible(true);
    }
  };

  const handleConfirmBlock = () => {
    if (!blockReason) {
      message.error("Vui lòng nhập lý do block.");
      return;
    }
    setIsLoadingBlock(true); // Đánh dấu là đang loading
    changeBlock({ userId: userToBlock, isBlock: true, reason: blockReason });
    setIsBlockModalVisible(false);
  };

  const handleConfirmUnblock = () => {
    if (!unblockReason) {
      message.error("Vui lòng nhập lý do hủy block.");
      return;
    }
    setIsLoadingBlock(true); // Đánh dấu là đang loading
    changeBlock({ userId: userToBlock, isBlock: false, reason: unblockReason });
    setIsUnblockModalVisible(false);
  };

  const showModal = (updatedFields: UpdateField[]) => {
    Modal.info({
      title: "Chi tiết cập nhật",
      content: (
        <div>
          {updatedFields.map((update, index) => (
            <p key={index}>
              <strong>{update.field}:</strong>
              {/* Kiểm tra nếu là avatar thì thay URL bằng ảnh */}
              {update.field === "avatar" ? (
                <img
                  src={update.value}
                  alt="Avatar"
                  className="w-12 h-12 rounded-full"
                />
              ) : (
                `${update.value} (${new Date().toLocaleString()})`
              )}
            </p>
          ))}
        </div>
      ),
      onOk() {},
    });
  };

  const dataSource = (searchName ? searchData : initialData?.data)?.map(
    (auth: any) => ({
      key: auth._id,
      ...auth,
    })
  );

  const columns = [
    {
      title: "Ảnh Người Dùng",
      dataIndex: "avatar",
      key: "avatar",
      render: (_: any, auth: any) =>
        isLoading ? (
          <Skeleton.Avatar active size="large" shape="square" />
        ) : (
          <Image
            src={auth.avatar}
            alt=""
            width={80}
            height={80}
            className="object-cover"
          />
        ),
    },
    {
      title: "Tên Người Dùng",
      dataIndex: "userName",
      key: "userName",
      render: (_: any, auth: any) =>
        isLoading ? (
          <Skeleton.Input style={{ width: 150 }} active size="small" />
        ) : (
          <span
            style={{ color: "blue", cursor: "pointer" }} // Thêm style để làm nổi bật tên người dùng
            onClick={() => showUserDetailModal(auth)} // Khi click vào tên sẽ gọi hàm showUserDetailModal
          >
            {auth.userName}
          </span>
        ),
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
        ),
    },
    {
      title: "Cập Nhật Hồ Sơ",
      dataIndex: "updatedFields",
      key: "updatedFields",
      render: (updatedFields: UpdateField[]) =>
        updatedFields && updatedFields.length > 0 ? (
          <Button
            onClick={() => showModal(updatedFields)} // Khi nhấn nút sẽ mở modal
            className="p-3 text-white bg-blue-600 border-gray-300 rounded-lg hover:bg-blue-500 focus:outline-none"
          >
            Xem chi tiết
          </Button>
        ) : (
          <span className="text-red-600">Chưa có cập nhật</span>
        ),
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
        ),
    },
    {
      title: "Chặn",
      dataIndex: "isBlock",
      key: "isBlock",
      render: (isBlock: boolean, auth: any) =>
        isLoading || isLoadingBlock ? (
          <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
        ) : (
          <Switch
            checked={isBlock}
            onChange={(checked) => handleBlockChange(auth._id, checked)}
          />
        ),
    },
    {
      title: "Lý do Chặn",
      dataIndex: "reasonBlock",
      key: "reasonBlock",
      render: (reasonBlock: string, auth: any) =>
        isLoading || isLoadingBlock ? (
          <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
        ) : auth.isBlock ? (
          <Typography.Text
            strong
            style={{
              color: "red", // Màu chữ đỏ để làm nổi bật lý do chặn
              backgroundColor: "#f8d7da", // Màu nền sáng để làm nổi bật
              padding: "4px 8px", // Padding để tạo khoảng cách
              borderRadius: "4px", // Góc bo tròn cho nền
            }}
          >
            {reasonBlock || "Không có lý do chặn"}
          </Typography.Text>
        ) : (
          "Tài khoản không bị chặn"
        ),
    },
  ];

  return (
    <>
      <CheckAuths roles={["admin"]}>
        <div className="mx-6">
          <div className="flex items-center justify-between mt-20 mb-5">
            <h1 className="text-2xl font-semibold">Quản Lý Người Dùng</h1>
          </div>
          <div className="flex justify-end gap-4 mb-2">
            <Input
              className="w-[300px]" // Bạn có thể điều chỉnh chiều rộng của input
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              placeholder="Nhập tên người dùng để tìm kiếm..."
            />
            <Button onClick={onHandleSearch} type="primary">
              Tìm kiếm
            </Button>
          </div>
          <Spin spinning={isLoading} indicator={<LoadingOutlined spin />}>
            <Table columns={columns} dataSource={dataSource} />
          </Spin>
        </div>
      </CheckAuths>

      {/* Modal lý do block */}
      <Modal
        title="Lý do Block"
        visible={isBlockModalVisible}
        onOk={handleConfirmBlock}
        onCancel={() => setIsBlockModalVisible(false)}
        width={500}
        okText="Xác nhận" // Chữ trên nút OK sẽ là "Xác nhận"
        cancelText="Quay lại" // Thay đổi nút Cancel sang "Quay lại"
      >
        <Form>
          <Form.Item>
            <Input.TextArea
              rows={4}
              value={blockReason}
              onChange={(e) => setBlockReason(e.target.value)}
              placeholder="Nhập lý do block"
            />
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal lý do hủy block */}
      <Modal
        title="Lý do Hủy Block"
        visible={isUnblockModalVisible}
        onOk={handleConfirmUnblock}
        onCancel={() => setIsUnblockModalVisible(false)}
        width={500}
        okText="Xác nhận" // Chữ trên nút OK sẽ là "Xác nhận"
        cancelText="Quay lại" // Thay đổi nút Cancel sang "Quay lại"
      >
        <Form>
          <Form.Item>
            <Input.TextArea
              rows={4}
              value={unblockReason}
              onChange={(e) => setUnblockReason(e.target.value)}
              placeholder="Nhập lý do hủy block"
            />
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal chi tiết cập nhật */}
      <Modal
        title="Chi tiết cập nhật"
        visible={isDetailModalVisible}
        onOk={() => setIsDetailModalVisible(false)}
        onCancel={() => setIsDetailModalVisible(false)}
        width={500}
        okText="Xác nhận" // Chữ trên nút OK sẽ là "Xác nhận"
      >
        {selectedUpdate ? (
          <ul>
            {selectedUpdate.map((item, index) => (
              <li key={index}>
                <strong>{item.field}</strong>: {item.value} (
                {new Date(item.time).toLocaleString()})
              </li>
            ))}
          </ul>
        ) : (
          <p>Không có cập nhật nào.</p>
        )}
      </Modal>

      {/* Modal Chi Tiết Người Dùng */}
      <Modal
        visible={isUserDetailModalVisible}
        okButtonProps={{ style: { display: "none" } }} // Ẩn nút OK
        onCancel={handleCancelUserDetail}
        width={600}
        cancelText="Quay lại" // Thay đổi nút Cancel sang "Quay lại"
      >
        {selectedUser ? (
          <div className="bg-white shadow-lg p-8 rounded-lg mt-[10px]">
            {/* Avatar & Full Name */}
            <div className="flex items-center justify-center mb-6">
              <img
                src={selectedUser.avatar}
                alt="Avatar"
                className="rounded-full w-[150px] h-[150px] shadow-lg"
              />
            </div>
            <h3 className="text-center text-lg font-bold">
              {selectedUser.userName || "Not Found"}
            </h3>

            <Form
              name="userDetails"
              layout="vertical"
              className="space-y-4"
              initialValues={{
                email: selectedUser.email,
                role: selectedUser.role,
                isBlock: selectedUser.isBlock ? "Đã bị khóa" : "Đang hoạt động", // Thay đổi cách hiển thị trạng thái
              }}
            >
              {/* Email */}
              <Form.Item label="Email" name="email">
                <Input
                  disabled
                  value={selectedUser.email}
                  className="h-[50px]"
                />
              </Form.Item>

              {/* Role */}
              <Form.Item name="role" label="Quyền">
                <Input
                  disabled
                  value={selectedUser.role}
                  className="h-[50px]"
                />
              </Form.Item>

              {/* Trạng thái */}
              <Form.Item name="isBlock" label="Trạng thái">
                <Input
                  disabled
                  value={
                    selectedUser.isBlock === "true"
                      ? "Đã bị khóa"
                      : "Đang hoạt động"
                  } // Kiểm tra lại giá trị hiển thị ở đây
                  className="h-[50px]"
                />
              </Form.Item>
              {/* Lý do chặn nếu có */}
              {selectedUser.isBlock && selectedUser.blockReason && (
                <Form.Item label="Lý do chặn">
                  <Input
                    disabled
                    value={selectedUser.blockReason}
                    className="h-[50px]"
                  />
                </Form.Item>
              )}

              {/* Ngày tạo */}
              <Form.Item label="Ngày tạo">
                <Input
                  disabled
                  value={new Date(selectedUser.createdAt).toLocaleDateString()}
                  className="h-[50px]"
                />
              </Form.Item>

              {/* Ngày cập nhật */}
              <Form.Item label="Ngày cập nhật">
                <Input
                  disabled
                  value={new Date(selectedUser.updatedAt).toLocaleDateString()}
                  className="h-[50px]"
                />
              </Form.Item>
            </Form>
          </div>
        ) : (
          <p>Không có thông tin chi tiết.</p>
        )}
      </Modal>
    </>
  );
};

export default List_Auth;
