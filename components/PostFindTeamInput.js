import React, { Component } from 'react'
import FacebookLogin from 'react-facebook-login'
import * as Api from '../api'
import Loader from './Loader'
import GameDropdown from './GameDropdown'
import Popup from './Popup'
import { isSteamId, isSteamCustomId } from '../helpers/validation'
import { getIdByGameName } from '../helpers/game'
import { getSteamProfileById } from '../helpers/steam'
import facebookAppId from '../config/facebook-endpoint'

export default class PostFindTeamInput extends Component {
  state = {
    popupFindTeam: false,
    steam_id_display: !this.props.steam_id,
    steam_id: this.props.steam_id,
    steam_id_message_error: '',
    rov_name_display: !this.props.rov_name,
    rov_name: this.props.rov_name,
    rov_name_message_error: '',
    role_id: null,
    role_id_message_error: '',
    description: '',
    description_message_error: '',
    loading: false,
  }

  togglePopupFindTeam() {
    this.setState({
      popupFindTeam: !this.state.popupFindTeam,
    })
  }
  toggleDisplaySteamId() {
    this.setState({
      steam_id_display: !this.state.steam_id_display,
      steam_id_message_error: '',
    })
  }
  toggleDisplayRovName() {
    this.setState({
      rov_name_display: !this.state.rov_name_display,
      rov_name_message_error: '',
    })
  }

  async saveSteamId() {
    let { steam_id } = this.state

    if(isSteamId(steam_id) || isSteamCustomId(steam_id)) {
      const member = await Api.put({
        url: '/api/member',
        data: {
          steam_id
        }
      })
      const { axiosData } = member
      const { status } = axiosData
      if(status) {
        this.setState({
          steam_id_display: false
        })
      }
    } else {
      this.setState({
        steam_id_message_error: 'กรุณากรอกข้อมูลให้ถูกต้อง'
      })
    }
  }
  async saveRovName() {
    let { rov_name } = this.state

    if(rov_name) {
      const member = await Api.put({
        url: '/api/member',
        data: {
          rov_name
        }
      })
      const { axiosData } = member
      const { status } = axiosData
      if(status) {
        this.setState({
          rov_name_display: false
        })
      }
    } else {
      this.setState({
        rov_name_message_error: 'กรุณากรอกข้อมูลให้ถูกต้อง'
      })
    }
  }
  handleInputSteamId(event) {
    this.setState({
      steam_id: event.target.value,
    })
  }
  handleRovName(event) {
    this.setState({
      rov_name: event.target.value,
    })
  }
  handleRoleId(event) {
    this.setState({
      role_id: event.target.value,
    })
  }
  handleDescription(event) {
    this.setState({
      description: event.target.value,
    })
  }

