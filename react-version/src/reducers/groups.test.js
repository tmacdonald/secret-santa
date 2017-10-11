import groupsReducer, { addGroup, addMemberToGroup } from './groups'
import { Map, List } from 'immutable'

it('should add an empty group to an empty groups list', () => {
    const state = Map({ groups: List([]) })

    const newState = groupsReducer(state, addGroup('1'))

    expect(newState.getIn(['groups', 0])).toEqual(Map({ id: '1', members: List([]) }))
})

it('should add an empty group to previously used groups list', () => {
    const state = Map({ groups: List([Map({ id: '1', members: List([]) })]) })

    const newState = groupsReducer(state, addGroup('2'))

    expect(newState.getIn(['groups', 0])).toEqual(Map({ id: '1', members: List([]) }))
    expect(newState.getIn(['groups', 1])).toEqual(Map({ id: '2', members: List([]) }))
})

it('should add a member to a group', () => {
    const group = Map({ id: '1', members: List([]) })
    const state = Map({ groups: List([group]) })
    const member = { name: 'Tim', email: 'tim@example.com' }

    const newState = groupsReducer(state, addMemberToGroup(group, member, 'a'))

    expect(newState.getIn(['groups', 0])).toEqual(Map({ id: '1', members: List(['a']) }))
})

it('should add a second member to a group', () => {
    const group = Map({ id: '1', members: List(['a']) })
    const state = Map({ groups: List([group]) })
    const member = { name: 'Tim', email: 'tim@example.com' }

    const newState = groupsReducer(state, addMemberToGroup(group, member, 'b'))

    expect(newState.getIn(['groups', 0])).toEqual(Map({ id: '1', members: List(['a','b']) }))
})