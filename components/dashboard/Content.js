import React, { Component } from 'react'
import MenuProfile from '../MenuProfile'
import GameDropdown from '../GameDropdown'

export default class Content extends Component {
  render() {
    const { member, currentGame, children } = this.props
    return (
      <div className="dashboard-constrain">
        <div className="dashboard-menu">
          <GameDropdown currentGame={currentGame} />
          <div className="menu-right">
            <MenuProfile member={member} />
          </div>
        </div>
        <div className="dashboard-content">{children}</div>
        <style jsx>{`
      .dashboard-constrain {
        position: relative;
        float: right;
        width: calc(100% - 260px);
        background: #F7F7F8;
        min-height: 100vh;
      }
      .dashboard-menu {
        background: #ffffff;
        height: 60px;
        line-height: 60px;
        border-bottom: solid 1px rgba(255, 255, 255, 0.2);
        padding: 0 12px;
      }
      .menu-right {
        float: right;
      }
      .dashboard-content {
        padding: 16px 12px;
      }

      @media only screen and (max-width: 768px) {
        .dashboard-constrain {
          float: inherit;
          width: 100%;
        }
        .dashboard-content {
          padding: 8px;
        }
      }
    `}</style>
      </div>
    )
  }
}