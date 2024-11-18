/**
 * An object containing various message types for task management.
 *  
 * 
 * Purpose: 
 * Serves as a central "dictionary" or "catalog" of all possible event names in your application.
 * All event names are defined in one place
 * Other files import this to know what events they can use
 */
export const Events = {
  /*
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
  */

  NewFriend: 'NewFriend',

  LoadFriend: 'LoadFriend',
  LoadFriendSuccess: 'LoadFriendSuccess',
  LoadFriendFailure: 'LoadFriendFailure',

  StoreFriend: 'StoreFriend',
  StoreFriendSuccess: 'StoreFriendSuccess',
  StoreFriendFailure: 'StoreFriendFailure',
  
  //core Trail Events
  NewTrail: 'NewTrail',

  //loading Trail Events
  LoadTrails: 'LoadTrails',
  LoadTrailsSuccess: 'LoadTrailsSuccess',
  LoadTrailsFailure: 'LoadTrailsFailure',

  //storing Trail Events
  StoreTrail: 'StoreTrail',
  StoreTrailSuccess: 'StoreTrailSuccess',
  StoreTrailFailure: 'StoreTrailFailure',

  //clearing Trail Events
  ClearTrails: 'ClearTrails',
  ClearTrailsSuccess: 'ClearTrailsSuccess',
  ClearTrailsFailure: 'ClearTrailsFailure',
    
    // View Switching Events:
  SwitchToMainView: 'SwitchToMainView',
  SwitchToSimpleView: 'SwitchToSimpleView',

  'EmergencyContact:new': 'EmergencyContact:new',
  'EmergencyContact:loaded': 'EmergencyContact:loaded',
  'EmergencyContact:request': 'EmergencyContact:request', 
  'EmergencyContact:error': 'EmergencyContact:error',
  'EmergencyContact:clear': 'EmergencyContact:clear',
};
