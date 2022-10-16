import express from 'express';
import config from 'config';
import cors from 'cors';

const app = express();
const port = config.get<number>('port');

app.use(cors());
app.use(express.json());

app.listen(port, async () => {
  console.log(`server started on http://localhost:${port}`);
});
