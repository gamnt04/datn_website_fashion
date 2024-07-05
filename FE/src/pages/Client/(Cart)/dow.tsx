import React from 'react'
import { Mutation_Cart } from '../../../common/hooks/Cart/mutation_Carts';
import useLocalStorage from '../../../common/hooks/Storage/useStorage';

const Dow_btn = ({ dataProps }: any) => {
    const [user] = useLocalStorage("user", {});
    const account = user?.user;
    const { mutate } = Mutation_Cart('DOW');
    function dow() {
        if (dataProps.quantity_item === 1) {
            if (window.confirm('Xac nhan xoa san pham ?')) {
                const data = {
                    userId: account,
                    productId: dataProps.id_item
                }
                mutate(data)
            }
        } if (dataProps.quantity_item > 1) {
            const data = {
                userId: account,
                productId: dataProps.id_item
            }
            mutate(data)
        }
    }
    return (
        <button onClick={dow}>
            <strong
                className="font-medium"
            >
                -
            </strong>
        </button>
    )
}

export default Dow_btn