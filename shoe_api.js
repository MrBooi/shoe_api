module.exports = shoeApi = (pool) => {

  const shoesList = async () => {
    let shoes = await pool.query("SELECT * FROM shoes");
    return shoes.rows;
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

  const addToCart = async (shoe_id) => { 
    if (shoe_id !== '') {
      let findID = await pool.query("SELECT * FROM shoes WHERE id=$1", [shoe_id]);
      let price =findID.rows[0].price;
      if (findID.rowCount > 0) {
        let findIdOnCart = await pool.query('SELECT * FROM shoe_basket where brand_id=$1', [shoe_id]);
        if (findIdOnCart.rowCount > 0) {
        let found  =  await pool.query(`UPDATE shoes SET quantity=(quantity-1) where id=${shoe_id} and quantity >0 `);
           if (found.rowCount >0) {
            await pool.query(`UPDATE shoe_basket SET qty=(qty+1), subtotal=((qty+1)*${price})
             WHERE brand_id=${shoe_id}`);
           }
        } else {
          await pool.query(`INSERT INTO shoe_basket(qty,brand_id,subtotal) 
           values(${1},${shoe_id},${price})`);
          await pool.query(`UPDATE shoes SET quantity=(quantity-1) where id=${shoe_id} and quantity >0`);
          return true;
        }
        return true;
      }
    } else {
      return false;
    }

  }

  const total = async  () => {
       let result = await pool.query('SELECT * FROM shoe_basket');
       let cartTotal = 0.00;
        if(result.rowCount<0){
          return cartTotal;
        } 
        let subtotals =  result.rows.map(current => parseFloat(current.subtotal))

       cartTotal = subtotals.reduce((total, current) =>{
       return total+current;
       }, 0);
       return cartTotal;
      }
  
  const viewCart = async ()=> {
    cartList = await pool.query(`SELECT * FROM
    shoe_basket JOIN shoes on shoes.id=shoe_basket.brand_id 
   `); 

  if(cartList.rowCount>0){ 
    return cartList.rows;
  }else{
    return 'Shopping cart is empty!!!!';
  }
  }

  const removeFromCart = async () => {
    let findId = await pool.query("SELECT * FROM shoe_basket");
    if (findId.rowCount > 0) {
      let found = findId.rows;
      for (const currentId of found) {
        let getQty = currentId.qty;
         await pool.query(`Update shoes SET quantity=(quantity+${getQty})
           Where id=${currentId.brand_id}`);
      }
      await pool.query("DELETE  FROM shoe_basket");
      return true;
    } else {
      console.log("shopping cart is empty!!!")
      return 'shopping cart is empty!!!';
    }
  }

  return {
    allShoes: shoesList,
    findByBrand: filterbrandName,
    findBySize: filterbySize,
    findBybrandAndSize: filterbrandAndSize,
    addShoe: addShoe,
    addToShoppingCart: addToCart,
    cartItems: viewCart,
    clearCart: removeFromCart,
    total
  }

}