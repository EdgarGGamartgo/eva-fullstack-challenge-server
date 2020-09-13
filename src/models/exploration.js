import mongoose from 'mongoose'

const Exploration = mongoose.model('Exploration', {
    bookingId: {
        type: String,
        required: true,
        trim: true
    },
    consumedMedications: {
        type: Array,
        required: true,
        default: []
    }
})

export { Exploration as default }