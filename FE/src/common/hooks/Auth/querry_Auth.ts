import { useQuery } from "@tanstack/react-query";
import { list_Auth, list_Auth_By_Id } from "../../../_lib/Auth/Auth";

export const List_Auth = (userId: string) => {
  const { data, ...rest } = useQuery({
    queryKey: userId ? ["AUTH_KEY", userId] : ["AUTH_KEY"],
    queryFn: async () => {
      return userId ? await list_Auth_By_Id(userId) : await list_Auth();
    }
  });
  return { data, ...rest };
};
