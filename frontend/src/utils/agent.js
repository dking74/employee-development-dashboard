import axios from 'axios';
import { to } from 'await-to-js';
import { isEmpty, isNull } from 'lodash';

import config from '../config';

const Axios = axios.create();

const getQueryParameters = (queryParams) => {
  if (isEmpty(queryParams)) return '';

  return `?${Object.keys(queryParams).filter(val => !isNull(queryParams[val])).map((val) => `${val}=${queryParams[val]}`).join('&')}`;
};

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

export const getAchievement = async (userId, achievementId) => {
  const url = `${config.employeeDevelopmentApi}/users/${userId}/achievements/${achievementId}`;
  const [error, results] = await to(Axios.get(url));
  if (error) {
    throw new Error(`Unable to retrieve achievement: '${achievementId}' for user: '${userId}'`);
  }

  return results.data;
};

export const deleteAchievement = async (userId, achievementId) => {
  const url = `${config.employeeDevelopmentApi}/users/${userId}/achievements/${achievementId}`;
  const [error, results] = await to(Axios.delete(url));
  if (error) {
    throw new Error(`Unable to delete achievement: '${achievementId}' for user: '${userId}'`);
  }

  return results.data;
};

export const getGoals = async (userId) => {
  const url = `${config.employeeDevelopmentApi}/users/${userId}/goals`;
  const [error, results] = await to(Axios.get(url));
  if (error) {
    throw new Error(`Unable to retrieve goals for user: '${userId}'`);
  }

  return results.data;
};

export const getGoal = async (userId, goalId) => {
  const url = `${config.employeeDevelopmentApi}/users/${userId}/goals/${goalId}`;
  const [error, results] = await to(Axios.get(url));
  if (error) {
    throw new Error(`Unable to retrieve goal: '${goalId}' for user: '${userId}'`);
  }

  return results.data;
};

export const deleteGoal = async (userId, goalId) => {
  const url = `${config.employeeDevelopmentApi}/users/${userId}/goals/${goalId}`;
  const [error, results] = await to(Axios.delete(url));
  if (error) {
    throw new Error(`Unable to delete goal: '${goalId}' for user: '${userId}'`);
  }

  return results.data;
};


export const getCertifications = async (userId) => {
  const url = `${config.employeeDevelopmentApi}/users/${userId}/certifications`;
  const [error, results] = await to(Axios.get(url));
  if (error) {
    throw new Error(`Unable to retrieve certifications for user: '${userId}'`);
  }

  return results.data;
};

export const getCertification = async (userId, certificationId) => {
  const url = `${config.employeeDevelopmentApi}/users/${userId}/certifications/${certificationId}`;
  const [error, results] = await to(Axios.get(url));
  if (error) {
    throw new Error(`Unable to retrieve certification: '${certificationId}' for user: '${userId}'`);
  }

  return results.data;
};

export const deleteCertification = async (userId, certificationId) => {
  const url = `${config.employeeDevelopmentApi}/users/${userId}/certifications/${certificationId}`;
  const [error, results] = await to(Axios.delete(url));
  if (error) {
    throw new Error(`Unable to delete certification: '${certificationId}' for user: '${userId}'`);
  }

  return results.data;
};

export const createCertification = async (userId, certBody) => {
  const url = `${config.employeeDevelopmentApi}/users/${userId}/certifications`;
  const [error, results] = await to(Axios.post(url, certBody));
  if (error) {
    throw new Error(`Unable to create certification for user: '${userId}'`);
  }

  return results.data;
};

