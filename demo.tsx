// const demo = () => {

//     type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
//     const getBase64 = (file: FileType): Promise<string> =>
//       new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.readAsDataURL(file);
//         reader.onload = () => resolve(reader.result as string);
//         reader.onerror = (error) => reject(error);
//       });

//     export default function List_order() {
//       //Khai báo
//       const [form] = Form.useForm();
//       const queryClient = useQueryClient();
//       const [currentReviewId, setCurrentReviewId] = useState<string | null>(
//         null
//       );
//       const [searchParams, setSearchParams] = useSearchParams();
//       const { mutate, contextHolder } = useOrderMutations(
//         "REQUEST_CANCEL_or_CANCEL_PRODUCT_or_COMPLETED_PRODUCT"
//       );
//       const dispathNotification = Mutation_Notification("Add");
//       const [selectedReason, setSelectedReason] = useState("");
//       const [user] = useLocalStorage("user", {});
//       const userId = user?.user?._id;
//       const account = user?.user;
//       const navi = useNavigate();
//       const { mutate: add } = Mutation_Cart("ADD");
//       const [paymentPending, setPaymentPending] = useState(false);
//       const [openReviewOrderId, setOpenReviewOrderId] = useState<string | null>(
//         null
//       );
//       const [openReview, setOpenReview] = useState(false);
//       const [currentProductId, setCurrentProductId] = useState<string | null>(
//         null
//       );
//       const [reviewedOrders, setReviewedOrders] = useState<{
//         [orderId: string]: Set<string>;
//       }>({});
//       const [previewOpen, setPreviewOpen] = useState(false);
//       const [previewImage, setPreviewImage] = useState("");
//       const [fileList, setFileList] = useState<UploadFile[]>([]);
//       const uploadButton = (
//         <button style={{ border: 0, background: "none" }} type="button">
//           <PlusOutlined />
//           <div style={{ marginTop: 8 }}>Thêm ảnh</div>
//         </button>
//       );

//       const handlePreview = async (file: UploadFile) => {
//         if (!file.url && !file.preview) {
//           file.preview = await getBase64(file.originFileObj as FileType);
//         }
//         setPreviewImage(file.url || (file.preview as string));
//         setPreviewOpen(true);
//       };

//       // Truy vấn dữ liệu đánh giá dựa trên currentReviewId
//       const { data: dataReviewById } = useQuery({
//         queryKey: ["Review_Key", currentReviewId],
//         queryFn: async () => {
//           const { data } = await instance.get(`/reviews/${currentReviewId}`);
//           return data;
//         },
//         enabled: !!currentReviewId, // Chỉ thực hiện query khi currentReviewId có giá trị
//       });
//       console.log(dataReviewById);

//       const { mutate: addReview } = useMutation({
//         mutationFn: async (reviewData: {
//           contentReview: string;
//           productId: string;
//           orderId: string;
//           rating_review: number;
//           image_review: string[];
//         }) => {
//           const { data } = await instance.post(`/review/${userId}`, {
//             contentReview: reviewData.contentReview,
//             productId: reviewData.productId,
//             orderId: reviewData.orderId,
//             rating_review: reviewData.rating_review,
//             image_review: reviewData.image_review,
//           });
//           return data;
//         },
//         onSuccess: () => {
//           queryClient.invalidateQueries({
//             queryKey: ["Order_Key"],
//           });
//           message.success("Gửi đánh giá thành công");
//           setReviewedOrders((prev) => ({
//             ...prev,
//             [openReviewOrderId!]: new Set([
//               ...Array.from(prev[openReviewOrderId!] || []),
//               currentProductId!,
//             ]),
//           }));
//         },
//         onError: () => {
//           message.error("Gửi đánh giá thất bại");
//         },
//       });
//       // Cập nhật initialContent khi nhận được dataReviewById
//       useEffect(() => {
//         if (dataReviewById) {
//           setInitialContent(dataReviewById.review?.contentReview || "");
//           // setInitialImage(dataReviewById.review?.image_review || []);
//           // setInitialRating(dataReviewById.review?.rating_review || 0);
//         }
//       }, [dataReviewById]);

