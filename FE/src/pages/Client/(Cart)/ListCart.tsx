import { List_Cart } from "../../../common/hooks/Cart/querry_Cart";
import useLocalStorage from "../../../common/hooks/Storage/useStorage";
import Dow_btn from "./dow";
import Up_btn from "./up";
import { Mutation_Cart } from "../../../common/hooks/Cart/mutation_Carts";
import ScrollTop from "../../../common/hooks/Customers/ScrollTop";
import { Link, useNavigate } from "react-router-dom";
import {
  Checkbox,
  Input,
  message,
  Popconfirm,
  Table,
  TableProps,
  Spin,
} from "antd";
import { DeleteOutlined, LoadingOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";

interface DataType {
  key: string;
  name: string;
  price: number;
  quantity: number;
  totalPrice: number;
}

const ListCart = () => {
  const routing = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [user] = useLocalStorage("user", {});
  const userId = user?.user?._id;
  const { data, isPending, isError, error } = List_Cart(userId);
  const { mutate: removeSingle } = Mutation_Cart("REMOVE");
  const { mutate: removeMultiple } = Mutation_Cart("REMOVE_MULTIPLE");
  const { mutate: handle_status_checked } = Mutation_Cart(
    "HANLDE_STATUS_CHECKED"
  );
  const { mutate: updateQuantity } = Mutation_Cart("UPDATEQUANTITY");

  useEffect(() => {
    sessionStorage.setItem("totalPriceCart", JSON.stringify(data?.total_price));
  }, [data?.total_price]);

  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<number | null>(null);
  const remove_item = (item: any) => {
    const data_item = {
      userId: userId,
      id: item?._id,
    };
    removeSingle(data_item);
    messageApi.open({
      type: "success",
      content: "Xóa thành công",
    });
  };

  const handleRemoveMultiple = () => {
    const product_item = {
      userId: userId,
    };
    const data_cart = dataSort?.filter(
      (item: any) => item?.status_checked && item
    );
    if (data_cart.length === 0) {
      messageApi.open({
        type: "warning",
        content: "Vui lòng chọn sản phẩm trước khi thanh toán!",
      });
      return;
    }
    removeMultiple(product_item);
    messageApi.open({
      type: "success",
      content: "Xóa thành công",
    });
  };

  const handleCheckboxChange = (productId: string, color: any, size: any) => {
    const item_client = {
      userId: userId,
      productId: productId,
      color: color,
      size: size,
    };
    handle_status_checked(item_client);
  };

  const handleQuantityClick = (productId: string, quantity: number) => {
    setEditingProductId(productId);
    setInputValue(quantity);
  };

  const handleBlur = (product) => {
    if (inputValue !== product?.quantity) {
      updateQuantity({
        userId: userId,
        productId: product?._id,
        quantity: inputValue,
      });
    }

    setEditingProductId(null);
    setInputValue(null);
  };
  const dataSort = data?.products?.filter(
    (product: any) =>
      product?.productId?._id && {
        key: product?.productId?._id,
        ...product,
      }
  );

  const columns: TableProps<DataType>["columns"] = [
    {
      key: "checkbox",
      dataIndex: "checkbox",
      render: (_: any, product: any) => {
        return (
          <Checkbox
            checked={product?.status_checked}
            onChange={() =>
              handleCheckboxChange(
                product?.productId,
                product?.color_item,
                product?.name_size
              )
            }
          ></Checkbox>
        );
      },
    },
    {
      key: "image",
      title: "Ảnh",
      dataIndex: "image",
      render: (_: any, product: any) => {
        return (
          <Link to={`/shops/${product?.productId?._id}`}>
            <img
              src={product?.productId?.image_product}
              className="w-[100px] h-[80px] object-cover"
              alt=""
            />
          </Link>
        );
      },
    },
    {
      title: "Sản phẩm",
      dataIndex: "name",
      key: "name",
      render: (_: any, product: any) => (
        <>
          <Link
            to={`/shops/${product?.productId?._id}`}
            className="py-2 font-bold text-gray-900 hover:text-gray-900"
          >
            {product?.productId?.name_product}
          </Link>
          <p className="font-medium">
            {product?.color_item} - {product?.name_size}
          </p>
        </>
      ),
    },
    {
      title: "Đơn giá",
      dataIndex: "price",
      key: "price",
      render: (_: any, product: any) => {
        return (
          <div className="font-medium">
            {product?.price_item.toLocaleString("vi", {
              style: "currency",
              currency: "VND",
            })}
          </div>
        );
      },
    },
    {
      key: "quantity",
      title: "Số lượng",
      dataIndex: "quantity",
      render: (_: any, product: any) => {
        return (
          <div className="flex space-x-2">
            <Dow_btn
              dataProps={{
                id_item: product?.productId,
                quantity_item: product?.quantity,
                color: product?.color_item,
                size: product?.name_size,
              }}
            />
            {editingProductId === product?.productId ? (
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(Number(e.target.value))}
                onBlur={() => handleBlur(product?.productId)}
                className="px-0 text-center"
              />
            ) : (
              <Input
                value={product?.quantity}
                onClick={() =>
                  handleQuantityClick(product?.productId, product?.quantity)
                }
                className="px-0 text-center"
              />
            )}
            <Up_btn
              dataProps={{
                id_item: product?.productId,
                quantity_item: product,
                color: product?.color_item,
                size: product?.name_size,
              }}
            />
          </div>
        );
      },
    },
    {
      title: <span className="whitespace-nowrap">Tổng tiền</span>,
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (_: any, product: any) => {
        return (
          <div className="font-medium">
            {(product?.total_price_item).toLocaleString("vi", {
              style: "currency",
              currency: "VND",
            })}
          </div>
        );
      },
    },
    {
      key: "action",
      dataIndex: "action",
      render: (_: any, product: any) => {
        return (
          <div className="flex justify-center space-x-2 text-red-500">
            <Popconfirm
              title="Xóa sản phẩm khỏi giỏ hàng?"
              description="Bạn có chắc chắn muốn xóa không?"
              onConfirm={() => remove_item(product)}
              okText="Có"
              cancelText="Không"
            >
              <DeleteOutlined style={{ fontSize: "24px" }} />
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  // next order
  function next_order() {
    ScrollTop();
    const data_cart = dataSort?.filter(
      (item: any) => item?.status_checked && item
    );
    if (userId) {
      if (data_cart.length === 0) {
        messageApi.open({
          type: "warning",
          content: "Vui lòng chọn sản phẩm trước khi thanh toán!",
        });
        return;
      }
      const data_order = {
        id_user: userId,
        data_order: data_cart,
        totalPrice: data?.total_price,
        action: "data_cart",
        _id: data?._id,
      };
      sessionStorage.setItem("item_order", JSON.stringify(data_order));
      routing("/cart/pay");
    } else {
      routing("/login");
    }
  }

  if (isPending) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spin indicator={<LoadingOutlined spin />} size="large" />
      </div>
    );
  }

  if (isError) {
    return <p>{error.message}</p>;
  }

  return (
    <div className="max-w-[1440px] w-[95vw] mx-auto">
      <div className="w-[95%] mx-[2.5%] mt-[70px]">
        {contextHolder}
        <div className="text-sm py-6 bg-[#F3F3F3] font-medium px-[2.5%] rounded">
          <Link to={`/`} className="text-gray-500 hover:text-black">
            Trang chủ
          </Link>
          <span className="mx-1 text-gray-500">&#10148;</span>
          Giỏ hàng
        </div>
        <>
          <div className="w-full md:mt-10 h-auto flex mb:flex-col md:flex-row gap-x-[5%] my-[30px] mb:gap-y-[30px] md:gap-y-0">
            <div className="md:w-[70%] mb:w-full w-full">
              <Popconfirm
                className="text-red-500"
                title="Xóa sản phẩm khỏi giỏ hàng?"
                description="Bạn có chắc chắn muốn xóa không?"
                onConfirm={() => handleRemoveMultiple()}
                okText="Có"
                cancelText="Không"
              >
                <DeleteOutlined style={{ fontSize: "24px" }} />
              </Popconfirm>
              <Table
                columns={columns}
                dataSource={dataSort}
                pagination={false}
              />
            </div>

            <div className="md:w-[27%] bg-white flex flex-col shadow-sm text-sm text-black">
              <div className="flex flex-col w-full h-full border rounded-lg lg:p-6 mb:p-4">
                <div className="flex justify-between *:md:text-base *:mb:text-sm *:font-medium">
                  <strong>Tổng giá trị đơn hàng</strong>
                  <p className="text-xl font-bold text-yellow-500">
                    {data?.total_price?.toLocaleString("vi", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </p>
                </div>
                <div className="flex flex-col py-5 my-5 border-y">
                  <span className="mb-2 text-xs">Nhập mã giảm giá</span>
                  <form className="border-2 md:h-[45px] mb:h-[35px] border-black rounded overflow-hidden grid grid-cols-[70%_30%] auto-row-full mb-5">
                    <input
                      className="px-4 outline-none"
                      type="text"
                      placeholder="Enter Code"
                    />
                    <button className="grid text-gray-100 bg-black place-items-center md:text-base mb:text-sm">
                      Apply
                    </button>
                  </form>
                </div>
                <div className="flex justify-between *:md:text-base *:mb:text-sm *:font-medium">
                  <strong>Cần thanh toán :</strong>
                  <strong>
                    {data?.total_price?.toLocaleString("vi", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </strong>
                </div>
                <button
                  onClick={next_order}
                  className="px-4 py-3 mt-4 mr-5 font-semibold text-white duration-200 bg-black border border-black rounded hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
                >
                  Tiến hành thanh toán
                </button>
              </div>
            </div>
          </div>
        </>
      </div>
    </div>
  );
};

export default ListCart;
