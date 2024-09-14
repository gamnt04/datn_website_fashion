import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { add_Notification, get_Notification_By_User, getAll_Notification } from "../../Notification/Message";

export function Query_notification(userId?: string | number) {
    const { data, ...rest } = useQuery({
        queryKey: userId ? ['Notification_Key', userId] : ['Notification_Key'],
        queryFn: async () => {
            return userId ? await get_Notification_By_User(userId) : await getAll_Notification();
        }
        // enabled: !!userId
    });
    console.log(data);

    return { data, ...rest }
}


type Action = 'Add' | 'Remove' | 'Send';
export function Mutation_Notification(action: Action) {
    const queryClient = useQueryClient();
    const { mutate, ...rest } = useMutation({
        mutationFn: async (dataBody: any) => {
            switch (action) {
                case 'Add':
                    return await add_Notification(dataBody);
                default: return null;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['Notification_Key']
            })
        },
        onError: (res) => res
    });
    return { mutate, ...rest }
}