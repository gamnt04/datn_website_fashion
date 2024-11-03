// hooks/useVoucherHandlers.ts
import { useState } from "react";
import { FormInstance } from "antd";
import { ICategory } from "../../../../common/interfaces/Category";

interface VoucherHandlersProps {
  form: FormInstance;
  products: any[];
  categories: ICategory[];
  auth: any;
}

export const useVoucherHandlers = ({
  form,
  products,
  categories,
  auth,
}: VoucherHandlersProps) => {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [userType, setUserType] = useState<string[]>([]);
  const [applyType, setApplyType] = useState<string>("");
  const [limitType, setLimitType] = useState<string[]>([]);
  const [discountType, setdiscountType] = useState<string>("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");

  const visibleCategories =
    categories?.filter((category) => category.published) || [];

  const generateRandomCode = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let randomCode = "";
    for (let i = 0; i < 8; i++) {
      randomCode += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    form.setFieldsValue({ code_voucher: randomCode });
  };

  const handleSelectChange = (value: string[]) => {
    if (value.includes("all")) {
      const allUserIds = auth?.data.map((user: any) => user._id);
      setSelectedUsers(allUserIds);
    } else {
      setSelectedUsers(value);
    }
  };

  const onApplyTypeChange = (value: string) => {
    // Reset các trường input khi áp dụng giảm giá thay đổi
    if (value !== "product") {
      setSelectedItems([]);
      form.setFieldsValue({ appliedProducts: [] });
    }
    if (value !== "total") {
      form.setFieldsValue({ minimumSpend: null });
    }
    setApplyType(value);
  };

  const onLimitTypeChange = (value: string[]) => {
    setLimitType(value);
    // Reset các trường input khi checkbox bị bỏ chọn
    if (!value.includes("time")) {
      form.setFieldsValue({ startDate: null, expirationDate: null });
    }
    if (!value.includes("quantity")) {
      form.setFieldsValue({ quantity_voucher: null });
    }
  };

  const ondiscountTypeChange = (value: string) => {
    setdiscountType(value);
  };

  const handleCheckboxChange = (productId: string) => {
    setSelectedItems((prevSelected) => {
      if (prevSelected.includes(productId)) {
        return prevSelected.filter((id) => id !== productId);
      } else {
        return [...prevSelected, productId];
      }
    });
  };

  const handleSelect = (value: string[]) => {
    setSelectedItems(value);
    form.setFieldsValue({ appliedProducts: value });
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(categoryId)) {
        const newSelected = prev.filter((id) => id !== categoryId);
        const productsInCategory = products
          .filter((product) => product.category_id === categoryId)
          .map((p) => p._id);
        setSelectedItems((prev) =>
          prev.filter((id) => !productsInCategory.includes(id))
        );
        return newSelected;
      } else {
        const productsInCategory = products
          .filter((product) => product.category_id === categoryId)
          .map((p) => p._id);
        setSelectedItems((prev) => [
          ...new Set([...prev, ...productsInCategory]),
        ]);
        return [...prev, categoryId];
      }
    });
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    if (checked) {
      const allProducts = products.map((product) => product._id);
      setSelectedItems(allProducts);
      setSelectedCategories(visibleCategories.map((cat) => cat._id));
    } else {
      setSelectedItems([]);
      setSelectedCategories([]);
    }
  };

  const filteredProducts = products?.filter((product) =>
    product.name_product.toLowerCase().includes(searchText.toLowerCase())
  );

  const filteredCategories = visibleCategories.filter((category) => {
    const productsInCategory = filteredProducts?.some(
      (product) => product.category_id === category._id
    );
    return productsInCategory;
  });

  return {
    // States
    selectedUsers,
    userType,
    applyType,
    limitType,
    discountType,
    selectedItems,
    selectedCategories,
    selectAll,
    searchText,
    setLimitType,
    setdiscountType,
    setSelectedUsers,
    setApplyType,
    setSelectedItems,

    // Handlers
    generateRandomCode,
    setSearchText,
    handleSelectChange,
    onApplyTypeChange,
    onLimitTypeChange,
    ondiscountTypeChange,
    handleCheckboxChange,
    handleSelect,
    handleCategoryChange,
    handleSelectAll,

    // Computed values
    filteredProducts,
    filteredCategories,
  };
};
