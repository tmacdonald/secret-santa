import uuid from 'uuid/v4'
import { List, Map } from 'immutable'

function addMemberToGroup(state, group, member) {
    const id = uuid()
    return state
        .setIn(['participants', id], Map({ ...member, id }))
        .updateIn(['groups', group.get('id'), 'members'], members => members.push(id))
}

function addGroup(state, group) {
    const id = uuid()
    
    return state
        .setIn(['groups', id], Map({ id, members: List()}))
        .updateIn(['groupIds'], (groupIds) => groupIds.push(id));
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
        case 'ADD_GROUP':
            return addGroup(state, action.group)
        case 'ADD_MEMBER_TO_GROUP':
            return addMemberToGroup(state, action.group, action.member)
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
    addMemberToGroup
}