import { Config } from '../types';
import logger from '../logger';
import development from './development';
import production from './production';

const configOptions = { development, production };

export type _Environment = 'development' | 'production';
export const configGenerator = (environment?: _Environment): Config => {
  return (
    !!environment
    ? configOptions[environment as _Environment]
    : configOptions[(process.env.DEPLOYED_ENV || 'development') as _Environment]
  ) as Config;
};

export const config = configGenerator();
export default config;