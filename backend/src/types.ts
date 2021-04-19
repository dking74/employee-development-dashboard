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
export type QueryObject = { [name: string]: string | number };
export interface QueryParameters {
  query: string;
  parameters: Array<string | number>;
  limit?: string;
}
export interface RequestBody {
  [id: string]: string | number;
}

export interface TableIdentifier extends QueryObject {}

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
  user_id?: number;
  status: UserStatus;
  score: number;
}
export interface UserIdentifier extends TableIdentifier {
  user_id: string;
  username: string;
  email: string;
}

/**
 * Achievement parameters
 */
export interface Achievement {
  user_id: number;
  title: string;
  summary: string;
  completed_date?: string;
  other_comments?: string;
  attachment_url?: string;
}
export interface AchievementIdentifier extends TableIdentifier {
  achievement_id: string;
  title: string;
}

/**
 * Certification parameters
 */
 export interface Certification {
  name: string;
  description: string;
  link: string;
}
export interface CertificationIdentifier extends TableIdentifier {
  certification_id: string;
  name: string;
}