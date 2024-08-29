import instance from "../../configs/axios";

export const message = async (dataMessage: { id: any, receiver_id: any, message: any }) => {
    try {
        const res = await instance.post(`/orders`, dataMessage)
        return res;
    } catch (error) {
        console.log(error);
    }
};