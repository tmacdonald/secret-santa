export function values(map) {
    const values = []

    for (let key in map) {
        if (map.hasOwnProperty(key)) {
            values.push(map[key])
        }
    }

    return values
}

export function entries(map) {
    const entries = []

    for (let key in map) {
        if (map.hasOwnProperty(key)) {
            entries.push({ key, value: map[key] })
        }
    }

    return entries
}