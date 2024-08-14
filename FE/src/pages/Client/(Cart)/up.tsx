import React from 'react';
import { Mutation_Cart } from '../../../common/hooks/Cart/mutation_Carts';
import useLocalStorage from '../../../common/hooks/Storage/useStorage';
import { Button } from 'antd';
import {toast} from 'react-toastify'
const Up_btn = ({ dataProps }: any) => {
    const [user] = useLocalStorage("user", {});
    const account = user?.user;
    const { mutate } = Mutation_Cart('UP');
    function up() {
        const data = {
            userId: account,
            productId: dataProps?.id_item,
            color: dataProps?.color,
            size: dataProps?.size
        }
        if (dataProps?.quantity_item?.quantity >= dataProps?.quantity_item?.quantity_attr) {
            toast.error('Vượt quá số lượng sản phẩm!', {autoClose : 500})
        } else {
            mutate(data)
        }
    }

    return (
        <Button onClick={up}> + </Button>
    )
}

export default Up_btn