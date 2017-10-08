import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Map, List } from 'immutable'
import { addMatchToEvent } from '../reducers/index'
import MatchForm from './MatchForm'

import { values } from '../utils'

class Event extends Component {

    addMatch = (match) => {
        this.props.addMatchToEvent(this.props.event, {
            gifter: match.participant1,
            giftee: match.participant2
        })
    }

    render() {
        const { event, participants } = this.props
        const participantList = values(participants)

        return (
            <div className="event">
                <h1>{event.name}</h1>

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

                <MatchForm participants={participantList} onAddMatch={this.addMatch} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        participants: state.get('participants').toJS()
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addMatchToEvent: (event, match) => dispatch(addMatchToEvent(event, match))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Event)