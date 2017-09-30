import React, { Component } from 'react'

function addMemberToGroup(state, group, member) {
    const i = (state.groups.indexOf(group));

    const newGroup = {
        members: [...group.members, member]
    }
    return {
        ...state,
        groups: [...state.groups.slice(0, i), newGroup, ...state.groups.slice(i+1)]
    }
}

function addGroup(state, group) {
    const groups = [...state.groups, { members: []}]

    return {
        ...state,
        groups
    }
}

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

class Group extends Component {
    render() {
        const { group, onAddMemberToGroup } = this.props;

        return (
            <div className="group">
                <ul>
                    { group.members.map(member => <li>{member.name}</li> )}
                </ul>
                <ParticipantForm onAddParticipant={onAddMemberToGroup} />
            </div>
        )
    }
}

class Groups extends Component {
    constructor(props) {
        super(props)

        this.state = {
            groups: []
        }

        this.onAddGroup = this.onAddGroup.bind(this)
        this.onAddIndividual = this.onAddIndividual.bind(this)
    }

    componentDidMount() {
        const groups = JSON.parse(window.localStorage.getItem('groups')) || []
        this.setState({
            groups
        })
    }

    onAddGroup() {
        this.setState(state => addGroup(state, { members: [] }))
    }

    onAddIndividual() {
        this.setState(state => addGroup(state, { members: [] }))
    }

    onAddMemberToGroup(group, member) {
        this.setState(state => addMemberToGroup(state, group, member))
    }

    render() {
        return (
            <div>
                <h1>Participants</h1>
                <div className="groups">
                    {this.state.groups.map(group => <Group onAddMemberToGroup={this.onAddMemberToGroup.bind(this, group)} group={group} /> )}
                </div>
                <button onClick={this.onAddGroup}>Add group</button>
                <button onClick={this.onAddIndividual}>Add individual</button>
            </div>
        )
    }
}

export default Groups