import { List_Cart } from "../../../common/hooks/Cart/querry_Cart";
import useLocalStorage from "../../../common/hooks/Storage/useStorage";
import Dow_btn from "./dow";
import Up_btn from "./up";
import { Mutation_Cart } from "../../../common/hooks/Cart/mutation_Carts";
import ScrollTop from "../../../common/hooks/Customers/ScrollTop";
import { Link } from "react-router-dom";
import { Pay_Mutation } from "../../../common/hooks/Pay/mutation_Pay";
import { useState } from "react";
import { Button, Checkbox, Input, message, Popconfirm, Table, TableProps } from "antd"
import { DeleteOutlined } from "@ant-design/icons";
interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}
const ListCart = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const [user] = useLocalStorage("user", {});
  const userId = user?.user?._id;
  const { data, isPending, isError, calculateTotal, calculateTotalProduct } = List_Cart(userId);
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const { mutate: removeSingle } = Mutation_Cart("REMOVE");
  const { mutate: removeMultiple } = Mutation_Cart("REMOVE_MULTIPLE");

  const remove_item = (id: number | string) => {
    const data_item = {
      userId: userId,
      productId: id,
    };
    removeSingle(data_item);
    messageApi.open({
      type: "success",
      content: "Xóa thành công",
    })

  };
  const handleRemoveMultiple = () => {
    const product_item = {
      userId: userId,
      productIds: selectedProductIds
    };
    removeMultiple(product_item);
    messageApi.open({
      type: "success",
      content: "Xóa thành công",
    })

  };
  const handleCheckboxChange = (productId: string) => {
    if (selectedProductIds.includes(productId)) {
      setSelectedProductIds(
        selectedProductIds.filter((id) => id !== productId)
      );
    } else {
      setSelectedProductIds([...selectedProductIds, productId]);
    }
  };
  const dataSort = data?.products?.map((product: any) => ({
    key: product?.productId,
    ...product
  }))
  const columns: TableProps<DataType>['columns'] = [
    {
      key: "checkbox",
      dataIndex: "checkbox",
      render: (_: any, product: any) => {
        return (
          <Checkbox onChange={() =>
            handleCheckboxChange(product?.productId)
          }></Checkbox>
        )
      }
    },
    {
      key: "image",
      dataIndex: "image",
      render: (_: any, product: any) => {
        return <>
          <img src={product?.image} className="w-[100px] h-[80px] object-cover" alt="" />
        </>
      }
    },
    {
      title: 'Sản phẩm',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Đơn giá',
      dataIndex: 'price',
      key: 'price',
      render: (_: any, product: any) => {
        return <div>
          {product?.price.toLocaleString('vi', { style: 'currency', currency: 'VND' })}
        </div>
      }
    },
    {
      key: "quantity",
      title: "Số lượng",
      dataIndex: "quantity",
      render: (_: any, product: any) => {
        return <div className="flex space-x-2">
          <Dow_btn
            dataProps={{
              id_item: product?.productId,
              quantity_item: product?.quantity,
            }}
          />
          <Input value={product?.quantity} className="w-[40px] text-center" />
          <Up_btn dataProps={product?.productId} />
        </div>
      }
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (_: any, product: any) => {
        return <div>
          {(product?.price * product?.quantity).toLocaleString('vi', { style: 'currency', currency: 'VND' })}
        </div>
      }
    },
    {
      key: "action",
      dataIndex: "action",
      render: (_: any, product: any) => {
        return <div className="flex justify-center space-x-2">
          <Popconfirm
            title="Xóa sản phẩm khỏi giỏ hàng?"
            description="Bạn có chắc chắn muốn xóa không?"
            onConfirm={() => remove_item(product?.productId)}
            // onCancel={cancel}
            okText="Có"
            cancelText="Không"
          >
            <DeleteOutlined style={{ fontSize: '24px' }} />
          </Popconfirm>

        </div>
      }
    },

  ];
  const { calcuateTotal } = Pay_Mutation();
  if (isPending) return <p>Loading...</p>;
  if (isError) return <p>Error...</p>;
  return (
    <div className="w-[95%] mx-[2.5%] mt-[110px]">
      {contextHolder}
      <div className="flex items-center border bg-gray-100 h-20 p-4">
        <ul className="flex gap-2">
          <li className="text-red-500">
            <a href="#">Home</a>
          </li>
          <li> / </li>
          <li>
            <a href="#">Cart</a>
          </li>
        </ul>
      </div>
      <>
        {!data?.products || data?.products.length === 0 ? (
          <div className="w-full md:mt-10 h-auto flex mb:flex-col md:flex-row gap-x-[5%] my-[30px] mb:gap-y-[30px] md:gap-y-0">
            <div className="w-full h-[200px] flex flex-col justify-center items-center">
              <img
                src="../../src/assets/Images/Products/no_products.png"
                className="w-44 h-40"
                alt=""
              />
              <p>Chưa có sản phẩm nào</p>
            </div>
          </div>
        ) : (
          <div className="w-full md:mt-10 h-auto flex mb:flex-col md:flex-row gap-x-[5%] my-[30px] mb:gap-y-[30px] md:gap-y-0">
            <div className="md:w-[70%] mb:w-full *:w-full">
              <Popconfirm
                title="Xóa sản phẩm khỏi giỏ hàng?"
                description="Bạn có chắc chắn muốn xóa không?"
                onConfirm={() => handleRemoveMultiple()}
                // onCancel={cancel}
                okText="Có"
                cancelText="Không"
              >
                <DeleteOutlined style={{ fontSize: '24px' }} />
              </Popconfirm>
              {/* <Button onClick={handleRemoveMultiple} danger> Xóa tất cả</Button> */}
              <Table columns={columns} dataSource={dataSort} />
            </div>

            <div className="md:w-[27%] bg-white flex flex-col shadow-sm text-sm text-black">
              <div className="w-full h-full flex flex-col lg:p-6 mb:p-4 border rounded-lg">
                <div className="flex justify-between *:md:text-base *:mb:text-sm *:font-medium">
                  <strong>Tổng giá trị đơn hàng</strong>
                  <p className="font-bold text-xl text-yellow-500">
                    {calcuateTotal().toLocaleString("vi", {
                      style: "currency",
                      currency: "VND"
                    })}
                  </p>
                </div>
                <div className="flex justify-between mt-4 *:md:text-base *:mb:text-sm *:font-medium">
                  <strong>Số lượng đơn hàng :</strong>
                  <strong>{calculateTotalProduct()}</strong>
                </div>
                <div className="flex flex-col border-y py-5 my-5">
                  <span className="text-xs mb-2">Nhập mã giảm giá</span>
                  <form className="border-2 md:h-[45px] mb:h-[35px] border-black rounded overflow-hidden grid grid-cols-[70%_30%] auto-row-full mb-5">
                    <input
                      className="px-4 outline-none"
                      type="text"
                      placeholder="Enter Code"
                    />
                    <button className="grid place-items-center bg-black text-gray-100 md:text-base mb:text-sm">
                      Apply
                    </button>
                  </form>
                </div>
                <div className="flex justify-between *:md:text-base *:mb:text-sm *:font-medium">
                  <strong>Cần thanh toán :</strong>
                  <strong>
                    {calculateTotal().toLocaleString("vi", {
                      style: "currency",
                      currency: "VND"
                    })}
                  </strong>
                </div>
                <Link onClick={ScrollTop} to="pay">
                  <button className="px-4 py-3 mt-4 mr-5 duration-200 text-white font-semibold bg-black hover:bg-white hover:text-black border border-black rounded focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50">
                    Tiến hành thanh toán
                  </button>
                </Link>

              </div>
            </div>
          </div>
        )}
      </>
      {/* check account */}
      {/* <div className="w-full md:mt-10 h-auto flex mb:flex-col md:flex-row gap-x-[5%] my-[30px] mb:gap-y-[30px] md:gap-y-0">
        <span>Please log in to your account</span>
      </div> */}
    </div >
  );
};

export default ListCart;
