import React from 'react';
import { Mutation_Cart } from '../../../common/hooks/Cart/mutation_Carts';
import useLocalStorage from '../../../common/hooks/Storage/useStorage';

const Up_btn = ({ dataProps }: any) => {
    const [user] = useLocalStorage("user", {});
    const account = user?.user;
    const { mutate } = Mutation_Cart('UP');
    function up() {
        const data = {
            userId : account,
            productId :  dataProps
        }
        mutate(data)
    }

    return (
        <button onClick={up}>
            <strong
                className="font-medium"
            >
                +
            </strong>
        </button>
    )
}

export default Up_btn