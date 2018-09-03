const request = require('supertest');
const assert = require('assert');

const baseURL = 'http://localhost:3000';


describe('GET /api/shoes', function () {
    it('respond with json', () => {
        request(baseURL)
            .get('/api/shoes')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(result =>{
                assert.deepEqual(result.body.status,'success');
            })
    });
});

describe('post /api/shoes', function () {
  
    it('respond with json', ()=> {
        let newShoe = {
            brand: 'Puma',
            color: 'black',
            shoeSize: 1,
            quantity: 2,
            price: 850
        }
        request(baseURL)
            .post('/api/shoes')
            .send(newShoe)
            .set('Accept', 'application/json')
            .expect(200)
            .then(result =>{
                assert.equal(result.body.status,'success');
            })
            
            
    });
});

describe('GET /api/shoes/brand/:brandname', function () {
   
    it('respond with json', function () {
        let brand ='Nike';
        request(baseURL)
            .get(`/api/shoes/brand/${brand}`)
            .set('Accept', 'application/json')
            .expect(200)
            .then(result=>{
                assert.deepEqual(result.body.status,'success');
                assert.deepEqual(result.body.data[0].brand,brand)
            })
    });
});

describe('GET /api/shoes/size/:size',function () {
    it('respond with json', function () {
        let size =8;
        request(baseURL)
            .get(`/api/shoes/size/${size}`)
            .set('Accept', 'application/json')
            .expect(200)
             .then(result =>{
                 assert.deepEqual(result.body.status,'success');
                 assert.deepEqual(result.body.data[0].shoesize,size);
                 assert.deepEqual(result.body.data.length,2);
             })
    });
})

describe('GET /api/shoes/brand/:brandname/size/:size',function () {
    it('respond with json', function () {
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
            .expect(200)
            .then(result=>{
                assert.equal(result.body.status,'success');
            })
            
    });
})

// // // Shopping cart

// describe('POST /api/shoes/cart/:id',function () {
//     it('respond with json', function (done) {
//         let id =1;
//         let found = {status: 'success', data: true}
//         request(baseURL)
//             .post(`/api/shoes/cart/${id}`)
//             .set('Accept', 'application/json')
//             .expect(200)
//             .end(function (err, res) {
//                 if (err) return done(err);
//                 done();
//             })
//     });

// })





