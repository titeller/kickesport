import React, { Component } from 'react'
import FacebookLogin from 'react-facebook-login'
import DropdownMenu from 'react-dd-menu'
import * as Api from '../../api'
import * as Cookie from '../../helpers/cookies'
import facebookAppId from '../../config/facebook-endpoint'

export default class Header extends Component {
  constructor() {
    super()
    this.state = {
      isMenuOpen: false
    }
  }
  toggle = () => {
    this.setState({ isMenuOpen: !this.state.isMenuOpen });
  }
  close = () => {
    this.setState({ isMenuOpen: false });
  }

  async responseFacebook(response) {
    const { id, email, picture, first_name, last_name } = response

    if(email) {
      const { data } = picture
      const { url } = data
      const member = await Api.post({
        url: '/api/member',
        data: {
          username: email,
          email: email,
          facebook_id: id,
          first_name: first_name,
          last_name: last_name,
          picture_profile: url || ''
        }
      })
      const { axiosData } = member
      const { status } = axiosData
      if(status) {
        location.reload()
      } else {
        console.log(axiosData)
      }
    }
  }

  logout() {
    Cookie.removeCookies({ cookieName: 'kickesportToken' })
    window.location = '/'
  }

  render() {
    const { member = null, children } = this.props
    let menuOptions = {
      isOpen: this.state.isMenuOpen,
      close: this.close.bind(this),
      toggle: (
        <div onClick={this.toggle.bind(this)} >
          <i className="fa fa-bars" aria-hidden="true" />
        </div>
      ),
      align: 'right',
      className: 'hamberger-menu'
    }
    return (
      <div className="dashboard-constrain">
        <div className="dashboard-menu">
          <a className="game-current" href="/dashboard?game=dota2">Dota 2</a>
          <div className="menu-right">
            {
              member !== null ? (
                <div className="header-profile">
                  <div className="member-avatar-container">
                    <img src={member.picture_profile} className="member-avatar" alt="member-avatar"/>
                  </div>
                  <div className="member-name">
                    <strong>{member.first_name} {member.last_name}</strong>
                  </div>
                  <DropdownMenu {...menuOptions}>
                    <li><a href="">Profile</a></li>
                    <li><a onClick={this.logout.bind(this)}>Logout</a></li>
                  </DropdownMenu>
                </div>
              ) : (
                <FacebookLogin
                  appId={facebookAppId}
                  autoLoad={false}
                  fields="name,email,picture,first_name,last_name"
                  scope="public_profile"
                  callback={this.responseFacebook}
                  textButton="Login"
                  cssClass="loginBtn loginBtn--facebook"
                />
              )
            }
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
      }
      .menu-right {
        float: right;
      }
      .game-current {
        position: relative;
        padding: 0.75rem 1.25rem 0.725rem 3.25rem;
        font-size: 18px;
        margin-left: 4px;
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

            .dashboard-content {
              padding: 16px 12px;
            }
    `}</style>
      </div>
    )
  }
}