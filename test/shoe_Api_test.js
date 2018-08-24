'use strict';
let assert = require('assert');
const pg = require('pg');
const CartService = require('../services/shopping_cart');
const ShoppingService = require('../services/shoes');


let useSSL = false;
if (process.env.DATABASE_URL) {
    useSSL = true;
}

const connectionString = process.env.DATABASE_URL || 'postgresql://coder:coder123@localhost:5432/shoe_api_test';

const Pool = pg.Pool;
const pool = new Pool({
    connectionString,
    ssl: useSSL
})

const cartService = CartService(pool);
const shoppingService = ShoppingService(pool);


describe('The available shoes function', () => {
    beforeEach(async () => {
        await pool.query('DELETE FROM shoe_basket');
        await pool.query('DELETE FROM shoes');
        await shoppingService.addShoe('Nike', 'white', 7, 800, 3);
        await shoppingService.addShoe('Adidas', 'white', 7, 800, 3);
        await shoppingService.addShoe('Adidas', 'brown', 6, 1200, 3);
        await shoppingService.addShoe('Le Coq', 'white', 7, 500, 3);
    });

    it('should return all stored shoes', async () => {
        let listofShoes = await shoppingService.allShoes();
        let shoe = listofShoes[0];
        assert.equal(4, listofShoes.length);
    });
});

describe("The filter function", () => {
    beforeEach(async () => {
        await pool.query('DELETE FROM shoe_basket');
        await pool.query('DELETE FROM shoes');

        await shoppingService.addShoe('Nike', 'white', 7, 800, 3);
        await shoppingService.addShoe('Adidas', 'brown', 6, 1200, 3);
        await shoppingService.addShoe('Le Coq', 'white', 7, 500, 3);
    });
    it("Should filter by brandName and return all shoes that matches that brand", async () => {
        let findshoe = "Nike";
        let foundShoes = await shoppingService.findByBrand(findshoe);
        let shoe = foundShoes[0];
        delete shoe.id;

        assert.equal(1, foundShoes.length);
        assert.deepEqual(shoe, {
            brand: 'Nike',
            color: 'white',
            shoesize: 7,
            price: '800',
            quantity: 3
        })
    })
    it("Should filter by brandName and return false if shoe is not found", async () => {
        let findshoe = "Puma";
        let foundShoes = await shoppingService.findByBrand(findshoe);

        assert.equal(0, foundShoes.length);
        assert.equal(foundShoes, false)
    })

});

describe("The filter function", () => {
    beforeEach(async () => {
        await pool.query('DELETE FROM shoe_basket');
        await pool.query('DELETE FROM shoes');

        await shoppingService.addShoe('Nike', 'white', 7, 800, 3);
        await shoppingService.addShoe('Adidas', 'brown', 6, 1200, 3);
        await shoppingService.addShoe('Le Coq', 'white', 7, 500, 3);
    });
    it("Should filter by Size and return all shoes that matches that Size", async () => {
        let shoeSize = 6;
        let foundShoes = await shoppingService.findBySize(shoeSize);
        let shoe = foundShoes[0];
        delete shoe.id;

        assert.equal(1, foundShoes.length);
        assert.deepEqual(shoe, {
            brand: 'Adidas',
            color: 'brown',
            shoesize: 6,
            price: '1200',
            quantity: 3
        });

    });
});

describe("The filter function", () => {
    beforeEach(async () => {
        await pool.query('DELETE FROM shoe_basket');
        await pool.query('DELETE FROM shoes');

        await shoppingService.addShoe('Nike', 'white', 7, 800, 3);
        await shoppingService.addShoe('Adidas', 'brown', 6, 1200, 3);
        await shoppingService.addShoe('Le Coq', 'white', 7, 500, 3);
    });

    it("Should filter by brand and size and return all shoes that matches that brand and size", async () => {
        let shoeSize = 6;
        let brandName = 'Adidas';
        let foundShoes = await shoppingService.findBybrandAndSize(brandName, shoeSize);
        let shoe = foundShoes[0];
        delete shoe.id;
        assert.equal(1, foundShoes.length);
        assert.deepEqual(shoe, {
            brand: 'Adidas',
            color: 'brown',
            shoesize: 6,
            price: '1200',
            quantity: 3
        });

        
    });
});

