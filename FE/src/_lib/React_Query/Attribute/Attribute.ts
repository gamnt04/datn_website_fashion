import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { create_attribute, get_attribute, update_attribute } from "../../Items/Attribute";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema_validate_attribute } from "../../Validates/attribute";

export function useQueryAttribute(id: any) {
    const { data, ...rest } = useQuery({
        queryKey: ['key_attribute', id],
        queryFn: () => get_attribute(id),
        enabled: !!id
    });
    return { data, ...rest }
}

export function useMutationAttribute(action: 'Add' | 'Edit') {
    const queryClient = useQueryClient();
    const myForm = useForm({
        resolver: yupResolver(schema_validate_attribute)
    })
    const { mutate, ...rest } = useMutation({
        mutationFn: async (requestData: any) => {
            switch (action) {
                case 'Add':
                    return await create_attribute(requestData);
                case 'Edit':
                    return await update_attribute(requestData);
                default: return;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['key_attribute']
            })
        },
    })
    const errors = myForm.formState.errors
    return { mutate, myForm, errors, ...rest }
}