import React, { Component } from 'react'
import DataTable from 'react-data-table-component'
import { startCase } from 'lodash'

class FeaturesPage extends Component {
  state = {
    features: [
      {
        "name": "Forked Tongue",
        "requirements": {
          "skill": {
            "name": "persuasion",
            "level": 1
          }
        },
        "skillTags": [
          "persuasion"
        ],
        "equipmentTags": [],
        "actionTags": [
          "Distract",
          "Use a Skill"
        ],
        "actionType": "",
        "description": "You can empower persuasion rolls that include a lie.",
        "cost": 1
      },
      {
        "name": "Minor Illusion",
        "requirements": {
          "skill": {
            "name": "knowledge",
            "level": 1
          },
          "weapon": "arcaneWeapon",
          "item": "",
          "other": ""
        },
        "skillTags": [
          "knowledge"
        ],
        "equipmentTags": [
          "arcaneMagicWeapon"
        ],
        "actionTags": [],
        "actionType": "skillAction",
        "description": "As a skill action, you make an empowered knowledge roll and record the result. You create an illusory object no bigger than a 10ft cube, within the range of your focus for one minute. A creature can use its action to make an investigation roll against your result to determine that the illusion is false. You can end the illusion at any time, but it cannot move or produce any sound.",
        "cost": 1
      },
      {
        "name": "Magic Disguise",
        "requirements": {
          "skill": {
            "name": "synergy",
            "level": 1
          },
          "weapon": "unityWeapon",
          "item": "A piece of clothing that has been worn by someone else",
          "other": ""
        },
        "skillTags": [
          "synergy"
        ],
        "equipmentTags": [
          "unityMagicWeapon"
        ],
        "actionTags": [],
        "actionType": "cardinalAction",
        "description": "As a cardinal action, you make an empowered synergy roll and record the result. For one hour, you appear to be the last creature that has worn the reagent besides yourself. A creature can use its action to make an accuracy or knowledge roll against your result to determine that the illusion is false. For the duration, you can use a basic action to disable or enable the illusion. It must be the same creature for each casting of the spell.",
        "cost": 1
      },
      {
        "name": "Memory Theft",
        "requirements": {
          "skill": {
            "name": "synergy",
            "level": 1
          },
          "weapon": "unityWeapon"
        },
        "skillTags": [],
        "equipmentTags": [
          "unityMagicWeapon"
        ],
        "actionTags": [],
        "actionType": "reaction",
        "description": "As an empowered reaction when a creature dies within the range of your focus, you can capture some of its memories. You ask the DM one question, and if the creature knew the answer to that question, the DM reveals it to you. Boosted: You may ask up to three questions.",
        "cost": 1
      },
      {
        "name": "Pathological Liar",
        "skillTags": [],
        "equipmentTags": [],
        "actionTags": [],
        "actionType": "",
        "description": "When a creature correctly claims that you lied to them, or a creature correctly claims that you created an illusion, you have disadvantage on social rolls involving this person for 1 day, unless you convince them otherwise.",
        "cost": 0
      }
    ]
  }

  get columns () {
    return [
      { name: 'Name', selector: 'name', sortable: true },
      { name: 'Action Type', selector: 'actionType', format: ({ actionType }) => startCase(actionType), sortable: true },
      { name: 'Skill Tags', selector: 'skillTags', sortable: true, format: ({ skillTags }) => startCase(skillTags.join(', ')) }
    ]
  }

  render () {
    const ExpandedComponent = ({ data }) => (
      <div>{ data.description }</div>
    )
    return (
      <>
        <DataTable
          columns={this.columns}
          data={this.state.features}
          keyField="name"
          expandableRows={true}
          expandableRowsComponent={<ExpandedComponent/>}
        />
      </>
    )
  }
}

export default FeaturesPage
