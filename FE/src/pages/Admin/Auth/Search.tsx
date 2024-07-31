import { useState } from 'react';
import { Input } from 'antd';
import { Search_Auth } from "../../../_lib/Auth/Auth";
const { Search } = Input;

const SearchComponent = ({ setData }: { setData: (data: any) => void }) => {
    const [loading, setLoading] = useState(false);

    const onSearch = async (value: string) => {
        setLoading(true);
        try {
            const data = await Search_Auth(value);
            setData(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Search
            placeholder="Tìm kiếm tài khoản"
            enterButton
            className="w-[20%]"
            onSearch={onSearch}
            loading={loading}
        />
    );
};

export default SearchComponent;
