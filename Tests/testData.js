const testExplorationsRequest = {
    mode: "STRICT",
    consumedMedications: ["ANTIBIOTICS"],
    clinicName: "EXPLANADA",
    startDatetime: {
        startYYYY: "2019", 
        startMM: "10", 
        startDD: "25", 
        startHH: "19", 
        startMm: "19", 
        startSs: "51",
        startSss: "813"
    },
    endDatetime: {
        endYYYY: "2019", 
        endMM: "10", 
        endDD: "25", 
        endHH: "19", 
        endMm: "19", 
        endSs: "51",
        endSss: "814"
    }
}
/*
{"mode":"STRICT","consumedMedications":["ANTIBIOTICS"],"clinicName":"EXPLANADA","startDatetime":{"startYYYY":"2019","startMM":"10","startDD":"25","startHH":"19","startMm":"19","startSs":"51","startSss":"813"},"endDatetime":{"endYYYY":"2019","endMM":"10","endDD":"25","endHH":"19","endMm":"19","endSs":"51","endSss":"814"}}
IDEAL REQUEST
{"mode":"STRICT","consumedMedications":[],"clinicName":"EXPLANADA","startDatetime":{"startYYYY":"2019","startMM":"10","startDD":"25","startHH":"19","startMm":"19","startSs":"51","startSss":"813"},"endDatetime":{"endYYYY":"2019","endMM":"10","endDD":"25","endHH":"19","endMm":"19","endSs":"51","endSss":"814"}}
*/

export { testExplorationsRequest as default }