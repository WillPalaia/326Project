/**
 * An object containing various message types for task management.
 */
export const Events = {
  NewTask: 'NewTask',

  LoadTasks: 'LoadTasks',
  LoadTasksSuccess: 'LoadTasksSuccess',
  LoadTasksFailure: 'LoadTasksFailure',

  StoreTask: 'StoreTask',
  StoreTaskSuccess: 'StoreTaskSuccess',
  StoreTaskFailure: 'StoreTaskFailure',

  UnStoreTasks: 'UnStoreTasks',
  UnStoreTasksSuccess: 'UnStoreTasksSuccess',
  UnStoreTasksFailure: 'UnStoreTasksFailure',

  // View Switching Events:
  SwitchToMainView: 'SwitchToMainView',
  SwitchToSimpleView: 'SwitchToSimpleView',
};
