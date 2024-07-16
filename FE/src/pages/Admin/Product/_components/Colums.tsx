"use client"

import { ColumnDef } from "@tanstack/react-table"
import { IProduct } from "../../../../common/interfaces/Product"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.


export const columns: ColumnDef<IProduct>[] = [

    {
        accessorKey: "image_product",
        header: "Ảnh sản phẩm",
        cell: ({ row }) => (
            <img src={row.original.image_product} alt={row.original.name_product} className="w-16 h-16 object-cover" />
        )
    },
    {
        accessorKey: "name_product",
        header: "Tên sản phẩm",
    },
    {
        accessorKey: "price_product",
        header: "Giá sản phẩm",
    },
    {
        accessorKey: "description_product",
        header: "Mô tả sản phẩm",
    },
    {
        accessorKey: "createdAt",
        header: "Ngày tạo",
    },
    {
        accessorKey: "updatedAt",
        header: "Ngày chỉnh sửa",
    },

]
