const request = require('supertest');
const baseURL = 'http://localhost:3000';

// describe('GET /api/shoes', function () {

//     const result = {
//         status: 'success',
//         data: [{
//                 id: 11,
//                 brand: 'Le coq',
//                 color: 'Black',
//                 shoesize: 6,
//                 price: '350',
//                 quantity: 1
//             },
//             {
//                 id: 12,
//                 brand: 'Adidas',
//                 color: 'White',
//                 shoesize: 6,
//                 price: '350',
//                 quantity: 3
//             },
//             {
//                 id: 6,
//                 brand: 'Nike',
//                 color: 'brown',
//                 shoesize: 7,
//                 price: '650',
//                 quantity: 6
//             },
//             {
//                 id: 13,
//                 brand: 'Le coq',
//                 color: 'Black',
//                 shoesize: 7,
//                 price: '500',
//                 quantity: 3
//             },
//             {
//                 id: 14,
//                 brand: 'Adidas',
//                 color: 'Black',
//                 shoesize: 7,
//                 price: '1200',
//                 quantity: 3
//             },
//             {
//                 id: 4,
//                 brand: 'Adidas',
//                 color: 'white',
//                 shoesize: 7,
//                 price: '2400',
//                 quantity: 7
//             },
//             {
//                 id: 8,
//                 brand: 'Nike',
//                 color: 'Brown',
//                 shoesize: 7,
//                 price: '2000',
//                 quantity: 2
//             },
//             {
//                 id: 3,
//                 brand: 'Nike',
//                 color: 'black',
//                 shoesize: 7,
//                 price: '800',
//                 quantity: 6
//             },
//             {
//                 id: 15,
//                 brand: 'Nike',
//                 color: 'Blue',
//                 shoesize: 8,
//                 price: '1200',
//                 quantity: 1
//             },
//             {
//                 id: 16,
//                 brand: 'Nike',
//                 color: 'Black',
//                 shoesize: 6,
//                 price: '11',
//                 quantity: 1
//             },
//             {
//                 id: 10,
//                 brand: 'Adidas',
//                 color: 'Blue',
//                 shoesize: 8,
//                 price: '500',
//                 quantity: 2
//             },
//             {
//                 id: 9,
//                 brand: 'Le coq',
//                 color: 'White',
//                 shoesize: 6,
//                 price: '12',
//                 quantity: 3
//             },
//             {
//                 id: 5,
//                 brand: 'Le coq',
//                 color: 'blue',
//                 shoesize: 7,
//                 price: '1500',
//                 quantity: 6
//             },
//             {
//                 id: 1,
//                 brand: 'Adidas',
//                 color: 'brown',
//                 shoesize: 6,
//                 price: '2400',
//                 quantity: 7
//             },
//             {
//                 id: 2,
//                 brand: 'Le coq',
//                 color: 'white',
//                 shoesize: 5,
//                 price: '1500',
//                 quantity: 6
//             },
//             {
//                 id: 7,
//                 brand: 'Adidas',
//                 color: 'Blue',
//                 shoesize: 6,
//                 price: '450',
//                 quantity: 1
//             }
//         ]
//     };

//     it('respond with json', function (done) {
//         request(baseURL)
//             .get('/api/shoes')
//             .set('Accept', 'application/json')
//             .expect('Content-Type', /json/)
//             .expect(result)
//             .expect(200, done)
//     });
// });



// describe('post /api/shoes', function () {
//     let newShoe = {
//         brand: 'Puma',
//         color: 'black',
//         shoeSize: 1,
//         quantity: 2,
//         price: 850
//     }
//     it('respond with json', function (done) {
//         request(baseURL)
//             .post('/api/shoes')
//             .send(newShoe)
//             .set('Accept', 'application/json')
//             .expect(newShoe)
//             .expect(200)
//             .end(function (err, res) {
//                 if (err) return done(err);
//                 done();
//             })
//     });
// });


describe('GET /api/shoes/brand/:brandname', function () {
    let newShoe = {
        brand: 'Puma',
        color: 'black',
        shoeSize: 1,
        quantity: 2,
        price: 850
    }
    it('respond with json', function (done) {
        let brand ='Nike';
        const found = { status: 'success',
        data: 
         [ { id: 6,
             brand: 'Nike',
             color: 'brown',
             shoesize: 7,
             price: '650',
             quantity: 6 },
           { id: 8,
             brand: 'Nike',
             color: 'Brown',
             shoesize: 7,
             price: '2000',
             quantity: 2 },
           { id: 3,
             brand: 'Nike',
             color: 'black',
             shoesize: 7,
             price: '800',
             quantity: 6 },
           { id: 15,
             brand: 'Nike',
             color: 'Blue',
             shoesize: 8,
             price: '1200',
             quantity: 1 },
           { id: 16,
             brand: 'Nike',
             color: 'Black',
             shoesize: 6,
             price: '11',
             quantity: 1 } ] }
      
        request(baseURL)
            .get(`/api/shoes/brand/${brand}`)
            .set('Accept', 'application/json')
            .expect(found)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            })
    });
});


describe('GET /api/shoes/size/:size',function () {
    it('respond with json', function (done) {
        let size =8;
        let found ={ status: 'success',
        data: 
         [ { id: 15,
             brand: 'Nike',
             color: 'Blue',
             shoesize: 8,
             price: '1200',
             quantity: 1 },
           { id: 10,
             brand: 'Adidas',
             color: 'Blue',
             shoesize: 8,
             price: '500',
             quantity: 2 } ] }
      
        request(baseURL)
            .get(`/api/shoes/size/${size}`)
            .set('Accept', 'application/json')
            .expect(found)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            })
    });
})

describe('GET /api/shoes/brand/:brandname/size/:size',function () {
    it('respond with json', function (done) {
        let size =8;
        let brand = 'Nike'
        let found ={ status: 'success',
        data: 
         [ { id: 15,
             brand: 'Nike',
             color: 'Blue',
             shoesize: 8,
             price: '1200',
             quantity: 0 } ] }
      
        request(baseURL)
            .get(`/api/shoes/brand/${brand}/size/${size}`)
            .set('Accept', 'application/json')
            .expect(found)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            })
    });
})

// Shopping cart

describe('POST /api/shoes/cart/:id',function () {
    it('respond with json', function (done) {
        let id =1;
        let found = {status: 'success', data: true}
        request(baseURL)
            .post(`/api/shoes/cart/${id}`)
            .set('Accept', 'application/json')
            .expect(found)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            })
    });

})


// app.get('/api/view_cart',shoppingCartRoutes.view_cart);
// app.get('/api/cart/total',shoppingCartRoutes.cartTotal);
// app.post('/api/shoes/cart/:id',shoppingCartRoutes.addToCart);
// app.get('/api/remove_cart',shoppingCartRoutes.deleteCartItems);