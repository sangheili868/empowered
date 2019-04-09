import React, { Component } from 'react'
import EmpTable from '../../../EmpTable/EmpTable'
import featureFields from '../../../../gameData/featureFields'
import { boosted } from '../CharacterPage.module.scss'

class CharacterSheetStatsFeatures extends Component {

  renderFeatureDescription = feature => {
    return (
      <>
        <div>{feature.description}</div>
        {feature.boosted &&
          <div><span className={boosted}>BOOSTED:</span> {feature.boosted}</div>
        }
      </>
    )
  }

  render () {
    return (
      <EmpTable
        title="Features"
        items={this.props.features}
        columnNames={{ name: 'Name', description: 'Description' }}
        renderFields={{ description: this.renderFeatureDescription }}
        fields={featureFields}
        onEdit={(index, values) => this.props.updateCharacter(`stats.features.${index}`, values)}
      />
    )
  }
}

export default CharacterSheetStatsFeatures
