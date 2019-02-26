import React, { Component } from 'react'

class CharacterSheetShop extends Component {
  render () {
    return (
      <div>
        {JSON.stringify(this.props.shop)}
      </div>
    )
  }
}

export default CharacterSheetShop