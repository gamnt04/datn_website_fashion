// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { Update_Status } from "../../../services/orderProduct";

// type Action = "UPDATE" | "CANCEL"
// export function Mutation_Order(action: Action) {
//     const queryClient = useQueryClient();

//     const { mutate } = useMutation({
//         mutationFn: async (id: string) => {
//             switch (action) {
//                 case "UPDATE":
//                     return await Update_Status(id);
//                 default: return;
//             }
//         },
//         onSuccess: () => {
//             queryClient.invalidateQueries({
//                 queryKey: ['Order_key']
//             })
//             alert("Cập nhật thành công")
//         },
//         onError: () => {
//             alert("Cập nhật thất bại")
//         }

//     })
//     const on_Submit = (data: any) => {
//         console.log(data);

//         mutate(data);
//     }
//     return { on_Submit }
// }