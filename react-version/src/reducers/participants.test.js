import participantsReducer from './participants'
import { addMemberToGroup } from './groups'
import { Map, List } from 'immutable'

it('should add a member to the participants map', () => {
    const state = Map({ participants: Map({}) })
    const member = { name: 'Tim', email: 'tim@example.com' }

    const newState = participantsReducer(state, addMemberToGroup(Map({}), member, 'a'))

    expect(newState.getIn(['participants', 'a'])).toEqual(Map({ ...member, id: 'a' }))
})

it('should add a second member to the participants map', () => {
    const state = Map({ participants: Map({ 'a': Map({ name: 'Tim', email: 'tim@example.com', id: 'a' }) }) })
    const member = { name: 'Robyn', email: 'robyn@example.com' }

    const newState = participantsReducer(state, addMemberToGroup(Map({}), member, 'b'))

    expect(newState.getIn(['participants', 'a'])).toEqual(Map({ name: 'Tim', email: 'tim@example.com', id: 'a' }))
    expect(newState.getIn(['participants', 'b'])).toEqual(Map({ ...member, id: 'b' }))
})