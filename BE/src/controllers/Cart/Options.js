import Cart from "../../models/Cart/cart";
import { StatusCodes } from "http-status-codes";

export const addItemToCart = async (req, res) => {
    const { userId, productId, quantity } = req.body;
    try {
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, products: [] });
        }
        const existProductIndex = cart.products.findIndex(
            (item) => item.productId.toString() == productId
        );
        if (existProductIndex !== -1) {
            cart.products[existProductIndex].quantity += quantity;
        } else {
            cart.products.push({ productId, quantity });
        }
        await cart.save();
        return res.status(StatusCodes.OK).json({ cart });
    } catch (error) {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ error: "Internal Server Error" });
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
    const { userId, productId } = req.body;
    try {
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        const product = cart.products.find(
            (item) => item.productId.toString() === productId
        );
        if (!product) {
            return res.status(404).json({ message: "Product not found in cart" });
        }
        product.quantity++;
        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const decreaseProductQuantity = async (req, res) => {
    const { userId, productId } = req.body;
    try {
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const product = cart.products.find(
            (item) => item.productId.toString() === productId
        );
        if (!product) {
            return res.status(404).json({ message: "Product not found in cart" });
        }

        for (let i = 0; i < cart.products.length; i++) {
            if (cart.products[i].productId == productId) {
                cart.products[i].quantity--;
                if (cart.products[i].quantity === 0) {
                    cart.products.splice(i, 1);
                }
            }
        }

        // if (product.quantity > 1) {
        //   product.quantity--;
        // }

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};