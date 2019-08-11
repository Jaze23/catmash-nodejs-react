import "reflect-metadata";
import { MongoMemoryServer } from "mongodb-memory-server";
import { connect, disconnect } from "mongoose";
import catSchema from "../../api/cats/schemas/cat.schema";
import { Cat } from "../../api/cats/schemas/cat.interface";
const cats = require("../../../cats.json");

class SetupTest {
  mongod: MongoMemoryServer;

  public constructor() {
    this.mongod = new MongoMemoryServer({ instance: { dbName: "tunzup" } });
  }

  public async initAndConnectToMongodbTest() {
    const uri = await this.mongod.getConnectionString();

    // Connect to mongoose database
    await connect(
      uri,
      { useNewUrlParser: true, useCreateIndex: true },
    );
  }

  public async disconnectAndStopMongodb() {
    await disconnect();
    await this.mongod.stop();
  }
}
const createCats = async () => {
  // Do stuff
  catSchema.create(cats.images);
};

const getACat = async () => {
  const cat = await catSchema.find({});
  return (await catSchema.find().limit(1))[0]!;
};

export { SetupTest, createCats, getACat };
