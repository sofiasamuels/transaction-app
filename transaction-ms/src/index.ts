import express from 'express';
import { connect } from './services/dbconnect.service';
import TransactionRouter from './routes/transaction.routes';
import bodyParser from 'body-parser';
import { morganMiddleware } from './middleware/morgan.middleware';
import cors from 'cors';
const app = express();
const port = 3000;
connect();
app.get('/healthcheck', (req, res) => {
  res.send('Health of the service is good');
});
app.use(cors())
app.use(morganMiddleware)

app.use(bodyParser.json({ limit: '50mb', type: 'application/json' }));
app.use('/transactions', TransactionRouter);
app.listen(port, () => {

  console.log(`Server is running on http://localhost:${port}`);
});