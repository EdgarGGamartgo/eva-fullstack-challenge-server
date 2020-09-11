import csv from 'csvtojson'

const explorationsFile = './Data/explorations.csv'

const explorations = (async () => await csv().fromFile(explorationsFile))();


export { explorations as default }