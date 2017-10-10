import uuid from 'uuid/v4'
import { Map, List } from 'immutable'
import { indexOf } from '../lib/utils'

const ADD_EVENT = 'secret-santa/events/add'
const ADD_MATCH_TO_EVENT = 'secret-santa/events/add-match-to-event'

export default function(state, action) {
    switch (action.type) {
        case ADD_EVENT: {
            const { id, event } = action
            return state
                .updateIn(['events'], events => events.push(
                    event
                        .setIn(['id'], id)
                        .setIn(['matching_results'], List([]))
                ))
        }
        case ADD_MATCH_TO_EVENT: {
            const { match, event } = action
            const i = indexOf(state.get('events').toJS(), e => e.id === event.id)

            return state
                .updateIn(
                    ['events', i, 'matching_results'], 
                    matching_results => matching_results.push(Map(match))
                )
        }
        default: {
            return state
        }
    }
}

export function addEvent(event) {
    const id = uuid()
    return {
        type: ADD_EVENT,
        id,
        event
    }
}

export function addMatchToEvent(event, match) {
    return {
        type: ADD_MATCH_TO_EVENT,
        event,
        match
    }
}