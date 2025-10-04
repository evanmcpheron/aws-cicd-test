import express from 'express';
import cors from 'cors';
const app = express();

import baseRouter from './routes/base.route';
import { corsOptions, middleware } from './middleware';

app.disable('x-powered-by');
app.options(/.*/, cors(corsOptions));
app.use(middleware);

app.use(baseRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log('app listening on port ' + PORT);
});
