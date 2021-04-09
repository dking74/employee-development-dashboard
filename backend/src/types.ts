import constants from './constants';

export interface Config {
  database: PostgresConfig;
}

export interface PostgresConfig {
  database: string;
  host: string;
  port: number;
  user: string;
  password: string;
  keepAlive?: boolean;
  connectionTimeoutMillis?: number;
}

export type UserStatus = (typeof constants.userStatus)[number];
export type OptionalGetUserParameters = (typeof constants.userQueryProperties)[number];
export type QueryObject = { [name: string]: string };
export interface QueryParameters {
  query: string;
  parameters: Array<string>;
}