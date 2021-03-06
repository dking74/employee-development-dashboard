import { QueryObject, QueryParameters, TableIdentifier, JoinParameters } from '@types';
import { isEmpty } from 'lodash';

type IdentifierJoiner = 'AND' | 'OR';

export const getQueryParameters = <T extends QueryObject>(object: T, validKeys: Array<string> = [], keySignMapping: { [key: string]: string } = {}, baseTableName: string = ''): QueryParameters => {
  let queryIndex = 1;
  const _queryParams = Object.keys(object).reduce((prev: any, curr: string) => {
    if (validKeys.length > 0 && !validKeys.includes(curr)) return prev;

    if (curr === 'limit') {
      prev['limit'] = object['limit'];
    } else if (validKeys.includes(curr)) {
      const signComparison = !isEmpty(keySignMapping) ? keySignMapping[curr] || '=' : '=';
      const parameter = baseTableName ? `${baseTableName}.${curr}`: curr;
      prev['query'].push(`${parameter} ${signComparison} $${queryIndex}`);
      prev['parameters'].push(object[curr]);
      queryIndex++;
    }
    
    return prev;
  }, { query: [], parameters: [] });

  _queryParams.query = _queryParams.query.join(' AND ');
  return _queryParams;
};

export const filterKeyIdentifier = <T extends TableIdentifier>(constraints: T): T => {
  return Object.keys(constraints).reduce((prev: any, curr: string) => {
    const currentValue = constraints[curr];
    if (currentValue) prev[curr] = currentValue;
    return prev;
  }, {});
};

export const constructUniqueQueryParameters = <T extends TableIdentifier>(uniqueConstraints: T, joiner: IdentifierJoiner = 'OR'): QueryParameters => {
  const _queryParams = Object.keys(uniqueConstraints).reduce((prev: any, curr: string) => {
    const currentValue = uniqueConstraints[curr];
    if (!currentValue && typeof currentValue !== 'string') return prev;

    prev['query'].push(`${curr} = $${prev.parameters.length + 1}`);
    prev['parameters'].push(currentValue);
    
    return prev;
  }, { query: [], parameters: [] });

  _queryParams.query = _queryParams.query.join(` ${joiner} `);
  return _queryParams;
}

export const constuctFilteredQuery = (baseQuery: string, queryParams: QueryParameters): QueryParameters => {
  if (queryParams.limit) queryParams.parameters.push(queryParams.limit);
  const _query = `${baseQuery}
    ${queryParams.query.length ? ` WHERE ${queryParams.query}` : ''}
    ${queryParams.limit ? ` LIMIT $${queryParams.parameters.length}` : ''}
  `;

  return {
    query: _query,
    parameters: queryParams.parameters
  };
};

export const constructInsertQuery = <T>(
    tableName: string,
    creationObject: T,
    namepsace: string = 'public'): QueryParameters => {
  const _query = PostgresInsert(tableName, creationObject, namepsace);
  const _queryParams = Object.values(creationObject);

  return { query: _query, parameters: _queryParams};
};

export const constructUpdateQuery = <T extends TableIdentifier, U>(
    tableName: string,
    identifier: T,
    updateObject: U,
    identifierJoin: IdentifierJoiner = 'OR',
    namepsace: string = 'public'): QueryParameters => {
  const _query = PostgresUpdate(tableName, identifier, updateObject, identifierJoin, namepsace);
  const _queryParams = [...Object.values(identifier), ...Object.values(updateObject)];

  return { query: _query, parameters: _queryParams };
};

export const constructDeleteQuery = <T extends TableIdentifier>(
    tableName: string,
    identifier: T,
    identifierJoin: IdentifierJoiner = 'OR',
    namepsace: string = 'public'): QueryParameters => {
  const _query = PostgresDelete(tableName, identifier, identifierJoin, namepsace);
  const _queryParams = Object.values(identifier) as Array<string | number>;

  return { query: _query, parameters: _queryParams };
};

export const constructFilteredIdentifierString = <T extends TableIdentifier>(identifier: T, identifierJoin: IdentifierJoiner = 'OR') => {
  const identifierString = Object.keys(identifier).map((val: string, index: number) => `${val} = $${index + 1}`).join(` ${identifierJoin} `);
  return `WHERE ${identifierString}`;
};

export const PostgresQuery = (tableName: string, joinParameters: JoinParameters = {}, properties: Array<string> = [], namespace = 'public') => {
  const baseTableName = getTableName(tableName, namespace);
  const _propsString = properties.length > 0
    ? properties.join(',')
    : '*';

  const joinedQuery = (!isEmpty(joinParameters))
    ? `INNER JOIN ${getTableName(joinParameters.joinTable as string, namespace)} ON ${baseTableName}.${joinParameters.joinProp} = ${getTableName(joinParameters.joinTable as string, namespace)}.${joinParameters.joinProp}`
    : '';
  return `SELECT ${_propsString} FROM ${baseTableName} ${joinedQuery}`;
};

export const PostgresInsert = <T>(tableName: string, properties: T, namespace: string = 'public') => {
  const columnNames = Object.keys(properties);
  const valueNames = columnNames.map((val: string , index: number) => `$${index + 1}`);
  return `INSERT INTO ${getTableName(tableName, namespace)} (${columnNames.join(', ')}) VALUES (${valueNames.join(', ')}) RETURNING *`;
};

export const PostgresUpdate = <T extends TableIdentifier, U>(
    tableName: string,
    identifier: T,
    properties: U,
    identifierJoin: IdentifierJoiner = 'OR',
    namespace: string = 'public') => {
  const columnNames = Object.keys(properties);

  let index = 0;
  const identifierString = Object.keys(identifier).map((val: string) => (index++, `${val} = $${index}`)).join(` ${identifierJoin} `);
  const updateString = columnNames.map((val: string, _index: number) => `${val} = $${index + _index + 1}`).join(',');
  return `UPDATE ${getTableName(tableName, namespace)} SET ${updateString} WHERE ${identifierString} RETURNING *`;
};

export const PostgresDelete = <T extends TableIdentifier>(
    tableName: string,
    identifier: T,
    identifierJoin: IdentifierJoiner = 'OR',
    namepsace: string = '') => {
  const identifierString = Object.keys(identifier).map((val: string, index: number) => `${val} = $${index + 1}`).join(` ${identifierJoin} `);
  return `DELETE FROM ${getTableName(tableName, namepsace)} WHERE ${identifierString} RETURNING *`;
};

const getTableName = (tableName: string, namespace: string) => {
  return `${namespace ? `${namespace}."${tableName}"` : `${tableName}`}`;
}