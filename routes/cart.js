module.exports = cartService = (cartService) => {

    const addToCart = async (req, res) => {
        try {
            const {
                id
            } = req.params;
            if (id !== '' && id !== undefined) {
                let addToCart = await cartService.addToShoppingCart(id);
                res.json({
                    status: "success",
                    data: addToCart
                })
            } else {
                return false;
            }
        } catch (e) {
            res.json({
                status: 'error',
                error: e.stack
            })
        }
    }


    const cartTotal = async (req, res) => {
        try {
            let cart_total = await cartService.total();
            res.json({
                status: 'success',
                data: cart_total
            })
        } catch (e) {
            res.json({
                status: 'error',
                data: e.stack
            })
        }
    }


    const deleteCartItems = async (req, res) => {
        try {
            let clear = await cartService.clearCart();
            res.json({
                status: "success",
                data: clear
            });
        } catch (e) {
            res.json({
                status: "error",
                error: e.stack
            });
        }
    }

    const view_cart = async (req, res) => {
        try {
            let shopping_cart = await cartService.cartItems();
            res.json({
                status: "success",
                data: shopping_cart
            })
        } catch (err) {
            res.json({
                status: 'error',
                error: e.stack
            })
        }
    }

    return {
        view_cart,
        cartTotal,
        addToCart,
        deleteCartItems
    }
}