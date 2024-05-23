import { useQuery } from "@tanstack/react-query";
import { get, getById } from "../../../services/category";
const useCategoryQuery = (id?: string) => {
  const queryKey = id ? ["CATEGORY_KEY", id] : ["CATEGORY_KEY"];
  const { data, ...rest } = useQuery({
    queryKey,
    queryFn: async () => {
      return id ? await getById(id) : await get();
    },
  });
  return { data, ...rest };
};
export default useCategoryQuery;
