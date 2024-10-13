/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Select } from 'antd';
import { Filed_form } from './filed_form';
import { DeleteOutlined } from '@ant-design/icons';

const Filed_bien_the_dua_theo_thuoc_tinh = ({ state_variant_2 }: any) => {
    const initialAttributes = state_variant_2?.state_variant_2?.map((item: any) => ({
        color: item?.attribute,
        size: [],
    }));
    return (
        <Form.List
            name="attributes"
            initialValue={initialAttributes}
        >
            {(fields) => {
                console.log(fields)
                return <>
                    <div className="text-[#1C2434] font-medium text-sm">
                        Thuộc tính sản phẩm
                    </div>
                    {fields.map(({ key, name, ...restField }: any) => {
                        return <div key={key}>
                            <label
                                htmlFor=""
                                className="text-[#1C2434] font-medium text-sm"
                            >
                                Màu :
                            </label>
                            <Filed_form
                                props={{
                                    name_field: [name, "color"],
                                    ruler_field: [
                                        {
                                            required: true,
                                            message: "Vui lòng nhập màu sắc!"
                                        }
                                    ],
                                    restField: restField,
                                }}
                            />
                            <Form.List name={[name, "size"]} initialValue={[{}]}>
                                {(
                                    sizeFields,
                                    { add: addSize, remove: removeSize }
                                ) => (
                                    <>
                                        {sizeFields.map(
                                            ({
                                                key: sizeKey,
                                                name: sizeName,
                                                ...restSizeField
                                            }) => (
                                                <div
                                                    key={sizeKey}
                                                    className="flex items-center gap-[13px] mb-2 -mt-2"
                                                >
                                                    <div>
                                                        <label className="text-[#1C2434] font-medium text-sm">
                                                            Kích cỡ :
                                                        </label>
                                                        <Form.Item
                                                            {...restSizeField}
                                                            name={[sizeName, "name_size"]}
                                                        >
                                                            <Select className=" mt-2 h-[40px] max-w-[200px] text-[#1C2434] border-gray-600 !outline-none "
                                                                options={state_variant_2?.sizes.map((size: any) => ({
                                                                    label: size,
                                                                    value: size
                                                                }))}
                                                                placeholder="Chọn kích cỡ"
                                                            />
                                                            {/* <Input className=" mt-2 py-2 max-w-[200px] text-[#1C2434] border-gray-600 !outline-none " /> */}
                                                        </Form.Item>
                                                    </div>
                                                    <div>
                                                        <label className="text-[#1C2434] font-medium text-sm">
                                                            Số lượng :
                                                        </label>
                                                        <Filed_form
                                                            props={{
                                                                name_field: [
                                                                    sizeName,
                                                                    "stock_attribute"
                                                                ],
                                                                ruler_field: [
                                                                    {
                                                                        required: true,
                                                                        message: "Số lượng là bắt buộc!"
                                                                    },
                                                                    {
                                                                        type: "number",
                                                                        min: 0,
                                                                        message:
                                                                            "Số lượng phải là số dương!",
                                                                        transform(value: number) {
                                                                            return Number(value);
                                                                        }
                                                                    }
                                                                ],
                                                                restField: restSizeField
                                                            }}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="text-sm font-medium">
                                                            {" "}
                                                            Giá :
                                                        </label>
                                                        <br />
                                                        <Filed_form
                                                            props={{
                                                                name_field: [
                                                                    sizeName,
                                                                    "price_attribute"
                                                                ],
                                                                ruler_field: [
                                                                    {
                                                                        required: true,
                                                                        message:
                                                                            "Giá sản phẩm bắt buộc nhập!"
                                                                    },
                                                                    {
                                                                        type: "number",
                                                                        min: 0,
                                                                        message:
                                                                            "Giá sản phẩm phải là số dương!",
                                                                        transform(value: number) {
                                                                            return Number(value);
                                                                        }
                                                                    }
                                                                ],
                                                                restField: restSizeField
                                                            }}
                                                        />
                                                    </div>
                                                    <DeleteOutlined
                                                        onClick={() => removeSize(sizeName)}
                                                        style={{ fontSize: "20px" }}
                                                    />
                                                </div>
                                            )
                                        )}
                                        <div className="flex items-center gap-4 mb-4">
                                            <Button
                                                type="primary"
                                                onClick={() => addSize()}
                                                className="px-2 "
                                            >
                                                Thêm kích cỡ
                                            </Button>
                                        </div>
                                    </>
                                )}
                            </Form.List>
                        </div>
                    })}
                </>
            }}
        </Form.List>
    );
};

export default Filed_bien_the_dua_theo_thuoc_tinh;