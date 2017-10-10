import uuid from 'uuid/v4'
import { Map, List } from 'immutable'
import { indexOf } from '../lib/utils'

import { ADD_MEMBER_TO_GROUP } from './shared'

const ADD_GROUP = 'secret-santa/groups/add'

export default function(state, action) {
    switch (action.type) {
        case ADD_GROUP: {
            const { id } = action
            return state
                .updateIn(['groups'], groups => groups.push(Map({ id, members: List() })))
        }
        case ADD_MEMBER_TO_GROUP: {
            const { group, id } = action
            const i = indexOf(state.get('groups').toJS(), g => g.id === group.id)

            return state
                .updateIn(['groups', i, 'members'], members => members.push(id))
        }
        default: {
            return state
        }
    }
}

export function addGroup() {
    const id = uuid()

    return {
        type: ADD_GROUP,
        id
    }
}
