import common, { mergeProperties } from './common';

export default mergeProperties(common, {
  database: {
    ssl: { rejectUnauthorized: false }
  }
});