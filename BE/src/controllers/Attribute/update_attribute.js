import Attribute from "../../models/attribute/attribute";
import { StatusCodes } from "http-status-codes";

export async function update_attribute_catalog(req, res) {
    try {
        const _id = req.params._id_attribute;
        const { attribute } = req.body
        if (!_id) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: 'Not key'
            })
        }
        await Attribute.findOneAndUpdate(
            { _id },
            { $set: { attribute } },
            { new: true }
        )
        return res.status(StatusCodes.OK).json({
            message: 'OK'
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message
        })
    }
}