import express from 'express';

import userServices from '@v1/services/users';
import { CreateUserRequest } from '@types';


export const getAllUsers = async (req: express.Request, res: express.Response) => {
  const _queryParams = req.queryParameters;
  const users = await userServices.getAllUsers(_queryParams);
  res.status(200).json(users);
};

export const getUser = async (req: express.Request, res: express.Response) => {
  const userId = req.params.userId;
  const user = await userServices.getUser(userId);
  res.status(200).json(user);
}

export const createUser = async (req: express.Request, res: express.Response) => {
  const user: CreateUserRequest = req.body;
  const userCreated = await userServices.createUser(user);
  res.status(200).json(userCreated);
}

export default {
  getAllUsers,
  getUser,

}