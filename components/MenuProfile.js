import React, { Component } from 'react'
import FacebookLogin from 'react-facebook-login'
import DropdownMenu from 'react-dd-menu'
import * as Api from '../api'
import * as Cookie from '../helpers/cookies'
import facebookAppId from '../config/facebook-endpoint'

export default class MenuProfile extends Component {
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
      window.location = '/dashboard'
    }
  }

  logout() {
    Cookie.removeCookies({ cookieName: 'kickesportToken' })
    window.location = '/'
  }

  render() {
    const { member = null } = this.props
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
      <div>
        {
          member !== null ? (
            <div className="header-profile">
              <div className="member-avatar-container">
                <img src={member.picture_profile || '/static/images/member/avatar.png'} className="member-avatar" alt="member-avatar"/>
              </div>
              <div className="member-name">
                <strong>{member.first_name} {member.last_name}</strong>
              </div>
              <DropdownMenu {...menuOptions}>
                {/*<li><a href="/profile">Profile</a></li>*/}
                <li><a onClick={this.logout.bind(this)}>Logout</a></li>
              </DropdownMenu>
            </div>
          ) : (
            <FacebookLogin
              appId={facebookAppId}
              autoLoad={false}
              fields="name,email,picture,first_name,last_name"
              scope="public_profile,email"
              callback={this.responseFacebook}
              textButton="Login"
              cssClass="loginBtn loginBtn--facebook"
            />
          )
        }
        <style jsx>{`
          .header-profile {
            display: inline-block;
            padding: 0 8px;
          }
          .member-avatar-container {
            display: inline-block;
            width: 40px;
            height: 40px;
            border-radius: 100%;
            border: solid 1px #888;
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
          @media only screen and (max-width: 768px) {
            .member-name {
              display: none;
            }
          }
    `}</style>
      </div>
    )
  }
}