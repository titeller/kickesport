import React, { Component } from 'react'
import MenuProfile from '../MenuProfile'
import GameDropdown from '../GameDropdown'

export default class Content extends Component {
  render() {
    const { member, currentGame, children } = this.props
    return (
      <div className="dashboard-constrain">
        <div className="dashboard-menu">
          <a href="/" className="logo-responsive">
            <img src="/static/favicon.ico" />
          </a>
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
      .logo-responsive {
        display: none;
      }
      .logo-responsive > img {
        vertical-align: middle;
        margin-top: -4px;
      }

      @media only screen and (max-width: 768px) {
        .dashboard-constrain {
          float: inherit;
          width: 100%;
        }
        .dashboard-menu {
          padding-left: 0;
        }
        .dashboard-content {
          padding: 8px;
        }
        .logo-responsive {
          display: inline-block;
          padding: 0 12px;
          margin-right: 8px;
          border-right: solid 1px #fafafa;
          cursor: pointer;
        }
        .logo-responsive:hover {
          background: #fafafa;
          border-right: solid 1px rgba(255, 255, 255, 0.2);
        }
      }
    `}</style>
      </div>
    )
  }
}