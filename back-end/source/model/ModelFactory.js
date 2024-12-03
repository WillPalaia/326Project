import InMemoryTaskModel from "./InMemoryTaskModel.js";
import SQLiteTaskModel from "./SQLiteTaskModel.js";

class _ModelFactory {
  async getModel(model = "sqlite") {
    if (model === "sqlite") {
      return SQLiteTaskModel;
    } else if (model === "sqlite-fresh") {
      await SQLiteTaskModel.init(true);
      return SQLiteTaskModel;
    } else {
      return InMemoryTaskModel;
    }
  }
}

const ModelFactory = new _ModelFactory();
export default ModelFactory;
