import { Button, Form, FormProps, Input, Select, Spin } from "antd";
import Table_cpnt from "./table_cpnt";
import { Dispatch_the_loai_thuoc_tinh, Lay_the_loai_thuoc_tinh } from "../../../../API/Dispatch/slice_attribute";
import { useRef, useState } from "react";
import useLocalStorage from "../../../../common/hooks/Storage/useStorage";
import { LoadingOutlined } from "@ant-design/icons";

type FieldType = {
  name_attribute?: string;
  category_attribute?: string;
};

export default function The_loai_thuoc_tinh() {
  const [user] = useLocalStorage("user", {});
  const { mutate, isPending, isError, status_api } = Dispatch_the_loai_thuoc_tinh('CREATED');
  const [state_the_loai_thuoc_tinh, setState_the_loai_thuoc_tinh] = useState<string>('');
  const ref_the_loai_thuoc_tinh = useRef<HTMLSpanElement>(null);
  const { data, isPending: loading, isError: error } = Lay_the_loai_thuoc_tinh({
    id_account: user?.user?._id
  });
  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    if (!state_the_loai_thuoc_tinh || state_the_loai_thuoc_tinh === '') {
      ref_the_loai_thuoc_tinh?.current?.classList?.add('block'),
        ref_the_loai_thuoc_tinh?.current?.classList?.remove('hidden')
    }
    else {
      ref_the_loai_thuoc_tinh?.current?.classList?.remove('block')
      ref_the_loai_thuoc_tinh?.current?.classList?.add('hidden')
      const data_request = {
        name_attribute: values?.name_attribute,
        category_attribute: state_the_loai_thuoc_tinh,
        id_account: user?.user?._id
      }
      mutate(data_request)
    }
  };
  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleChange = (value: string) => {
    setState_the_loai_thuoc_tinh(value)
  };
  return (
    <div className="px-10">
      {
        isPending && <div className="fixed bg-[#33333333] top-0 left-0 w-screen h-screen z-10 grid place-items-center">
          <Spin indicator={<LoadingOutlined spin />} size="large" />
        </div>
      }
      {
        loading && <div className="fixed bg-[#33333333] top-0 left-0 w-screen h-screen z-10 grid place-items-center">
          <Spin indicator={<LoadingOutlined spin />} size="large" />
        </div>
      }
      <strong>Các thuộc tính</strong>
      <section className="my-8 grid grid-cols-[40%_55%] justify-between">
        {/* cot trai */}
        <div>
          <strong>Them thuoc tinh moi</strong> <br />
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <div className="flex flex-col gap-1">
              <span>Tên</span>
              <Form.Item<FieldType>
                name="name_attribute"
                rules={[{ required: true, message: 'Tên loại thuộc tính không được để trống!' }]}
              >
                <Input />
              </Form.Item>
            </div>
            <div className="flex flex-col gap-1">
              <span>Loại</span>
              <Select
                defaultValue=""
                style={{ width: 120 }}
                onChange={handleChange}
                options={[
                  { value: '', label: 'Lựa chọn' },
                  { value: 'ux_color', label: 'UX Color' },
                  { value: 'ux_label', label: 'UX Label' },
                  { value: 'ux_image', label: 'UX Image' },
                ]}
              />
              <span ref={ref_the_loai_thuoc_tinh} className="hidden text-red-500">Vui long chon!</span>
            </div>
            {
              status_api === 400 && <span className="text-xs text-red-500">Loại thuộc tính đã tồn tại!</span>
            }
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Tạo
              </Button>
            </Form.Item>
          </Form>
        </div>

        {/* cot phai */}
        <div>
          {
            isError || error && <span>Error :((</span>
          }
          {
            data &&
            <Table_cpnt data_props={data} />
          }
        </div>
      </section>
    </div>
  )
}