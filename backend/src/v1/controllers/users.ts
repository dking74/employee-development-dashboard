import express from 'express';

import userServices, { isUserExist } from '@v1/services/users';
import { CreateUserRequest, UpdateUserRequest } from '@types';
import { BadRequestError } from '@http-errors';


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
  const userExists = await isUserExist(userId);
  if (!userExists) {
    throw new BadRequestError('The user you are trying to update does not exist');
  }

  const userUpdateParams: UpdateUserRequest = req.body;
  const userUpdated = await userServices.updateUser(userId, userUpdateParams);
  res.status(200).json(userUpdated);
};

export const deleteUser = async (req: express.Request, res: express.Response) => {
  const userId: string = req.params.userId;
  const userExists = await isUserExist(userId);
  if (!userExists) {
    throw new BadRequestError('The user you are trying to delete does not exist');
  }

  await userServices.deleteUser(userId);
  res.status(204).json();
};

export default {
  getAllUsers,
  getUser,
  createUser,
  updateUser
}