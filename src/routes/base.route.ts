import { Router } from 'express';

const baseRouter = Router();

baseRouter.get('/healthz', (req, res) => {
  res.send('OK');
});

baseRouter.get('/ping', (req, res) => {
  res.send({ data: 'pong with an update' });
});

baseRouter.post('/hello', (req, res) => {
  res.send(req.body);
});

export default baseRouter;
