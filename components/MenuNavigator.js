import React, { Component } from 'react'
import GameDropdown from './GameDropdown'

export default class MenuNavigator extends Component {
  render() {
    const { currentGame } = this.props
    return (
      <div className="menu-container">
        <div className="navigator">
          <div className="select-game">
            <GameDropdown currentGame={currentGame} />
          </div>
          <a href="/dashboard" className="navigator-row active">
            <i className="fa fa-bullhorn navigator-icon" aria-hidden="true" />
            <span>ประกาศหาทีม</span>
          </a>
          <a href="/dashboard" className="navigator-row">
            <i className="fa fa-paper-plane-o navigator-icon" aria-hidden="true" />
            <span>หาทีมซ้อม</span>
          </a>
          <a href="/dashboard" className="navigator-row">
            <i className="fa fa-trophy navigator-icon" aria-hidden="true" />
            <span>ทัวร์นาเม้น</span>
          </a>
        </div>
        <style jsx>{`
          .menu-container {
            max-width: 180px;
            width: 100%;
            margin-left: 4px;
            float: left;
          }
          .navigator-row {
            display: block;
            color: #555;
            box-sizing: border-box;
            padding: 4px 6px;
            font-size: 14px;
            border-radius: 2px;
            margin-bottom: 8px;
          }
          .navigator-row:hover {
            background: #e5e5e5;
          }
          .navigator-row.active {
            color: #fff;
            background: #d80157;
            font-weight: bold;
          }
          .navigator-icon {
            margin-right: 6px;
          }
          .select-game {
            margin-bottom: 6px;
            padding-right: 6px;
            border-bottom: solid 1px #e5e5e5;
          }
          @media only screen and (max-width: 768px) {
            .menu-container {
              float: inherit;
              max-width: inherit;
              margin: 0 4px;
              width: calc(100% - 8px);
            }
            .navigator-row {
              display: inline-block;
            }
          }
        `}</style>
      </div>
    )
  }
}
