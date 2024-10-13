/* eslint-disable @typescript-eslint/no-explicit-any */
import { Mutation_AttributeCatalog } from "../../../_lib/React_Query/Attribute/Attribute";
import { useForm } from 'react-hook-form';

export default function useFormAttributeCatalog(mode: any) {
    const form_attributeCatalog = useForm();
    const { errors: errorsForm } = form_attributeCatalog.formState
    const { mutate, ...rest } = Mutation_AttributeCatalog(mode);
    const onSubmit = (dataForm: any) => {
        mutate(dataForm);
    }
    return { form_attributeCatalog, onSubmit, errorsForm, ...rest }
}
