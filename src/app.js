import express from 'express'
import '../Data/mongoose'
import explorationRouter from './routers/exploration'
import bookingRouter from './routers/booking'
import userRouter from './routers/user'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from './../swagger.json'
import cors from 'cors'

const app = express()

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use(express.json())
app.use(cors());
app.options('*', cors());
app.use(explorationRouter)
app.use(bookingRouter)
app.use(userRouter)

export { app as default }