  async submitFindTeam() {
    const { currentGame } = this.props
    const { steam_id_display, rov_name_display, role_id, description } = this.state
    let flag = true

    await this.setState({
      steam_id_message_error: '',
      role_id_message_error: '',
      description_message_error: '',
    })

    if(currentGame !== 'rov') {
      if(steam_id_display) {
        flag = false
        this.setState({
          steam_id_message_error: 'กรุณากรอกข้อมูลให้ถูกต้อง',
        })
      }
    } else {
      if(rov_name_display) {
        flag = false
        this.setState({
          rov_name_message_error: 'กรุณากรอกข้อมูลให้ถูกต้อง',
        })
      }
    }

    if(!role_id) {
      flag = false
      this.setState({
        role_id_message_error: 'กรุณาเลือกตำแหน่ง',
      })
    }
    if(!description || (description && description.length < 30)) {
      flag = false
      this.setState({
        description_message_error: 'อธิบายการเล่นหรือสิ่งที่เกี่ยวกับคุณมาอย่างน้อย 30 ตัวอักษร',
      })
    }

    if(flag) {
      this.setState({
        loading: true,
      })
      const game_id = getIdByGameName(currentGame)
      const member_looking = await Api.post({
        url: '/api/member_looking',
        data: {
          game_id,
          role_id,
          description
        }
      })
      const { axiosData } = member_looking
      const { status } = axiosData
      if(status) {
        location.reload()
      } else {
        this.setState({
          loading: false,
        })
        alert('Something went wrong.')
      }
    }
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
        window.location = '/dashboard'
      }
    }
  }

  render() {
    const { member, game_id, roleMaster, currentGame } = this.props
    const { popupFindTeam, steam_id, steam_id_display, steam_id_message_error, rov_name, rov_name_display, rov_name_message_error, role_id, role_id_message_error, description, description_message_error, loading } = this.state
    return (
      <div className="post-containers">
        <button className="primary" onClick={this.togglePopupFindTeam.bind(this)}>
          <i className="fa fa-bullhorn" aria-hidden="true" />
          <strong> ประกาศหาทีม</strong>
        </button>
        {
          popupFindTeam && (
            <Popup title="ประกาศหาทีม" titleIcon="fa-bullhorn" closePopup={this.togglePopupFindTeam.bind(this)}>
                {
                  member ? game_id ? (
                    <div>
                      {
                        currentGame !== 'rov' ? (
                          <div className="popup-content-row">
                            <div className="row-title">
                              <strong>
                                <span><i className="fa fa-steam-square" aria-hidden="true" /> Steam id ของคุณ </span>
                                <small className="text-gray" style={{ display: 'inline-block' }}>(เพื่อให้ผู้เล่นอื่นที่สนใจสามารถติดต่อคุณได้ผ่าน Steam id นี้)</small>
                              </strong>
                            </div>
                            {
                              steam_id_display ? (
                                <div>
                                  <div className="input-with-btn">
                                    <input placeholder="Steam id ของคุณ" onChange={this.handleInputSteamId.bind(this)} value={steam_id || ''} />
                                    <button className="primary" onClick={this.saveSteamId.bind(this)}>บันทึก</button>
                                  </div>
                                  {
                                    steam_id_message_error && (
                                      <div className="text-error message-error">
                                        <div>{steam_id_message_error} ตัวอย่างเช่น</div>
                                        <div>https://steamcommunity.com/profiles/76561198057258855</div>
                                        <div>https://steamcommunity.com/id/kickesport</div>
                                      </div>
                                    )
                                  }
                                </div>
                              ) : (
                                <div>
                                  <a href={getSteamProfileById(steam_id)} className="btn-steam" target="_blank">
                                    <i className="fa fa-steam-square" aria-hidden="true" />
                                    <span> Steam โปรไฟล์ของคุณ</span>
                                  </a>
                                  {/*<span className="text-primary cursor-pointer" style={{ marginLeft: '8px' }} onClick={this.toggleDisplaySteamId.bind(this)}>แก้ไข</span>*/}
                                </div>
                              )
                            }
                          </div>
                        ) : (
                          <div className="popup-content-row">
                            <div className="row-title">
                              <strong>
                                <span>ชื่อ Rov ของคุณ </span>
                                <small className="text-gray" style={{ display: 'inline-block' }}>(เพื่อให้ผู้เล่นอื่นที่สนใจสามารถติดต่อคุณได้ผ่านชื่อ Rov นี้)</small>
                              </strong>
                            </div>
                            {
                              rov_name_display ? (
                                <div>
                                  <div className="input-with-btn">
                                    <input placeholder="ชื่อ Rov ของคุณ" onChange={this.handleRovName.bind(this)} value={rov_name || ''} />
                                    <button className="primary" onClick={this.saveRovName.bind(this)}>บันทึก</button>
                                  </div>
                                  {
                                    rov_name_message_error && (
                                      <div className="text-error message-error">{rov_name_message_error}</div>
                                    )
                                  }
                                </div>
                              ) : (
                                <div>
                                  <span style={{ fontSize: '16px' }}>{rov_name}</span>
                                  <span className="text-primary cursor-pointer" style={{ marginLeft: '8px' }} onClick={this.toggleDisplayRovName.bind(this)}>แก้ไข</span>
                                </div>
                              )
                            }
                          </div>
                        ) // rov name
                      }
                      <div className="popup-content-row" style={{ marginTop: '24px' }}>
                        <div className="row-title">
                          <strong>เลือกตำแหน่งที่คุณต้องการ</strong>
                        </div>
                        {
                          roleMaster.map(role => (
                            <div className="radio-container" key={role.id}>
                              <input type="radio" id={`role-${role.id}`} name="role" value={role.id} onChange={this.handleRoleId.bind(this)} checked={role_id == role.id}  />
                              <label htmlFor={`role-${role.id}`}>
                                <strong>{role.name}</strong>
                              </label>
                              <div className="check"></div>
                            </div>
                          ))
                        }
                        {
                          role_id_message_error && (
                            <div className="text-error message-error">{role_id_message_error}</div>
                          )
                        }
                      </div>
                      <div className="popup-content-row">
                        <div className="row-title">
                          <strong>อธิบายการเล่นหรือสิ่งที่เกี่ยวกับคุณ</strong>
                        </div>
                        <textarea className="description" placeholder="อธิบายการเล่นหรือสิ่งที่เกี่ยวกับคุณ" onChange={this.handleDescription.bind(this)} value={description} />
                        {
                          description_message_error && (
                            <div className="text-error message-error">{description_message_error}</div>
                          )
                        }
                      </div>
                      <div className="popup-bottom">
                        {
                          !loading ? (
                            <button className="primary" onClick={this.submitFindTeam.bind(this)}>ประกาศ</button>
                          ) : (
                            <Loader size="24px" />
                          )
                        }
                      </div>
                    </div>
                  ) : (
                    <div className="popup-content">
                      <div style={{ textAlign: 'center', padding: '12px 0' }}>
                        <i className="fa fa-info-circle" aria-hidden="true" style={{ fontSize: '48px' }} />
                        <h2>กรุณาเลือกเกมเพื่อประกาศหาทีม</h2>
                        <div style={{ padding: '12px 0 40px' }}>
                          <GameDropdown currentGame={currentGame} />
                        </div>
                        <button className="primary" onClick={this.togglePopupFindTeam.bind(this)}>ปิด</button>
                      </div>
                    </div>
                  ) : (
                    <div className="popup-content">
                      <div style={{ textAlign: 'center', padding: '12px 0' }}>
                        <i className="fa fa-info-circle" aria-hidden="true" style={{ fontSize: '48px' }} />
                        <h2>กรุณาเข้าสู่ระบบเพื่อประกาศหาทีม</h2>
                        <FacebookLogin
                          appId={facebookAppId}
                          autoLoad={false}
                          fields="name,email,picture,first_name,last_name"
                          scope="public_profile,email"
                          callback={this.responseFacebook}
                          textButton="Login"
                          cssClass="loginBtn loginBtn--facebook"
                        />
                        <button className="default" onClick={this.togglePopupFindTeam.bind(this)}>ปิด</button>
                      </div>
                    </div>
                  )
                }
            </Popup>
          )
        }
        <style jsx>{`
          .post-containers {
            margin: 8px;
            display: inline-block;
          }
          .row-title {
            font-size: 14px;
            margin-bottom: 4px;
          }
          .description {
            font-size: 13px;
            padding: 10px;
            min-height: 120px;
          }
          .popup-bottom {
            margin-top: 12px;
            text-align: center;
          }
          .popup-close {
            float: right;
            cursor: pointer;
          }
          .popup-content-row {
            margin: 12px 0;
          }

          .input-with-btn > input {
            width: calc(100% - 120px);
          }
          .input-with-btn > button {
            width: 120px;
          }

          .message-error {
            margin-top: 4px;
          }

          @media only screen and (max-width: 768px) {
            .post-containers {
              margin: 8px 0;
            }
          }
          @media only screen and (max-width: 480px) {
            .input-with-btn > input {
              width: calc(100% - 70px);
            }
            .input-with-btn > button {
              width: 70px;
              padding: 0 12px;
            }
          }
        `}</style>
      </div>
    )
  }
}