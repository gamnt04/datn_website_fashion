/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState } from 'react';
import { SketchPicker } from 'react-color';
import List_data_attribute_catalog from './_component/page';
import { Get_AttributeCatalog_Seller } from '../../../../_lib/React_Query/Attribute/Attribute';
import { useSessionStorage, useLocalStorage } from '../../../../common/hooks/Storage/UseStorage_2';
import useFormAttributeCatalog from '../../../../common/hooks/Attributes/useHookForm_Attribute';
import { SelectContent, SelectGroup, SelectItem, SelectShadcn, SelectTrigger, SelectValue } from '../../../../components/ui_shadcn_customer/select';
import { Checkbox } from 'antd';


export default function PageAttribute() {
  const { isError, onSubmit, form_attributeCatalog } = useFormAttributeCatalog('CREATE_or_REMOVE_NAME_VARRIANT');
  const [statusChecked, setStatusChecked] = useState<any>(false);
  const [statusOptions, setStatusOptions] = useState<any>('');
  const [color, setColor] = useState<string>('');
  const [attributeCatalog, setAttributeCatalog] = useSessionStorage('attribute_catalog', []);
  const [user] = useLocalStorage('user', '');
  const { data, isLoading: loadingAttributeCatalog } = Get_AttributeCatalog_Seller(user?.user?._id);
  function handleSubmitForm(dataForm: any) {
    dataForm = {
      ...dataForm,
      category_attribute: statusOptions,
      symbol_attribute: color,
      id_account: user?.user?._id,
      action: 'create_varriant',
    }
    if (statusChecked) {
      onSubmit(dataForm)
    }
    // save sessionStorage
    else {
      dataForm = {
        ...dataForm,
        symbol_attribute: color,
        category_attribute: statusOptions,
      }
      let data_attributeCatalog = [
        dataForm
      ];
      if (attributeCatalog) {
        data_attributeCatalog = [
          ...attributeCatalog,
          dataForm
        ]
      }
      setAttributeCatalog(data_attributeCatalog);
    }
  }

  const handleSetColor = (color: any) => {
    setColor(color.hex);
    setStatusOptions('ux_color')
  }
  const arr_attributeCatalog: any = data?.concat(attributeCatalog) ?? [];
  function clearAttributeCatalog(_id: any) {
    const check_location_value = attributeCatalog?.find((value: any) => value?.key === _id);
    if (check_location_value) {
      const new_attributeCatalog = attributeCatalog?.filter((value: any) => value?.key !== _id);
      setAttributeCatalog(new_attributeCatalog);
    }
    else {
      onSubmit({
        action: 'remove_name_varriant',
        id_account: user?.user?._id,
        id_item: _id
      })
    }
  }


  return (
    <div>
      <div className='flex flex-col gap-y-6 py-6 h-full'>
        <strong className='text-xl'>Thuộc tính</strong>
        <section className='grid lg:grid-cols-[38%_auto] lg:gap-x-16 gap-x-8'>
          {/* left */}
          {/* 
            {
                isLoading && <span>Loading...</span>
            } */}

          <div>
            <strong className='text-gray-800'>Thêm mới thuộc tính</strong>
            <p className='text-gray-700 text-sm my-4'>Các thuộc tính bổ sung cho phép bạn xác định dữ liệu sản phẩm bổ sung. Bạn có thể sử dụng các thuộc tính đó
              trong thanh bên của cửa hàng bằng cách sử dụng các tiện ích điều hướng theo lớp.</p>
            <form onSubmit={form_attributeCatalog?.handleSubmit(handleSubmitForm)}>
              <label htmlFor="short_name">Tên:</label>
              <input type="text" id='short_name' {...form_attributeCatalog?.register('attribute', { required: true })}
                className='outline-none py-1.5 px-4 border border-gray-300 rounded w-full text-sm my-1' placeholder='Enter ...' />
              {/* {errorsForm && <p className='text-sm my-2 text-red-500'>{errorsForm?.attribute?.message}</p>} */}
              <p className='text-gray-800 text-sm'>Tên cho thuộc tính</p>
              <div className="flex items-center space-x-2 my-4">
                <Checkbox id="terms" onClick={() => setStatusChecked(!statusChecked)} />
                <label htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Cho phép lưu trữ
                </label>
              </div>
              <p className='text-sm text-gray-800'>Kích hoạt tính năng này nếu bạn muốn thuộc tính này có lưu trữ sản phẩm trong cửa hàng của bạn.</p>
              <div className='my-4'>
                <SelectShadcn onValueChange={(value: any) => setStatusOptions(value)}>
                  <span>Loại: </span>
                  <SelectTrigger className="w-[180px] !h-auto py-1 mt-1">
                    <SelectValue placeholder="Lựa chọn" />
                  </SelectTrigger>
                  <SelectContent className='bg-white z-[10]'>
                    <SelectGroup>
                      <SelectItem value="ux_color">UX Color</SelectItem>
                      <SelectItem value="ux_label">UX Image</SelectItem>
                      <SelectItem value="ux_label">UX Label</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </SelectShadcn>
              </div>
              {
                (statusOptions === 'ux_color') &&
                <div className='flex flex-col gap-y-2'>
                  <span>Chọn màu sắc:</span>
                  <div className='flex gap-4'>
                    <SketchPicker
                      color={color}
                      onChangeComplete={handleSetColor}
                    />
                    <div style={{
                      backgroundColor: color
                    }} className={`w-16 h-16 rounded border`}></div>
                  </div>
                </div>
              }
              <button className='py-1.5 h-auto my-4 bg-indigo-600 hover:bg-indigo-800 text-white px-2 rounded'>Thêm</button>
            </form>
            {
              isError &&
              <p className='text-red-500 text-sm'>Lỗi, vui lòng kiểm tra lại!</p>
            }
          </div>
          {/* right */}
          <div>
            <List_data_attribute_catalog
              dataProps={{
                arr_attributeCatalog,
                loadingAttributeCatalog,
                clearAttributeCatalog
              }}
            />
          </div>
        </section>
      </div>
    </div>
  )
}