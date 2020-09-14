import express from 'express'
import Exploration from '../models/exploration'
import BookingsByDatetime from './../services/bookingsByDatetime'
import BookingsByClinic from './../services/bookingsByClinic'
import FindAllBookings from './../services/findAllBookings'
import ExplorationsByMode from './../services/explorationsByMode'
import auth from '../middleware/auth'
import cors from 'cors'


const router = new express.Router()

// Get explorations by clinicName, datetime and mode
router.get('/api/explorations', cors(), auth, async (req, res) => {
    const explorationRequest = req.header('X-ExplorationRequest');
    const { mode, 
            consumedMedications,
            clinicName,
            startDatetime,
            endDatetime
            } = JSON.parse(explorationRequest)

    // Query bookings by datetime
    const bookingsByDatetime = new BookingsByDatetime(startDatetime, endDatetime)
    // Query bookings by clinicName
        var bookingsByClinic = []
    if (clinicName !== "") {
         bookingsByClinic = new BookingsByClinic(clinicName)

    } else {
        bookingsByClinic = new FindAllBookings()
    }
    // Query explorations by mode
    const explorationsByMode = new ExplorationsByMode(mode, consumedMedications)
    
    // Return filtered explorations by mode, clinicName and datetime
    try {
        bookingsByDatetime.getBookingsByDatetime().then(resByDatetime => {

            bookingsByClinic.getBookingsByClinic().then(resByClinic => {

                explorationsByMode.getExplorationsByMode().then(resByMode => {

                    const bookingsByClinicDatetime = resByDatetime.filter(bookingByDatetime => {
                        const commonBooking = resByClinic.some(bookingByClinic => bookingByClinic.id === bookingByDatetime.id)
                        return commonBooking 
                    }) 

                    const explorationsByModeClinicDatetime = resByMode.filter(exploration => {
                        const commonBooking = bookingsByClinicDatetime.some(bookingByClinicDatetime => bookingByClinicDatetime.id === exploration.bookingId)
                        return commonBooking 
                    }) 

                    res.send(explorationsByModeClinicDatetime)

                })            
            })
        })
    } catch (e) {
        res.status(500).send()
    }
})

// Get all explorations
router.get('/explorations', async (req, res) => {
    try {
        const explorations = await Exploration.find({})
        res.send(explorations)
    } catch (e) {
        res.status(500).send()
    }
})

// Get a specific explorations by consumed medications
router.get('/consumed-medications', async (req, res) => {
    const { mode, consumedMedicationsParam } = req.query
    const consumedMedicationsList = consumedMedicationsParam.split(',');

    try {

        if ( mode === "LAX" ) {
           
            const explorations = await Exploration.find(
                { consumedMedications: { $in: consumedMedicationsList } }
            ).exec()

            if (!explorations) {
                return res.status(404).send()
            }
   
           res.send(explorations)

        } else if( mode === "STRICT" ) {

            const explorations = await Exploration.find({ 
                consumedMedications:  consumedMedicationsList 
            }).exec()

            if (!explorations) {
                return res.status(404).send()
            }
   
           res.send(explorations)


        }


    }
     catch (e) {
        res.status(500).send()
    }
})

export { router as default }