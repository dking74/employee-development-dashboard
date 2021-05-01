import express from 'express';

import trainingServices from '@v1/services/trainings';
import { Training } from '@types';

export const getAllTrainings = async (req: express.Request, res: express.Response) => {
  const _queryParams = req.queryParameters;
  const trainings = await trainingServices.getAllTrainings(_queryParams);
  res.status(200).json(trainings);
};

export const getTraining = async (req: express.Request, res: express.Response) => {
  const trainingId = req.params.trainingId;
  const training = await trainingServices.getTraining(trainingId);
  res.status(200).json(training);
};

export const createTraining = async (req: express.Request, res: express.Response) => {
  const training: Training = req.body;
  const trainingCreated = await trainingServices.createTraining(training);
  res.status(201).json(trainingCreated);
};

export const updateTraining = async (req: express.Request, res: express.Response) => {
  const trainingId: string = req.params.trainingId;
  const trainingUpdateParams: Training = req.body;
  const trainingUpdated = await trainingServices.updateTraining(trainingId, trainingUpdateParams);
  res.status(200).json(trainingUpdated);
};

export const deleteTraining = async (req: express.Request, res: express.Response) => {
  const trainingId: string = req.params.trainingId;
  await trainingServices.deleteTraining(trainingId);
  res.status(204).json();
};

export default {
  getAllTrainings,
  getTraining,
  createTraining,
  updateTraining,
  deleteTraining
}