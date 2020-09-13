import Booking from '../models/booking'


class BookingsByClinic {
    constructor(clinicName) {
        this.clinicName = clinicName
    }

    getBookingsByClinic() {

        const bookingsByClinic = async () =>  {
            const results = await Booking.find({ clinicName: this.clinicName }).exec()
            return results
        };

        return bookingsByClinic().then(res => {
            return res
        })
    }
}

export { BookingsByClinic as default }