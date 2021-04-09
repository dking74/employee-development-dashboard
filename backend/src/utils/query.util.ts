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
}

export const PostgresQuery = (tableName: string, properties: Array<string> = [], namespace = 'public') => {
  const _propsString = properties.length > 0
    ? properties.join(',')
    : '*';

  return `SELECT ${_propsString} FROM ${namespace}."${tableName}"`;
};