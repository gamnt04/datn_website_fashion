import Attribute from "../../models/attribute/attribute.js";
import Variant from "../../models/attribute/variant.js";
import { StatusCodes } from "http-status-codes";

export async function create_attribute(req, res) {
    try {
        const { id_account } = req.body;
        console.log(req.body)
        if (!id_account) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: 'No Account!'
            })
        }
        const attribute_by_account = await Attribute.find({
            id_account
        });
        const check_attribute = attribute_by_account.find((value) => (
            value.attribute.toString().trim() === req.body.attribute.toString().trim()
        ))
        if (check_attribute) {
            return res.status(StatusCodes.CONFLICT).json({
                message: 'Thuoc tinh da ton tai!'
            })
        }
        await Attribute.create(req.body);
        return res.status(StatusCodes.OK).json({
            message: 'OK'
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message
        })
    }
};


export async function create_variant(data_variant) {
    if (!data_variant || data_variant.length < 1) {
        return res.status(StatusCodes.NOT_FOUND).json({
            message: 'Not variants'
        })
    };
    const varriant = data_variant.map(item => (
        {
            color: data_variant ? item.color : '',
            size: item.size.map(value =>
            (
                {
                    name_size: value.name_size ? value.name_size.toString() : '',
                    stock_attribute: value.stock_attribute ? value.stock_attribute : 0,
                    price_attribute: value.price_attribute ? +value.price_attribute : 1
                }
            )
            )
        }
    ));
    const data = await Variant.create({
        values: varriant
    });
    return data
}