import express from 'express'
import Booking from '../models/booking'

const router = new express.Router()


// Get all bookings
router.get('/bookings', async (req, res) => {
    try {
        const bookings = await Booking.find({})
        res.send(bookings)
    } catch (e) {
        res.status(500).send()
    }
})

// Get a specific booking by strict datetime
router.get('/booking/:YYYY/:MM/:DD/:HH/:mm/:ss/:sss', async (req, res) => {
    const {YYYY, MM, DD, HH, mm, ss,sss} = req.params
    
    var _datetime = new Date(YYYY, MM, DD, HH, mm, ss,sss) // Hours +6, Months +1, Days +1

    try {
        const booking = await Booking.findOne({ datetime: _datetime }).exec()

         if (!booking) {
             return res.status(404).send()
         }

        res.send(booking)
    }
     catch (e) {
        res.status(500).send()
    }
})

// Get bookings by datetime
router.get('/bookings/lax/datetime', async (req, res) => {
    const { 
        startDateYYYY, startDateMM, startDateDD, 
        startDateHH, startDateMm, startDateSs, startDateSss,
        endDateYYYY, endDateMM, endDateDD, 
        endDateHH, endDateMm, endDateSs, endDateSss
    } = req.query

    try {

        const bookings = await Booking.find({ 
            datetime: {
                $gte: new Date(startDateYYYY, startDateMM, startDateDD).setHours(startDateHH, startDateMm, startDateSs, startDateSss),
                $lt: new Date(endDateYYYY, endDateMM, endDateDD).setHours(endDateHH, endDateMm, endDateSs, endDateSss)
                }
            }).sort({ datetime: 'asc'})  

        res.send(bookings)
    }
     catch (e) {
        res.status(500).send()
    }
})

// Get a specific booking by clinic
router.get('/bookings/clinic', async (req, res) => {
    const { clinicName } = req.query
    

    try {
        const booking = await Booking.find({ clinicName: clinicName }).exec()

         if (!booking) {
             return res.status(404).send()
         }

        res.send(booking)
    }
     catch (e) {
        res.status(500).send()
    }
})



export { router as default }