// utils/handleImageChange.ts
import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { UseFormSetValue } from "react-hook-form";
import { IProduct } from "../../common/interfaces/Product";
export const handleImageChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setImagePreview: Dispatch<SetStateAction<string | null>>,
  setImageSelected: Dispatch<SetStateAction<boolean>>
) => {
  const file = e.target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
    setImageSelected(true);
  } else {
    setImageSelected(false);
  }
};

// utils/handleGalleryChange.ts

export const handleGalleryChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setGalleryPreview: Dispatch<SetStateAction<string[]>>,
  setValue: UseFormSetValue<IProduct>
) => {
  const files = e.target.files;
  if (files) {
    const previews = Array.from(files).map((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return new Promise<string>((resolve) => {
        reader.onloadend = () => {
          resolve(reader.result as string);
        };
      });
    });

    Promise.all(previews).then((images) => {
      setGalleryPreview(images);
      setValue("gallery_product", images);
    });
  }
};

// utils/removeGalleryImage.ts

export const removeGalleryImage = (
  index: number,
  setGalleryPreview: Dispatch<SetStateAction<string[]>>,
  galleryInputRef: MutableRefObject<HTMLInputElement | null>
) => {
  setGalleryPreview((prev) => prev.filter((_, i) => i !== index));
  if (galleryInputRef.current) {
    galleryInputRef.current.value = "";
  }
};

// utils/removeImagePreview.ts
export const removeImagePreview = (
  setImagePreview: Dispatch<SetStateAction<string | null>>,
  setImageSelected: Dispatch<SetStateAction<boolean>>,
  setValue: UseFormSetValue<IProduct>
) => {
  setImagePreview(null);
  setImageSelected(false);
  setValue("image_product", []);
};
