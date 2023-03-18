const request = require("supertest");
const baseURL = "http://localhost:4000/api";

describe("GET /api/todos", () => {
  const newTodo = {
    id: 12,
    todoName: "Drink water",
    done: false,
  }
  beforeAll(async () => {
    await request(baseURL).post("/addTodo").send(newTodo);
  })
  afterAll(async () => {
    await request(baseURL).delete(`/todo/${newTodo.id}`)
  })
  test("GET should return 200", async () => {
    const response = await request(baseURL).get("/todos");
    expect(response.statusCode).toBe(200);
  });
  test("GET should return todos", async () => {
    const response = await request(baseURL).get("/todos");
    expect(response.body.length >= 1).toBe(true);
  });
});

describe("PUT /todo/:id", () => {
  const newTodo = {
    id: 17,
    todoName: "Wash the dishes",
    done: false,
  }
  beforeAll(async () => {
    await request(baseURL).post("/addTodo").send(newTodo);
  });
  test("PUT should change a record", async () => {
    const response = await request(baseURL).put(`/todo/${newTodo.id}`).send(newTodo);
    expect(response.body.message).toBe("Updated Successfully!");
  })
})