import React from 'react'
import './MatchTable.css';

const MatchTable = ({ matches, participants }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Gifter</th>
                    <th>Giftee</th>
                </tr>
            </thead>
            <tbody>
                { matches && matches.map(r => {
                    const gifter = participants[r.gifter]
                    const giftee = participants[r.giftee]

                    return (
                        <tr key={gifter.name}>
                            <td>{gifter.name}</td>
                            <td className="giftee">{giftee.name}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default MatchTable