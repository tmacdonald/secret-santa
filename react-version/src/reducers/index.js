import participantReducer from './participants'
import groupReducer from './groups'
import eventReducer from './events'
import resultsReducer from './results'

function reducer(state, action) {
    return [participantReducer, groupReducer, eventReducer, resultsReducer]
        .reduce((state, reducer) => reducer(state, action), state)
}

export default reducer