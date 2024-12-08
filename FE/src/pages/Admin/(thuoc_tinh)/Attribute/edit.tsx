/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Dispatch_thuoc_tinh, Lay_thuoc_tinh } from "../../../../API/Dispatch/slice_attribute";
import useLocalStorage from "../../../../common/hooks/Storage/useStorage";
import { Button, Form, FormProps, Input, Spin, Upload } from "antd";
import { SketchPicker } from "react-color";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";


export default function Edit_thuoc_tinh({ props }: any) {
    const location_url = useLocation();
    const urlParams = new URLSearchParams(location_url.search);
    const editId = urlParams.get('_id');
    const [symbol, setSymbol] = useState<string>('');
    const [user] = useLocalStorage("user", {});
    const { data, isLoading, isError } = Lay_thuoc_tinh({
        id_account: user?.user?._id,
        id_thuoc_tinh: editId
    });
    const [imageFile, setImageFile] = useState<File[]>([]);
    const { mutate, isLoading: loading, isError: error } = Dispatch_thuoc_tinh('EDIT')
    const [form] = Form.useForm();

    useEffect(() => {
        if (data) {
            form.setFieldsValue({
                ten_thuoc_tinh: data?.ten_thuoc_tinh
            });
        }
    }, [data, form]);
    const handleCancel = () => {
        const url_location: any = window.location;
        const url = new URL(url_location);
        url.searchParams.delete('_id');
        window.history.replaceState({}, '', url.toString());
        props?.setIsModalOpen(false);
    };

    const handleImageChange = (imageItem: any) => {
        const files =
            imageItem?.fileList?.map((file: any) => file.originFileObj) || [];
        setImageFile(files);
    };

    const onFinish: FormProps<any>['onFinish'] = (values) => {
        const data_request = {
            _id: editId,
            ...data,
            ten_thuoc_tinh: values?.ten_thuoc_tinh,
            symbol_thuoc_tinh: data?.the_loai_thuoc_tinh === 'ux_image' ? imageFile : data?.the_loai_thuoc_tinh === 'ux_color' ? symbol : ''
        }
        mutate(data_request);
        props?.setIsModalOpen(false);
    };

    const onFinishFailed: FormProps<any>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleSetColor = (color: any) => {
        setSymbol(color.hex);
    }

    if (isLoading || loading) {
        return <div className="flex justify-center items-center h-screen">
            <Spin indicator={<LoadingOutlined spin />} size="large" />
        </div>;
    }
    if (isError || error) return <span>Error...</span>;
    return (
        <div className={`${props?.isModalOpen ? 'translate-y-0' : 'translate-y-[-200%]'} fixed top-0 w-screen left-0 h-screen z-[100]`}>
            <div className={`bg-[#33333333] w-screen h-screen fixed top-0 left-0 z-[100]`} onClick={handleCancel}></div>
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-auto py-5 px-4 rounded bg-white z-[110]">
                <strong>Sửa thể loại thuộc tính {data?.name_attribute}</strong>
                <Form className="mt-10"
                    form={form}  // Liên kết form instance với Form
                    name="basic"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item<any>
                        label="Tên thuộc tính"
                        name="ten_thuoc_tinh"
                        rules={[{ required: true, message: 'Không được để trống!' }]}
                    >
                        <Input />
                    </Form.Item>
                    {
                        data?.the_loai_thuoc_tinh === 'ux_color' &&
                        <div className='flex flex-col gap-y-2 mb-6'>
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
                        data?.the_loai_thuoc_tinh === 'ux_image' &&
                        <Upload
                            listType="picture-card"
                            beforeUpload={() => false}
                            onChange={handleImageChange}
                            className="mt-2"
                            maxCount={1}
                        >
                            <button type="button">
                                <PlusOutlined />
                            </button>
                        </Upload>
                    }
                    <Form.Item label={null}>
                        <Button type="primary" htmlType="submit" className="translate-x-[120%]">
                            Cập nhật
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}