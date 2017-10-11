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

export function indexOf(list, finder) {
    for (let i = 0; i < list.length; i = i + 1) {
        if (finder(list[i])) {
            return i
        }
    }

    return -1
}