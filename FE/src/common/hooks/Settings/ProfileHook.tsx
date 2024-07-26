import React, { useState, useEffect, useRef } from "react";
import type { FormProps } from "antd";
import { message } from "antd";
import dayjs from "dayjs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import instance from "../../../configs/axios";
import useLocalStorage from "../../../common/hooks/Storage/useStorage";
import { FieldType } from "../../../pages/Client/Profile/Profile";

const ProfileHook = () => {
  const queryClient = useQueryClient();
  const [messageApi, contextHolder] = message.useMessage();
  const [user] = useLocalStorage("user", {});
  const userId = user?.user?._id;
  const [initialValues, setInitialValues] = useState<FieldType>({});
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [isSaving, setIsSaving] = useState<boolean>(false); // Trạng thái lưu
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data, isLoading, isPending, isError, error } = useQuery({
    queryKey: ["user", userId],
    queryFn: async () => {
      const { data } = await instance.get(`/auth/${userId}`);
      if (data.birthDate) {
        data.birthDate = dayjs(data.birthDate).format("YYYY-MM-DD"); // Chuyển đổi ngày tháng thành định dạng YYYY-MM-DD
      }
      return data;
    }
  });

  useEffect(() => {
    if (data) {
      setAvatarUrl(data.avatar || ""); // Cập nhật avatarUrl khi dữ liệu được tải về
    }
  }, [data]);

  const { mutate } = useMutation({
    mutationFn: async (newUser) => {
      setIsSaving(true); // Bắt đầu lưu
      const { data } = await instance.put(`/auth/${userId}`, newUser);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"]
      });
      messageApi.open({
        type: "success",
        content: "Cập nhật thông tin thành công"
      });
      setIsSaving(false); // Kết thúc lưu
      setIsChanged(false); // Đặt lại trạng thái thay đổi
    },
    onError: () => {
      setIsSaving(false); // Kết thúc lưu nếu có lỗi
    }
  });

  const handleValuesChange = (changedValues: FieldType) => {
    setIsChanged(
      JSON.stringify(changedValues) !== JSON.stringify(initialValues)
    );
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarUrl(url);
    }
  };

  return {
    contextHolder,
    setInitialValues,
    isChanged,
    isSaving,
    fileInputRef,
    isLoading,
    isPending,
    isError,
    error,
    avatarUrl,
    handleValuesChange,
    handleFileChange,
    mutate,
    data
  };
};

export default ProfileHook;
