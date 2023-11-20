const request = require("supertest");
const app = require("../app");
require("../models");
let id;
test("GET/actors", async () => {
  const res = await request(app).get("/actors");
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});
test("POST/actors", async () => {
  const actor = {
    firstName: "Lauren",
    lastName: "Esposito",
    nationality: "Estados Unidos",
    image: "https://image",
    birthday: "1997-09-12",
  };
  const res = await request(app).post("/actors").send(actor);
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.firstName).toBe(actor.firstName);
});
test("PUT/actors/:id", async () => {
  const actor = {
    firstName: "Lauren Actualizada",
  };
  const res = await request(app).put(`/actors/${id}`).send(actor);
  expect(res.status).toBe(200);
  expect(res.body.firstName).toBe(actor.firstName);
});
test("DELETE/actors/:id", async () => {
  const res = await request(app).delete(`/actors/${id}`);
  expect(res.status).toBe(204);
});
