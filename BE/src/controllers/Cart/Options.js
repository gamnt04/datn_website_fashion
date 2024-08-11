import Cart from "../../models/Cart/cart";
import { StatusCodes } from "http-status-codes";
import Products from "../../models/Items/Products";

export const addItemToCart = async (req, res) => {
    const { userId, productId, quantity, color, size, price_item_attr } = req.body;
    try {
        const data_product = await Products.findOne({ _id: productId }).populate('attributes');
        let price_item = (price_item_attr > 0) ? price_item_attr : data_product.price_product;
        let color_item;
        let name_size;
        let quantity_attr = 0;

        if (data_product.attributes) {
            for (let i of data_product.attributes.values) {
                if (i.color == color) {
                    for (let k of i.size) {
                        if (k.name_size == size) {
                            quantity_attr = k.stock_attribute;
                            color_item = i.color;
                            name_size = k.name_size;
                        } else {
                            quantity_attr = k.stock_attribute;
                            color_item = i.color;
                        }
                    }
                }
            }
        } else {
            quantity_attr = quantity;
        }

        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({
                userId,
                products: []
            });
        }

        let check_item = false;
        for (let i = 0; i < cart.products.length; i++) {
            if (cart.products[i].productId.toString() === productId) {
                if (cart.products[i].color_item === color && cart.products[i].name_size === size) {
                    cart.products[i].quantity += quantity;
                    cart.products[i].total_price_item = price_item * cart.products[i].quantity;
                    check_item = true;
                    break;
                }
            }
        }

        if (!check_item) {
            cart.products.push({
                productId,
                quantity,
                price_item,
                color_item,
                name_size,
                quantity_attr,
                total_price_item: price_item * quantity
            });
        }

        // Tính tổng giá trị của tất cả các mặt hàng trong giỏ
        cart.total_price = cart.products.reduce((acc, product) => acc + product.total_price_item, 0);

        await cart.save();
        return res.status(StatusCodes.OK).json({ cart });
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.BAD_REQUEST).json({ error: "Internal Server Error" });
    }
};


export const updateQuantityProductsInCart = async (req, res) => {
    const { userId, productId, quantity } = req.body;
    try {
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({ error: "Cart not found" });
        }

        const product = cart.products.find(
            (item) => item.productId.toString() === productId
        );
        if (!product) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({ error: "Product not found" });
        }
        product.quantity = quantity;
        await cart.save();
        return res.status(StatusCodes.OK).json({ cart });
    } catch (error) { }
};
export const increaseProductQuantity = async (req, res) => {
    const { userId, productId, color, size } = req.body;
    try {
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        const product = cart.products.map(
            (item) => (item.productId.toString() == productId._id) && item
        );
        for (let i of cart.products) {
            if (i.productId.toString() == productId._id) {
                if (i.color_item == color && i.name_size == size) {
                    i.quantity++
                    i.total_price_item = i.quantity * i.price_item
                }
            }
        }
        if (!product) {
            return res.status(404).json({ message: "Product not found in cart" });
        }
        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const decreaseProductQuantity = async (req, res) => {
    const { userId, productId, color, size } = req.body;
    try {
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        for (let i = 0; i < cart.products.length; i++) {
            if (cart.products[i].productId == productId._id) {
                if (cart.products[i].color_item == color && cart.products[i].name_size == size) {
                    cart.products[i].quantity--;
                    cart.products[i].total_price_item = cart.products[i].price_item * cart.products[i].quantity;
                    if (cart.products[i].quantity === 0) {
                        cart.products.splice(i, 1);
                    }
                }
            }
        }
        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};