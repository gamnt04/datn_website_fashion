import { StatusCodes } from 'http-status-codes';
import Attribute from '../../models/attribute/attribute';
import Variant from '../../models/attribute/variant';

export async function create_attribute(req, res) {
    try {
        const { id_account } = req.body;
        if (!id_account) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: 'Khong co tai khoan!'
            })
        };
        const attribute = await Attribute.find({ id_account });
        const check_attribute = attribute.find((value) =>
            value.attribute.toString().trim() === req.body.attribute.toString().trim());
        if (check_attribute) {
            return res.status(StatusCodes.CONFLICT).json({
                message: 'Thuoc tinh da ton tai!'
            })
        }
        await Attribute.create(req.body);
        return res.status(StatusCodes.CREATED).json({
            message: 'OK'
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message
        })
    }
}


export async function create_variant(data_variant) {
    const varriant = data_variant.map(item => (
        {
            attribute: item.attribute ? item.attribute : '',
            size: item.size.map(data_size => (
                {
                    name_variant: data_size.name_variant ? data_size.name_variant.toString() : '',
                    price_variant: data_size.price_variant ? data_size.price_variant : 0,
                    stock_variant: data_size.stock_variant ? +data_size.stock_variant : 0
                }
            )
            )
        }
    ));
    const variant = await Variant.create(varriant);
    return variant
}