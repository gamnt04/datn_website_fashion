import { useState } from 'react';
import { SketchPicker } from 'react-color';
import useHookFormAttribute from '../../../common/hooks/Attributes/useAttributesQuery';


export default function Attribute() {
    const { onSubmit, myForm, errors, isLoading, isError } = useHookFormAttribute('add');
    const [color, setColor] = useState(''); // Màu mặc định

    const handleChangeComplete = (color: { hex: string }) => {
        setColor(color.hex); // Lưu mã màu hex
    };
    const onHandleSubmit = (value: any) => {
        console.log(value)
        const dataRequest = {
            ...value,
            symbol_attribute: color,
        }
        onSubmit(dataRequest)
    }
    if (isLoading) return <span>Loading...</span>
    if (isError) return <span>Error...</span>
    return (
        <div>
            <strong className="text-xl">Thuộc tính sản phẩm</strong>
            <section className="grid grid-cols-[35%_60%] justify-between mt-4">
                <div>
                    <span>Thêm thuộc tính mới</span>
                    <form className="mt-5" onSubmit={myForm.handleSubmit(onHandleSubmit)}>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="name_varriant" className="text-gay-700">Tên:</label>
                            <input type="text" className="px-4 py-2 rounded border border-gray-400 outline-none"
                                id="name_varriant"
                                placeholder="Tên thuộc tính"
                                {...myForm?.register('attribute')}
                            />
                            {errors && <p className='text-sm text-red-500'>{errors?.attribute?.message}</p>}
                        </div>
                        <div className="flex items-center gap-4 my-4">
                            <input id="save_attribute" type="checkbox" className="w-5 h-5" />
                            <label htmlFor="save_attribute">Cho phép lưu trữ</label>
                        </div>
                        <p className="text-sm text-gray-600">
                            Kích hoạt tính năng này nếu bạn muốn thuộc tính này có lưu trữ trong cửa hàng của bạn.
                        </p>

                        <div className="my-4 flex flex-col">
                            <label htmlFor="select_category_attribute">Loại:</label>
                            <div className="mt-2">
                                <select id="select_category_attribute" className="py-1 px-2 rounded cursor-pointer"
                                    {...myForm?.register('category_attribute')}>
                                    <option value="">Chọn</option>
                                    <option value="ux_color">Màu sắc</option>
                                    <option value="ux_more">Khác</option>
                                </select>
                                {errors && <p className='text-sm text-red-500'>{errors?.category_attribute?.message}</p>}
                            </div>
                        </div>
                        <div className='flex gap-4'>
                            <SketchPicker
                                color={color}
                                onChangeComplete={handleChangeComplete} />
                            <div style={{
                                backgroundColor: color
                            }} className='w-8 h-8 rounded'></div>
                        </div>
                        <button type='submit' className='my-6 border bg-sky-600 px-2 py-1 rounded text-gray-100'>Thêm</button>
                    </form>

                </div>
            </section>
        </div>
    )
}