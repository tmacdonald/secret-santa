import React, { Component } from 'react'
import { connect } from 'react-redux'

import { addGroup, addMemberToGroup } from '../reducers/index'

class ParticipantForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            email: ''
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
                { /*
                <label>
                    Email:
                    <input type="email" value={this.state.email} onChange={this.handleEmailChange} />
                </label>
                */ }
            </form>
        )
    }
}

const Group = ({ group, participants, addMemberToGroup }) => (
    <div className="group">
        <ul>
            { group.get('members').map(id => participants.get(id)).map(member => <li key={member.get('id')}>{member.get('name')}</li> )}
        </ul>
        <ParticipantForm onAddParticipant={addMemberToGroup} />
    </div>
)

const Groups = ({ groups, participants, addGroup, addMemberToGroup }) => (
    <div>
        <h1>Participants</h1>
        <div className="groups">
            {groups.map(group => <Group key={group.get('id')} addMemberToGroup={addMemberToGroup.bind(null, group)} group={group} participants={participants} /> )}
        </div>
        <button onClick={addGroup}>Add group</button>
        <button onClick={addGroup}>Add individual</button>
    </div>
)

function mapStateToProps(state) {
    return {
        groups: state.get('groups'),
        participants: state.get('participants')
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addGroup: () => dispatch(addGroup()),
        addMemberToGroup: (group, member) => dispatch(addMemberToGroup(group, member))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Groups)