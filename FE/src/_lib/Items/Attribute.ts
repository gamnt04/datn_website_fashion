import instance from "../../configs/axios";

export async function create_attribute(value: any) {
    try {
        const res = await instance.post('/create-attribute', value);
        return res
    } catch (error) {
        return error
    }
}

export async function get_attribute(id_account: string) {
    try {
        const res = await instance.get(`/get-attribute/${id_account}`);
        return res
    } catch (error) {
        return error
    }
}

export async function update_attribute(value: any) {
    try {
        const res = await instance.put(`/update-attribute/${value?._id}`, value);
        return res
    } catch (error) {
        return error
    }
}