import {StatusCodes} from 'http-status-codes';
import Products from "../../models/Items/Products";

export async function restore_item (req, res) {
    try {
        const data = await Products.restore({_id : req.params.id});
        return res.status(StatusCodes.OK).json({
            message : "Restore done!",
            data
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message || "Loi server!"
        })
    }
}