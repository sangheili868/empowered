import React, { Component } from 'react'
import CharacterSheetTable from '../CharacterSheetTable/CharacterSheetTable'
import { warningText } from '../CharacterPage.module.scss'
import EmpButton from '../../../EmpButton/EmpButton'
import featureFields from '../../../../gameData/featureFields'
import withoutIndex from '../../../../utils/withoutIndex'
import { cloneDeep } from 'lodash'

class CharacterSheetShopFeatures extends Component {

  handleEdit = (index, values) => {
    return this.props.updateCharacter(['shop', 'features', index], {
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

  render () {
    return (
      <CharacterSheetTable
        title="Features"
        addText="Add a feature to your shop"
        items={this.props.features}
        columnNames={{ name: 'Name', description: 'Description' }}
        isDeletable
        fields={featureFields}
        onEdit={this.handleEdit}
        onDelete={this.handleDelete}
        onAdd={this.handleAdd}
        buyButton={this.renderBuyButton}
      />
    )
  }
}

export default CharacterSheetShopFeatures
