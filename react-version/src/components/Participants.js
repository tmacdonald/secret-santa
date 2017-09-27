import React, { Component } from 'react'

class ParticipantForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            email: '',
            relationships: []
        }

        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleNameChange(event) {
        this.setState({ name: event.target.value })
    }

    handleEmailChange(event) {
        this.setState({ email: event.target.value })
    }

    handleSubmit(event) {
        event.preventDefault()
        this.props.onAddParticipant(this.state)
        this.setState({
            name: '',
            email: ''
        })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={this.state.name} onChange={this.handleNameChange} />
                </label>
                <label>
                    Email:
                    <input type="email" value={this.state.email} onChange={this.handleEmailChange} />
                </label>
                <input type="submit" value="Add" />
            </form>
        )
    }
}

class Participants extends Component {
    constructor(props) {
        super(props)

        this.state = {
            participants: []
        }

        this.onAddParticipant = this.onAddParticipant.bind(this)
    }

    componentDidMount() {
        const participants = JSON.parse(window.localStorage.getItem('participants')) || []
        this.setState({
            participants
        })
    }

    onAddParticipant(participant) {
        this.setState((prevState => {
            const participants = [...prevState.participants, participant]

            window.localStorage.setItem('participants', JSON.stringify(participants))

            return {
                participants
            }
        }))
        this.setState({
            participants: [...this.state.participants, participant]
        })
    }

    render() {
        return (
            <div>
                <h1>Participants</h1>
                <ul>
                    {this.state.participants.map(participant => <li key={participant.name}>{participant.name}</li> )}
                </ul>
                <pre>{JSON.stringify(this.state.participants, null, 2) }</pre>
                <ParticipantForm onAddParticipant={this.onAddParticipant} />
            </div>
        )
    }
}

export default Participants