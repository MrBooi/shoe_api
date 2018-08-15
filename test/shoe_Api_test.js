'use strict';
let assert = require('assert');
const pg = require('pg');
const Pool = pg.Pool;

let useSSL = false;
if (process.env.DATABASE_URL) {
    useSSL = true;
}

const connectionString = process.env.DATABASE_URL || 'postgresql://coder:coder123@localhost:5432/shoe_api_test';

const pool = new Pool({
    connectionString,
    ssl: useSSL
})


const Shoe = require('../shoe_api.js');
let shoetest = Shoe(pool);
describe('The available shoes function', () => {
    it('should add all the weekdays', async () => {
        assert.deepEqual(await shoetest.allShoes(), [{
                "brand": "Adidas",
                "color": "brown",
                "id": 1,
                "price": "2400",
                "quantity": 7,
                "shoesize": 6
            },
            {
                "brand": "Le coq",
                "color": "white",
                "id": 2,
                "price": "1500",
                "quantity": 6,
                "shoesize": 5
            },
            {
                "brand": "Nike",
                "color": "black",
                "id": 3,
                "price": "800",
                "quantity": 6,
                "shoesize": 7
            },
            {
                "brand": "Adidas",
                "color": "white",
                "id": 4,
                "price": "2400",
                "quantity": 7,
                "shoesize": 7
            },
            {
                "brand": "Le coq",
                "color": "blue",
                "id": 5,
                "price": "1500",
                "quantity": 6,
                "shoesize": 7
            },
            {
                "brand": "Nike",
                "color": "brown",
                "id": 6,
                "price": "650",
                "quantity": 6,
                "shoesize": 7
            }
        ]);

    });
});

describe("The fillter function", () => {
    it("Should filter by brandName and return all shoes that matches that brand", async () => {
        let findshoe = "Nike";

        let foundShoes = await shoetest.findByBrand(findshoe);
        assert.deepEqual(foundShoes, [{
                "brand": "Nike",
                "color": "black",
                "id": 3,
                "price": "800",
                "quantity": 6,
                "shoesize": 7
            }, {
                "brand": "Nike",
                "color": "brown",
                "id": 6,
                "price": "650",
                "quantity": 6,
                "shoesize": 7
            }

        ])
    })
});

describe("The fillter function", () => {
    it("Should filter by Size and return all shoes that matches that Size", async () => {
        let shoeSize= 6;
        let foundShoes = await shoetest.findBySize(shoeSize);
        assert.deepEqual(foundShoes, [{
                "brand": "Adidas",
                "color": "brown",
                "id": 1,
                "price": "2400",
                "quantity": 7,
                "shoesize": 6
            }
           

        ])
    })
});

describe("The fillter function", () => {
    it("Should filter by brand and size and return all shoes that matches that brand and size", async () => {
        let shoeSize= 6;
        let brandName = 'Adidas';

        let foundShoes = await shoetest.findBybrandAndSize(brandName,shoeSize);
        assert.deepEqual(foundShoes, [{
                "brand": "Adidas",
                "color": "brown",
                "id": 1,
                "price": "2400",
                "quantity": 7,
                "shoesize": 6
            }
           

        ])
    })
});


// describe("The add shoe function", () => {
//     it("Should add new shoe", async () => {
//         let addedShoe = await shoetest.addShoe('Nike','white',7,550,3);
//         assert.equal(addedShoe, true);
//     })
// });

after(async () => {
    await pool.end();
});