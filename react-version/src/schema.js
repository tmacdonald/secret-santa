import { normalize, denormalize, schema } from 'normalizr'

export const participant = new schema.Entity('participants')

export const group = new schema.Entity('groups', {
    members: [ participant ]
})

export const event = new schema.Entity('events', {
    "matching_results": [ { gifter: participant, giftee: participant }]
})

export const pool = new schema.Entity('pools', {
    groups: [ group ],
    events: [ event ]
})

// const normalizedData = normalize({
//     id: 1,
//     groups: [{
//         id: 1,
//         members: [
//             { id: 1, name: 'Tim', email: 'macdonald.tim@gmail.com' },
//             { id: 2, name: 'Robyn', email: 'macdonald.robyn@gmail.com' }
//         ]
//     }],
//     events: [{
//         id: 1,
//         name: '2016',
//         "matching_results": [
//             { gifter: { id: 1, name: 'Tim', email: 'macdonald.tim@gmail.com' }, giftee: { id: 2, name: 'Robyn', email: 'macdonald.robyn@gmail.com' } },
//             { gifter: { id: 2, name: 'Robyn', email: 'macdonald.robyn@gmail.com' }, giftee: { id: 1, name: 'Tim', email: 'macdonald.tim@gmail.com' } }
//         ]
//     }]
    
// }, pool)

// const data = denormalize( normalizedData.entities.pools['1'], pool, normalizedData.entities)

// console.log(JSON.stringify(normalizedData, null, 2))
//console.log(JSON.stringify(data, null, 2))