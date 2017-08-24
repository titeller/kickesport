import React, { Component } from 'react'
import MenuProfile from '../MenuProfile'

class Header extends Component {
  render() {
    const { member = null, headerBackground = true } = this.props
    return (
      (
        <header className={!headerBackground && 'transparent'}>
          <div className="header-container">
            <div className="header-left">
              <a href="/">
                {
                  !headerBackground ?
                    <img src="/static/images/kickesport-tranparent.png" className="header-logo" />
                    :
                    <img src="/static/images/logo-fixed.png" className="header-logo" />
                }
              </a>
            </div>
            <div className="header-right">
              <MenuProfile member={member} />
            </div>
          </div>
          <style jsx>{`
            header {
              position: fixed;
              transition: background 0.3s linear;
              transform: translateZ(0);
              height: 60px;
              line-height: 60px;
              width: 100%;
              z-index: 5000;
              padding: 0 8px;
              background-color: #ffffff;
              border-bottom: solid 1px #e9e9e9;
              color: #555555;
            }
            .transparent {
              color: #ffffff;
              background-color: transparent;
              border-bottom: solid 1px transparent;
            }
            .header-container {
              max-width: 1300px;
              margin: 0 auto;
            }
            .header-logo {
              width: 100%;
              max-width: 128px;
              display: inline-block;
              vertical-align: middle;
            }
            .header-left {
              float: left;
            }
            .header-right {
              float: right;
            }

            .header-profile {
              display: inline-block;
              padding: 0 8px;
            }
            .member-avatar-container {
              display: inline-block;
              width: 40px;
              height: 40px;
              border-radius: 100%;
              border: solid 2px #d80157;
              margin: 0 8px 0 0;
              overflow: hidden;
              text-align: center;
              position: relative;
              vertical-align: middle;
            }
            .member-avatar {
              display: inline-block;
              max-width: 100%;
              max-height: 100%;
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%);
            }
            .member-name {
              display: inline-block;
              font-size: 14px;
              vertical-align: middle;
            }
          `}</style>
        </header>
      )
    )
  }
}

export default Header
