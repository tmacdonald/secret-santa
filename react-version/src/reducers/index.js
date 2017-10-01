let memberCount = 0;
let groupCount = 0;

function addMemberToGroup(state, group, member) {
    const i = (state.groups.indexOf(group))

    const newGroup = {
        ...group,
        members: [...group.members, { ...member, id: memberCount++ }]
    }
    return {
        ...state,
        groups: [...state.groups.slice(0, i), newGroup, ...state.groups.slice(i + 1)]
    }
}

function addGroup(state, group) {
    const id = groupCount++
    const groups = [...state.groups || [], { id, members: []}]

    return {
        ...state,
        groups
    }
}

function addEvent(state, event) {
    const id = eventCount++
    const events = [...state.events || [], { id, matching_results: []}]

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