export const updateCertification = async (userId, certId, certBody) => {
  const url = `${config.employeeDevelopmentApi}/users/${userId}/certifications/${certId}`;
  const [error, results] = await to(Axios.put(url, certBody));
  if (error) {
    throw new Error(`Unable to update certification '${certId}' for user: '${userId}'`);
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
};

export const getTrainingVideos = async (
  { limit = null, rating = null, category = null, views = null } = 
    { limit: null, rating: null, category: null, views: null }
) => {
  const queryUrl = getQueryParameters({ limit, rating, category, views });
  const url = `${config.employeeDevelopmentApi}/trainings${queryUrl}`;
  const [error, results] = await to(Axios.get(url));
  if (error) {
    throw new Error('Unable to get training videos');
  }

  return results.data;
};

export const updateTrainingViews = async (trainingId) => {
  const url = `${config.employeeDevelopmentApi}/trainings/${trainingId}/views`;
  const [error, results] = await to(Axios.put(url));
  if (error) {
    throw new Error(`Unable to update training video ${trainingId} views.`);
  }

  return results.data;
}

export const getEvents = async ({ limit = null, status = null } = { limit: null, status: null }) => {
  const queryUrl = (limit || status) ? getQueryParameters({ limit, status }) : '';
  const url = `${config.employeeDevelopmentApi}/events${queryUrl}`;
  const [error, results] = await to(Axios.get(url));
  if (error) {
    throw new Error('Unable to get events');
  }

  return results.data;
};

export const getUserEvents = async (userId, { limit = null, status = null } = { limit: null, status: null }) => {
  const queryUrl = (limit || status) ? getQueryParameters({ limit, status }) : '';
  const url = `${config.employeeDevelopmentApi}/users/${userId}/events${queryUrl}`;
  const [error, results] = await to(Axios.get(url));
  if (error) {
    throw new Error(`Unable to retrieve user events for user: '${userId}'`);
  }

  return results.data;
};

export const getUserEvent = async (userId, eventId) => {
  const url = `${config.employeeDevelopmentApi}/users/${userId}/events/${eventId}`;
  const [error, results] = await to(Axios.get(url));
  if (error) {
    console.log(`Unable to retrieve user events for user: '${userId}'`);
    return { status: 'inactive' };
  }

  return results.data;
};

export const getEvent = async (eventId) => {
  const url = `${config.employeeDevelopmentApi}/events/${eventId}`;
  const [error, results] = await to(Axios.get(url));
  if (error) {
    throw new Error(`Unable to retrieve event: '${eventId}'`);
  }

  return results.data;
};

export const createUserEvent = async (userEvent) => {
  const { userId, eventId, ...event } = userEvent;
  const url = `${config.employeeDevelopmentApi}/users/${userId}/events/${eventId}`;
  const [error, results] = await to(Axios.post(url, event));
  if (error) {
    throw new Error(`Unable to create user event for user: '${userId}' and event: '${eventId}'`);
  }

  return results.data;
};

export const updateUserEvent = async (userEvent) => {
  const { userId, eventId, ...event } = userEvent;
  const url = `${config.employeeDevelopmentApi}/users/${userId}/events/${eventId}`;
  const [error, results] = await to(Axios.put(url, event));
  if (error) {
    throw new Error(`Unable to update user event for user: '${userId}' and event: '${eventId}'`);
  }

  return results.data;
};

export const getUserTrainings = async (userId) => {
  const url = `${config.employeeDevelopmentApi}/users/${userId}/trainings`;
  const [error, results] = await to(Axios.get(url));
  if (error) {
    throw new Error(`Unable to get user videos for user: '${userId}'`);
  }

  return results.data;
};

export const isUserTrainingExists = async (userId, trainingId) => {
  const url = `${config.employeeDevelopmentApi}/users/${userId}/trainings/${trainingId}`;
  const [error, results] = await to(Axios.get(url));
  if (error) return false;

  return !isEmpty(results.data);
};

export const createUserTraining = async (userTraining) => {
  const { userId, trainingId, ...training } = userTraining;
  const url = `${config.employeeDevelopmentApi}/users/${userId}/trainings/${trainingId}`;
  const [error, results] = await to(Axios.post(url, training));
  if (error) {
    throw new Error(`Unable to create user training for user: '${userId}' and training : '${trainingId}'.`);
  }

  return results.data;
};

export const updateUserTraining = async (userTraining) => {
  const { userId, trainingId, ...training } = userTraining;
  const url = `${config.employeeDevelopmentApi}/users/${userId}/trainings/${trainingId}`;
  const [error, results] = await to(Axios.put(url, training));
  if (error) {
    throw new Error(`Unable to update user training for user: '${userId}' and video: '${trainingId}'`);
  }

  return results.data;
};

export const deleteUserTraining = async (userId, trainingId) => {
  const url = `${config.employeeDevelopmentApi}/users/${userId}/trainings/${trainingId}`;
  const [error, results] = await to(Axios.delete(url));
  if (error) {
    throw new Error(`Unable to delete user training for user: '${userId}' and video: '${trainingId}'`);
  }

  return results.data;
};

export const uploadFiles = async (files) => {
  const UPLOAD_ENDPOINT = `https://api.cloudinary.com/v1_1/${process.env.VUE_APP_CLOUDINARY_CLOUD_NAME}/upload`;

  const uploadedDocs = await Promise.all(files.map(file => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "mpsmjyhw");

    return axios.post(UPLOAD_ENDPOINT, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    })
  }));

  return uploadedDocs.reduce((doc, curr) => {
    const document = curr.data;
    doc[document.original_filename] = document.url;
    return doc;
  }, {});
};

export default {
  getUser,
  isUserExist,
  createUser,
  getAchievements,
  getAchievement,
  deleteAchievement,
  getGoals,
  getGoal,
  deleteGoal,
  createCertification,
  updateCertification,
  getCertifications,
  getCertification,
  deleteCertification,
  submitForm,
  getTrainingVideos,
  updateTrainingViews,
  getEvents,
  getEvent,
  getUserEvents,
  getUserEvent,
  createUserEvent,
  updateUserEvent,
  getUserTrainings,
  isUserTrainingExists,
  createUserTraining,
  updateUserTraining,
  deleteUserTraining,
  uploadFiles,
};