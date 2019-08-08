import request from "supertest";
import app from "../app";
import { SetupTest, createCats } from "./setup/setup";

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
      _id: expect.any(String)
    });
  });
});

afterEach(async done => {
  await setupTest.disconnectAndStopMongodb();
  done();
});
