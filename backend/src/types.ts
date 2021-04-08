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