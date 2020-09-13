import express from 'express'
import '../Data/mongoose'
import explorationRouter from './routers/exploration'
import bookingRouter from './routers/booking'
import userRouter from './routers/user'

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(explorationRouter)
app.use(bookingRouter)
app.use(userRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})