import development from './development';
import production from './production';

const env = process.env.ENV;
const config = (env && env ==='production') ? production : development;

export default config;