import { useEffect, useState } from "react";
import Canceled from "../Canceled/Canceled";
import Complete from "../Complete/Complete";
import WaitingForDelivery from "../WaitingForDelivery/WaitingForDelivery";
import Waitforconfirmation from "../Waitforconfirmation/Waitforconfirmation";
import WaitingForGoods from "../WaitingForGoods/WaitingForGoods";
import useLocalStorage from "../../../../common/hooks/Storage/useStorage";
import { List_One_Order_User } from "../../../../common/hooks/Order/querry_Order";
import Order_All from "../Order_All/Order_All";

interface Order {
  status: string;
  // Thêm các thuộc tính khác của đơn hàng nếu có
}

const Order_Menu: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<string>("Tất Cả");
  const [user] = useLocalStorage("user", {});
  const userId = user?.user?._id;
  const { data, refetch } = List_One_Order_User(userId);

  const handleMenuClick = (menu: string) => {
    setActiveMenu(menu);
  };

  useEffect(() => {
    refetch();
  }, [userId]);

  const filterOrder = (status: string) =>
    data?.filter((orders: Order) => orders.status === status);

  const orderCounts: Record<string, number> = {
    "Chờ Xác Nhận": filterOrder("1")?.length || 0,
    "Đang Chuẩn Bị Hàng": filterOrder("2")?.length || 0,
    "Đang Vận Chuyển": filterOrder("3")?.length || 0,
    "Hoàn Thành": filterOrder("4")?.length || 0,
    "Đã Hủy": filterOrder("5")?.length || 0,
    "Tất Cả": data?.length || 0,
  };

  const menuItems = [
    "Tất Cả",
    "Chờ Xác Nhận",
    "Đang Chuẩn Bị Hàng",
    "Đang Vận Chuyển",
    "Hoàn Thành",
    "Đã Hủy",
  ];

  return (
    <>
      <ul className="hidden_scroll-x_trendingproducts overflow-x-scroll flex items-center justify-between gap-3 *:whitespace-nowrap lg:text-sm text-xs">
        {menuItems.map((menu) => (
          <li
            key={menu}
            className={`px-3 py-3 hover:border-b-2 hover:border-yellow-400
                        ${
                          activeMenu === menu
                            ? "border-b-2 border-yellow-400"
                            : ""
                        }`}
            onClick={() => handleMenuClick(menu)}
          >
            <a href="#">
              {menu} ({orderCounts[menu]})
            </a>
          </li>
        ))}
      </ul>
      <div>
        {activeMenu === "Chờ Xác Nhận" && (
          <Waitforconfirmation dataProps={filterOrder("1")} />
        )}
        {activeMenu === "Đang Chuẩn Bị Hàng" && (
          <WaitingForGoods dataProps={filterOrder("2")} />
        )}
        {activeMenu === "Đang Vận Chuyển" && (
          <WaitingForDelivery dataProps={filterOrder("3")} />
        )}
        {activeMenu === "Đã Hủy" && <Canceled dataProps={filterOrder("5")} />}
        {activeMenu === "Hoàn Thành" && (
          <Complete dataProps={filterOrder("4")} />
        )}
        {activeMenu === "Tất Cả" && <Order_All data={data || []} />}
      </div>
    </>
  );
};

export default Order_Menu;
