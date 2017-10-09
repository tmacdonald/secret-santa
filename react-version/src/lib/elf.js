
/**
 * 
 * @param {Array} list              A list of all possible candidates
 * @param {Object} actor            The actor to pick candidates for
 * @param {Dictionary} blacklist    A hash of which candidates are invalid for the actor
 * @param {Array} used              A list of candidates that have already been picked
 * @return {Array}                  A list of valid candidates
 */
function getCandidates(list, actor, blacklist, whitelist, used) {
    if (whitelist[actor]) {
        return [whitelist[actor]]
    }

    return list
        .filter(potential => {
            return potential !== actor 
                && (
                    !blacklist[actor] 
                        || blacklist[actor].indexOf(potential) === -1) 
                && used.indexOf(potential) === -1
        })
        .sort(() => Math.random() < 0.5)
}

function generateRecursive(list, i, blacklist, whitelist, used) {
    const actor = list[i]
    const candidates = getCandidates(list, actor, blacklist, whitelist, used)
    
    if (candidates) {
        for (let j = 0; j < candidates.length; j = j + 1) {
            const candidate = candidates[j]
            if (i === list.length - 1) {
                return {
                    [actor]: candidate
                }
            } else {
                const recursiveCall = generateRecursive(list, i + 1, blacklist, whitelist, used.concat(candidate))
                if (recursiveCall) {
                    return { [actor]: candidate, ...recursiveCall }
                }
            }
        }
    }

    // This means that no result could be found for the inputs
    return null
}

/**
 * 
 * @param {Array} list      A list of actors to be matched
 * @param {Map} blacklist   A map of which actors are invalid for a given actor
 * @param {Map} whitelist   A map of actor -> actor that should always be matched
 */
export default function generate(list, blacklist = {}, whitelist = {}) {
    return generateRecursive(list, 0, blacklist, whitelist, [])
}