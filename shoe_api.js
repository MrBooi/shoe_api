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
    console.log(brandName);

    let check = pool.query('select * from shoes')

    console.log(check.rows)
    if (brandName !== '' && color !== '' && shoeSize !== '' && price != '' && quantity !== '') {
      let findShoe = await pool.query("SELECT * FROM shoes WHERE brand=$1 AND ( color=$2 And shoeSize=$3)",[brandName,color,shoeSize]);
      if (findShoe.rowCount === 0) {  
      await pool.query("INSERT INTO shoes(brand,color,shoeSize,price,quantity) VALUES(brand=$1,color=$2,shoeSize=$3,price=$4,quantity=$4)",[brandName,color,shoeSize,price,quantity]);
      } else{
        await pool.query("UPDATE shoes SET price =(price) And quantity=(quantity+quantity) WHERE brand=$1,color=$2 And shoeSize=$3",[brandName,color,shoeSize]);
      }
      return true;
    }else{
      return false;
    }
  }


  return {
    allShoes: shoesList,
    findByBrand: filterbrandName,
    findBySize: filterbySize,
    findBybrandAndSize: filterbrandAndSize,
    addShoe :addShoe
  }

}