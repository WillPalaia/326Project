import { TaskRepositoryService } from "./TaskRepositoryService.js";
import { TaskRepositoryRemoteFakeService } from "./TaskRepositoryRemoteFakeService.js";

/**
 * Factory class to create instances of task repository services.
 * 
 * This class provides a static method to get an appropriate instance
 * of a task repository service based on the specified repository type.
 * It cannot be instantiated.
 */
export class TaskRepositoryFactory {
  constructor() {
    throw new Error('Cannot instantiate a TaskRepositoryFactory object');
  }

  /**
   * Returns an instance of a task repository service based on the given
   * repository type.
   *
   * @param {string} [repoType='local'] - The type of repository service to
   * create. Can be 'local' or 'remote'.
   * @returns {TaskRepositoryService|TaskRepositoryServerRemote} An instance
   * of the appropriate task repository service.
   * @throws Will throw an error if the repository type is not recognized.
   */
  static get(repoType = 'local') {
    if (repoType === 'local') {
      return new TaskRepositoryService();
    }
    else if (repoType === 'remote') {
      return new TaskRepositoryRemoteFakeService();
    }
    else {
      throw new Error('Invalid repository type');
    }
  }
}
