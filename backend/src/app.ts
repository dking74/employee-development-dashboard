import express from 'express';
import cors from 'cors';

import v1 from './v1';
import errorHandler from './v1/middleware/errorHandler';

const app = express();

// Enable cors for localhost testing
app.use(cors());

// Attach v1 service endpoints to app
app.use('/v1', v1);

// Handle all errors through application
app.use(errorHandler);

export default app;