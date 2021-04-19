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

export default {
  getUser,
  isUserExist,
  createUser,
};