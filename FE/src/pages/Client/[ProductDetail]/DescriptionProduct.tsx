import { useState, useEffect } from "react";
import { IProduct } from "../../../common/interfaces/Product";
import { Query_Products } from "../../../common/hooks/Products/Products";
import { Link, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import instance from "../../../configs/axios";
import useLocalStorage from "../../../common/hooks/Storage/useStorage";
import { Button, Form, FormProps, Input, Popconfirm, message } from "antd";

type FieldType = {
  contentReview?: string;
};

const DescriptionProduct = ({ product, id }: IProduct & { id?: string }) => {
  const formattedDescription = product?.description_product.replace(
    /\n/g,
    "<br />"
  );
  const [toggleDes, setTogleDes] = useState<boolean>(true);
  const [editReviewId, setEditReviewId] = useState<string | null>(null);
  const [form] = Form.useForm();
  const { id: productId } = useParams();
  const [user] = useLocalStorage("user", {});
  const userId = user?.user?._id;
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = Query_Products(productId);
  console.log(data.review);

  useEffect(() => {
    if (editReviewId && data?.product?.reviews) {
      const review = data.product.reviews.find(
        (r: any) => r._id === editReviewId
      );
      if (review) {
        form.setFieldsValue({
          contentReview: review.contentReview,
        });
      }
    }
  }, [editReviewId, data, form]);

  const { mutate: deleteReview } = useMutation({
    mutationFn: async ({ reviewId, productId, orderId }) => {
      if (!userId) {
        throw new Error("User not authenticated");
      }
      const { data } = await instance.delete(
        `/review/${userId}/${productId}/${reviewId}/${orderId}`
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Product_Key"] });
      message.success("Xóa thành công");
    },
    onError: () => {
      message.error("Xóa thất bại");
    },
  });

  const { mutate: updateReview } = useMutation({
    mutationFn: async ({
      reviewId,
      productId,
      orderId,
      contentReview,
    }: {
      reviewId: string;
      productId: string;
      orderId: string;
      contentReview: string;
    }) => {
      const { data } = await instance.put(
        `/review/${userId}/${productId}/${reviewId}/${orderId}`,
        { contentReview },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Product_Key"] });
      message.success("Cập nhật thành công");
      setEditReviewId(null);
    },
    onError: () => {
      message.error("Cập nhật thất bại");
    },
  });

  const handleEditClick = (
    reviewId: string,
    productId: string,
    orderId: string,
    contentReview: string
  ) => {
    setEditReviewId(reviewId);
    form.setFieldsValue({ contentReview });
  };

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    if (editReviewId) {
      // Tìm sản phẩm từ data
      const productId = data?.products?._id || "";

      // Tìm review chính từ data.review
      const reviewContainer = data?.review?.find((r: any) =>
        r.reviews.some((subReview: any) => subReview._id === editReviewId)
      );

      // Nếu tìm thấy reviewContainer, tìm review con và lấy orderId
      const review = reviewContainer?.reviews.find(
        (subReview: any) => subReview._id === editReviewId
      );
      const orderId = review?.orderId || "";

      // Gọi hàm updateReview với các tham số đã chuẩn bị
      updateReview({
        reviewId: editReviewId,
        contentReview: values.contentReview || "",
        productId,
        orderId,
      });
    }
  };

  const isOwnReview = (reviewUserId: string) => {
    return userId === reviewUserId;
  };

  const handleCancel = () => {
    setEditReviewId(null);
    form.resetFields(); // Reset form fields to their initial values
  };

  return (
    <>
      <div className="flex flex-col border-t lg:py-10 lg:mt-10 mb:py-[34px] mb:mt-8">
        <ul className="flex items-center gap-x-8 border-b lg:pb-6 mb:pb-5 *:whitespace-nowrap *:px-6 *:lg:py-2.5 *:mb:py-[7px] *:rounded *:border *:place-items-center *:lg:text-base *:mb:text-xs">
          <button
            onClick={() => setTogleDes(true)}
            className={`btn_show_description grid hover:border-[#05422C] hover:bg-[#F2F6F4] ${
              toggleDes ? "border-[#05422C] text-[#05422C] bg-[#F2F6F4]" : ""
            }`}
          >
            Mô tả
          </button>
          <button
            onClick={() => setTogleDes(false)}
            className={`btn_show_description grid hover:border-[#05422C] hover:bg-[#F2F6F4] ${
              toggleDes ? "" : "border-[#05422C] text-[#05422C] bg-[#F2F6F4]"
            }`}
          >
            Đánh giá
          </button>
        </ul>
        <div className={toggleDes ? "block" : "hidden"}>
          <section className="flex flex-col text-sm text-[#46494F] leading-[21px] gap-y-4 lg:py-6 mb:pt-[19px]">
            <div
              dangerouslySetInnerHTML={{ __html: formattedDescription }}
              className="show_description my-4"
            />
          </section>
        </div>

        {!toggleDes &&
          data?.review?.length > 0 &&
          data.review.map((review: any) => (
            <div key={review._id}>
              {review?.reviews.map((review: any) => (
                <section className="block" key={review._id}>
                  <div className="flex flex-col text-sm text-[#46494F] leading-[21px] gap-y-4 lg:pt-6 mb:pt-5 mb:pb-0">
                    <div className="border rounded-2xl lg:p-6 mb:p-5">
                      <div className="flex items-center justify-between gap-x-4 border-b border-[#F4F4F4] pb-4 mb-4">
                        <div>
                          <strong className="text-base text-[#1A1E26] font-medium">
                            {review.userId}
                            <span className="text-sm text-[#9D9EA2] font-light pl-[5px]">
                              |
                            </span>
                            <span className="text-sm text-[#9D9EA2] font-light">
                              {new Date(review.createdAt).toLocaleDateString()}
                            </span>
                          </strong>
                        </div>
                        <div className="flex gap-x-2">
                          {isOwnReview(review.userId) && (
                            <>
                              <Popconfirm
                                title="Xóa đánh giá"
                                description="Bạn có chắc chắn muốn xóa đánh giá này?"
                                onConfirm={() =>
                                  deleteReview({
                                    reviewId: review._id,
                                    productId: review.productId,
                                    orderId: review.orderId,
                                  })
                                }
                                okText="Có"
                                cancelText="Không"
                              >
                                <Button danger>Xóa</Button>
                              </Popconfirm>
                              <Button
                                onClick={() =>
                                  handleEditClick(
                                    review._id,
                                    review.productId,
                                    review.orderId,
                                    review.contentReview
                                  )
                                }
                              >
                                Cập nhật
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                      <section className="flex flex-col gap-y-4">
                        {editReviewId === review._id ? (
                          <Form
                            name="basic"
                            form={form}
                            onFinish={onFinish}
                            layout="vertical"
                            initialValues={{
                              contentReview: review.contentReview,
                            }}
                          >
                            <Form.Item
                              name="contentReview"
                              label="Nội dung đánh giá"
                            >
                              <Input.TextArea rows={4} />
                            </Form.Item>
                            <Form.Item>
                              <Button
                                type="primary"
                                htmlType="submit"
                                className="mr-[5px]"
                              >
                                Lưu
                              </Button>
                              <Button type="default" onClick={handleCancel}>
                                Hủy
                              </Button>
                            </Form.Item>
                          </Form>
                        ) : (
                          <div>
                            <p className="text-[#1A1E26] text-base">
                              {review.contentReview}
                            </p>
                          </div>
                        )}
                      </section>
                    </div>
                  </div>
                </section>
              ))}
            </div>
          ))}
      </div>
    </>
  );
};

export default DescriptionProduct;
