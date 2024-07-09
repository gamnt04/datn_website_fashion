import instance from "../../configs/axios";

export const list_Auth = async () => {
  try {
    const data = await instance.get(`auths`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const list_Auth_By_Id = async (id: number) => {
  try {
    const data = await instance.get(`auths/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
