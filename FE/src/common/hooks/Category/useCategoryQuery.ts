import { useQuery } from "@tanstack/react-query";
import { getAll, getById } from "../../../services/category";
const useCategoryQuery = (id?: string) => {
  const queryKey = id ? ["CATEGORY_KEY", id] : ["CATEGORY_KEY"];
  const { data, ...rest } = useQuery({
    queryKey,
    queryFn: async () => {
      return id ? await getById(id) : await getAll();
    },
  });
  return { data, ...rest };
};
export default useCategoryQuery;
