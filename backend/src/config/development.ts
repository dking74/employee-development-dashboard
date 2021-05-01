import common, { mergeProperties } from './common';

export default mergeProperties(common, {
  database: {
    connectionString: 'postgres://localhost:5432/Capstone'
  }
})