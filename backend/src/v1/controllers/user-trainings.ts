import express from 'express';

import userTrainingServices from '@v1/services/user-trainings';
import { UserTraining } from '@types';

export const getAllUserTrainings = async (req: express.Request, res: express.Response) => {
  const _queryParams = req.queryParameters;
  const userTrainings = await userTrainingServices.getAllUserTrainings(_queryParams);
  res.status(200).json(userTrainings);
};

export const getUserTraining = async (req: express.Request, res: express.Response) => {
  const trainingId = req.params.trainingId;
  const training = await userTrainingServices.getUserTraining(req.params.userId, trainingId);
  res.status(200).json(training);
};

export const createUserTraining = async (req: express.Request, res: express.Response) => {
  const userTraining: UserTraining = req.requestBody;
  const userTrainingCreated = await userTrainingServices.createUserTraining(userTraining);
  res.status(201).json(userTrainingCreated);
};

export const updateUserTraining = async (req: express.Request, res: express.Response) => {
  const userId = req.params.userId;
  const trainingId: string = req.params.trainingId;
  const userTrainingUpdateParams: UserTraining = req.body;

  const isTrainingExists = await userTrainingServices.isUserTrainingExist(userId, trainingId);
  if (!isTrainingExists) {
    const userTrainingCreated = await userTrainingServices.createUserTraining(userTrainingUpdateParams);
    res.status(201).json(userTrainingCreated);
  } else {
    const updateTraining = await userTrainingServices.updateUserTraining(userId, trainingId, userTrainingUpdateParams);
    res.status(200).json(updateTraining);
  }
};

export const deleteUserTraining = async (req: express.Request, res: express.Response) => {
  const trainingId: string = req.params.trainingId;
  await userTrainingServices.deleteUserTraining(req.params.userId, trainingId);
  res.status(204).json();
};

export default {
  getAllUserTrainings,
  getUserTraining,
  createUserTraining,
  updateUserTraining,
  deleteUserTraining
}