import express from 'express';

import userServices from '@v1/services/certifications';
import { Certification } from '@types';


export const getAllCertifications = async (req: express.Request, res: express.Response) => {
  const _queryParams = req.queryParameters;
  const users = await userServices.getAllCertifications(_queryParams);
  res.status(200).json(users);
};

export const getCertification = async (req: express.Request, res: express.Response) => {
  const certificationId = req.params.certificationId;
  const certification = await userServices.getCertification(certificationId);
  res.status(200).json(certification);
};

export const createCertification = async (req: express.Request, res: express.Response) => {
  const certification: Certification = req.requestBody;
  const certificationCreated = await userServices.createCertification(certification);
  res.status(201).json(certificationCreated);
};

export const updateCertification = async (req: express.Request, res: express.Response) => {
  const certificationId: string = req.params.certificationId;
  const certificationUpdateParams: Certification = req.body;
  const certificationUpdated = await userServices.updateCertification(certificationId, certificationUpdateParams);
  res.status(200).json(certificationUpdated);
};

export const deleteCertification = async (req: express.Request, res: express.Response) => {
  const certificationId: string = req.params.certificationId;
  await userServices.deleteCertification(certificationId);
  res.status(204).json();
};

export default {
  getAllCertifications,
  getCertification,
  createCertification,
  updateCertification,
}