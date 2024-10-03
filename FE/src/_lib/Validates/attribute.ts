import * as yup from 'yup';

export const schema_validate_attribute = yup.object().shape({
    attribute : yup.string().required('Bắt buộc'),
    category_attribute : yup.string().required('Bắt buộc'),
})