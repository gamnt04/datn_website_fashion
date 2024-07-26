import { Mutation_Cart } from '../../../common/hooks/Cart/mutation_Carts';
import useLocalStorage from '../../../common/hooks/Storage/useStorage';
import { Button } from 'antd';

const Dow_btn = ({ dataProps }: any) => {
    const [user] = useLocalStorage("user", {});
    const account = user?.user;
    const { mutate } = Mutation_Cart('DOW');
    function dow() {
        if (dataProps.quantity_item === 1) {
            if (window.confirm('Xac nhan xoa san pham ?')) {
                const data = {
                    userId: account,
                    productId: dataProps?.id_item,
                    color: dataProps?.color,
                    size: dataProps?.size
                }
                mutate(data)
            }
        } if (dataProps.quantity_item > 1) {
            const data = {
                userId: account,
                productId: dataProps?.id_item,
                color: dataProps?.color,
                size: dataProps?.size
            }
            mutate(data)
        }
    }
    return (
        <Button onClick={dow}> - </Button>
    )
}

export default Dow_btn