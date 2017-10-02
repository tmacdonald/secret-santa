import uuid from 'uuid/v4'

function addMemberToGroup(state, group, member) {
    const newMember = {
        ...member,
        id: uuid()
    }

    const newGroup = {
        ...group,
        members: [...group.members, newMember.id]
    }
    return {
        ...state,
        participants: { ...state.participants || {}, [newMember.id]: newMember },
        groups: {...state.groups, [group.id]: newGroup}
    }
}

function addGroup(state, group) {
    const id = uuid()
    const groups = {...state.groups || {}, [id]: { id, members: []}}

    return {
        ...state,
        groupIds: [...state.groupIds || [], id],
        groups
    }
}

function addEvent(state, event) {
    const id = uuid()
    const events = [...state.events || [], { ...event, id, matching_results: []}]

    return {
        ...state,
        events
    }
}

function addMatchToEvent(state, event, match) {
    const { events } = state
    const i = (events.indexOf(event))

    const newEvent = {
        ...event,
        matching_results: [...event.matching_results, match]
    }
    return {
        ...state,
        events: [...events.slice(0, i), newEvent, ...events.slice(i + 1)]
    }
}

function reducer(state, action) {
    switch (action.type) {
        case 'ADD_GROUP':
            return addGroup(state, action.group)
        case 'ADD_MEMBER_TO_GROUP':
            return addMemberToGroup(state, action.group, action.member)
        case 'ADD_EVENT':
            return addEvent(state, action.event)
        case 'ADD_MATCH_TO_EVENT':
            return addMatchToEvent(state, action.event, action.match)
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