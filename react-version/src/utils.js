export function values(map) {
    const values = []

    for (let key in map) {
        if (map.hasOwnProperty(key)) {
            values.push(map[key])
        }
    }

    return values
}