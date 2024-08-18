import instance from "../../configs/axios"

export async function list_order(dataClient: any) {
    try {
        let uri = `/list_order/${dataClient?.id_user}?_page=${dataClient?.page}&_limit=${dataClient?.limit}`;
        if (dataClient?.status){
            uri += `&_status=${dataClient?.status}`
        }
        const { data } = await instance.get(uri);
        return data
    } catch (error) {
        return error
    }
}