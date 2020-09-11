import mongodb from 'mongodb'
import bookings from './bookings.js'
import explorations from './explorations'

const uri = 'mongodb://127.0.0.1:27017';
const client = new mongodb.MongoClient(uri);

client.connect((err) => {
    if (!err) {
        console.log('connection created');
    }
    const newDB = client.db("eva-fullstack-challenge-db");
    
    newDB.createCollection("bookings"); 

    bookings.then(res => {
        newDB.collection('bookings').insertMany(res, (error, result) => {
           if (error) {
             return console.log('Unable to insert booking')
           }
           console.log(result.ops)
        })
    }).catch(error => console.log(error))

    newDB.createCollection("explorations"); 

    explorations.then(res => {
        const parsedExplorations = res.map(exploration => {
            return {
                bookingId: exploration.bookingId,
                consumedMedications: JSON.parse(exploration.consumedMedications)
            }
        }) 
        newDB.collection('explorations').insertMany(parsedExplorations, (error, result) => {
            if (error) {
              return console.log('Unable to insert exploration')
            }
            console.log(result.ops)
         })
    }).catch(error => console.log(error))
})



