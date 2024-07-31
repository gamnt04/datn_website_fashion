import { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import { Skeleton, Spin, Table } from "antd";
import { list_Auth } from "../../../_lib/Auth/Auth";
import SearchComponent from './Search';
import { LoadingOutlined } from '@ant-design/icons';

const List_Auth = () => {
    const [data, setData] = useState<any>(null);

    const { data: initialData, isLoading } = useQuery({
        queryKey: ['LIST_AUTH'],
        queryFn: async () => {
            const data = await list_Auth();
            return data;
        }
    });

    const dataSource = (data ? data?.user : initialData?.data)?.map((auth: any) => {
        return {
            key: auth._id,
            ...auth
        };
    });

    const columns = [
        {
            title: 'Ảnh người dùng',
            dataIndex: 'avatar',
            key: 'avatar',
            render: (_: any, auth: any) => (
                isLoading ? <Skeleton.Avatar active size="large" shape="square" /> : <img src={auth.avatar} alt="" className="w-16 h-16" />
            ),
        },
        {
            title: 'Tên người dùng',
            dataIndex: 'userName',
            key: 'userName',
            render: (_: any, auth: any) => (
                isLoading ? <Skeleton.Input style={{ width: 150 }} active size="small" /> : auth.userName
            ),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: (_: any, auth: any) => (
                isLoading ? <Skeleton.Input style={{ width: 200 }} active size="small" /> : auth.email
            ),
        },
        {
            title: 'Quyền',
            dataIndex: 'role',
            key: 'role',
            render: (_: any, auth: any) => (
                isLoading ? <Skeleton.Input style={{ width: 100 }} active size="small" /> : auth.role
            ),
        },
    ];

    return (
        <>
            <div className="flex justify-between my-5">
                <h1 className="text-xl font-bold">Danh sách tài khoản</h1>
                <SearchComponent setData={setData} />
            </div>
            <Spin spinning={isLoading} indicator={<LoadingOutlined spin />} size="large">
                <Table columns={columns} dataSource={dataSource} />
            </Spin>
        </>
    );
};

export default List_Auth;
