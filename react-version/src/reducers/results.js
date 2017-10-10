import generate from '../lib/elf'
import { Map } from 'immutable'
import { values } from '../lib/utils'

const ADD_RESULT = 'ADD_RESULT'
const RESULTS_UPDATED = 'RESULTS_UPDATED'

export default function(state, action) {
    switch (action.type) {
        case ADD_RESULT: {
            const { result } = action
            return state
                .setIn(['results', result.key], result.value)
        }
        case RESULTS_UPDATED: {
            const { results } = action
            return state
                .update('results', () => Map(results))
        }
        default : {
            return state
        }
    }
}

export function addResult(result) {
    return {
        type: ADD_RESULT,
        result
    }
}

export function clearResults() {
    return {
        type: 'RESULTS_UPDATED',
        results: {}
    }
}

export function generateResults(participants, groups, events, whitelist) {
    const participantList = values(participants)

    const ids = participantList.map(p => p.id)
    const blacklist = createBlacklist(groups, events)

    const results = generate(ids, blacklist, whitelist)

    return {
        type: RESULTS_UPDATED,
        results
    }
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