import { QueryObject, QueryParameters, TableIdentifier } from '@types';

type IdentifierJoiner = 'AND' | 'OR';

export const getQueryParameters = <T extends QueryObject>(object: T, validKeys: Array<string> = []): QueryParameters => {
  const _queryParams = Object.keys(object).reduce((prev: any, curr: string, currIndex: number) => {
    if ((validKeys.length > 0 && validKeys.includes(curr)) || validKeys.length === 0) {
      prev['query'].push(`${curr} = $${currIndex + 1}`);
      prev['parameters'].push(object[curr]);
    }
    
    return prev;
  }, { query: [], parameters: [] });

  _queryParams.query = _queryParams.query.join(' AND ');
  return _queryParams;
};

export const constuctFilteredQuery = (baseQuery: string, queryParams: QueryParameters): QueryParameters => {
  return {
    query: `${baseQuery}${queryParams.query.length ? ` WHERE ${queryParams.query}` : ''}`,
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
    namepsace: string = 'public') => {
  const _query = PostgresUpdate(tableName, identifier, updateObject, identifierJoin, namepsace);
  const _queryParams = [...Object.values(identifier), ...Object.values(updateObject)];

  return { query: _query, parameters: _queryParams };
};

export const constructDeleteQuery = <T extends TableIdentifier, U>(
    tableName: string,
    identifier: T,
    identifierJoin: IdentifierJoiner = 'OR',
    namepsace: string = 'public') => {
  const _query = PostgresDelete(tableName, identifier, identifierJoin, namepsace);
  const _queryParams = Object.values(identifier);

  return { query: _query, parameters: _queryParams };
};

export const constructFilteredIdentifierString = <T extends TableIdentifier>(identifier: T, identifierJoin: IdentifierJoiner = 'OR') => {
  const identifierString = Object.keys(identifier).map((val: string, index: number) => `${val} = $${index + 1}`).join(` ${identifierJoin} `);
  return `WHERE ${identifierString}`;
};

export const PostgresQuery = (tableName: string, properties: Array<string> = [], namespace = 'public') => {
  const _propsString = properties.length > 0
    ? properties.join(',')
    : '*';

  return `SELECT ${_propsString} FROM ${getTableName(tableName, namespace)}`;
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