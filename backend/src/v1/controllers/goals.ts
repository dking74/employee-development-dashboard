import express from 'express';

import goalServices from '@v1/services/goals';
import { Goal } from '@types';

export const getAllGoals = async (req: express.Request, res: express.Response) => {
  const _queryParams = req.queryParameters;
  const goals = await goalServices.getAllGoals(_queryParams);
  res.status(200).json(goals);
};

export const getGoal = async (req: express.Request, res: express.Response) => {
  const goalId = req.params.goalId;
  const goal = await goalServices.getGoal(goalId);
  res.status(200).json(goal);
};

export const createGoal = async (req: express.Request, res: express.Response) => {
  const goal: Goal = req.requestBody;
  const goalCreated = await goalServices.createGoal(goal);
  res.status(201).json(goalCreated);
};

export const updateGoal = async (req: express.Request, res: express.Response) => {
  const goalId: string = req.params.goalId;
  const goalUpdateParams: Goal = req.body;
  const goalUpdated = await goalServices.updateGoal(goalId, goalUpdateParams);
  res.status(200).json(goalUpdated);
};

export const deleteGoal = async (req: express.Request, res: express.Response) => {
  const goalId: string = req.params.goalId;
  await goalServices.deleteGoal(goalId);
  res.status(204).json();
};

export default {
  getAllGoals,
  getGoal,
  createGoal,
  updateGoal,
  deleteGoal
}