import Exploration from '../models/exploration'


class ExplorationsByMode {
    constructor(mode, consumedMedications) {
        this.mode = mode
        this.consumedMedications = consumedMedications
    }

    getExplorationsByMode() {

        if ( this.mode === "LAX" ) {
           
            const explorationsByMode = async () =>  {
                const results = await Exploration.find({ consumedMedications: { $in: this.consumedMedications } }).exec()
                return results
            };

            return explorationsByMode().then(res => {
                return res
            })

        } else if( this.mode === "STRICT" ) {

            const explorationsByMode = async () =>  {
                const results = await Exploration.find({ consumedMedications: this.consumedMedications }).exec()
                return results
            };

            return explorationsByMode().then(res => {
                return res
            })

        }

    }
}

export { ExplorationsByMode as default }