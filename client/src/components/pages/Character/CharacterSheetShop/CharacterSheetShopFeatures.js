import React, { Component } from 'react'
import EmpTable from '../../../EmpTable/EmpTable'
import { warningText, boosted } from '../CharacterPage.module.scss'
import EmpButton from '../../../EmpButton/EmpButton'
import featureFields from '../../../../gameData/featureFields'
import withoutIndex from '../../../../utils/withoutIndex'
import { cloneDeep } from 'lodash'

class CharacterSheetShopFeatures extends Component {

  handleEdit = (index, values) => {
    return this.props.updateCharacter(`shop.features.${index}`, {
      ...values,
      cost: parseInt(values.cost)
    })
  }

  handleDelete = index => {
    return this.props.updateCharacter('shop.features', withoutIndex(
    this.props.currentShopFeatures,
    index
  ))}

  handleAdd = values => {
    return this.props.updateCharacter('shop.features', [
      ...this.props.currentShopFeatures,
      { ...values, cost: parseInt(values.cost) }
    ])
  }

  handleBuy = (index, feature, event) => {
    event.stopPropagation()
    return this.props.updateCharacter([
      { path: 'shop.features', value: withoutIndex(this.props.currentShopFeatures, index) },
      { path: 'shop.advancements', value: this.props.advancements - feature.cost },
      { path: 'stats.features', value: [ ...this.props.currentStatsFeatures, feature ]}
    ])
  }

  renderBuyButton = index => {
    const feature = cloneDeep(this.props.features[index])
    return (feature.cost > this.props.advancements) ? (
      <div className={warningText}>Costs {feature.cost} adv.</div>
    ) : (
      <EmpButton mode="success" onClick={this.handleBuy.bind(this, index, feature)}>-{feature.cost} Adv.</EmpButton>
    )
  }

  renderDescription = feature => {
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
        addText="Add a feature to your shop"
        items={this.props.features}
        columnNames={{ name: 'Name', description: 'Description' }}
        renderFields={{ description: this.renderDescription }}
        isDeletable
        fields={featureFields}
        onEdit={this.handleEdit}
        onDelete={this.handleDelete}
        onAdd={this.handleAdd}
        customFields={[
          {
            title: 'Buy',
            render: this.renderBuyButton
          }
        ]}
      />
    )
  }
}

export default CharacterSheetShopFeatures