//       const handleOpenReview = (orderId, productId, reviewId) => {
//         if (openReviewOrderId === orderId && openReview) {
//           setOpenReview(false);
//         } else {
//           setOpenReview(true);
//           setOpenReviewOrderId(orderId);
//           setCurrentProductId(productId);
//           setCurrentReviewId(reviewId); // Thiết lập currentReviewId trước khi useQuery chạy
//         }
//       };
//       //END FUNCTION  REVIEW

//       return (

//                                 {/* Tạo một tập hợp các sản phẩm để nhóm thuộc tính cùng sản phẩm lại */}
//                                 {items.items
//                                   .reduce((acc, item) => {
//                                     const existingProduct = acc.find(
//                                       (p) => p.productId === item.productId._id
//                                     );
//                                     if (existingProduct) {
//                                       existingProduct.items.push(item);
//                                     } else {
//                                       acc.push({
//                                         productId: item.productId._id,
//                                         productName:
//                                           item.productId.name_product,
//                                         productImage:
//                                           item.productId.image_product,
//                                         items: [item],
//                                       });
//                                     }
//                                     return acc;
//                                   }, [])
//                                   .map((productGroup, index) => {
//                                     const review = items.reviews.find(
//                                       (r) =>
//                                         r.productId === productGroup.productId
//                                     );

//                                     return (
//                                       <div
//                                         key={index}
//                                         className="flex flex-col gap-4 mb-4"
//                                       >
//                                         <div className="flex items-center gap-4">
//                                           <div className="w-[50px] h-[50px]">
//                                             <img
//                                               src={productGroup.productImage}
//                                               alt=""
//                                               className="w-full h-full object-cover"
//                                             />
//                                           </div>
//                                           <div>{productGroup.productName}</div>
//                                         </div>
//                                         <Form
//                                           onFinish={(values) => {
//                                             const [img, setImg] =
//                                               useState<any>("");

//                                             const handleImageChange = (
//                                               img: any
//                                             ) => {
//                                               setImg(
//                                                 img?.fileList?.map(
//                                                   (file: any) =>
//                                                     file.originFileObj
//                                                 )
//                                               );
//                                             };

//                                             const secure_url =
//                                               await UploadImage(img);
//                                             addReview({
//                                               contentReview:
//                                                 values[
//                                                   `contentReview_${index}`
//                                                 ] || "",
//                                               productId: productGroup.productId,
//                                               orderId: items?._id,
//                                               rating_review:
//                                                 values[
//                                                   `rating_review_${index}`
//                                                 ] || 0,
//                                               image_review: secure_url || [],
//                                             });
//                                           }}
//                                           onValuesChange={(changedValues) => {
//                                             // Đồng bộ giá trị rating khi người dùng thay đổi
//                                             if (
//                                               changedValues[
//                                                 `rating_review_${index}`
//                                               ]
//                                             ) {
//                                               setRating(
//                                                 changedValues[
//                                                   `rating_review_${index}`
//                                                 ]
//                                               );
//                                             }
//                                           }}
//                                         >
//                                           <Form.Item
//                                             name={`rating_review_${index}`}
//                                             initialValue={
//                                               review
//                                                 ? review.rating_review
//                                                 : rating[
//                                                     productGroup.productId
//                                                   ] || 0
//                                             }
//                                             rules={[
//                                               {
//                                                 required: true,
//                                                 message:
//                                                   "Vui lòng chọn mức đánh giá!",
//                                               },
//                                             ]}
//                                           >
//                                             <Rate
//                                               allowClear={false}
//                                               disabled={!!review} // Không cho chỉnh sửa nếu đã có đánh giá
//                                               value={
//                                                 rating[
//                                                   productGroup.productId
//                                                 ] || 0
//                                               }
//                                               onChange={(value) => {
//                                                 // Cập nhật giá trị vào form
//                                                 form.setFieldsValue({
//                                                   [`rating_review_${index}`]:
//                                                     value,
//                                                 });

