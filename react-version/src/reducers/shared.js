import uuid from 'uuid/v4'

export const ADD_MEMBER_TO_GROUP = 'secret-santa/shared/add-member-to-group'

export function addMemberToGroup(group, member) {
    const id = uuid()

    return {
        type: ADD_MEMBER_TO_GROUP,
        id,
        group,
        member
    }
}

