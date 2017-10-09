import React, { Component } from 'react'
import { connect } from 'react-redux'
import { values, entries } from '../lib/utils'
import generate from '../lib/elf'
import MatchTable from './MatchTable'
import MatchForm from './MatchForm'
import { addResult, generateResults, clearResults } from '../reducers'

class Results extends Component {
  generate = () => {
    const { participants, groups, results, generateResults } = this.props
    generateResults(participants, groups, results)
  }

  addResult = (result) => {
    this.props.addResult({ key: result.participant1, value: result.participant2 })
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

        <MatchForm participants={participantList} onAddMatch={this.addResult} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { participants, groups, results } = state.toJS()

  return {
    participants,
    participantList: values(participants),
    groups,
    results,
    matches: entries(results).map(r => ({ gifter: r.key, giftee: r.value }))
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addResult: (result) => dispatch(addResult(result)),
    clearResults: () => dispatch(clearResults()),
    generateResults: (participants, groups, results) => dispatch(generateResults(participants, groups, results))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Results)