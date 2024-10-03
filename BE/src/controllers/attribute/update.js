import { StatusCodes } from 'http-status-codes';
import Attribute from '../../models/attribute/attribute';

export async function update_attribute(req, res) {
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
        await Attribute.findByIdAndUpdate(req.params.id_attribute, req.body, { new: true });
        return res.status(StatusCodes.OK).json({
            message: 'OK'
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message
        })
    }
}
