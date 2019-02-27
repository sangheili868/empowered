import React, { Component } from 'react'
import { Route, NavLink } from 'react-router-dom'
import { navBar, navLink, current } from './EmpNavigator.module.scss'
import EmpButton from '../EmpButton/EmpButton'

class EmpNavigator extends Component {
  isNotHome (match) {
    return (match && (match.path !== '\\/' || match.isExact))
  } 
  render () {
    return (
      <div>
        <div className={navBar}>
          {this.props.routes.map(({ route, label }) => 
            <NavLink
              key={route}
              to={route}
              activeClassName={current}
              isActive={this.isNotHome}
            >
              <EmpButton className={navLink}>{label}</EmpButton>
            </NavLink>
          )}
        </div>
        <div>
          {this.props.routes.map(({ route, props, exact, component: RouteComponent }) =>
            <Route exact={exact} key={route} path={route} render={(routerProps) =>
              <RouteComponent {...routerProps} {...props}/>
            }/>
          )}
        </div>
      </div>
    )
  }
}

export default EmpNavigator