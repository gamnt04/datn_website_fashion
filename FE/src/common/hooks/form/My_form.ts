import { useNavigate, useParams } from "react-router-dom";
import { Mutation_items } from "../Products/mutation_item"
import { Query_Products } from "../Products/Products";
import { useState } from "react";
import { UploadGallery, UploadImage } from "../../../systems/utils/uploadImage";

const useForm = ({ mode }: any) => {
    const routing = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const { id } = useParams<{ id: string }>()
    const [imageFile, setImageFile] = useState<any>(null);
    const [galleryFiles, setGalleryFiles] = useState<any>([]);
    let data_one_item: any;
    if (id) {
        data_one_item = Query_Products(id);
    }
    const { mutate, isPending, isError, status_api } = Mutation_items(mode ? 'EDIT' : 'CREATE');


    // 
    const handleImageChange = (imageItem: any) => {
        setImageFile(imageItem.fileList.map((file: any) => file.originFileObj));
    };

    const handleGalleryChange = ({ fileList }: any) => {
        setGalleryFiles(fileList.map((file: any) => file.originFileObj));
    };

    async function onSubmit(dataForm: any) {
        setLoading(true);
        const imageUrl = imageFile ? await UploadImage(imageFile) : "";
        const galleryUrls = await UploadGallery(galleryFiles);
        const attributesJson = JSON.stringify(dataForm.attributes);
        setLoading(false);
        const finalValues = {
            ...dataForm,
            image_product: imageUrl,
            gallery_product: galleryUrls,
            attributes: attributesJson,
        };
        let dataClient = {
            dataBody: finalValues
        }
        if (mode) {
            const data_edit = {
                ...finalValues,
                image_product: data_one_item?.data?.product?.image_product ? data_one_item?.data?.product?.image_product : imageUrl,
                gallery_product:data_one_item?.data?.product?.gallery_product ? data_one_item?.data?.product?.gallery_product :  galleryUrls,
            }
            dataClient = {
                dataBody: data_edit,
                id_item: id
            }
        }
        mutate(dataClient);
    }
    if (status_api === 'call_ok') {
        routing('/admin/products')
    }
    return {
        onSubmit,
        isPending,
        isError,
        data_one_item,
        handleImageChange,
        handleGalleryChange,
        loading,
    }
}

export default useForm