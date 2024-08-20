import { useNavigate, useParams } from "react-router-dom";
import { Mutation_items } from "../Products/mutation_item"
import { Query_Products } from "../Products/Products";
import { useEffect, useState } from "react";
import { UploadGallery, UploadImage } from "../../../systems/utils/uploadImage";

const useForm = ({ mode }: { mode?: string }) => {
    const routing = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const { id } = useParams<{ id: string }>()
    const [imageFile, setImageFile] = useState<any>();
    const [galleryFiles, setGalleryFiles] = useState<[string]>();
    const [new_galleryFiles, setNew_GalleryFiles] = useState<any>();
    let data_one_item: any;
    if (id) {
        data_one_item = Query_Products(id);
    }
    useEffect(() => {
        if (mode) {
            setImageFile(data_one_item?.data?.product?.image_product)
            setNew_GalleryFiles(data_one_item?.data?.product?.gallery_product)
        }
    }, [mode, data_one_item?.data?.product?.image_product, data_one_item?.data?.product?.gallery_product]);
    const { mutate, isPending, isError, status_api } = Mutation_items(mode ? 'EDIT' : 'CREATE');
    const handleImageChange = (imageItem: any) => {
        setImageFile(imageItem?.fileList?.map((file: any) => file.originFileObj));
    };
    const handleGalleryChange = ({ fileList }: any) => {
        const new_img = fileList?.filter((item: any) => (typeof item?.uid !== 'number'));
        setGalleryFiles(new_img?.map((file: any) => file.originFileObj));
        const uri_img = fileList?.filter((item: any) => (typeof item?.uid === 'number'));
        for (const i of uri_img) {
            setNew_GalleryFiles([i?.url])
        }
    };
    async function onSubmit(dataForm: any) {
        setLoading(true);
        const imageUrl = mode ? await UploadImage(imageFile[0]) : await UploadImage(imageFile[0]);
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
            let a = [
                ...new_galleryFiles,
            ];
            if (galleryUrls) {
                a = [
                    ...new_galleryFiles,
                    ...galleryUrls
                ]
            } 
            const data_edit = {
                ...finalValues,
                image_product: imageUrl,
                gallery_product: a,
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