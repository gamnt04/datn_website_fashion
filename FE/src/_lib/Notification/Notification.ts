import instance from "../../configs/axios";

export const Get_Notification = async () => {
    try {
        const { data } = await instance.get('/notification');
        return data;
    } catch (error) {
        console.log(error);
    }
}