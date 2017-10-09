import React, { Component } from 'react'
import { connect } from 'react-redux'
import { values, entries } from '../lib/utils'
import MatchTable from './MatchTable'
import MatchForm from './MatchForm'
import { addResult, generateResults, clearResults, sendMail } from '../reducers'

class Results extends Component {
  generate = () => {
    const { participants, groups, results, events, generateResults } = this.props
    generateResults(participants, groups, events, results)
  }

  addResult = (result) => {
    this.props.addResult({ key: result.participant1, value: result.participant2 })
  }

  sendMail = () => {
    const { participants, results } = this.props
    sendMail(participants, results)
  }

  render() {
    const { participants, participantList, matches, clearResults } = this.props

    return (
      <div>
        <h1>Results</h1>
        { matches && 
            <MatchTable participants={participants} matches={matches} />
        }
        <button onClick={this.generate}>Generate</button>
        <button onClick={clearResults}>Clear</button>
        <button onClick={this.sendMail}>Send Email</button>

        <MatchForm participants={participantList} onAddMatch={this.addResult} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  // Needed for dispatching actions; this seems messy
  const { participants, groups, events, results } = state.toJS()

  return {
    participants,
    participantList: values(participants),
    groups,
    events,
    results,
    matches: entries(results).map(r => ({ gifter: r.key, giftee: r.value }))
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  console.log(ownProps)
  return {
    addResult: (result) => dispatch(addResult(result)),
    clearResults: () => dispatch(clearResults()),
    generateResults: (participants, groups, events, results) => dispatch(generateResults(participants, groups, events, results))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Results)