import instance from "../../configs/axios";

export const add_Notification = async (dataMessage: { userId: string | number, receiver_id: string | number, message: any }) => {
    try {
        const res = await instance.post(`/notification`, dataMessage);
        console.log(res)
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const get_Notification_By_User = async (userId: string | number) => {
    try {
        const { data } = await instance.get(`/notification/${userId}`);
        return data;
    } catch (error) {
        console.log(error);
    }
}