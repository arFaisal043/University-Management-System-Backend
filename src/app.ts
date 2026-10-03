import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import globalErrorHandler from './middlewares/globalErrorHandler';
import notFound from './middlewares/notFound';
import router from './routes';

const app: Application = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.send('University Management API is running...');
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
