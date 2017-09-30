function addMemberToGroup(state, group, member) {
    const i = (state.groups.indexOf(group));

    const newGroup = {
        members: [...group.members, member]
    }
    return {
        ...state,
        groups: [...state.groups.slice(0, i), newGroup, ...state.groups.slice(i+1)]
    }
}

function addGroup(state, group) {
    const groups = [...state.groups || [], { members: []}]

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