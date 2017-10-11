import React from 'react'
import ParticipantForm from './ParticipantForm'

export default ({ group, participants, addMemberToGroup }) => (
    <div className="group">
        <ul>
            { group.get('members').map(id => participants.get(id)).map(member => <li key={member.get('id')}>{member.get('name')}</li> )}
        </ul>
        <ParticipantForm onAddParticipant={addMemberToGroup} />
    </div>
)