import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IProduct } from "../../../../common/interfaces/Product";
import Loading from "../../../../components/base/Loading/Loading";
import { updateProduct, getProductById } from "../../../../services/product";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Message from "../../../../components/base/Message/Message";
import useCategoryQuery from "../../../../common/hooks/Category/useCategoryQuery";
import { ICategory } from "../../../../common/interfaces/Category";

const UpdateProduct = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showMessage, setShowMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: categories } = useCategoryQuery();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (id) {
          const data = await getProductById(id);
          setProduct(data);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleUpdate = async (updatedProduct: IProduct) => {
    try {
      if (id) {
        await updateProduct(id, updatedProduct);
        setSuccessMessage("Cập nhật thành công");
        setShowMessage(true);
        queryClient.invalidateQueries("products");
        setTimeout(() => navigate("/admin/products"), 2000);
      }
    } catch (error) {
      setErrorMessage("Cập nhật thất bại");
      setShowMessage(true);
      console.error("Error updating product:", error);
    }
  };

  const uploadImage = async (file: FileList | null) => {
    if (!file) return "";

    const CLOUD_NAME = "dwya9mxip";
    const PRESET_NAME = "upImgProduct";
    const FOLDER_NAME = "PRODUCTS";
    const api = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

    const formData = new FormData();
    formData.append("file", file[0]);
    formData.append("upload_preset", PRESET_NAME);
    formData.append("folder", FOLDER_NAME);

    try {
      const response = await axios.post(api, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data.secure_url;
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

  if (isLoading) {
    return <Loading />;
  }

  if (!product) {
    return <div>Không tìm thấy sản phẩm</div>;
  }

  return (
    <div>
      {successMessage && (
        <Message
          message={successMessage}
          timeout={2000}
          openMessage={showMessage}
          type={"success"}
        />
      )}
      {errorMessage && (
        <Message
          message={errorMessage}
          timeout={2000}
          openMessage={showMessage}
          type={"warning"}
        />
      )}
      <h1>Cập nhật sản phẩm</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const { gallery, image, ...formData }: any = product; // Lấy gallery và image ra khỏi formData
          const uploadedImageUrls =
            image instanceof FileList
              ? await uploadImage(image)
              : product.image;
          const uploadedGalleryUrls =
            gallery instanceof FileList
              ? await uploadGallery(gallery)
              : product.gallery;

          const updatedProduct: IProduct = {
            ...formData,
            image: uploadedImageUrls,
            gallery: uploadedGalleryUrls,
          };
          handleUpdate(updatedProduct);
        }}
      >
        <div>
          <label>Tên sản phẩm</label>
          <input
            type="text"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
          />
        </div>
        <div>
          <label>Giá sản phẩm</label>
          <input
            type="number"
            value={product.price}
            onChange={(e) =>
              setProduct({
                ...product,
                price: isNaN(parseFloat(e.target.value))
                  ? 0
                  : parseFloat(e.target.value),
              })
            }
          />
        </div>
        <div>
          <label>Miêu tả</label>
          <textarea
            value={product.description}
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
          />
        </div>
        <div>
          <label>Danh mục</label>
          <select
            value={product.category_id}
            onChange={(e) =>
              setProduct({ ...product, category_id: e.target.value })
            }
          >
            <option value="">-- Chọn danh mục --</option>
            {categories?.map((category: ICategory) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Ảnh sản phẩm</label>
          <input
            type="file"
            onChange={(e) => setProduct({ ...product, image: e.target.files })}
          />
        </div>
        <div>
          <label>Gallery</label>
          <input
            type="file"
            multiple
            onChange={(e) =>
              setProduct({ ...product, gallery: e.target.files })
            }
          />
        </div>
        <button type="submit">Cập nhật</button>
      </form>
    </div>
  );
};

export default UpdateProduct;
