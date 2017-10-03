import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Map, List } from 'immutable'
import { addMatchToEvent } from '../reducers/index'

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

        return (
            <div className="event">
                <h1>{event.get('name')}</h1>

                <table>
                    <thead>
                        <tr>
                            <th>Gifter</th>
                            <th>Giftee</th>
                        </tr>
                    </thead>
                    <tbody>
                        { event.get('matching_results').map(r => {
                            const gifter = participants.get(r.get('gifter'))
                            const giftee = participants.get(r.get('giftee'))

                            return (
                                <tr>
                                    <td>{gifter.get('name')}</td>
                                    <td>{giftee.get('name')}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

                <form onSubmit={this.onSubmit}>
                    <select value={this.state.gifter} onChange={this.onChangeGifter}>
                        <option></option>
                        {participants.valueSeq().map(p => <option value={p.get('id')}>{p.get('name')}</option>)}
                    </select>
                    <select value={this.state.giftee} onChange={this.onChangeGiftee}>
                        <option></option>
                        {participants.valueSeq().map(p => <option value={p.get('id')}>{p.get('name')}</option>)}
                    </select>
                    <input type="submit" value="Add match" />
                </form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        participants: state.get('participants')
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addMatchToEvent: (event, match) => dispatch(addMatchToEvent(event, match))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Event)