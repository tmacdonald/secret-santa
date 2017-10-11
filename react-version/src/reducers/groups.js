import uuid from 'uuid/v4'
import { Map, List } from 'immutable'
import { indexOf } from '../lib/utils'

const ADD_GROUP = 'secret-santa/groups/add'
export const ADD_MEMBER_TO_GROUP = 'secret-santa/shared/add-member-to-group'

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

export function addGroup(id = uuid()) {
    return {
        type: ADD_GROUP,
        id
    }
}

export function addMemberToGroup(group, member, id = uuid()) {
    return {
        type: ADD_MEMBER_TO_GROUP,
        id,
        group,
        member
    }
}

