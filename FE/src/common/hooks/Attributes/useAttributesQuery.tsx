import { useMutationAttribute } from "../../../_lib/React_Query/Attribute/Attribute";
import useLocalStorage from "../Storage/useStorage";

export default function useHookFormAttribute(mode: string) {
  const [user] = useLocalStorage("user", {});
  const userId = user?.user?._id;
  const { mutate, isLoading, isError, myForm, errors } = useMutationAttribute(mode === 'edit' ? 'Edit' : 'Add');
  function onSubmit(dataValue) {
    let dataRequest: any = {
      id_account: userId,
      attribute: dataValue?.attribute,
      category_attribute: dataValue?.category_attribute,
      symbol_attribute: dataValue?.symbol_attribute,
    }
    if (mode === 'edit') {
      dataRequest = {
        id_attribute: dataValue?._id,
        id_account: userId,
        attribute: dataValue?.attribute,
        category_attribute: dataValue?.category_attribute,
        symbol_attribute: dataValue?.symbol_attribute,
      }
      mutate(dataRequest)
    } else {
      mutate(dataRequest)
    }
  }
  return {
    onSubmit,
    myForm,
    errors,
    isLoading,
    isError
  }
}