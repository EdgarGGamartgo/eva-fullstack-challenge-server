import csv from 'csvtojson'

const bookingsFile = './Data/bookings.csv'

const bookings = (async () => await csv().fromFile(bookingsFile))();

export { bookings as default }