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
      .game-current {
        position: relative;
        padding: 0.75rem 1.25rem 0.725rem 3.25rem;
        font-size: 18px;
      }
      .game-current:before {
        content: "";
        box-sizing: border-box;
        position: absolute;
        top: 0;
        left: 4px;
        width: 2.5rem;
        height: 100%;
      }
      .game-current:before {
        background: url(/static/images/games/dota2-logo.png) no-repeat center/cover;
        background-size: 100%;
      }
      .dashboard-content {
        padding: 16px 12px;
      }
    `}</style>
      </div>
    )
  }
}