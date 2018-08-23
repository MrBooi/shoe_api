module.export = shoe_shop = (pool) => {

    const shoesList = async () => {
        let shoes = await pool.query("SELECT * FROM shoes");
        return shoes.rows;
    }

    const addShoe = async (brandName, color, shoeSize, price, quantity) => {
        if (brandName !== '' && color !== '' && shoeSize !== '' && price != '' && quantity !== '') {
            let findShoe = await pool.query("SELECT * FROM shoes WHERE brand=$1 AND ( color=$2 And shoeSize=$3)", [brandName, color, shoeSize]);
            if (findShoe.rowCount === 0) {
                await pool.query(`INSERT INTO shoes(brand,color,shoeSize,price,quantity)
                        VALUES('${brandName}','${color}'
                        ,${shoeSize},${price},${quantity})`);
                return "shoe added";
            } else {
                await pool.query(`UPDATE shoes SET price=(price) ,
             quantity=(quantity+ $1) WHERE brand=$2 AND (color=$3 AND shoeSize=$4)`, [quantity, brandName, color, shoeSize]);
                return " shoe updated";
            }
        } else {
            false
        }
    }

    const filterbrandName = async (brandName) => {
        if (brandName !== "") {
            let found = await pool.query(`SELECT * FROM shoes WHERE brand='${brandName}'`);
            return found.rows;
        } else {
            return false;
        }
    }

    const filterbySize = async (shoeSize) => {
        if (shoeSize !== '') {
            let found = await pool.query(`SELECT * FROM shoes WHERE shoeSize=${shoeSize}`);
            return found.rows;
        } else {
            return false;
        }
    }

    const filterbrandAndSize = async (brandName, shoeSize) => {
        if (shoeSize !== '' && brandName !== '') {
            let found = await pool.query(`SELECT * FROM shoes WHERE brand='${brandName}' AND shoeSize=${shoeSize}`);
            return found.rows;
        } else {
            return false;
        }
    }

    return {
        allShoes: shoesList,
        findByBrand: filterbrandName,
        findBySize: filterbySize,
        findBybrandAndSize: filterbrandAndSize,
        addShoe: addShoe,
    }
}