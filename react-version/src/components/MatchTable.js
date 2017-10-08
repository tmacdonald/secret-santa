import React from 'react'

const MatchTable = ({ event, participants }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Gifter</th>
                    <th>Giftee</th>
                </tr>
            </thead>
            <tbody>
                { event['matching_results'].map(r => {
                    const gifter = participants[r.gifter]
                    const giftee = participants[r.giftee]

                    return (
                        <tr>
                            <td>{gifter.name}</td>
                            <td>{giftee.name}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default MatchTable