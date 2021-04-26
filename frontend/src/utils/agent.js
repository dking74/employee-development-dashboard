import axios from 'axios';
import { to } from 'await-to-js';

import config from '../config';

const Axios = axios.create();

export const getUser = async (email) => {
  const url = `${config.employeeDevelopmentApi}/users/${email}`;
  const [error, results] = await to(
    Axios.get(url)
  );
  if (error) {
    throw new Error(`Unable to retrieve user with email '${email}'`);
  }

  return results.data;
};

export const isUserExist = async (email) => {
  const [error] = await to(getUser(email));
  return !error;
};

export const createUser = async (userInfo) => {
  const url = `${config.employeeDevelopmentApi}/users`;
  const [error, results] = await to(
    Axios.post(url, userInfo)
  );
  if (error) {
    throw new Error(`Unable to create user with email '${userInfo.email}'`);
  }

  return results.data;
};

export const getAchievements = async (userId) => {
  const url = `${config.employeeDevelopmentApi}/users/${userId}/achievements`;
  const [error, results] = await to(Axios.get(url));
  if (error) {
    throw new Error(`Unable to retrieve achievements for user: '${userId}'`);
  }

  return results.data;
};

/**
 * @note This should only be used inside of the Form component 
 * @param {*} url
 * @param {*} data
 */
export const submitForm = async (resourceUrl, data, add = true) => {
  const url = `${config.employeeDevelopmentApi}/${resourceUrl}`;
  const [error] = await to(
    (add) ? Axios.post(url, data) : Axios.put(url, data)
  );
  
  return !!error;
}

export default {
  getUser,
  isUserExist,
  createUser,
  getAchievements,
  submitForm,
};