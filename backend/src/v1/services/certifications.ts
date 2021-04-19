import { query } from '@utils/database.util';
import {
    constructDeleteQuery,
    constructInsertQuery,
    constructUniqueQueryParameters,
    constructUpdateQuery,
    constuctFilteredQuery,
    filterKeyIdentifier,
    PostgresQuery
} from '@utils/query.util';
import { Certification, QueryParameters} from '@types';
import { BadRequestError, InternalError } from '@http-errors';

export const getAllCertifications = async (queryParams: QueryParameters): Promise<Certification[]> => {
  const _query = constuctFilteredQuery(PostgresQuery('Certification'), queryParams);
  return await query(_query.query, _query.parameters);
};

export const getCertification = async (certificationId: string): Promise<Certification> => {
  const _query = constuctFilteredQuery(PostgresQuery('Certification'), constructUniqueQueryParameters({ certification_id: parseInt(certificationId), name: certificationId }));
  const user = await query(_query.query, _query.parameters);
  if (user.length === 0) {
    throw new BadRequestError(`Could not find the certification with certificationId: '${certificationId}'`);
  }

  return user[0];
};

export const isCertificationExist = async (certificationId: string) => {
  return await getCertification(certificationId).then(data => true).catch(error => false);
}

export const createCertification = async (certification: Certification): Promise<Certification | null> => {
  const _query = constructInsertQuery<Certification>('Certification', certification);
  const certificationCreated = await query(_query.query, _query.parameters);
  if (certificationCreated.length === 0) {
    throw new InternalError('Unable to create the new Certification');
  }

  return certificationCreated[0];
};

export const updateCertification = async (certificationId: string, Certification: Certification): Promise<Certification> => {
  const CertificationIdentifier = filterKeyIdentifier({ certification_id: parseInt(certificationId), name: certificationId });
  const _query = constructUpdateQuery('Certification', CertificationIdentifier, Certification);
  const userUpdated = await query(_query.query, _query.parameters);
  if (userUpdated.length === 0) {
    throw new InternalError('Unable to update the certification');
  }

  return userUpdated[0];
};

export const deleteCertification = async (certificationId: string) => {
  const certificationIdentifier = filterKeyIdentifier({ certification_id: parseInt(certificationId), name: certificationId });
  const _query = constructDeleteQuery('Certification', certificationIdentifier);
  return await query(_query.query, _query.parameters);
};

export default {
  getAllCertifications,
  getCertification,
  createCertification,
  updateCertification,
  deleteCertification,
}