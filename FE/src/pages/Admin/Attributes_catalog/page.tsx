import { useState } from 'react';
import { SketchPicker } from 'react-color';


export default function Attribute_catalog() {
    const [color, setColor] = useState('#fff'); // Màu mặc định

    const handleChangeComplete = (color: { hex: string }) => {
        setColor(color.hex); // Lưu mã màu hex
    };
    return (
        <div>
            <strong className="text-xl">Thuộc tính sản phẩm</strong>
            <section className="grid grid-cols-[35%_60%] justify-between mt-4">
                <div>
                    <span>Thêm thuộc tính mới</span>
                    <form className="mt-5">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="name_varriant" className="text-gay-700">Tên:</label>
                            <input type="text" className="px-4 py-2 rounded border border-gray-400 outline-none"
                                id="name_varriant"
                                placeholder="Tên thuộc tính"
                            />
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
                                <select name="" id="select_category_attribute" className="py-1 px-2 rounded cursor-pointer">
                                    <option value="">Chọn</option>
                                    <option value="ux_color">Màu sắc</option>
                                    <option value="ux_more">Khác</option>
                                </select>
                            </div>
                        </div>
                    </form>
                    <div className='flex gap-4'>
                        <SketchPicker
                            color={color}
                            onChangeComplete={handleChangeComplete} />
                        <div style={{
                            backgroundColor: color
                        }} className='w-8 h-8 rounded'></div>
                    </div>
                </div>
            </section>
        </div>
    )
}