import React, { Component } from 'react'

class Relationships extends Component {
    constructor(props) {
        super(props)

        this.state = {
            participants: [],
            selectedParticipants: []
        }
    }

    onSelectParticipant(participant) {
      this.setState(state => ({
        ...state,
        selectedParticipants: [...this.state.selectedParticipants, participant.name]
      }))
    }

    componentDidMount() {
        const participants = JSON.parse(window.localStorage.getItem('participants')) || []
        this.setState({
            participants
        })
    }

    render() {
        const { participants, selectedParticipants } = this.state;
        
        return participants.map(participant => {
          const className = selectedParticipants.includes(participant.name) ? 'selected': ''
          return <Participant 
            key={participant.name} 
            onSelectParticipant={this.onSelectParticipant.bind(this, participant)}
            className={className} 
            participant={participant} 
          />
        })
    }
}

const Participant = ({ participant, onSelectParticipant, className }) => <h1 className={className} onClick={onSelectParticipant}>{participant.name}</h1>

export default Relationships