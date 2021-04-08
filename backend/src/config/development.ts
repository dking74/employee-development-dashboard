import common, { mergeProperties } from './common';

export default mergeProperties(common, {
  database: {
    database: 'Capstone',
    host: 'localhost',
  }
})