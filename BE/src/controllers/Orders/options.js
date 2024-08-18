import Orders from "../../models/Orders/orders";
import { StatusCodes } from 'http-status-codes'

export async function list_items_order_by_user(req, res) {
    const {
        _page = 1,
        _limit = 20,
        _search = '',
        _status = ''
    } = req.query

    try {
        const id_user = req.params.id_user;
        if (!id_user) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: 'No user!'
            })
        };
        const options = {
            page: _page,
            limit: _limit,
            sort: { datetime: -1 }
        }
        const querry = {
            userId: id_user,
        }
        if (_status) {
            querry.$and = [{
                status: _status
            }]
        }
        const data = await Orders.paginate(querry, options);
        return res.status(StatusCodes.OK).json({
            message: 'OK',
            data
        })
    } catch (error) {

    }
}