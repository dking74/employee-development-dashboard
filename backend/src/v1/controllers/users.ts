import express from 'express';

import userServices from '@v1/services/users';
import { CreateUserRequest, UpdateUserRequest } from '@types';


export const getAllUsers = async (req: express.Request, res: express.Response) => {
  const _queryParams = req.queryParameters;
  const users = await userServices.getAllUsers(_queryParams);
  res.status(200).json(users);
};

export const getUser = async (req: express.Request, res: express.Response) => {
  const userId = req.params.userId;
  const user = await userServices.getUser(userId);
  res.status(200).json(user);
};

export const createUser = async (req: express.Request, res: express.Response) => {
  const user: CreateUserRequest = req.body;
  const userCreated = await userServices.createUser(user);
  res.status(201).json(userCreated);
};

export const updateUser = async (req: express.Request, res: express.Response) => {
  const userId: string = req.params.userId;
  const userUpdateParams: UpdateUserRequest = req.body;
  const userUpdated = await userServices.updateUser(userId, userUpdateParams);
  res.status(200).json(userUpdated);
};

export const deleteUser = async (req: express.Request, res: express.Response) => {
  const userId: string = req.params.userId;
  await userServices.deleteUser(userId);
  res.status(204).json();
};

export default {
  getAllUsers,
  getUser,
  createUser,
  updateUser
}