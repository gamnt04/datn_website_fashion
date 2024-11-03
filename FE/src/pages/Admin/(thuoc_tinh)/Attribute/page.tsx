/* eslint-disable @typescript-eslint/no-explicit-any */
// import Table_cpnt from "./table_cpnt";
import { useParams } from "react-router-dom";
import useLocalStorage from "../../../../common/hooks/Storage/useStorage";
import { Dispatch_thuoc_tinh, Lay_the_loai_thuoc_tinh, Lay_thuoc_tinh } from "../../../../API/Dispatch/slice_attribute";
import { Button, Form, FormProps, Input, Upload } from "antd";
import { SketchPicker } from 'react-color';
import { useState } from "react";
import Table_cpn from "./table_cpn";
import { PlusOutlined } from "@ant-design/icons";

export default function Attribute() {
  const [user] = useLocalStorage("user", {});
  const { id } = useParams();
  const [symbol, setSymbol] = useState<string>('');
  const { data, isPending, isError } = Lay_the_loai_thuoc_tinh({
    id_thuoc_tinh: id,
    id_account: user?.user?._id
  });
  const { mutate, isPending: loading } = Dispatch_thuoc_tinh('CREATED');
  const { data: data_2, isPending: loading_2 } = Lay_thuoc_tinh({
    id_account: user?.user?._id,
    category_attribute: data?.category_attribute
  });
  if (isPending || loading || loading_2) return <span>Loading...</span>
  if (isError) return <span>Error...</span>
  const onFinish: FormProps<any>['onFinish'] = (values) => {
    const data_request = {
      ten_thuoc_tinh: values?.ten_thuoc_tinh,
      the_loai_thuoc_tinh: data?.category_attribute,
      id_account: user?.user?._id,
      symbol_thuoc_tinh: symbol
    }
    mutate(data_request)
  };


  const onFinishFailed: FormProps<any>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const handleSetColor = (color: any) => {
    setSymbol(color.hex);
  }
  return (
    <div className="px-10">
      <strong>Sản phẩm {data?.name_attribute}</strong>

      <section className="grid grid-cols-[35%_60%] justify-between">
        {/* cot trai */}
        <div className="mt-10">
          <span>Thêm mới {data?.name_attribute}</span>
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <div className="flex flex-col gap-1">
              <span>Tên</span>
              <Form.Item<any>
                name="ten_thuoc_tinh"
                rules={[{ required: true, message: 'Please input your username!' }]}>
                <Input />
              </Form.Item>
            </div>
            {
              data?.category_attribute === 'ux_color' &&
              <div className='flex flex-col gap-y-2'>
                <span>Chọn màu sắc:</span>
                <div style={{
                  backgroundColor: symbol
                }} className={`w-16 h-10 rounded border`}></div>
                <div className='flex gap-4'>
                  <SketchPicker
                    color={symbol}
                    onChangeComplete={handleSetColor} />
                </div>
              </div>
            }
            {
              data?.category_attribute === 'ux_image' &&
              <Upload
                // defaultFileList={mode && image_item}
                listType="picture-card"
                beforeUpload={() => false}
                // onChange={handleImageChange}
                className="mt-2"
                maxCount={1}
              >
                <button type="button">
                  <PlusOutlined />
                </button>
              </Upload>
            }
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit" className="-translate-x-[100px] mt-10">
                Tạo mới {data?.name_attribute}
              </Button>
            </Form.Item>
          </Form>
        </div>

        {/* cot phai */}
        <div>
          <Table_cpn data_props={data_2} />
        </div>
      </section>
    </div>
  )
}