//                                                 // Đồng bộ với state rating
//                                                 setRating((prevRatings) => ({
//                                                   ...prevRatings,
//                                                   [productGroup.productId]:
//                                                     value,
//                                                 }));
//                                               }}
//                                             />
//                                           </Form.Item>

//                                           {/* Các phần khác vẫn giữ nguyên */}
//                                           <Form.Item
//                                             name={`contentReview_${index}`}
//                                             rules={[
//                                               {
//                                                 required: true,
//                                                 message:
//                                                   "Vui lòng nhập nội dung đánh giá!",
//                                               },
//                                             ]}
//                                             initialValue={
//                                               review ? review.contentReview : ""
//                                             }
//                                           >
//                                             <Input.TextArea
//                                               rows={4}
//                                               placeholder="Nhập nội dung đánh giá"
//                                               disabled={!!review} // Vô hiệu hóa nếu đã có đánh giá
//                                             />
//                                           </Form.Item>

//                                           {/* Phần Upload */}
//                                           <Form.Item
//                                             name={`image_review_${index}`}
//                                             initialValue={
//                                               review && review.image_review
//                                                 ? review.image_review
//                                                 : fileList[
//                                                     productGroup.productId
//                                                   ]?.map((file) => file.url) ||
//                                                   []
//                                             }
//                                           >
//                                             <Upload
//                                               listType="picture-card"
//                                               fileList={
//                                                 review && review.image_review
//                                                   ? review.image_review.map(
//                                                       (url, idx) => ({
//                                                         uid: `${idx}`,
//                                                         name: `image_${idx}`,
//                                                         status: "done",
//                                                         url: url,
//                                                       })
//                                                     )
//                                                   : fileList[
//                                                       productGroup.productId
//                                                     ] || []
//                                               }
//                                               onChange={hanldeImgChange}
//                                             >
//                                               {fileList[productGroup.productId]
//                                                 ?.length >= 8
//                                                 ? null
//                                                 : uploadButton}
//                                             </Upload>
//                                           </Form.Item>

//                                           {review ? (
//                                             <div>
//                                               <Form.Item>
//                                                 <Button className="bg-black text-white">
//                                                   <Link
//                                                     to={`/shops/${review?.productId}`}
//                                                     className="ant-btn ant-btn-primary"
//                                                   >
//                                                     Xem đánh giá
//                                                   </Link>
//                                                 </Button>
//                                               </Form.Item>
//                                             </div>
//                                           ) : (
//                                             <div>
//                                               <Form.Item>
//                                                 <Button
//                                                   type="primary"
//                                                   htmlType="submit"
//                                                 >
//                                                   Gửi đánh giá
//                                                 </Button>
//                                               </Form.Item>
//                                             </div>
//                                           )}
//                                         </Form>
//                                       </div>
//                                     );
//                                   })}

//                                 <Modal
//                                   open={previewOpen}
//                                   footer={null}
//                                   onCancel={() => setPreviewOpen(false)}
//                                 >
//                                   <Image src={previewImage} />
//                                 </Modal>
//                               </Modal>
//                             </div>
//                           )}

//                           <Button className="bg-red-500 hover:!bg-red-600 w-full h-10 lg:w-[50%] !text-white text-[12px] rounded border-none disabled cursor-not-allowed">
//                             Đã Nhận Hàng
//                           </Button>
//                           <Popconfirm
//                             title="Mua lại đơn hàng?"
//                             description="Bạn có chắc chắn muốn mua lại không?"
//                             onConfirm={() => addCart(items?._id)}
//                             okText="Có"
//                             cancelText="Không"
//                           >
//                             <Button className="bg-red-500 hover:!bg-red-600 w-full h-10 !lg:w-[50%] !text-white text-[12px] rounded border-none">
//                               Mua Lại
//                             </Button>
//                           </Popconfirm>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>
//       );
//     }

// }
