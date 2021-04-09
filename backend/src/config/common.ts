import { merge, mergeWith, isObject, cloneDeep } from 'lodash';

export const mergeProperties = (object1: Object, object2: Object) => {
  return cloneDeep(mergeWith(object1, object2, (obj1, obj2) => {
    if (isObject(obj1) && isObject(obj2)) {
      return merge(obj1, obj2);
    }
  }));
};

export default {
  database: {
    // Required Properties
    port: 5432,
    user: process.env.PG_USERNAME,
    password: process.env.PG_PASSWORD,

    // Optional Properties
    keepAlive: process.env.PG_KEEPALIVE || true,
    connectionTimeoutMillis: process.env.PG_CONNECTION_TIMEOUT || 30000,
  }
}