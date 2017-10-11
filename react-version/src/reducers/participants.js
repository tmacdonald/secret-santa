import { Map } from 'immutable'

import { ADD_MEMBER_TO_GROUP } from './groups'

export default function(state, action) {
    switch (action.type) {
        case ADD_MEMBER_TO_GROUP: {
            const { id, member } = action

            return state
                .setIn(['participants', id], Map({ ...member, id }))
        }
        default: {
            return state
        }
    }
}