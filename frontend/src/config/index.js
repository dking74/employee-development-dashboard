import development from './development';
import production from './production';

const env = process.env.VUE_APP_ENV;
const config = (env && env ==='production') ? production : development;

export default config;