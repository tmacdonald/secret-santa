import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Map, List } from 'immutable'
import { addMatchToEvent } from '../reducers/index'

import { values } from '../utils'

class Event extends Component {
    constructor(props) {
        super(props)

        this.state = {
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.onChangeGifter = this.onChangeGifter.bind(this)
        this.onChangeGiftee = this.onChangeGiftee.bind(this)
    }

    onSubmit(evt) {
        evt.preventDefault()

        const { event, addMatchToEvent } = this.props

        addMatchToEvent(event, this.state)
    }

    onChangeGifter(evt) {
        this.setState({
            gifter: evt.target.value
        })
    }

    onChangeGiftee(evt) {
        this.setState({
            giftee: evt.target.value
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

                <form onSubmit={this.onSubmit}>
                    <select value={this.state.gifter} onChange={this.onChangeGifter}>
                        <option></option>
                        {participantList.map(p => <option value={p.id}>{p.name}</option>)}
                    </select>
                    <select value={this.state.giftee} onChange={this.onChangeGiftee}>
                        <option></option>
                        {participantList.map(p => <option value={p.id}>{p.name}</option>)}
                    </select>
                    <input type="submit" value="Add match" />
                </form>
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