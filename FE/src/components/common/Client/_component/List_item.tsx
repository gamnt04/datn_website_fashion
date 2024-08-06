import { IProduct } from "../../../../common/interfaces/Product";
import Products from "../../Items/Products";

const List_item = ({ dataProps }: any) => {
  return (
    <div className="mx-auto mb-[50px] w-[1330px] ">
      <div className={`grid ${dataProps?.style} grid-cols-2 gap-8 `}>
        {dataProps?.data?.map((item: IProduct) => {
          return <Products key={item._id} items={item} />;
        })}
      </div>
    </div>
  );
};

export default List_item;
