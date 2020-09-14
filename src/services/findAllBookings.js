import Booking from '../models/booking'


class FindAllBookings {
    constructor() {
    }

    getBookingsByClinic() {

        const bookings = async () =>  {
            const results = await Booking.find({ }).exec()
            return results
        };

        return bookings().then(res => {
            return res
        })
    }
}

export { FindAllBookings as default }