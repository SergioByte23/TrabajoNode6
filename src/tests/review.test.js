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

test('GET /reviews debe traer las review ', async () => { 
    const res =await request(app).get('/reviews');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Object);

})

test("POST /reviews debe crear una review", async () => {
    const body = {        
            rating: 4,
            comment: "excelente",  
    }
    
    const res = await request(app).post("/reviews").send(body)
    .set('Authorization', `Bearer ${token}`);
console.log(res.body);
	id =res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.rating).toBe(body.rating);
    expect(res.body.id).toBeDefined();
});
test("PUT /reviews/:id debe actualizar reviews", async () => {
    const body = {       
        rating: 5,    
    }
    
    const res = await request(app).put(`/reviews/${id}`).send(body)
    .set('Authorization', `Bearer ${token}`);
	
    expect(res.status).toBe(200);
    expect(res.body.rating).toBe(body.rating);
    
});

test("DELETE/reviews/:id debe eliminar una review", async () => {
    const res = await request(app).delete(`/reviews/${id}`)
    .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});
