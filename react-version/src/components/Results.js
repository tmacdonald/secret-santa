import React, { Component } from 'react'
import { connect } from 'react-redux'
import { values } from '../lib/utils'
import generate from '../lib/elf'

class Results extends Component {
  generate = () => {
    console.log(generate([1, 2, 3, 4, 5, 6, 7, 8]))
  }

  render() {
    return (
      <div>
        <h1>Results</h1>
        <button onClick={this.generate}>Generate</button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    participants: values(state.participants)
  }
}

export default connect(mapStateToProps)(Results)