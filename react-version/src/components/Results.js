import React, { Component } from 'react'
import { connect } from 'react-redux'
import { values, entries } from '../lib/utils'
import generate from '../lib/elf'
import MatchTable from './MatchTable'
import { addResult, generateResults, clearResults } from '../reducers'

class Results extends Component {
  generate = () => {
    const { participants, groups, generateResults } = this.props
    generateResults(participants, groups)
  }

  render() {
    const { participants, matches, clearResults } = this.props

    return (
      <div>
        <h1>Results</h1>
        { matches && 
            <MatchTable participants={participants} matches={matches} />
        }
        <button onClick={this.generate}>Generate</button>
        <button onClick={clearResults}>Clear</button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { participants, groups, results } = state.toJS()

  return {
    participants,
    groups,
    matches: entries(results).map(r => ({ gifter: r.key, giftee: r.value }))
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addResult: (result) => dispatch(addResult(result)),
    clearResults: () => dispatch(clearResults()),
    generateResults: (participants, groups) => dispatch(generateResults(participants, groups))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Results)