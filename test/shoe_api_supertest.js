const request = require('supertest');
const assert = require('assert');

const baseURL = process.env.PORT  ||'http://localhost:3000';


describe('GET /api/shoes', function () {
    it('respond with status of success if everything went well', (done) => {
        request(baseURL)
            .get('/api/shoes')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(result =>{
                assert.deepEqual(result.body.status,'success');
            })
            .end(done())
    });
});

describe('post /api/shoes', function () {
  
    it('should add shoe into a shopping list and return status of success', (done)=> {
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
            .then(done())
            
            
    });
});

describe('GET /api/shoes/brand/:brandname', function () {
   
    it('should return status of success and brand name should be equal to Nike', function (done) {
        let brand ='Nike';
        request(baseURL)
            .get(`/api/shoes/brand/${brand}`)
            .set('Accept', 'application/json')
            .expect(200)
            .then(result=>{
                assert.deepEqual(result.body.status,'success');
                assert.deepEqual(result.body.data[0].brand,brand)
            })
            .then(done())
    });
});

describe('GET /api/shoes/size/:size',function () {
    it('should return status of success and size equal to 8', function (done) {
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
             .then(done())
    });
})

describe('GET /api/shoes/brand/:brandname/size/:size',function () {
    it('should return status of success, size equal to 8 and brand equal to Nike',(done)=> {
        let size =8;
        let brand = 'Nike'
        request(baseURL)
            .get(`/api/shoes/brand/${brand}/size/${size}`)
            .set('Accept', 'application/json')
            .expect(200)
            .then(result=>{
                assert.equal(result.body.status,'success');
                assert.equal(result.body.data[0].brand,'Nike');
                assert.equal(result.body.data[0].shoesize,8);
                assert.equal(result.body.data.length,1);
            })
            .then(done())
            
    });
})

 // Shopping cart

 describe('GET /api/view_cart',function () {
    it('respond with json',  (done) =>{
        request(baseURL)
            .get(`/api/view_cart`)
            .set('Accept', 'application/json')
            .expect(200)
            .then(result=>{
            assert.equal(result.body.status,'success');
            })
            .then(done())
    });
})

describe('GET /api/cart/total',function () {
    it('respond with json', function (done) {
        request(baseURL)
            .get('/api/cart/total')
            .set('Accept', 'application/json')
            .expect(200)
            .then(result=>{
            assert.equal(result.body.status,'success');
            })
            .then(done())
    });
})

describe('POST /api/shoes/cart/:id',function () {
    it('respond with json', function (done) {
        let id =3;
        let found = {status: 'success', data: true}
        request(baseURL)
            .post(`/api/shoes/cart/${id}`)
            .set('Accept', 'application/json')
            .expect(200)
            .then(result=>{
            assert.equal(result.body.status,'success');
            })
            .then(done())
    });
})


describe('GET /api/remove_cart',function () {
    it('respond with json', function (done) {
        let id =3;
        let found = {status: 'success', data: true}
        request(baseURL)
            .post(`/api/shoes/cart/${id}`)
            .set('Accept', 'application/json')
            .expect(200)
            .then(result=>{
            assert.equal(result.body.status,'success');
            })
            .then(done())
    });
})


describe('GET /api/remove_cart',function () {
    it('respond with json', function (done) {
        let id =3;
        let found = {status: 'success', data: true}
        request(baseURL)
            .get('/api/remove_cart')
            .set('Accept', 'application/json')
            .expect(200)
            .then(result=>{
            assert.equal(result.body.status,'success');
            })
            .then(done())
    });
})







