import request from "supertest";
import app from "../server.js";

describe("Travel Journal API - GET endpoints", () => {
  it("GET / should return API running message", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Travel Journal API is running");
  });

  it("GET /users/profile should require authentication", async () => {
    const res = await request(app).get("/users/profile");
    expect([401, 403]).toContain(res.statusCode);
  });

  it("GET /trips should require authentication", async () => {
    const res = await request(app).get("/trips");
    expect([401, 403]).toContain(res.statusCode);
  });

  it("GET /trips/:id should return 404 for a non-existent trip", async () => {
    const fakeId = "000000000000000000000000"; // Fake MongoDB ID
    const res = await request(app).get(`/trips/${fakeId}`);
    expect([401, 403, 404]).toContain(res.statusCode);
  });

  it("GET /destinations should return all destinations", async () => {
    const res = await request(app).get("/destinations");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("GET /destinations/:id should return 404 for a non-existent destination", async () => {
    const fakeId = "000000000000000000000000"; // Fake MongoDB ID
    const res = await request(app).get(`/destinations/${fakeId}`);
    expect([404, 500]).toContain(res.statusCode);
  });

  it("GET /journals should require authentication", async () => {
    const res = await request(app).get("/journals");
    expect([401, 403]).toContain(res.statusCode);
  });
});
