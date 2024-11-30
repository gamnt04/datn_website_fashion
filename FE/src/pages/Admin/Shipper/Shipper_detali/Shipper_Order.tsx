import { Button, Card, Divider, Form, message, Modal, Popconfirm, Radio, Spin, Upload, UploadFile } from 'antd';
import Mapbox from '../Mapbox';
import { Query_Orders } from '../../../../common/hooks/Order/querry_Order';
import { Link, useParams } from 'react-router-dom';
import Status_order from '../../Orders/Status_order';
import { Mutation_Notification } from '../../../../_lib/React_Query/Notification/Query';
import useLocalStorage from '../../../../common/hooks/Storage/useStorage';
import instance from '../../../../configs/axios';
import { useState } from 'react';
import { UploadImage } from '../../../../systems/utils/uploadImage';
import { LeftOutlined, LoadingOutlined, UploadOutlined } from '@ant-design/icons';
import { useOrderMutations } from '../../../../common/hooks/Order/mutation_Order';
import "mapbox-gl/dist/mapbox-gl.css";


const Shipper_Order = () => {
    const { id } = useParams();
    const [user] = useLocalStorage("user", {});
    const userId = user?.user?._id;
    const role = user?.user?.role;
    const [orderId, setOrderId] = useState<string | null>(null);
    const [messageApi, contextHolder] = message.useMessage();
    const { data, refetch, isLoading } = Query_Orders(id);
    const dispathNotification = Mutation_Notification("Add");
    const { mutate: failDelivery } = useOrderMutations("FAIL_DELIVERY");
    const [selectedReason, setSelectedReason] = useState("");
    const [isDeliverSuccessModalVisible, setDeliverSuccessModalVisible] =
        useState(false);
    const [fileList, setFileList] = useState<UploadFile<any>[]>([]);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    function giao_hang_that_bai(dataBody: {
        id_item: string | number;
        numberOrder?: string | number;
        action?: string;
        cancellationReason?: string;
        linkUri?: string | number;
    }) {
        dispathNotification?.mutate({
            userId: userId,
            receiver_id: data?.userId,
            message: `Người giao hàng đã giao hàng đơn hàng  ${dataBody?.numberOrder} thất bại với lí do ${dataBody?.cancellationReason}!`,
            different: dataBody?.id_item,
            id_different: dataBody?.numberOrder,
        });
        console.log(dataBody.cancellationReason);

        failDelivery(dataBody);
    }
    const handleFileChange = ({ fileList }: { fileList: UploadFile<any>[] }) => {
        setFileList(fileList.slice(-1));
        if (fileList.length > 0) {
            const file = fileList[0].originFileObj;
            const previewUrl = URL.createObjectURL(file);
            setPreviewImage(previewUrl);
        } else {
            setPreviewImage(null);
        }
    };
    const handleStatusUpdate = async (
        status: number | string,
        code_order?: string | number,
        id_order?: string | number
    ) => {
        if (!data) return;
        const message =
            status === 2
                ? `Người bán đã xác nhận đơn hàng ${code_order} `
                : status === 3
                    ? `Người bán đã giao đơn hàng ${code_order} cho đơn vị vận chuyển!`
                    : status === 4
                        ? `Đã giao đơn hàng ${code_order} thành công!.Vui lòng ấn đã nhận hàng!`
                        : status === 5
                            ? `Người Giao hàng đã giao đơn hàng ${code_order} thất bại!`
                            : status === 6
                                ? `Đã giao đơn hàng ${code_order} thành công!`
                                : `Người bán đã từ chối đơn hàng ${code_order}. Vui lòng chọn sản phẩm khác!`;

        dispathNotification?.mutate({
            userId: userId,
            receiver_id: data?.userId,
            message: message,
            different: id_order,
        });
        try {
            const response = await instance.patch(`/orders/${id}`, {
                status: status,
            });
            messageApi.open({
                type: "success",
                content:
                    response.data.status === "6"
                        ? "Đơn hàng đã được giao thành công!"
                        : "Cập nhật trạng thái đơn hàng thành công!",
            });
            refetch();
        } catch (error) {
            messageApi.open({
                type: "error",
                content: "Cập nhật trạng thái đơn hàng thất bại!",
            });
        }
    };
    const handleDeliverSuccess = async () => {
        if (!orderId) {
            console.error("Order ID is missing");
            return;
        }
        const file = fileList.length > 0 ? fileList[0].originFileObj : null;
        try {
            let imageUrl = null;
            if (file) {
                imageUrl = await UploadImage(file);
            }
            await instance.post("/deliver-success", {
                orderId,
                confirmationImage: imageUrl,
            });
            handleStatusUpdate(4, data?.orderNumber, data._id);
            refetch();
            // messageApi.success("Đơn hàng đã được đánh dấu là giao hàng thành công.");
            setDeliverSuccessModalVisible(false);
        } catch (error) {
            messageApi.error("Giao hàng thành công thất bại. Vui lòng thử lại.");
        }
    };
    const reason = [
        "Người nhận không nghe máy",
        "Hoàn hàng",
        "Đơn hàng quá 3 ngày",
    ];
    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">
            <Spin indicator={<LoadingOutlined spin />} size="large" />
        </div>;
    }
    return (
        <div className="mt-28 mx-5">
            {contextHolder}
            <div className="flex items-center justify-between mb-5 mt-20 relative">
                <Link
                    to="/courier/orders"
                    className="flex items-center gap-2 text-[#1B7EE2]"
                >
                    <LeftOutlined />
                    <span>Quay lại</span>
                </Link>
                <h1 className="text-2xl font-semibold absolute left-1/2 transform -translate-x-1/2">
                    Chi Tiết Đơn Hàng
                </h1>
            </div>
            <div className="flex space-x-6">
                <div className="w-[63%] h-96">
                    <Mapbox id={id} />
                </div>
                <div className="w-[29%]">
                    <Card title="Trạng thái" className="shadow-md mb-5">
                        <Status_order data_Order={data} />
                    </Card>

                    <Card title="Thông tin Người Mua" className="shadow-md mb-5">
                        <div className="text-sm">
                            <p><strong>Tên người mua:</strong> {data?.customerInfo?.userName}</p>
                            <p><strong>SĐT:</strong> {data?.customerInfo?.phone}</p>
                            <p><strong>Địa chỉ:</strong> {data?.customerInfo?.address}</p>
                            <p><strong>Quãng đường giao:</strong> {data?.deliveryDistance}</p>
                        </div>
                    </Card>
                    <Divider className="my-5" />
                    <Card title="Đơn Hàng" className="shadow-md">
                        <div className="text-sm">
                            <p><strong>Mã đơn hàng:</strong> {data?.orderNumber}</p>
                            <div>
                                <strong>Sản phẩm:</strong>
                                <div>
                                    {data?.items?.map((item: any) => {
                                        return (
                                            <div className="flex items-center gap-4 py-2 border-b border-gray-200 hover:bg-gray-50 ">
                                                <img
                                                    src={item?.productId?.image_product}
                                                    className="w-16 h-16 object-cover rounded-lg shadow-sm"
                                                    alt={item?.productId?.name_product}
                                                />
                                                <div className="flex-1">
                                                    <p className="text-sm font-semibold text-gray-800">{item?.productId?.name_product}</p>
                                                    <div className='flex justify-between'>
                                                        <p className="text-sm text-gray-600">Số lượng: {item?.quantity}</p>
                                                        <p className="text-sm text-gray-600">Giá: {item?.price_item.toLocaleString("vi", {
                                                            style: "currency",
                                                            currency: "VND",
                                                        })}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                            </div>
                            <p className='text-right pt-5'><strong>Tổng giá trị:</strong> {data?.totalPrice?.toLocaleString("vi", {
                                style: "currency",
                                currency: "VND",
                            })}</p>
                        </div>
                    </Card>
                    <Card title="" className="shadow-md mt-5">
                        <div className='flex space-x-2'>
                            <>
                                {data?.status === '6' || "4" ? (
                                    <Button
                                        className="w-full bg-green-500 rounded text-white"
                                        type="primary"
                                        disabled
                                    >
                                        Giao thành công
                                    </Button>
                                ) : (
                                    <>
                                        <Button
                                            className="w-52 bg-blue-500 rounded text-white"
                                            type="primary"
                                            onClick={() => {
                                                setOrderId(data._id);
                                                setDeliverSuccessModalVisible(true);
                                            }}
                                            disabled={role !== "courier"}
                                        >
                                            Hoàn Thành
                                        </Button>
                                        <Popconfirm
                                            title="Xác nhận giao hàng thất bại?"
                                            description={
                                                <div>
                                                    <p>
                                                        Bạn có chắc chắn muốn xác nhận đơn hàng này thất bại không?
                                                    </p>
                                                    <div>
                                                        <p>Chọn lý do giao hàng thất bại:</p>
                                                        <Radio.Group
                                                            className="flex flex-col gap-2"
                                                            onChange={(e) => setSelectedReason(e.target.value)}
                                                            disabled={role !== "courier"}
                                                        >
                                                            {reason.map((reason, index) => (
                                                                <Radio key={index} value={reason}>
                                                                    {reason}
                                                                </Radio>
                                                            ))}
                                                        </Radio.Group>
                                                    </div>
                                                </div>
                                            }
                                            onConfirm={() => {
                                                if (role === "courier") {
                                                    giao_hang_that_bai({
                                                        id_item: data?._id,
                                                        action: "huy",
                                                        cancellationReason: selectedReason,
                                                        numberOrder: data?.orderNumber,
                                                        linkUri: data?._id,
                                                    });
                                                }
                                            }}
                                            okText="Xác Nhận"
                                            cancelText="Không"
                                            disabled={role !== "courier"}
                                        >
                                            <Button
                                                className={`w-52 rounded text-white ${role !== "courier"
                                                    ? "bg-gray-400 cursor-not-allowed"
                                                    : "bg-red-500"
                                                    }`}
                                                disabled={role !== "courier"}
                                            >
                                                Thất Bại
                                            </Button>
                                        </Popconfirm>
                                    </>
                                )}


                            </>


                        </div>
                    </Card>
                    <Modal
                        title="Xác Nhận Giao Hàng Thành Công"
                        visible={isDeliverSuccessModalVisible}
                        onOk={handleDeliverSuccess}
                        onCancel={() => setDeliverSuccessModalVisible(false)}
                    >
                        <Form.Item
                            name="confirmationImage"
                            label="Ảnh Xác Nhận"
                            rules={[
                                { required: true, message: "Vui lòng chọn ảnh xác nhận" },
                            ]}
                        >
                            <Upload
                                listType="picture"
                                beforeUpload={() => false}
                                onChange={handleFileChange}
                                fileList={fileList}
                                maxCount={1}
                                accept="image/*"
                                showUploadList={false}
                            >
                                <Button icon={<UploadOutlined />}>Tải Ảnh Lên</Button>
                            </Upload>
                            {previewImage && (
                                <div style={{ marginTop: 16 }}>
                                    <img
                                        src={previewImage}
                                        alt="Ảnh Xác Nhận"
                                        style={{
                                            width: "40%",
                                            maxHeight: 200,
                                            objectFit: "cover",
                                            border: "1px solid black",
                                        }}
                                    />
                                </div>
                            )}
                        </Form.Item>
                    </Modal>
                </div>
            </div>
        </div>
    );
};

export default Shipper_Order;
