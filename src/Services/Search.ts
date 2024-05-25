import axios from "axios";

const baseUrl = 'http://localhost:3000/';

export const SearchData = async (keySearch : any) => {
    try {
        const {data} = await axios.get(baseUrl +`testApi?q=${keySearch}`);
        return data
    } catch (error) {
        console.log(error);
        
    }
}