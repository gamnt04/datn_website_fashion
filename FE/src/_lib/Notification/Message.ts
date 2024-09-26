import instance from "../../configs/axios";

export const add_Notification = async (dataMessage: {
  userId: string | number;
  receiver_id: string | number;
  message: string | number;
  different?: string | number;
}) => {
  try {
    const res = await instance.post(`/notification`, dataMessage);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const get_Notification_By_User = async (userId: string | number) => {
<<<<<<< HEAD
  try {
    const { data } = await instance.get(`/notification/${userId}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const getAll_Notification = async () => {
  try {
    const { data } = await instance.get(`/notification`);
    console.log(data);

    return data;
  } catch (error) {
    console.log(error);
  }
};
=======
    try {
        const { data } = await instance.get(`/notification/${userId}`);
        return data;
    } catch (error) {
        console.log(error);
    }
}
export const getAll_Notification = async (role: string) => {
    try {
        const { data } = await instance.get(`/notification`, { params: { role } });
        return data;
    } catch (error) {
        console.log(error);
    }
}
>>>>>>> 383b071ecc5dafac8a5df1eccd334852f438a9b5
