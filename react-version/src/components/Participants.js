import { connect } from 'react-redux'

import { addGroup, addMemberToGroup } from '../reducers/index'

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