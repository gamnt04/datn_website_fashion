import { useQuery } from '@tanstack/react-query';
import { DataTable } from './_components/DataTable';
import axios from 'axios';
import { columns } from './_components/Colums';

const Page = () => {
    const { data } = useQuery({
        queryKey: ["PRODUCTS"],
        queryFn: async () => {
            const respones = await axios.get(`http://localhost:2004/api/v1/products`)
            console.log(respones.data);
            return respones.data
        }
    })
    console.log(data?.data?.docs);


    return (
        <>
            <DataTable columns={columns} data={data?.data?.docs}></DataTable>
        </>
    )
}

export default Page