import { handleAddGroup } from './index'
import { Map, List } from 'immutable'

it('should add an empty group to an empty groups list', () => {
    const state = Map({ groups: List([]) })
    const action = { type: 'ADD_GROUP', id: '1' }

    const newState = handleAddGroup(state, action)

    expect(newState.getIn(['groups', 0])).toEqual(Map({ id: '1', members: List([]) }))
})

it('should add an empty group to previously used groups list', () => {
    const state = Map({ groups: List([Map({ id: '1', members: List([]) })]) })

    const action = { type: 'ADD_GROUP', id: '2' }

    const newState = handleAddGroup(state, action)

    expect(newState.getIn(['groups', 0])).toEqual(Map({ id: '1', members: List([]) }))
    expect(newState.getIn(['groups', 1])).toEqual(Map({ id: '2', members: List([]) }))
})