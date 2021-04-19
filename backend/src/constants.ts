export const userStatus = [ 'active', 'inactive' ];
export const userQueryProperties = [ 'first_name', 'last_name', 'status' ];
export const achievementQueryProperties = ['limit'];
export const certificationQueryProperties = ['limit'];
export const userProperties = [
  'username',
  'email',
  'phone',
  'score',
  ...userQueryProperties,
];

export default {
  userStatus,
  userQueryProperties,
  userProperties,
  achievementQueryProperties,
}