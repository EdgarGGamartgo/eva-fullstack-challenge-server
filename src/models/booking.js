import mongoose from 'mongoose'
import validator from 'validator'

const Booking = mongoose.model('Booking', {
    id: {
        type: String,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    datetime: {
        type: Date,
        required: true,
        trim: true
    },
    clinicName: {
        type: String,
        required: true,
        trim: true
    }
})

export { Booking as default }