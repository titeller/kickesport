import React, { Component } from 'react'
import FacebookLogin from 'react-facebook-login'
import DropdownMenu from 'react-dd-menu'
import * as Api from '../../api'
import * as Cookie from '../../helpers/cookies'
import facebookAppId from '../../config/facebook-endpoint'

class Header extends Component {
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
        // location.reload()
        window.location = '/dashboard'
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
    const { member = null, headerBackground = true } = this.props
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
              {
                member !== null ? (
                  <div className="header-profile">
                    <div className="member-avatar-container">
                      <img src={member.picture_profile || '/static/images/member/avatar.png'} className="member-avatar" alt="member-avatar" />
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
              color: #555555;
            }
            .transparent {
              color: #ffffff;
              background-color: transparent;
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
