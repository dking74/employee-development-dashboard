import express from 'express';

import userServices from '@v1/services/achievements';
import { Achievement } from '@types';

export const getAllAchievements = async (req: express.Request, res: express.Response) => {
  const _queryParams = req.queryParameters;
  const users = await userServices.getAllAchievements(_queryParams);
  res.status(200).json(users);
};

export const getAchievement = async (req: express.Request, res: express.Response) => {
  const achievementId = req.params.achievementId;
  const achievement = await userServices.getAchievement(achievementId);
  res.status(200).json(achievement);
};

export const createAchievement = async (req: express.Request, res: express.Response) => {
  const achievement: Achievement = req.requestBody;
  const achievementCreated = await userServices.createAchievement(achievement);
  res.status(201).json(achievementCreated);
};

export const updateAchievement = async (req: express.Request, res: express.Response) => {
  const achievementId: string = req.params.achievementId;
  const userUpdateParams: Achievement = req.body;
  const userUpdated = await userServices.updateAchievement(achievementId, userUpdateParams);
  res.status(200).json(userUpdated);
};

export const deleteAchievement = async (req: express.Request, res: express.Response) => {
  const achievementId: string = req.params.achievementId;
  await userServices.deleteAchievement(achievementId);
  res.status(204).json();
};

export default {
  getAllAchievements,
  getAchievement,
  createAchievement,
  updateAchievement,
  deleteAchievement,
}