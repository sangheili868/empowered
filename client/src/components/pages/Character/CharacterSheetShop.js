import React, { Component } from 'react'

class CharacterSheetShop extends Component {
  render () {
    return (
      <div>
        Advancements: {this.props.shop.advancements}
      </div>
    )
  }
}

export default CharacterSheetShop