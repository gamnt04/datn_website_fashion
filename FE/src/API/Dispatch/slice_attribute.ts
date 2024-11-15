/* eslint-disable @typescript-eslint/no-explicit-any */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { lay_1_the_loai_thuoc_tinh, lay_1_thuoc_tinh, lay_the_loai_thuoc_tinh, lay_thuoc_tinh, sua_the_loai_thuoc_tinh, sua_thuoc_tinh, tao_the_loai_thuoc_tinh, tao_thuoc_tinh, xoa_the_loai_thuoc_tinh, xoa_thuoc_tinh } from "../services/attribute"

export function Lay_the_loai_thuoc_tinh(data_request: any) {
    const key = ['KEY_category_Attribute', data_request]
    const { data, ...rest } = useQuery({
        queryKey: key,
        queryFn: async () => data_request?.id_thuoc_tinh ? await lay_1_the_loai_thuoc_tinh(data_request) : await lay_the_loai_thuoc_tinh(data_request),
        enabled: !!data_request
    });

    return { data, ...rest }
}


export function Dispatch_the_loai_thuoc_tinh(action: 'CREATED' | 'EDIT' | 'REMOVE') {
    const queryClient = useQueryClient();
    const { mutate, ...rest } = useMutation({
        mutationFn: async (data_request: any) => {
            switch (action) {
                case 'CREATED':
                    return await tao_the_loai_thuoc_tinh(data_request);
                case 'REMOVE':
                    return await xoa_the_loai_thuoc_tinh(data_request);
                case 'EDIT':
                    return await sua_the_loai_thuoc_tinh(data_request);
                default: return
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['KEY_category_Attribute']
            })
        },
        onError: (res) => res
    });
    return { mutate, ...rest }
}


export function Lay_thuoc_tinh(data_request: any) {
    const key = ['KEY_Attribute', data_request]
    const { data, ...rest } = useQuery({
        queryKey: key,
        queryFn: async () => data_request?.id_thuoc_tinh ? await lay_1_thuoc_tinh(data_request) : await lay_thuoc_tinh(data_request),
        enabled: !!data_request
    });

    return { data, ...rest }
}

export function Dispatch_thuoc_tinh(action: 'CREATED' | 'EDIT' | 'UPDATE') {
    const queryClient = useQueryClient();
    const { mutate, ...rest } = useMutation({
        mutationFn: async (data_request: any) => {
            switch (action) {
                case 'CREATED':
                    return await tao_thuoc_tinh(data_request);
                case 'EDIT':
                    return await sua_thuoc_tinh(data_request);
                case 'UPDATE':
                    return await xoa_thuoc_tinh(data_request);
                default: return
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['KEY_Attribute']
            })
        },
        onError: (res) => res
    });
    return { mutate, ...rest }
}