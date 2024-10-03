import { StatusCodes } from 'http-status-codes';
import Attribute from '../../models/attribute/attribute';

export async function get_attribute(req, res) {
    try {
        const { id_account } = req.params.id_account;
        if (!id_account) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: 'Khong co tai khoan!'
            })
        }
        const data = await Attribute.find({ id_account });
        return res.status(StatusCodes.OK).json({
            message: 'OK',
            data
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message
        })
    }
}