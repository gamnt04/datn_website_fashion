import { SubmitHandler, useForm } from "react-hook-form";
import { createProduct } from "../../../services/product";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IProduct } from "../../../common/interfaces/Product";



const AddProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IProduct>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IProduct> = async (data) => {
    try {
      const { gallery, image, ...formData }: any = data; // Lấy gallery và image ra khỏi formData
      const uploadedImageUrls = await uploadImage(image); // Upload ảnh chính (image)
      const uploadedGalleryUrls = await uploadGallery(gallery); // Upload ảnh trong gallery

      const newData: IProduct = {
        ...formData,
        image: uploadedImageUrls[0], // Giả sử chỉ có một ảnh chính được upload
        gallery: uploadedGalleryUrls,
      };

      await createProduct(newData);
      alert("Thêm mới thành công");
      navigate("/admin/products");
    } catch (error) {
      console.error("Thêm mới thất bại:", error);
      alert("Thêm mới thất bại");
    }
  };

  const uploadImage = async (file: FileList | null) => {
    if (!file) return [];

    const CLOUD_NAME = "dwya9mxip";
    const PRESET_NAME = "upImgProduct";
    const FOLDER_NAME = "PRODUCTS";
    const api = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

    const formData = new FormData();
    formData.append("file", file[0]); // Chỉ lấy file đầu tiên nếu có nhiều file được chọn
    formData.append("upload_preset", PRESET_NAME);
    formData.append("folder", FOLDER_NAME);

    try {
      const response = await axios.post(api, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return [response.data.secure_url]; // Trả về mảng đường dẫn (ở đây chỉ có một đường dẫn)
    } catch (error) {
      console.error("Error uploading image:", error);
      throw new Error("Failed to upload image");
    }
  };

  const uploadGallery = async (files: FileList | null) => {
    if (!files) return [];

    const CLOUD_NAME = "dwya9mxip";
    const PRESET_NAME = "upImgProduct";
    const FOLDER_NAME = "PRODUCTS";
    const api = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

    const uploadPromises = Array.from(files).map(async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", PRESET_NAME);
      formData.append("folder", FOLDER_NAME);

      const response = await axios.post(api, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data.secure_url;
    });

    try {
      const uploadedUrls = await Promise.all(uploadPromises);
      return uploadedUrls;
    } catch (error) {
      console.error("Error uploading images:", error);
      throw new Error("Failed to upload images");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            placeholder="name"
            {...register("name", { required: "Không bỏ trống" })}
          />
          <div>{errors.name?.message}</div>
        </div>

        <div>
          <label htmlFor="image">Image</label>
          <input
            type="file"
            id="product_image"
            {...register("image", { required: "Vui lòng chọn ảnh sản phẩm" })}
          />
          <div>{errors.image?.message}</div>
        </div>

        <div>
          <label htmlFor="gallery">Gallery</label>
          <input
            type="file"
            id="product_gallery"
            multiple
            {...register("gallery")}
          />
          <div>{errors.gallery?.message}</div>
        </div>

        <div>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            placeholder="price"
            {...register("price", { required: "Không bỏ trống" })}
          />
          <div>{errors.price?.message}</div>
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <textarea
            placeholder="description"
            {...register("description", { required: "Không bỏ trống" })}
          />
          <div>{errors.description?.message}</div>
        </div>

        <div>
          <label htmlFor="slug">Slug</label>
          <input
            type="text"
            placeholder="slug"
            {...register("slug", { required: "Không bỏ trống" })}
          />
          <div>{errors.slug?.message}</div>
        </div>

        <div>
          <button type="submit">Thêm mới</button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
