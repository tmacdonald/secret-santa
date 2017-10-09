import uuid from 'uuid/v4'
import { List, Map } from 'immutable'
import { values, indexOf } from '../lib/utils'
import generate from '../lib/elf'

const ADD_GROUP = 'ADD_GROUP'

function addGroup() {
    const id = uuid()

    return {
        type: ADD_GROUP,
        id
    }
}

function handleAddGroup(state, action) {
    const { id } = action
    
    return state
        .updateIn(['groups'], groups => groups.push(Map({ id, members: List() })))
}

const ADD_MEMBER_TO_GROUP = 'ADD_MEMBER_TO_GROUP'

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
    const i = indexOf(state.get('groups').toJS(), g => g.id === group.id)

    return state
        .setIn(['participants', id], Map({ ...member, id }))
        .updateIn(['groups', i, 'members'], members => members.push(id))
}

const ADD_EVENT = 'ADD_EVENT'

function addEvent(event) {
    const id = uuid()
    return {
        type: ADD_EVENT,
        id,
        event
    }
}

function handleAddEvent(state, { id, event }) {
    return state
        .updateIn(['events'], events => events.push(
            event
                .setIn(['id'], id)
                .setIn(['matching_results'], List([]))
        ))
}

const ADD_MATCH_TO_EVENT = 'ADD_MATCH_TO_EVENT'

function addMatchToEvent(event, match) {
    return {
        type: ADD_MATCH_TO_EVENT,
        event,
        match
    }
}

function handleAddMatchToEvent(state, { event, match }) {
    const i = indexOf(state.get('events').toJS(), e => e.id === event.id)

    const newState = state
        .updateIn(
            ['events', i, 'matching_results'], 
            matching_results => matching_results.push(Map(match))
        )

    return newState
}

const ADD_RESULT = 'ADD_RESULT'
const RESULTS_UPDATED = 'RESULTS_UPDATED'

export function addResult(result) {
    return {
        type: ADD_RESULT,
        result
    }
}

function handleAddResult(state, { result }) {
    return state
        .setIn(['results', result.key], result.value)
}

export function clearResults() {
    return {
        type: 'RESULTS_UPDATED',
        results: {}
    }
}

function generateResults(participants, groups, events, whitelist) {
    const participantList = values(participants)

    const ids = participantList.map(p => p.id)
    const blacklist = createBlacklist(groups, events)

    const results = generate(ids, blacklist, whitelist)

    return {
        type: RESULTS_UPDATED,
        results
    }
}

function handleUpdatedResults(state, { results }) {
    const newState = state
        .update('results', () => Map(results))

    return newState
}

function createBlacklist(groups, events) {
    const blacklist = {}

    groups.forEach(group => {
      for (let i = 0; i < group.members.length; i = i + 1) {
        const id = group.members[i]
        blacklist[id] = group.members.filter(m => m !== id)
      }
    })

    events.forEach(evt => {
        evt['matching_results'].forEach(match => {
            const id = match.gifter
            blacklist[id] = blacklist[id].concat(match.giftee)
        })
    })

    return blacklist
}

export function sendMail(participants, results) {
    for (let key in results) {
        if (results.hasOwnProperty(key)) {
            const gifter = participants[key]
            const giftee = participants[results[key]]

            fetch('http://localhost:8080/api/', {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                method: 'POST',
                body: JSON.stringify({
                    gifter,
                    giftee
                })
            })
        }
    }
}

function reducer(state, action) {
    switch (action.type) {
        case ADD_GROUP:
            return handleAddGroup(state, action)
        case ADD_MEMBER_TO_GROUP:
            return handleAddMemberToGroup(state, action)
        case ADD_EVENT:
            return handleAddEvent(state, action)
        case ADD_MATCH_TO_EVENT:
            return handleAddMatchToEvent(state, action)
        case ADD_RESULT:
            return handleAddResult(state, action)
        case RESULTS_UPDATED:
            return handleUpdatedResults(state, action)
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
    handleAddMemberToGroup,
    addEvent,
    addMatchToEvent,
    generateResults
}