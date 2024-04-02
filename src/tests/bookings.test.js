const request = require('supertest')
const app = require('../app');
const { ARRAY } = require('sequelize');

let id;
let token;

beforeAll(async ()=>{
    const res= await request(app).post('/users/login').send({
        email:'test@gmail.com',
        password:'test1234',
    });
    token=res.body.token;
})

test('GET /bookings debe traer las bookings ', async () => { 
    const res =await request(app).get('/bookings').set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);


})

test("POST /bookings debe crear una bookings", async () => {
    const body = {        
        checkIn: "2024-04-06",
        checkOut: "2024-09-09",    
                  
    }
    
    const res = await request(app).post("/bookings").send(body)
    .set('Authorization', `Bearer ${token}`);

	id =res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.rating).toBe(body.rating);
    expect(res.body.id).toBeDefined();
});

// test("PUT /bookings/:id debe actualizar bookings", async () => {
//     const body = {        
//         checkIn: "2024-04-08",    
                  
//     }
    
//     const res = await request(app).put(`/bookings/${id}`).send(body)
//     .set('Authorization', `Bearer ${token}`);
	
//     expect(res.status).toBe(200);
//     expect(res.body.checkIn).toBe(body.checkIn);
    
// });

test("DELETE/bookings/:id debe eliminar un bookings", async () => {
    const res = await request(app).delete(`/bookings/${id}`)
    .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});
