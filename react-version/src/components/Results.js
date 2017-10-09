import React, { Component } from 'react'
import { connect } from 'react-redux'
import { values, entries } from '../lib/utils'
import generate from '../lib/elf'
import MatchTable from './MatchTable'

class Results extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  generate = () => {
    const { participants, participantMap, groups } = this.props

    const ids = participants.map(p => p.id)
    const blacklist = this.createBlacklist(groups)

    const matches = generate(ids, blacklist)

    console.log(entries(matches))

    this.setState({
      results: entries(matches).map(m => ({ gifter: m.key, giftee: m.value }))
    })
  }

  createBlacklist = (groups) => {
    const blacklist = {}

    groups.forEach(group => {
      for (let i = 0; i < group.members.length; i = i + 1) {
        const id = group.members[i]
        blacklist[id] = group.members.filter(m => m !== id)
      }
    })

    return blacklist
  }

  render() {
    return (
      <div>
        <h1>Results</h1>
        { this.state.results && 
            <MatchTable participants={this.props.participantMap} matches={this.state.results} />
        }
        <button onClick={this.generate}>Generate</button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const participants = state.get('participants').toJS()
  return {
    groups: state.get('groups').toJS(),
    participantMap: participants,
    participants: values(participants)
  }
}

export default connect(mapStateToProps)(Results)