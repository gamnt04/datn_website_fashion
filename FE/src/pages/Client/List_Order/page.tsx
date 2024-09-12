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
  Radio,
  Spin,
  Upload,
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
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai"; // AiFillStar để hiển thị ngôi sao màu vàng

import queryString from "query-string";
import instance from "../../../configs/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Mutation_Notification } from "../../../_lib/React_Query/Notification/Query";
type FieldType = {
  contentReview?: string;
  rating_review?: number;
  image_review?: string[];
};
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export default function List_order() {
  //Khai báo
  const [form] = Form.useForm();

  const queryClient = useQueryClient();
  const [currentReviewId, setCurrentReviewId] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const { mutate, contextHolder } = useOrderMutations(
    "REQUEST_CANCEL_or_CANCEL_PRODUCT_or_COMPLETED_PRODUCT"
  );
  const dispathNotification = Mutation_Notification("Add");
  const [selectedReason, setSelectedReason] = useState("");
  const [user] = useLocalStorage("user", {});
  const userId = user?.user?._id;
  const account = user?.user;
  const navi = useNavigate();
  const { mutate: add } = Mutation_Cart("ADD");
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
  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);
  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Thêm ảnh</div>
    </button>
  );
  const CLOUD_NAME = "dwya9mxip";
  const PRESET_NAME = "upImgProduct";
  const FOLDER_NAME = "PRODUCTS";
  const api = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
  const [rating, setRating] = useState<number>(0); // State để lưu giá trị rating
  const [initialContent, setInitialContent] = useState(""); // State để giữ giá trị ban đầu

  //function review
  const handleRating = (rate: number) => {
    setRating(rate); // Cập nhật rating khi người dùng click vào sao
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const reasons = [
    "Thay đổi ý định",
    "Tìm được giá tốt hơn",
    "Đặt nhầm sản phẩm",
    "Khác",
  ];

  // Truy vấn dữ liệu đánh giá dựa trên currentReviewId
  const { data: dataReviewById } = useQuery({
    queryKey: ["Review_Key", currentReviewId],
    queryFn: async () => {
      const { data } = await instance.get(`/reviews/${currentReviewId}`);
      return data;
    },
    enabled: !!currentReviewId, // Chỉ thực hiện query khi currentReviewId có giá trị
  });
  console.log(dataReviewById);

  const { mutate: addReview } = useMutation({
    mutationFn: async (reviewData: {
      contentReview: string;
      productId: string;
      orderId: string;
      rating_review: number;
      image_review: string[];
    }) => {
      const { data } = await instance.post(`/review/${userId}`, {
        productId: reviewData.productId,
        contentReview: reviewData.contentReview,
        orderId: reviewData.orderId,
        rating_review: reviewData.rating_review,
        image_review: reviewData.image_review,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["Order_Key"],
      });
      message.success("Gửi đánh giá thành công");
      setReviewedOrders((prev) => ({
        ...prev,
        [openReviewOrderId!]: new Set([
          ...Array.from(prev[openReviewOrderId!] || []),
          currentProductId!,
        ]),
      }));
    },
    onError: () => {
      message.error("Gửi đánh giá thất bại");
    },
  });
  // Cập nhật initialContent khi nhận được dataReviewById
  useEffect(() => {
    if (dataReviewById) {
      setInitialContent(dataReviewById.review?.contentReview || "");
    }
  }, [dataReviewById]);

  const handleOpenReview = (orderId, productId, reviewId) => {
    if (openReviewOrderId === orderId && openReview) {
      setOpenReview(false);
    } else {
      setOpenReview(true);
      setOpenReviewOrderId(orderId);
      setCurrentProductId(productId);
      setCurrentReviewId(reviewId); // Thiết lập currentReviewId trước khi useQuery chạy
    }
  };
  //END FUNCTION  REVIEW

  // yeu cau huy don
  function yeu_cau_huy_don(dataBody: {
    id_item: string | number;
    action?: string;
    cancellationReason?: string;
    orderNumber?: string | number;
    linkUri?: string | number;
  }) {
    dispathNotification?.mutate({
      userId: userId,
      receiver_id: "duonghainam03012004@gmail.com",
      message: `Người dùng ${user?.user?.userName} đã yêu cầu hủy đơn ${dataBody?.orderNumber} với lí do ${dataBody?.cancellationReason}!`,
      different: dataBody?.linkUri,
    });
    mutate(dataBody);
  }
  function huy_don(dataBody: {
    id_item: string | number;
    action?: string;
    cancellationReason?: string;
    orderNumber?: string | number;
    order?: string | number;

  }) {
    dispathNotification?.mutate({
      userId: userId,
      receiver_id: "duonghainam03012004@gmail.com",
      message: `Người dùng ${user?.user?.userName} đã hủy đơn ${dataBody?.orderNumber} với lí do ${dataBody?.cancellationReason}!`,
      different: dataBody?.orderNumber,
    });
    mutate(dataBody);
  }

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
    status: +(status_order || 1),
  };
  const menuItems = [
    "Tất Cả",
    "Chờ Xác Nhận",
    "Đang Chuẩn Bị Hàng",
    "Đang Vận Chuyển",
    "Hoàn Thành",
    "Đã Hủy",
  ];

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
    const fetchData = async () => {
      try {
        setPaymentPending(true);
        const parsed = queryString.parseUrl(location.search);
        if (parsed.query.vnp_TransactionStatus === "00") {
          const itemOrder = sessionStorage.getItem("item_order");
          const customerInfo = sessionStorage.getItem("customerInfo");

          if (itemOrder && customerInfo) {
            const getItemOrder = JSON.parse(itemOrder);
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
              // refetch();
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
                        description={
                          <div>
                            <p>Bạn có chắc chắn muốn hủy đơn hàng này?</p>
                            <div>
                              <p>Chọn lý do hủy:</p>
                              <Radio.Group
                                className="flex flex-col gap-2"
                                onChange={(e) =>
                                  setSelectedReason(e.target.value)
                                }
                              >
                                {reasons.map((reason, index) => (
                                  <Radio key={index} value={reason}>
                                    {reason}
                                  </Radio>
                                ))}
                              </Radio.Group>
                            </div>
                          </div>
                        }
                        onConfirm={() =>
                          huy_don({
                            id_item: items?._id,
                            action: "huy",
                            cancellationReason: selectedReason,
                            orderNumber: items?.orderNumber,
                          })
                        }
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
                        disabled>
                        Đã Nhận Hàng
                      </Button>
                      {items.cancellationRequested === true ? (
                        <Popconfirm
                          title="Yêu cầu hủy dơn hàng?"
                          description="Bạn có muốn yêu cầu hủy đơn hàng này?"
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
                          description={
                            <div>
                              <p>Bạn có chắc chắn muốn hủy đơn hàng này?</p>
                              <div>
                                <p>Chọn lý do hủy:</p>
                                <Radio.Group
                                  className="flex flex-col gap-2"
                                  onChange={(e) =>
                                    setSelectedReason(e.target.value)
                                  }
                                >
                                  {reasons.map((reason, index) => (
                                    <Radio key={index} value={reason}>
                                      {reason}
                                    </Radio>
                                  ))}
                                </Radio.Group>
                              </div>
                            </div>
                          }
                          onConfirm={() =>
                            yeu_cau_huy_don({
                              id_item: items?._id,
                              action: "yeu_cau_huy",
                              cancellationReason: selectedReason,
                              orderNumber: items?.orderNumber,
                              linkUri: items?._id,
                            })
                          }
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
                      className="bg-red-500 hover:!bg-red-600 w-full h-10 lg:w-[30%] !text-white text-[12px] rounded border-none"
                      onClick={() => (
                        mutate({ id_item: items._id }),
                        dispathNotification?.mutate({
                          userId: userId,
                          receiver_id: userId,
                          message: `Đơn hàng ${items?.orderNumber} đã được giao thành công!`,
                        })
                      )}
                    >
                      Đã Nhận Hàng
                    </Button>
                  ) : items?.status === "4" ? (
                    <div className="flex gap-3 lg:basis-3/12 w-full">
                      <Button
                        type="default"
                        className="bg-red-500 hover:!bg-red-600 w-full h-10 lg:w-[50%] !text-white text-[12px] rounded border-none"
                        onClick={() =>
                          handleOpenReview(
                            items._id,
                            items.items[0]?.productId?._id,
                            items.reviews
                          )
                        }
                      >
                        {items?.reviews.length > 0
                          ? "Xem đánh giá"
                          : "Đánh giá"}
                      </Button>
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

                            {/* Tạo một tập hợp các sản phẩm để nhóm thuộc tính cùng sản phẩm lại */}
                            {items.items
                              .reduce((acc, item) => {
                                const existingProduct = acc.find(
                                  (p) => p.productId === item.productId._id
                                );
                                if (existingProduct) {
                                  existingProduct.items.push(item);
                                } else {
                                  acc.push({
                                    productId: item.productId._id,
                                    productName: item.productId.name_product,
                                    productImage: item.productId.image_product,
                                    items: [item],
                                  });
                                }
                                return acc;
                              }, [])
                              .map((productGroup, index) => {
                                const review = items.reviews.find(
                                  (r) => r.productId === productGroup.productId
                                );

                                return (
                                  <div
                                    key={index}
                                    className="flex flex-col gap-4 mb-4"
                                  >
                                    <div className="flex items-center gap-4">
                                      <div className="w-[50px] h-[50px]">
                                        <img
                                          src={productGroup.productImage}
                                          alt=""
                                          className="w-full h-full object-cover"
                                        />
                                      </div>
                                      <div>{productGroup.productName}</div>
                                    </div>

                                    <Form
                                      onFinish={(values) => {
                                        addReview({
                                          contentReview:
                                            values[`contentReview_${index}`] ||
                                            "",
                                          productId: productGroup.productId,
                                          orderId: items?._id,
                                          rating_review:
                                            values[`rating_review_${index}`] ||
                                            0,
                                          image_review:
                                            values[`image_review_${index}`] ||
                                            [],
                                        });
                                      }}
                                      onValuesChange={(
                                        changedValues,
                                        allValues
                                      ) => {
                                        // Đồng bộ giá trị rating khi người dùng thay đổi
                                        if (
                                          changedValues[
                                            `rating_review_${index}`
                                          ]
                                        ) {
                                          setRating(
                                            changedValues[
                                              `rating_review_${index}`
                                            ]
                                          );
                                        }
                                      }}
                                    >
                                      <Form.Item
                                        name={`rating_review_${index}`}
                                        initialValue={
                                          review ? review.rating_review : rating
                                        }
                                      >
                                        <div className="flex items-center gap-1 mb-[20px]">
                                          {[1, 2, 3, 4, 5].map((rate) => (
                                            <span
                                              key={rate}
                                              onClick={() => {
                                                form.setFieldsValue({
                                                  [`rating_review_${index}`]:
                                                    rate, // Cập nhật giá trị vào form
                                                });
                                              }}
                                            >
                                              {rate <=
                                              (review
                                                ? review.rating_review
                                                : rating) ? (
                                                <AiFillStar className="text-yellow-400 text-2xl" />
                                              ) : (
                                                <AiOutlineStar className="text-yellow-400 text-2xl" />
                                              )}
                                            </span>
                                          ))}
                                        </div>
                                      </Form.Item>

                                      {/* Các phần khác vẫn giữ nguyên */}
                                      <Form.Item
                                        name={`contentReview_${index}`}
                                        rules={[
                                          {
                                            required: true,
                                            message:
                                              "Vui lòng nhập nội dung đánh giá!",
                                          },
                                        ]}
                                        initialValue={
                                          review ? review.contentReview : ""
                                        }
                                      >
                                        <Input.TextArea
                                          rows={4}
                                          placeholder="Nhập nội dung đánh giá"
                                          disabled={!!review} // Vô hiệu hóa nếu đã có đánh giá
                                        />
                                      </Form.Item>

                                      {/* Phần Upload */}
                                      <Form.Item
                                        name={`image_review_${index}`}
                                        initialValue={
                                          review && review.image_review
                                            ? review.image_review
                                            : []
                                        }
                                      >
                                        <Upload
                                          listType="picture-card"
                                          fileList={
                                            review && review.image_review
                                              ? review.image_review.map(
                                                  (url, idx) => ({
                                                    uid: `${idx}`,
                                                    name: `image_${idx}`,
                                                    status: "done",
                                                    url: url,
                                                  })
                                                )
                                              : []
                                          }
                                          onChange={({
                                            fileList: newFileList,
                                          }) => {
                                            setFileList(newFileList);
                                            form.setFieldsValue({
                                              [`image_review_${index}`]:
                                                newFileList.map(
                                                  (file) => file.url
                                                ),
                                            });
                                          }}
                                          onPreview={handlePreview}
                                          customRequest={async ({
                                            file,
                                            onSuccess,
                                          }) => {
                                            const formData = new FormData();
                                            formData.append("file", file);
                                            formData.append(
                                              "upload_preset",
                                              PRESET_NAME
                                            );
                                            formData.append(
                                              "folder",
                                              FOLDER_NAME
                                            );

                                            try {
                                              const response = await fetch(
                                                api,
                                                {
                                                  method: "POST",
                                                  body: formData,
                                                }
                                              );
                                              const result =
                                                await response.json();
                                              file.url = result.secure_url;
                                              onSuccess?.();
                                              setFileList((prevList) =>
                                                prevList.map((f) =>
                                                  f.uid === file.uid ? file : f
                                                )
                                              );
                                            } catch (error) {
                                              console.error(
                                                "Upload error:",
                                                error
                                              );
                                            }
                                          }}
                                          showUploadList={{
                                            showRemoveIcon: false, // Không hiển thị biểu tượng thùng rác
                                          }}
                                        >
                                          {fileList.length >= 8 || review
                                            ? null
                                            : uploadButton}
                                        </Upload>
                                      </Form.Item>

                                      {review ? (
                                        <div>
                                          <Form.Item>
                                            <Button className="bg-black text-white">
                                              <Link
                                                to={`/shops/${review?.productId}`}
                                                className="ant-btn ant-btn-primary"
                                              >
                                                Xem đánh giá
                                              </Link>
                                            </Button>
                                          </Form.Item>
                                        </div>
                                      ) : (
                                        <div>
                                          <Form.Item>
                                            <Button
                                              type="primary"
                                              htmlType="submit"
                                            >
                                              Gửi đánh giá
                                            </Button>
                                          </Form.Item>
                                        </div>
                                      )}
                                    </Form>
                                  </div>
                                );
                              })}

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

                      <Button className="bg-red-500 hover:!bg-red-600 w-full h-10 lg:w-[50%] !text-white text-[12px] rounded border-none disabled cursor-not-allowed">
                        Đã Nhận Hàng
                      </Button>
                      <Popconfirm
                        title="Mua lại đơn hàng?"
                        description="Bạn có chắc chắn muốn mua lại không?"
                        onConfirm={() => addCart(items?._id)}
                        okText="Có"
                        cancelText="Không"
                      >
                        <Button className="bg-red-500 hover:!bg-red-600 w-full h-10 !lg:w-[50%] !text-white text-[12px] rounded border-none">
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
                      <Button className="bg-red-500 hover:!bg-red-600 h-10 lg:w-[30%] !text-white text-[12px] rounded border-none">
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
