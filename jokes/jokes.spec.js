const request = require('supertest');

const server = require("../api/server");
const dbConfig = require('../database/dbConfig');

beforeEach(async () => {
    await dbConfig.seed.run()
})

afterAll(async () => {
    await dbConfig.destroy();
})
describe('jokes', () => {
    it("should return 401 if not logged in", async () => {
        const expectedStatusCode = 401;
        await request(server).get("/api/auth/logout")
        const res = await request(server)
            .get("/api/jokes")
        // console.log("res", res);
        expect(res.statusCode).toBe(expectedStatusCode) 
        // expect(1).toBe(1)

    })
    it("should return 200 if user is logged in", async () => {
        const expectedStatusCode = 200;
        await request(server)
            .post("/api/auth/login")
            .send({username: "User1", password: "password"})
            .expect(200)
            .then( async() => {
                const res = await request(server)
                .get("/api/jokes")
        
                expect(res.statusCode).toBe(expectedStatusCode) 
        })
        //!!! I don't understand how to make it wait
        

    })
})

