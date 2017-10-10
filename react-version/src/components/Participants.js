import { connect } from 'react-redux'

import { addGroup } from '../reducers/groups'
import { addMemberToGroup } from '../reducers/shared'

import Groups from './Groups'

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