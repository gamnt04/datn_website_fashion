import { useState, useEffect } from "react";
import { IProduct } from "../../../common/interfaces/Product";
import { Query_Products } from "../../../common/hooks/Products/Products";
import { useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import instance from "../../../configs/axios";
import useLocalStorage from "../../../common/hooks/Storage/useStorage";
import { Button, Form, FormProps, Input, Popconfirm, message } from "antd";

type FieldType = {
  contentReview?: string;
};

const DescriptionProduct = ({ product }: IProduct) => {
  const formattedDescription = product?.description_product.replace(
    /\n/g,
    "<br />"
  );
  const [toggleDes, setTogleDes] = useState<boolean>(true);
  const [editReviewId, setEditReviewId] = useState<string | null>(null);
  const [form] = Form.useForm();
  const { id } = useParams();
  const [user] = useLocalStorage("user", {});
  const userId = user?.user?._id;
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = Query_Products(id);
  console.log(data);

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

  // const { mutate: deleteReview } = useMutation({
  //   mutationFn: async (reviewId: string) => {
  //     const { data } = await instance.delete(
  //       `/review/${userId}/${id}/${reviewId}`
  //     );
  //     return data;
  //   },
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["Product_Key", id] });
  //     message.success("Xóa thành công");
  //   },
  //   onError: () => {
  //     message.error("Xóa thất bại");
  //   },
  // });

  // const { mutate: updateReview } = useMutation({
  //   mutationFn: async ({
  //     reviewId,
  //     contentReview,
  //   }: {
  //     reviewId: string;
  //     contentReview: string;
  //   }) => {
  //     const { data } = await instance.put(
  //       `/review/${userId}/${id}/${reviewId}`,
  //       { contentReview },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     return data;
  //   },
  //   onSuccess: (data) => {
  //     queryClient.invalidateQueries({ queryKey: ["Product_Key", id] });
  //     message.success("Cập nhật thành công");
  //     setEditReviewId(null);
  //   },
  //   onError: () => {
  //     message.error("Cập nhật thất bại");
  //   },
  // });

  const handleEditClick = (reviewId: string, contentReview: string) => {
    setEditReviewId(reviewId);
    form.setFieldsValue({ contentReview });
  };

  // const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
  //   if (editReviewId) {
  //     updateReview({
  //       reviewId: editReviewId,
  //       contentReview: values.contentReview || "",
  //     });
  //   }
  // };

  const isOwnReview = (reviewUserId: string) => {
    return userId === reviewUserId;
  };

  return (
    <>
      <div className="flex flex-col border-t lg:py-10 lg:mt-10 mb:py-[34px] mb:mt-8">
        <ul className="flex items-center gap-x-8 border-b lg:pb-6 mb:pb-5 whitespace-nowrap px-6 lg:py-2.5 mb:py-[7px] rounded border place-items-center lg:text-base mb:text-xs">
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
            Đánh giá({data?.product?.reviews.length || 0})
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
          data?.product?.reviews &&
          data?.product?.reviews.map((review: any) => (
            // key={review._id}
            <section className="block">
              <div className="flex flex-col text-sm text-[#46494F] leading-[21px] gap-y-4 lg:pt-6 mb:pt-5 mb:pb-0">
                <div className="border rounded-2xl lg:p-6 mb:p-5">
                  <div className="flex items-center justify-between gap-x-4 border-b border-[#F4F4F4] pb-4 mb-4">
                    <div>
                      <strong className="text-base text-[#1A1E26] font-medium">
                        {/* {review.user.userName} */}
                        <span className="text-sm text-[#9D9EA2] font-light pl-[5px]">
                          |
                        </span>
                        <span className="text-sm text-[#9D9EA2] font-light">
                          {/* {new Date(review.created_at).toLocaleDateString()} */}
                        </span>
                      </strong>
                    </div>
                    <div className="flex gap-x-2">
                      {/* {isOwnReview(review.user._id) && (
                        <>
                          <Popconfirm
                            title="Xóa đánh giá"
                            description="Bạn có chắc chắn muốn xóa đánh giá này?"
                            onConfirm={() => deleteReview(review._id)}
                            okText="Có"
                            cancelText="Không"
                          >
                            <Button danger>Xóa</Button>
                          </Popconfirm>
                          <Button
                            onClick={() =>
                              handleEditClick(review._id, review.contentReview)
                            }
                          >
                            Cập nhật
                          </Button>
                        </>
                      )} */}
                    </div>
                  </div>
                  {/* <section className="flex flex-col gap-y-4">
                    {editReviewId === review._id ? (
                      <Form
                        name="basic"
                        form={form}
                        // onFinish={onFinish}
                        layout="vertical"
                        initialValues={{ contentReview: review.contentReview }}
                      >
                        <Form.Item
                          name="contentReview"
                          label="Nội dung đánh giá"
                        >
                          <Input.TextArea rows={4} />
                        </Form.Item>
                        <Form.Item>
                          <Button type="primary" htmlType="submit">
                            Lưu
                          </Button>
                        </Form.Item>
                      </Form>
                    ) : (
                      <p className="text-[#1A1E26] text-base">
                        {review.contentReview}
                      </p>
                    )}
                  </section> */}
                </div>
              </div>
            </section>
          ))}
      </div>
    </>
  );
};

export default DescriptionProduct;
