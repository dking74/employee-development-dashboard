import development from './development';
import production from './production';

const env = process.env.DEPLOY_ENV;
const config = (env && env ==='production') ? production : development;

export default config;