import bodyParser from 'body-parser';
import cors from 'cors';
import express, {
  static as expressStatic,
  type NextFunction,
  type Request,
  type Response,
} from 'express';

const app = express();
const port = 3000;

app.use(expressStatic(`${process.cwd()}/frontend/assets`));
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(
  cors({
    maxAge: 86400,
    preflightContinue: true,
  }),
);

// Add cache-control to preflight responses in a separate middleware:
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    res.setHeader('Cache-Control', 'public, max-age=86400');
    // No Vary required: cors sets it already set automatically
    res.end();
  } else {
    next();
  }
});

app.get('/ping', (_req, res) => {
  res.json({ pong: new Date().getTime() });
});

// Global Error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err) {
    res.status(200).json({
      success: false,
      err: err.message,
    });
  }

  res.status(404).send('Not Found');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
