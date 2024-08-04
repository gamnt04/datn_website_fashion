import axios from "axios";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
const uploadFileCloudinary = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "demo-upload"); // Thay bằng upload preset của bạn
    formData.append("folder", "reactjs");
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/ecommercer2021/upload", // Thay bằng cloudinary name của bạn
      formData
    );
    return response.data.url;
  } catch (error) {
    // handle error here
    console.error(error);
  }
};


export { uploadFileCloudinary };


// utils/uploadImage.ts


export const UploadImage = async (file: FileList | null): Promise<string[]> => {
  if (!file) return [];

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


///uploadGallery.ts


export const UploadGallery = async (
  files: FileList | null
): Promise<string[]> => {
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








