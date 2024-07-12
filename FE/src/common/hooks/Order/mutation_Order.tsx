import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Update_Status } from "../../../services/orderProduct";

type Action = "UPDATE" | "CANCEL";

export function Mutation_Order(action: Action) {
    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: async (id: string) => {
            switch (action) {
                case "UPDATE":
                    // Gọi hàm Update_Status để cập nhật trạng thái
                    return await Update_Status(id);
                default:
                    return;
            }
        },
        onSuccess: () => {
            // Sau khi thành công, làm mới cache để hiển thị lại dữ liệu mới
            queryClient.invalidateQueries({
                queryKey: ['Order_key']  // Thay 'Order_key' bằng key của query bạn muốn làm mới
            });
            alert("Cập nhật thành công");
        },
        onError: () => {
            alert("Cập nhật thất bại");
        }
    }
    );
    const on_Submit = (data: any) => {
        // Gọi mutate để bắt đầu thực hiện mutation
        mutate(data);
    };

    return { on_Submit };
}
