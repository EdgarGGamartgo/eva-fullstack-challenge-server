import Booking from '../models/booking'


class BookingsByDatetime {
    constructor(startDatetime, endDatetime) {
        this.startDatetime = startDatetime
        this.endDatetime = endDatetime
    }

    getBookingsByDatetime() {

        const { 
            startYYYY, 
            startMM, 
            startDD, 
            startHH, 
            startMm, 
            startSs,
            startSss
          } = this.startDatetime

        const { 
            endYYYY, 
            endMM, 
            endDD, 
            endHH, 
            endMm, 
            endSs,
            endSss
          } = this.endDatetime


        const bookingsByDatetime = async () =>  {
            const results = await Booking.find({ 
                datetime: {
                    $gte: new Date(startYYYY, startMM, startDD).setHours(startHH, startMm, startSs, startSss),
                    $lt: new Date(endYYYY, endMM, endDD).setHours(endHH, endMm, endSs, endSss)
                    }
                }).sort({ datetime: 'asc'})
            return results
        };

        return bookingsByDatetime().then(res => {
            return res
        })
    }
}

export { BookingsByDatetime as default }