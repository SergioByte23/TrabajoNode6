const request = require('supertest')
const app = require('../app')

let id;
let token;

beforeAll(async ()=>{
    const res= await request(app).post('/users/login').send({
        email:'test@gmail.com',
        password:'test1234',
    });
    token=res.body.token;
})

test('GET /cities debe traer las ciudades ', async () => { 
    const res =await request(app)
    .get('/cities');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);

})

test("POST /cities debe crear una ciudad", async () => {
    const body = {
        name: "Guadalajara",
        country: "México",
        countryId:'MX',        
    }
    
    const res = await request(app).post("/cities").send(body)
    .set('Authorization', `Bearer ${token}`);

	id =res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.name).toBe(body.name);
    expect(res.body.id).toBeDefined();
});

test("PUT /cities/:id actualizar datos de una ciudad", async () => {
    const body = {
        name: "Guadalajara actualizado",
        }  
    
    const res = await request(app)
    .put(`/cities/${id}`)    
    .send(body)
    .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(body.name);
});

test("DELETE/cities/:id debe eliminar una ciudad", async () => {
    const res = await request(app).delete(`/cities/${id}`)
    .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});
