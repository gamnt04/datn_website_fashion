import { useQuery } from "@tanstack/react-query";
import { list_Auth } from "../../../_lib/Auth/Auth";

export const List_Auth = () => {
  const { data, ...rest } = useQuery({
    queryKey: [""],
    queryFn: async () => {
      return await list_Auth();
    }
  });

  return { data, ...rest };
};
