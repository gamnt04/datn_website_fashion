/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "antd";
import { toast } from "react-toastify";
import { Mutation_Cart } from "../../../../common/hooks/Cart/mutation_Carts";
import useLocalStorage from "../../../../common/hooks/Storage/useStorage";
import { useState } from "react";

const Up_btn = ({ dataProps }: any) => {
  const [user] = useLocalStorage("user", {});
  const [loading, setLoading] = useState<boolean>(false);
  const account = user?.user;
  const { mutate, isLoading } = Mutation_Cart("UP");

  const up = () => {
    setLoading(true);
    setTimeout(() => {
      let quantity_attr: number = 0;

      if (dataProps?.id_item?.attributes) {
        const x = dataProps?.id_item?.attributes?.values?.find(
          (a: any) => a?.color?.toString() === dataProps?.color?.toString()
        );
        const y = x?.size?.find(
          (b: any) => b?.name_size?.toString() === dataProps?.size?.toString()
        );
        if (x && y) {
          quantity_attr = y?.stock_attribute;
        }
      } else {
        quantity_attr = dataProps?.id_item?.stock;
      }

      const data = {
        userId: account,
        productId: dataProps?.id_item,
        color: dataProps?.color,
        size: dataProps?.size
      };

      if (dataProps?.quantity_item >= quantity_attr) {
        toast.error("Vượt quá số lượng sản phẩm!", { autoClose: 500 });
      } else {
        mutate(data);
      }
      setLoading(false);
    }, 500);
  };

  return (
    <Button
      onClick={up}
      className={isLoading || loading ? "opacity-75" : ""}
      disabled={isLoading || loading}
    >
      +
    </Button>
  );
};

export default Up_btn;
