import React, { Component } from 'react'
import { Route, NavLink } from 'react-router-dom'
import { navBar, navLink, current } from './EmpNavigator.module.scss'

class EmpNavigator extends Component {

  isNotHome (match) {
    return (match && (match.path !== '\\/' || match.isExact))
  }

  render () {
    return (
      <>
        <div className={navBar}>
          {this.props.routes.map(({ route, label }) => label &&
            <NavLink
              key={route}
              to={route}
              className={navLink}
              activeClassName={current}
              isActive={this.isNotHome}
            >
              {label}
            </NavLink>
          )}
        </div>
        <div>
          {this.props.routes.map(({ route, props, exact, component: RouteComponent }) =>
            <Route exact={exact} key={route} path={route} render={routerProps =>
              <RouteComponent {...routerProps} {...props}/>
            }/>
          )}
        </div>
      </>
    )
  }
}

export default EmpNavigator
