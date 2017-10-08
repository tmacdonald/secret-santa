import React from 'react'

export default class MatchForm extends React.PureComponent {
    constructor(props) {
        super(props)

        this.state = { }
    }

    onSubmit = (evt) => {
        evt.preventDefault()
        
        this.props.onAddMatch(this.state)
    }

    onChangeParticipant1 = (evt) => {
        this.setState({
            participant1: evt.target.value
        })
    }

    onChangeParticipant2 = (evt) => {
        this.setState({
            participant2: evt.target.value
        })
    }
    
    render() {
        const { participants } = this.props

        return (
            <form onSubmit={this.onSubmit}>
                <select value={this.state.participant1} onChange={this.onChangeParticipant1}>
                    <option></option>
                    {participants.map(p => <option value={p.id}>{p.name}</option>)}
                </select>
                <select value={this.state.participant2} onChange={this.onChangeParticipant2}>
                    <option></option>
                    {participants.map(p => <option value={p.id}>{p.name}</option>)}
                </select>
                <input type="submit" value="Add match" />
            </form>
        )
    }
}