describe("The update shoe function", () => {
    beforeEach(async () => {
        await pool.query('DELETE FROM shoe_basket');
        await pool.query('DELETE FROM shoes');
        await shoppingService.addShoe('Nike', 'white', 7, 800, 3);
    });
    it("Should update shoe that already exist", async () => {
        let addedShoe = await shoppingService.addShoe('Nike','white',7,800,3);
        
        assert.equal(addedShoe, ' shoe updated');
    })
});


describe("The add shoe function", () => {
    beforeEach(async () => {
         await pool.query('DELETE FROM shoe_basket');
        await pool.query('DELETE FROM shoes');
        await shoppingService.addShoe('Nike', 'black', 7, 800, 3);
    });
    it("Should add new shoe", async () => {
        let addedShoe = await shoppingService.addShoe('Nike','white',7,600,3);
        assert.equal(addedShoe, 'shoe added');
    })
});

describe('The add to cart function', () => {
    beforeEach(async () => {
        await pool.query('DELETE FROM shoe_basket');
        await pool.query('DELETE FROM shoes');
        await shoppingService.addShoe('Nike', 'black', 7, 900, 3);
    });
    it("Should add shoe into a shopping cart only if shoe does not exist", async () => {
         let shoeID = await shoppingService.allShoes();
          let findID = shoeID[0].id;
         let cart = await cartService.addToShoppingCart(findID);
          
        assert.equal(cart,true);
    })
})


describe('The update item on cart ', () => {
    beforeEach(async () => {
        await pool.query('DELETE FROM shoe_basket');
        await pool.query('DELETE FROM shoes');
        await shoppingService.addShoe('Nike', 'black', 7, 900, 3);
    });
    it("Should add shoe into a shopping cart only if shoe does not exist", async () => {
         let shoeID = await shoppingService.allShoes();
          let findID = shoeID[0].id;
          await cartService.addToShoppingCart(findID);
         await cartService.addToShoppingCart(findID);
      
    })
})

describe('Total of a cart ', () => {
    beforeEach(async () => {
        await pool.query('DELETE FROM shoe_basket');
        await pool.query('DELETE FROM shoes');
        await shoppingService.addShoe('Nike', 'black', 7, 900, 3);
    });
    it("Should return 0.00 if cart is not empty", async () => {
         let shoeID = await shoppingService.allShoes();
          let findID = shoeID[0].id;
          await cartService.addToShoppingCart(findID);
         await cartService.addToShoppingCart(findID);

         let total = await cartService.total();
        assert.equal(total,1800);
    })
})


describe('Total of a cart if its empty', () => {
    beforeEach(async () => {
        await pool.query('DELETE FROM shoe_basket');
        await pool.query('DELETE FROM shoes');
    });
    it("Should return 0.00 if cart is empty", async () => {
    
         let total = await cartService.total();
         console.log(total);
        assert.equal(total,0);
    })
})

describe('View all Items from a cart', () => {
    beforeEach(async () => {
        await pool.query('DELETE FROM shoe_basket');
        await pool.query('DELETE FROM shoes');
    });
    it('Should get all the items from shopping cart if cart is empty should return shopping cart is empty!!! ',async()=> {
        let clearCart = await cartService.cartItems();
         assert.equal(clearCart,'Shopping cart is empty!!!!')
    })
})

describe('remove Items from cart', () => {
    beforeEach(async () => {
        await pool.query('DELETE FROM shoe_basket');
        await pool.query('DELETE FROM shoes');
    });
    it('Should remove all the items from shopping cart',async()=> {
        let clearCart = await cartService.clearCart();
         assert.equal(clearCart,'shopping cart is empty!!!')
    })

    it('Should remove all the items from shopping cart',async()=> {
        await shoppingService.addShoe('Nike', 'black', 7, 900, 3);
        let shoeID = await shoppingService.allShoes();
        let findID = shoeID[0].id;
         await cartService.addToShoppingCart(findID);
          let clearCart = await cartService.clearCart();
         assert.equal(clearCart,true)
    })
})

after(async () => {
    await pool.end();
});