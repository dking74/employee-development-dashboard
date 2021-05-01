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
export type QueryObject = { [name: string]: string | number | { [key: string]: string } };
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

/**
 * Goal parameters
 */
export type GoalStatus = (typeof constants.goalStatus)[number];
export interface Goal {
  summary: string;
  to_be_completed_date: string;
  completed_date: string;
  status: GoalStatus;
}
export interface GoalIdentifier extends TableIdentifier {
  goal_id: string;
}

/**
 * Event parameters
 */
export type EventStatus = (typeof constants.eventStatus)[number];
export interface Event {
  title: string;
  summary: string;
  organizers: Array<string>;
  num_registered: number;
  capacity: number;
  location: string;
  date: string;
  status: EventStatus;
}
export interface EventIdentifier extends TableIdentifier {
  event_id: string;
  title: string;
}
export interface UpdateEventRequest {
  organizers?: Array<string>;
  num_registered?: number;
  capacity?: number;
  location?: string;
  date?: string;
  status?: EventStatus;
}

/**
 * Training parameters
 */
export type TrainingCategory = (typeof constants.trainingCategories)[number];
export interface Training {
  title: string;
  url: string;
  keywords: Array<string>;
  categories: Array<TrainingCategory>;
  views: number;
  rating: number;
  numRatings: number;
}
export interface TrainingIdentifier extends TableIdentifier {
  training_id: string;
  title: string;
}

/**
 * UserEvent parameters
 */
export type UserEventStatus = (typeof constants.userEventStatus)[number];
export interface UserEvent {
  status: UserEventStatus;
}
export interface UserEventIdentifier extends TableIdentifier {
  user_event_id: string;
  combo_id: { user_id: string, event_id: string };
}

/**
 * UserTraining parameters
 */
export type UserTrainingStatus = (typeof constants.userTrainingStatus)[number];
export interface UserTraining {
  status: UserTrainingStatus;
}
export interface UserTrainingIdentifier extends TableIdentifier {
  user_training_id: string;
  combo_id: { user_id: string, training_id: string };
}