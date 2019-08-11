import request from "supertest";
import app from "../app";
import { SetupTest, createCats, getACat } from "./setup/setup";

const setupTest = new SetupTest();

beforeEach(async done => {
  await setupTest.initAndConnectToMongodbTest();
  await createCats();
  done();
});

describe("GET /cats", () => {
  it("should return cats", async () => {
    const response = await request(app).get(`/v1/cats`);

    expect(response.status).toBe(200);
    expect(response.body[0]).toMatchSnapshot({
      _id: expect.any(String),
      id: expect.any(String),
      url: expect.any(String),
    });
  });
});

describe("GET /cats/versus", () => {
  it("should return 2 cats", async () => {
    const response = await request(app).get(`/v1/cats/versus`);

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
    expect(response.body[0]).toMatchSnapshot({
      _id: expect.any(String),
      id: expect.any(String),
      url: expect.any(String),
    });
  });
});

describe("PUT /cats/:id/vote", () => {
  it("should add a vote to the cat", async () => {
    const cat = await getACat();
    const response = await request(app).put(`/v1/cats/${cat._id}/vote`);

    expect(response.status).toBe(200);
    expect(response.body).toMatchSnapshot({
      _id: expect.any(String),
      id: expect.any(String),
      url: expect.any(String),
      votes: cat.votes + 1,
    });
  });

  it("should a 500 if the requested id is not a valid ObjectId", async () => {
    const cat = await getACat();
    const response = await request(app).put(`/v1/cats/nonexistingid/vote`);

    expect(response.status).toBe(500);
    expect(response.body).toMatchSnapshot({});
  });

  it("should a 404 if the requested id does not exist", async () => {
    const cat = await getACat();
    const response = await request(app).put(
      `/v1/cats/507f191e810c19729de860ea/vote`,
    );

    expect(response.status).toBe(404);
    expect(response.body).toMatchSnapshot({});
  });
});

afterEach(async done => {
  await setupTest.disconnectAndStopMongodb();
  done();
});
