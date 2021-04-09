import { Config } from '../types';
import development from './development';
import production from './production';

const configOptions = { development, production };

export type _Environment = 'development' | 'production';
export default (environment?: _Environment): Config => {
  return (
    !!environment
    ? configOptions[environment as _Environment]
    : configOptions[(process.env.DEPLOYED_ENV || 'development') as _Environment]
  ) as Config;
}