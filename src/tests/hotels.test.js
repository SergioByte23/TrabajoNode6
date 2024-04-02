const request = require('supertest')
const app = require('../app');
const Hotels = require('../models/Hotels');

let id;
let token;

beforeAll(async ()=>{
    const res= await request(app).post('/users/login').send({
        email:'test@gmail.com',
        password:'test1234',
    });
    token=res.body.token;
})

test('GET /hotels debe traer los hoteles ', async () => { 
    const res =await request(app).get('/hotels');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);

})


test("POST /hotels debe crear un hotel", async () => {
    const body = {
    name: "Los Angeles",
    description: "Hotel prestigioso",
    price: 50,
    address: "Tupac Amaruc",
    // cityId:1,
    lat: 40.76534500465579,
    lon: -73.97599920355094       
    }
    
    const res = await request(app).post("/hotels").send(body)
    .set('Authorization', `Bearer ${token}`);

	id =res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.name).toBe(body.name);
    expect(res.body.id).toBeDefined();
});

test("PUT /hotels/:id actualizar datos de un hotel", async () => {
    const body = {
        name: "Los Angeles actualizado",
        }  
    
    const res = await request(app)
    .put(`/hotels/${id}`)    
    .send(body)
    .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(body.name);
});

test("DELETE/hotels/:id debe eliminar un hotel", async () => {
    const res = await request(app).delete(`/hotels/${id}`)
    .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});
