import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes/index.js';
import cookieParser from 'cookie-parser';

import { errorMiddleware } from './middlewares/error-middleware.js';

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/api', router);
app.use(errorMiddleware);

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Server is on port ${PORT}`);
});
