const request = require('supertest');

const server = require("../api/server");
const dbConfig = require('../database/dbConfig');

beforeEach(async () => {
    await dbConfig.seed.run()
})

afterAll(async () => {
    await dbConfig.destroy();
})
describe('login', () => {
    it("should return 401 if user does not exist", async () => {
        const expectedStatusCode = 401;
        console.log("Inside first test");
        const res = await request(server)
            .post("/api/auth/login")
            .send({username: "fakeUser", password: "password"})
        // console.log("res", res);
        expect(res.statusCode).toBe(expectedStatusCode) 
        // expect(1).toBe(1)

    })
    it("should return 200 if user logs in", async () => {
        const expectedStatusCode = 200;
        console.log("Inside second test");
        const res = await request(server)
            .post("/api/auth/login")
            .send({username: "User4", password: "password"})
        // console.log("res", res);
        expect(res.statusCode).toBe(expectedStatusCode) 
        // expect(1).toBe(1)
         await request(server)
            .get("/api/auth/logout")

    })
})

describe('register', () => {
    it("should return 409 if user already exists", async () => {
        const expectedStatusCode = 409;
        const res = await request(server)
            .post("/api/auth/register")
            .send({username: "User1", password: "password"})
        // console.log("res", res);
        expect(res.statusCode).toBe(expectedStatusCode) 
        // expect(1).toBe(1)

    })
    it("should return 200 if user registers", async () => {
        const expectedStatusCode = 201;
        const res = await request(server)
            .post("/api/auth/register")
            .send({username: "User11", password: "password"})
        // console.log("res", res);
        expect(res.statusCode).toBe(expectedStatusCode) 
        // expect(1).toBe(1)
         

    })
})