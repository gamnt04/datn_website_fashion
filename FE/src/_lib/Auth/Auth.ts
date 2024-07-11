import instance from "../../configs/axios";

export const list_Auth = async () => {
  try {
    const data = await instance.get(`auths`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const list_Auth_By_Id = async (userId: string) => {
  try {
    const data = await instance.get(`/auth/${userId}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
