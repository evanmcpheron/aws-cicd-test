import { Router } from 'express';

const baseRouter = Router();

baseRouter.get('/ping', (req, res) => {
  res.send({ data: 'PONG' });
});

baseRouter.post('/hello', (req, res) => {
  res.send(req.body);
});

export default baseRouter;
