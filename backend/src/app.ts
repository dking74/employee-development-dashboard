import express from 'express';
import cors from 'cors';

import v1 from './v1';

const app = express();

// Enable cors for localhost testing
app.use(cors());

// Attach v1 service endpoints to app
app.use('/v1', v1);

export default app;