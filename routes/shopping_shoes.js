module.exports = shoppingRoutes = (shoppingServie) => {

    const show_shoes = async (req, res) => {
        try {
            let shoes = await shoppingServie.allShoes();
            res.json({
                status: "success",
                data: shoes
            });
        } catch (e) {
            res.json({
                status: 'error',
                error: e.stack
            })
        }
    }

    const searchByBrand = async (req,res) => {
        try {
            const {
                brandname
            } = req.params;
            if (brandname !== '' && brandname !== undefined) {
                let searchByBrand = await shoppingServie.findByBrand(brandname);
                res.json({
                    status: "success",
                    data: searchByBrand
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

    const searchBySize = async (req, res) => {
        try {
            const {
                size
            } = req.params;
            if (size !== '' && size !== undefined) {
                let searchBySize = await shoppingServie.findBySize(size);
                res.json({
                    status: "success",
                    data: searchBySize
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


    const filterByBrandAndSize = async (req, res) => {
        try {
            const {
                brandname,
                size
            } = req.params;
            if (brandname !== '' && brandname !== undefined &&
                size !== '' || size !== undefined) {
                let searchByBrandAndSize =
                    await shoppingServie.findBybrandAndSize(brandname, size);
                res.json({
                    status: "success",
                    data: searchByBrandAndSize
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


    const add = async (req, res) => {
        try {
            const {
                brand,
                color,
                shoeSize,
                quantity,
                price
            } = req.body;
            if (brand !== undefined && shoeSize !== undefined && quantity !== undefined &&
                price !== undefined && color !== undefined) {
                let addNewShoe = await shoppingServie.addShoe(brand, color, shoeSize, price, quantity);
                res.json({
                    status: "success",
                    data: addNewShoe
                })
            } else {
                res.json({
                    status: 'error',
                    error: e.stack
                })
            }
        } catch (e) {
            res.json({
                status: 'error',
                error: e.stack
            })
        }




    }

    return {
        show_shoes,
        add,
        searchByBrand,
        searchBySize,
        filterByBrandAndSize,
    }

}