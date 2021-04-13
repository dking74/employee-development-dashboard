import constants from './constants';

/**
 * Config Parameters
 */
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

/**
 * Base query parameters
 */
export type QueryObject = { [name: string]: string };
export interface QueryParameters {
  query: string;
  parameters: Array<string>;
}

/**
 * User Parameters
 */
export interface CreateUserRequest {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
}
export type UserStatus = (typeof constants.userStatus)[number];
export interface UpdateUserRequest {
  first_name?: string;
  last_name?: string;
  phone?: string;
  status?: UserStatus;
  score?: number;
}
export interface User extends CreateUserRequest {
  status: UserStatus;
  score: number;
}

export interface TableIdentifier {}
export interface UserIdentifier extends TableIdentifier{
  user_id?: string;
  username?: string;
  email?: string;
}