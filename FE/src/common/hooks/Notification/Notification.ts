import { useQuery } from "@tanstack/react-query";
import { Get_Notification } from "../../../_lib/Notification/Notification";


export const useNotification = () => {
    const { data, ...rest } = useQuery({
        queryKey: ["Notification"],
        queryFn: async () => {
            try {
                return await Get_Notification();
            } catch (error) {
                throw new Error((error as any).message);
            }
        }
    });
    return { data, ...rest };
}