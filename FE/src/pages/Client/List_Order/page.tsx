import {
  Button,
  Form,
  FormProps,
  GetProp,
  Image,
  Input,
  message,
  Modal,
  Popconfirm,
  Spin,
  UploadFile,
  UploadProps,
} from "antd";
import { Query_Order } from "../../../_lib/React_Query/Orders/Query";
import useLocalStorage from "../../../common/hooks/Storage/useStorage";
import Items_order from "./_Components/items_order";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  Car,
  TotalPrice,
} from "../../../components/common/Client/_component/Icons";
import { useOrderMutations } from "../../../common/hooks/Order/mutation_Order";
import { Mutation_Cart } from "../../../common/hooks/Cart/mutation_Carts";
import { LoadingOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { List_One_Order_User } from "../../../common/hooks/Order/querry_Order";
import queryString from "query-string";
import instance from "../../../configs/axios";
import { useMutation } from "@tanstack/react-query";
type FieldType = {
  contentReview?: string;
};

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

export default function List_order() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { mutate: cancel, contextHolder } = useOrderMutations("CANCEL_PRODUCT");
  const { mutate: complete, contextHolder: f } =
    useOrderMutations("COMPLETED_PRODUCT");
  const { mutate: confirm, contextHolder: s } =
    useOrderMutations("REQUEST_CANCEL");
  const [user] = useLocalStorage("user", {});
  const userId = user?.user?._id;
  const account = user?.user;
  const navi = useNavigate();
  const { mutate: add } = Mutation_Cart("ADD");
  const { data: orderData, refetch } = List_One_Order_User(userId);
  const [paymentPending, setPaymentPending] = useState(false);
  const [openReviewOrderId, setOpenReviewOrderId] = useState<string | null>(
    null
  );
  const [openReview, setOpenReview] = useState(false);
  const [currentProductId, setCurrentProductId] = useState<string | null>(null);
  const [reviewedOrders, setReviewedOrders] = useState<{
    [orderId: string]: Set<string>;
  }>({});
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const { mutate: addReview } = useMutation({
    mutationFn: async (reviewData: {
      contentReview: string;
      productId: string;
      imagesReview: string[];
    }) => {
      const { data } = await instance.post(
        `/review/${userId}/${reviewData.productId}`, // Chỉnh sửa URL nếu cần
        {
          contentReview: reviewData.contentReview,
          imagesReview: reviewData.imagesReview,
        }
      );
      return data;
    },
    onSuccess: () => {
      message.success("Thêm thành công");
      setOpenReview(false); // Đóng form sau khi thêm thành công
      setReviewedOrders((prev) => ({
        ...prev,
        [openReviewOrderId!]: new Set([
          ...Array.from(prev[openReviewOrderId!] || []),
          currentProductId!,
        ]),
      })); // Cập nhật danh sách sản phẩm đã đánh giá trong đơn hàng
    },
    onError: () => {
      message.error("Thêm thất bại");
    },
  });

  const handleOpenReview = (orderId: string, productId: string) => {
    if (reviewedOrders[orderId]?.has(productId)) {
      navi(`/shops/${productId}`); // Điều hướng đến trang chi tiết sản phẩm khi đã đánh giá
    } else if (openReviewOrderId === orderId) {
      setOpenReview(!openReview);
    } else {
      setOpenReview(true);
      setOpenReviewOrderId(orderId);
    }
    setCurrentProductId(productId);
  };

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Submitting review for productId:", currentProductId);
    console.log(userId);
    console.log("Form values:", values);

    if (currentProductId) {
      addReview({
        contentReview: values.contentReview || "",
        productId: currentProductId,
        imagesReview: fileList.map((file) => file.url as string), // Gửi URL ảnh lên server
      });
    }
  };

  function status_item(status: string | number) {
    switch (+status) {
      case 1:
        return <span>Chờ xác nhận</span>;
      case 2:
        return <span>Đang chuẩn bị</span>;
      case 3:
        return <span>Đang vận chuyển</span>;
      case 4:
        return (
          <span className="text-green-500 flex items-center gap-x-2">
            {" "}
            Hoàn thành
          </span>
        );
      case 5:
        return <span className="text-red-500">Đã hủy</span>;
      default:
        return;
    }
  }

  function handle_status_order(i: number) {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("_page", "1");
    newParams.set("_limit", "10");
    newParams.set("_status", String(i));
    setSearchParams(newParams);
  }
  const [searchParamsUri] = useSearchParams();
  const status_order = searchParamsUri.get("_status");
  const dataClient = {
    id_user: userId,
    page: 1,
    limit: 20,
    status: +status_order,
  };
  const menuItems = [
    "Tất Cả",
    "Chờ Xác Nhận",
    "Đang Chuẩn Bị Hàng",
    "Đang Vận Chuyển",
    "Hoàn Thành",
    "Đã Hủy",
  ];

  // hủy đơn
  // yêu cầu hủy
  // đã nhận hàng
  const { data, isPending } = Query_Order(dataClient);
  const addCart = (orderId?: string | number) => {
    if (userId) {
      const order = data?.data?.docs?.find((i: any) => i?._id === orderId);
      if (order?.items) {
        for (let i = 0; i < order.items.length; i++) {
          const j = order.items[i];
          if (j.productId) {
            add({
              userId: account?._id,
              productId: j?.productId?._id,
              color: j?.color_item,
              size: j?.name_size,
              quantity: j?.quantity,
              price_item_attr: j?.price_item,
              image: j?.productId?.image_product,
              name: j?.productId?.name_product,
              _id: orderId,
            });
          }
        }
      }
    } else {
      navi("/login");
    }
  };
  useEffect(() => {
    refetch();
  }, [userId]);
  const fiterOrrder = (status: string) => {
    return data?.filter((orders: any) => orders.status === status);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setPaymentPending(true);
        console.log("location.search:");
        const parsed = queryString.parseUrl(location.search);
        console.log(parsed);
        console.log(parsed.query.vnp_TransactionStatus);

        if (parsed.query.vnp_TransactionStatus === "00") {
          const itemOrder = sessionStorage.getItem("item_order");
          const customerInfo = sessionStorage.getItem("customerInfo");

          if (itemOrder && customerInfo) {
            const getItemOrder = JSON.parse(itemOrder);
            console.log(getItemOrder);

            const dataForm = JSON.parse(customerInfo);
            // setActive(true)
            const response = await instance.post("/orderspayment", {
              userId: getItemOrder.userId,
              items: getItemOrder?.items,
              customerInfo: {
                ...dataForm,
              },
              totalPrice: Number(parsed.query.vnp_Amount) / 100,
              status: "2",
            });

            console.log(response.data);
            if (response.data) {
              message.success("Thanh toán thành công");
              sessionStorage.removeItem("item_order");
              sessionStorage.removeItem("customerInfo");
              refetch();
            }
          } else {
            console.error(
              "Item order or customer info is missing in session storage"
            );
          }
        }
      } catch (error) {
        console.error("Error processing payment:", error);
        message.error("Có lỗi xảy ra trong quá trình thanh toán");
      } finally {
        setPaymentPending(false); // Kết thúc trạng thái loading cho thanh toán
      }
    };

    fetchData();
  }, [location.search]);
  if (isPending || paymentPending) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin indicator={<LoadingOutlined spin />} size="large" />
      </div>
    );
  }
  return (
    <div>
      {contextHolder}
      {f}
      {s}
      <ul className="hidden_scroll-x_trendingproducts overflow-x-scroll flex items-center *:border-b-2 *:cursor-pointer *:border-white justify-between gap-3 *:whitespace-nowrap lg:text-sm text-xs">
        {menuItems.map((menu, i) => (
          <li
            key={menu}
            className={`px-3 py-3 hover:border-b-2 hover:border-yellow-400`}
            onClick={() => handle_status_order(i)}
          >
            {menu}
          </li>
        ))}
      </ul>
      {!data?.data?.docs || data?.data?.docs?.length === 0 ? (
        <div className="flex justify-center items-center">
          <img
            src="../../src/assets/Images/Products/no-data.png"
            alt="Không có sản phẩm"
          />
        </div>
      ) : (
        <div>
          {data?.data?.docs?.map((items: any) => {
            return (
              <div className="border-t py-4">
                <div className="flex gap-2 py-5 border-b-2 justify-between">
                  <Link
                    to={`/profile/order/${items._id}`}
                    className="py-2 px-4 bg-[#222222] text-white text-[12px] lg:text-sm rounded"
                  >
                    Xem ngay
                  </Link>
                  <div className="flex">
                    <a href="" className="flex items-center gap-3">
                      <Car />
                      {status_item(items?.status)}
                    </a>
                  </div>
                </div>
                {items?.items.map((product: any) => {
                  return <Items_order product={product} />;
                })}
                <div className="py-3 px-2 flex justify-end items-center border-t  border-b border-[#eaeaea] ">
                  <div className="flex items-center gap-1">
                    <TotalPrice />
                    <p>
                      Thành tiền :{" "}
                      <span className="lg:text-lg text-sm text-[#f68e56]">
                        {items.totalPrice?.toLocaleString("vi", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap lg:flex-nowrap items-center gap-4 w-full py-4 px-2 justify-between">
                  <p className="text-[#0000008A] text-[12px]">
                    Vui lòng chỉ nhấn "Đã nhận được hàng" khi đơn hàng đã được
                    giao đến bạn và sản phẩm nhận được không có vấn đề nào.
                  </p>
                  {items?.status === "1" ? (
                    <div className="flex gap-3 lg:basis-3/12 w-full">
                      <Button className="!bg-stone-300 hover:!bg-stone-400 w-full h-10 lg:w-[50%] !text-white text-[12px] rounded border-none">
                        Chờ xác nhận
                      </Button>
                      <Popconfirm
                        title="Hủy dơn hàng?"
                        description="Bạn có chắc chắn muốn hủy đơn hàng này?"
                        onConfirm={() => cancel(items._id)}
                        // onCancel={cancel}
                        okText="Có "
                        cancelText="Không"
                      >
                        <Button className="bg-red-500 hover:!bg-red-600 w-full h-10 lg:w-[50%] !text-white text-[12px] rounded border-none">
                          Hủy đơn hàng
                        </Button>
                      </Popconfirm>
                    </div>
                  ) : items?.status === "2" ? (
                    <div className="flex gap-3 lg:basis-3/12 w-full">
                      <Button
                        className="bg-stone-300 w-full h-10 lg:w-[50%] text-white text-[12px] rounded "
                        disabled
                      >
                        Đã Nhận Hàng
                      </Button>
                      {items.cancellationRequested === true ? (
                        <Popconfirm
                          title="Yêu cầu hủy dơn hàng?"
                          description="Bạn có muốn yêu cầu hủy đơn hàng này?"
                          onConfirm={() => confirm(items?._id)}
                          // onCancel={cancel}
                          okText="Có"
                          cancelText="Không"
                        >
                          <Button
                            h-10
                            className="bg-red-500 w-full h-10 lg:w-[50%] text-white text-[12px] rounded"
                            disabled
                          >
                            Yêu cầu hủy đơn
                          </Button>
                        </Popconfirm>
                      ) : (
                        <Popconfirm
                          title="Yêu cầu hủy dơn hàng?"
                          description="Bạn có muốn yêu cầu hủy đơn hàng này?"
                          onConfirm={() => confirm(items?._id)}
                          // onCancel={cancel}
                          okText="Có"
                          cancelText="Không"
                        >
                          <Button
                            h-10
                            className="bg-red-500 hover:!bg-red-600 w-full h-10 lg:w-[50%] !text-white text-[12px] rounded border-none"
                          >
                            Yêu cầu hủy đơn
                          </Button>
                        </Popconfirm>
                      )}
                    </div>
                  ) : items?.status === "3" ? (
                    <Button
                      className="!bg-stone-300 hover:!bg-stone-400 w-full h-10 lg:w-[30%] !text-white text-[12px] rounded border-none"
                      onClick={() => complete(items?._id)}
                    >
                      Đã Nhận Hàng
                    </Button>
                  ) : items?.status === "4" ? (
                    <div className="flex gap-3 lg:basis-3/12 w-full">
                      {items?.items?.map((product: any) => (
                        <Button
                          type="default"
                          className="bg-stone-300 w-full h-10 lg:w-[50%] text-white text-[12px] rounded"
                          onClick={() =>
                            handleOpenReview(
                              items._id,
                              items.items[0]?.productId?._id
                            )
                          }
                        >
                          {reviewedOrders[items._id]?.has(
                            items.items[0]?.productId?._id || ""
                          )
                            ? "Xem đánh giá"
                            : "Đánh giá"}
                        </Button>
                      ))}

                      {openReview && openReviewOrderId === items._id && (
                        <div>
                          <Modal
                            open={openReview}
                            onCancel={() => setOpenReview(false)}
                            footer={null}
                            width={600}
                          >
                            <h1 className="text-2xl font-semibold mb-4 text-center">
                              ĐÁNH GIÁ SẢN PHẨM
                            </h1>

                            <div className="flex items-center gap-4 mb-4">
                              <div className="w-[50px] h-[50px]">
                                <img
                                  src={items.items[0]?.productId?.image_product}
                                  alt=""
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div>
                                {items.items[0]?.productId?.name_product}
                              </div>
                            </div>
                            <Form onFinish={onFinish}>
                              <Form.Item
                                name="contentReview"
                                rules={[
                                  {
                                    required: true,
                                    message: "Vui lòng nhập nội dung đánh giá!",
                                  },
                                ]}
                              >
                                <Input.TextArea
                                  rows={4}
                                  placeholder="Nhập nội dung đánh giá"
                                />
                              </Form.Item>

                              <Form.Item>
                                <Button type="primary" htmlType="submit">
                                  Gửi đánh giá
                                </Button>
                              </Form.Item>
                            </Form>
                            <Modal
                              open={previewOpen}
                              footer={null}
                              onCancel={() => setPreviewOpen(false)}
                            >
                              <Image src={previewImage} />
                            </Modal>
                          </Modal>
                        </div>
                      )}

                      <Button className="bg-stone-300 w-full h-10 lg:w-[50%] text-white text-[12px] rounded">
                        Đã Nhận Hàng
                      </Button>
                      <Popconfirm
                        title="Mua lại đơn hàng?"
                        description="Bạn có chắc chắn muốn mua lại không?"
                        onConfirm={() => addCart(items?._id)}
                        okText="Có"
                        cancelText="Không"
                      >
                        <Button className="bg-red-500 w-full h-10 lg:w-[50%] text-white text-[12px] rounded">
                          Mua Lại
                        </Button>
                      </Popconfirm>
                    </div>
                  ) : (
                    <Popconfirm
                      title="Mua lại đơn hàng?"
                      description="Bạn có chắc chắn muốn mua lại không?"
                      onConfirm={() => addCart(items?._id)}
                      // onCancel={cancel}
                      okText="Có "
                      cancelText="Không"
                    >
                      <Button className="bg-red-500 hover:!bg-red-600 w-full h-10 lg:w-[30%] !text-white text-[12px] rounded border-none">
                        Mua Lại
                      </Button>
                    </Popconfirm>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
