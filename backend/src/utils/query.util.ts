import { QueryObject, QueryParameters } from '@types';

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

export const constructInsertQuery = <T>(tableName: string, creationObject: T): QueryParameters => {
  const _query = PostgresInsert<T>(tableName, creationObject);
  const _queryParams = Object.values(creationObject);

  return { query: _query, parameters: _queryParams};
}

export const PostgresQuery = (tableName: string, properties: Array<string> = [], namespace = 'public') => {
  const _propsString = properties.length > 0
    ? properties.join(',')
    : '*';

  return `SELECT ${_propsString} FROM ${namespace}."${tableName}"`;
};

export const PostgresInsert = <T>(tableName: string, properties: T, namespace: string = 'public') => {
  const columnNames = Object.keys(properties);
  const valueNames = columnNames.map((val: string , index: number) => `$${index + 1}`);
  return `INSERT INTO ${namespace}."${tableName}"(${columnNames.join(',')}) VALUES (${valueNames.join(',')})`;
}