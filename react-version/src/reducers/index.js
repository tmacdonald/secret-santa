import uuid from 'uuid/v4'
import { List, Map } from 'immutable'

const ADD_GROUP = 'ADD_GROUP'
const ADD_MEMBER_TO_GROUP = 'ADD_MEMBER_TO_GROUP'

function addGroup() {
    const id = uuid()

    return {
        type: ADD_GROUP,
        id
    }
}

function addMemberToGroup(group, member) {
    const id = uuid()

    return {
        type: ADD_MEMBER_TO_GROUP,
        id,
        group,
        member
    }
}

function handleAddMemberToGroup(state, { id, group, member }) {
    const i = state.get('groups').indexOf(group)

    return state
        .setIn(['participants', id], Map({ ...member, id }))
        .updateIn(['groups', i, 'members'], members => members.push(id))
}

function handleAddGroup(state, action) {
    const { id } = action
    
    return state
        .updateIn(['groups'], groups => groups.push(Map({ id, members: List() })))
}

function addEvent(state, event) {
    const id = uuid()

    return state
        .updateIn(['events'], events => events.push(
            event.setIn(['id'], id)
                .setIn(['matching_results'], List())
        ))
}

function addMatchToEvent(state, event, match) {
    return state
        .updateIn(['events', event.get('id', 'matching_results')], matching_results => matching_results.push(match))
}

function reducer(state, action) {
    switch (action.type) {
        case ADD_GROUP:
            return handleAddGroup(state, action)
        case ADD_MEMBER_TO_GROUP:
            return handleAddMemberToGroup(state, action)
        case 'ADD_EVENT':
            return addEvent(state, action.evt)
        case 'ADD_MATCH_TO_EVENT':
            return addMatchToEvent(state, action.evt, action.match)
        default:
            return state
    }
}

export default reducer

// temp
export {
    addGroup,
    handleAddGroup,
    addMemberToGroup,
    handleAddMemberToGroup
}