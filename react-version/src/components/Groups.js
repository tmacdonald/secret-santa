import React from 'react'
import Group from './Group'

export default ({ groups, participants, addGroup, addMemberToGroup }) => (
    <div>
        <h1>Participants</h1>
        <div className="groups">
            {groups.map(group => <Group key={group.get('id')} addMemberToGroup={addMemberToGroup.bind(null, group)} group={group} participants={participants} /> )}
        </div>
        <button onClick={addGroup}>Add group</button>
        <button onClick={addGroup}>Add individual</button>
    </div>
)