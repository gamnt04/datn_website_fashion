/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate } from 'react-router-dom';
import { convert_data } from '../data';
import { Dispatch_the_loai_thuoc_tinh } from '../../../../API/Dispatch/slice_attribute';
import { Button, Popconfirm, Spin } from 'antd';
import { useState } from 'react';
import Modal_cpnt from '../_components/modal_cpnt';
import { LoadingOutlined } from '@ant-design/icons';


const Table_cpnt = ({ data_props }: any) => {
    const { mutate, isLoading, isError } = Dispatch_the_loai_thuoc_tinh('REMOVE');
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const navigate = useNavigate();

    const showModal = (id: string | number) => {
        const url_location: any = window.location;
        const url = new URL(url_location);
        url.searchParams.set('_id', id.toString());
        navigate(url.pathname + '?' + url.searchParams.toString());
        setIsModalOpen(true);
    };
    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">
            <Spin indicator={<LoadingOutlined spin />} size="large" />
        </div>;
    }
    if (isError) return <span>Error...</span>

    return <div>
        <table className='auto border border-gray-400 w-full'>
            <thead className='*:border *:border-gray-400'>
                <tr className='*:px-2 font-light *:text-start text-gray-700'>
                    <th>Tên</th>
                    <th>Loại</th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>

            <tbody>
                {data_props?.length > 0 ? (
                    data_props.map((value: any, index: number) => {
                        const attribute = convert_data.find(item => item.key === value?.category_attribute);
                        return (
                            <tr key={index} className='border border-gray-400 *:p-2 text-gray-700'>
                                <td>
                                    <Link to={`/admin/products/attribute-catalog/${value?._id}`}>
                                        {value?.name_attribute}
                                    </Link>
                                    <div className='flex items-center gap-x-2 mt-1 *:text-sm *:duration-200'>
                                        <button className='text-sky-500 hover:text-sky-700' onClick={() => showModal(value?._id)}>Sửa</button>
                                        <Modal_cpnt props={{ isModalOpen, setIsModalOpen }} />
                                        <Popconfirm
                                            title="Delete"
                                            description={`Xác nhận xóa thể loại thuộc tính ${value?.name_attribute}`}
                                            onConfirm={() => mutate(value?._id)}
                                            okText="Yes"
                                            cancelText="No"
                                        >
                                            <Button className='border-none bg-[#F1F5F9] hover:!bg-[#F1F5F9] hover:!text-red-700 font-medium' danger>Xóa</Button>
                                        </Popconfirm>
                                    </div>
                                </td>
                                <td>{attribute ? attribute.name : value?.category_attribute}</td>
                            </tr>
                        );
                    })
                ) : (
                    <span>No data</span>
                )}
            </tbody>
        </table>
    </div>
    // return <Table columns={columns} dataSource={data_props} pagination={false} />
};

export default Table_cpnt;