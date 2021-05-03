/** Type statuses */
export const userStatus = [ 'active', 'inactive' ];
export const goalStatus = [ 'submitted', 'pending', 'completed' ];
export const eventStatus = [ 'open', 'pending', 'closed' ];
export const userEventStatus = [ 'registered', 'interested', 'attended', 'deactive' ];
export const userTrainingStatus = [ 'pending', 'interested', 'watched' ];

/** Query Properties */
export const userQueryProperties = [ 'first_name', 'last_name', 'status' ];
export const achievementQueryProperties = [ 'limit' ];
export const certificationQueryProperties = [ 'limit' ];
export const goalQueryProperties = [ 'limit' ];
export const eventQueryProperties = [ 'limit', 'status' ];
export const trainingQueryProperties = [ 'limit', 'rating', 'category' ];
export const userEventQueryProperties = [ 'status' ];
export const userTrainingQueryProperties = [ 'status' ];
export const userProperties = [
  'username',
  'email',
  'phone',
  'score',
  ...userQueryProperties,
];

/** Other type parameters */
export const trainingCategories = [
  'angular',
  'vue',
  'react',
  'java',
  'spring',
  'data',
  'analytics',
  'software',
  'c',
  'c++',
  'python',
  'rust',
  'numpy',
  'c#',
  'windows',
  'linux',
  'mac',
];

export default {
  userStatus,
  goalStatus,
  eventStatus,
  userEventStatus,
  userTrainingStatus,
  userQueryProperties,
  userProperties,
  achievementQueryProperties,
  goalQueryProperties,
  eventQueryProperties,
  trainingQueryProperties,
  userEventQueryProperties,
  userTrainingQueryProperties,
  trainingCategories,
}