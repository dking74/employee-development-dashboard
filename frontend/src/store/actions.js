/* eslint-disable no-unused-vars */
import Agent from '../utils/agent';

export default {
  isUserExist: async ({ commit, state }, email) => {
    return await Agent.isUserExist(email);
  },
  createUser: async ({ commit, state }, userInfo) => {
    const created = await Agent.createUser(userInfo);
    if (created) {
      console.log(`Successfully created user '${userInfo.email}'`);
    }
    return created;
  }
}