/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from 'react-router-dom';
import { convert_data } from '../data';
import { Dispatch_the_loai_thuoc_tinh } from '../../../../API/Dispatch/slice_attribute';


const Table_cpnt = ({ data_props }: any) => {
    const { mutate, isPending, isError } = Dispatch_the_loai_thuoc_tinh('REMOVE');

    if (isPending) return <span>Loading...</span>
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
                                        <button className='text-sky-500 hover:text-sky-700'>Sửa</button>
                                        <button onClick={() => (window.confirm('Xac nhan xoa the loai thuoc tinh nay') && mutate(value?._id))} className='text-red-500 hover:text-red-700'>Xóa</button>
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