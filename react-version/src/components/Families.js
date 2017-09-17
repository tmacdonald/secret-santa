import React, { Component } from 'react'

const Member = ({ member }) => {
    return (
        <div>
            Name: { member.name }
            Email: { member.email }
        </div>
    )
}

const FamilyMembers = ({ members }) => {
    return (
        <div>
            { members.map(member => <Member member={member} />) }
        </div>
    )
}

const Family = ({ family }) => {
    return (
        <div>
            <h2>Family</h2>
            <FamilyMembers members={family.members} />
        </div>
    )
}

export default class Families extends Component {

    constructor() {
        super()
        this.state = {
            families: [
                {
                    members: [
                        { name: "Tim", email: "macdonald.tim@gmail.com" },
                        { name: "Robyn", email: "macdonald.robyn@gmail.com" }
                    ]
                },
                {
                    members: [
                        { name: "Barb", email: "barbie.mac@gmail.com" },
                        { name: "Ken", email: "ken.macdonald2@gc.ca" }
                    ]
                }
            ]
        }
    }

    addFamily() {
        this.setState({
            families: [...this.state.families, { members: []}]
        })
    }

    render() {
        return (
            <div>
                <h1>Families ({ this.state.families.length })</h1>
                { this.state.families.map(family => <Family family={family} />) }
                <button onClick={this.addFamily.bind(this)}>Add Family</button>
            </div>
        )
    }
}