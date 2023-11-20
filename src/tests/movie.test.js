const request = require("supertest");
const app = require("../app");
const Actor = require("../models/Actor");
const Director = require("../models/Director");
const Genre = require("../models/Genre");
require("../models");
let id;
test("GET/movies", async () => {
  const res = await request(app).get("/movies");
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});
test("POST/movies", async () => {
  const movie = {
    name: "El conjuro",
    image: "https://image-theConjur",
    sypnopsis:
      "Basada en hechos reales. Narra los encuentros sobrenaturales que vivió la familia Perron en su casa de Rhode Island a principios de los 70. Ed y Lorraine Warren, investigadores de renombre en el mundo de los fenómenos paranormales, acuden a la llamada de una familia aterrorizada por la presencia en su granja de un ser maligno",
    releaseYear: 2013,
  };
  const res = await request(app).post("/movies").send(movie);
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.name).toBe(movie.name);
});
test("PUT/movies/:id", async () => {
  const movie = {
    name: "El conjuro 1",
  };
  const res = await request(app).put(`/movies/${id}`).send(movie);
  expect(res.status).toBe(200);
  expect(res.body.name).toBe(movie.name);
});

test("POST/movies/:id/actors", async () => {
  const actor = await Actor.create({
    firstName: "Patrick",
    lastName: "Wilson",
    nationality: "Estados Unidos",
    image: "http://photo-Actors.png",
    birthday: "1973-09-09",
  });
  const res = await request(app).post(`/movies/${id}/actors`).send([actor.id]);
  await actor.destroy();
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("POST/movies/:id/directors", async () => {
  const director = await Director.create({
    firstName: "Michale",
    lastName: "Chaves",
    nationality: "Estados Unidos",
    image: "http://photo-Actors.png",
    birthday: "1982-09-09",
  });
  const res = await request(app)
    .post(`/movies/${id}/directors`)
    .send([director.id]);
  await director.destroy();
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});
test("POST/movies/:id/genres", async () => {
  const genre = await Genre.create({
    name: "Drama",
  });
  const res = await request(app).post(`/movies/${id}/genres`).send([genre.id]);
  await genre.destroy();
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("DELETE/movies/:id", async () => {
  const res = await request(app).delete(`/movies/${id}`);
  expect(res.status).toBe(204);
});
