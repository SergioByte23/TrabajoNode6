const request = require('supertest')
const app = require('../app')

let id;
let token;

test("POST /users debe crear un usuario", async () => {
    const body = {
        firstName: "Karlo",
        lastName: "Maco",
        email:'karlo@gmail.com',
        password: 'karlo1234',
        gender:'MALE',
    }
    
    const res = await request(app).post("/users").send(body);
	id =res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.firstName).toBe(body.firstName);
    expect(res.body.id).toBeDefined();
});

test("Post /users/login debe hacer un login", async () => {
    const body ={
        email:'karlo@gmail.com',
        password: 'karlo1234',
    }
    const res = await request(app).post(`/users/login`).send(body);
    token=res.body.token;
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.email).toBe(body.email);

});


test('GET /users debe traer los usuarios ', async () => { 
    const res =await request(app)
    .get('/users')
    .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);

})


test("PUT /users/:id actualizar datos de un usuario", async () => {
    const body = {
        firstName: "Karlo actualizado",
        }  
    
    const res = await request(app)
    .put(`/users/${id}`)    
    .send(body)
    .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(body.firstName);
});


test("Post /users/login con credenciales invalidas", async () => {
    const body ={
        email:'incorrecto@gmail.com',
        password: 'incorrecto1234',
    }
    const res = await request(app).post(`/users/login`).send(body);
    expect(res.status).toBe(401);
    

});

test("DELETE/users/:id debe eliminar un usuario", async () => {
    const res = await request(app).delete(`/users/${id}`)
    .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});