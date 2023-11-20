const request= require("supertest");
const app= require("../app");
require("../models")
let id;
test('GET/directors', async () => {
    const res = await request(app).get("/directors")
    expect(res.status).toBe(200)
    expect(res.body).toBeInstanceOf(Array)
 })
 test('POST/actors', async () => { 
    const director={
        firstName:"Michael",
        lastName:"Chaves",
        nationality:"Estados Unidos",
        image:"https://image",
        birthday:"1984-10-03"
    }
    const res= await request(app).post("/directors").send(director)
    id=res.body.id
    expect(res.status).toBe(201)
    expect(res.body.id).toBeDefined()
    expect(res.body.firstName).toBe(director.firstName)
})
test('PUT/directors', async () => { 
    const director={
        firstName:"Michael Actualizado"
    }
    const res= await request(app).put(`/directors/${id}`).send(director)
   expect(res.status).toBe(200);
   expect(res.body.firstName).toBe(director.firstName);
  })
  test ("DELETE/actors/:id", async()=>{
    const res= await request(app).delete(`/directors/${id}`)
    expect(res.status).toBe(204)
 })