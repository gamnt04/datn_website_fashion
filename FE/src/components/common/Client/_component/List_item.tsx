import { IProduct } from '../../../../common/interfaces/Product'
import Products from '../../Items/Products'

const List_item = ({dataProps} : any) => {
    return (
        <div className="mb-[50px] w-auto">
            <div className={`grid gap-5 ${dataProps?.style} grid-cols-2`}>
                {
                    dataProps?.data?.map((item: IProduct) => {
                        return (<Products key={item._id} items={item} />)
                    })
                }
            </div>
        </div>
    )
}

export default List_item