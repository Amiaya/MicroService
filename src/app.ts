import express, {Express, Response,Request, NextFunction } from 'express'
import dotenv from 'dotenv'
import inboundRouter from './routes/inbound'
import outboundRouter from './routes/outbound'
import limiter from './middleware/rate'


dotenv.config()
const app: Express = express()
app.use(express.json())


app.use(inboundRouter)
app.use(limiter)
app.use(outboundRouter)

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server + JavaScript');
  });

app.all('*', (req:Request, res: Response, next: NextFunction) => {
  res.status(500).json({
    message:"",
    error: "unknown failure"
  })
})
  

export default app