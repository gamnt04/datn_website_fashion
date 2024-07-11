import instance from "../../configs/axios";


export const list_Auth = async () => {
  try {
    const data = await instance.get(`auths`);

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const SignIn = async (user: any) => {
  try {
    const { data } = await instance.post(`auth/signin`, user);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const SignUp = async (user: any) => {
  try {
    const { data } = await instance.post(`auth/signup`, user);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const SignOut = async () => {
  try {
    const { data } = await instance.post(`auth/signout`);
    return data
  }catch (error) {
    console.log(error);
  }

export const list_Auth_By_Id = async (id: number) => {
  try {
    const data = await instance.get(`auths/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
