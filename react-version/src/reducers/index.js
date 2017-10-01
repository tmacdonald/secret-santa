let memberCount = 0;
let groupCount = 0;

function addMemberToGroup(state, group, member) {
    const i = (state.groups.indexOf(group));

    const newGroup = {
        ...group,
        members: [...group.members, { ...member, id: memberCount++ }]
    }
    return {
        ...state,
        groups: [...state.groups.slice(0, i), newGroup, ...state.groups.slice(i+1)]
    }
}

function addGroup(state, group) {
    const id = groupCount++;
    const groups = [...state.groups || [], { id, members: []}]

    return {
        ...state,
        groups
    }
}

function reducer(state, action) {
    switch (action.type) {
        case 'ADD_GROUP':
            return addGroup(state, action.group)
        case 'ADD_MEMBER_TO_GROUP':
            return addMemberToGroup(state, action.group, action.member)
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