import React, { Component } from 'react'
import * as Api from '../api'
import Loader from './Loader'
import { isSteamId, isSteamCustomId } from '../helpers/validation'
import { getIdByGameName } from '../helpers/game'

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

  render() {
    const { roleMaster, currentGame } = this.props
    const { popupFindTeam, steam_id, steam_id_display, steam_id_message_error, rov_name, rov_name_display, rov_name_message_error, role_id, role_id_message_error, description, description_message_error, loading } = this.state
    return (
      <div className="post-containers">
        <button className="default" onClick={this.togglePopupFindTeam.bind(this)}>
          <i className="fa fa-bullhorn" aria-hidden="true" />
          <strong> ประกาศหาทีม</strong>
        </button>
        {
          popupFindTeam && (
            <div className="overlay">
              <div className="popup-containers">
                <div className="popup-header">
                  <i className="fa fa-bullhorn" aria-hidden="true" />
                  <strong> ประกาศหาทีม</strong>
                  <div className="popup-close" onClick={this.togglePopupFindTeam.bind(this)}>
                    <i className="fa fa-times" aria-hidden="true" />
                  </div>
                </div>
                <div className="popup-content">
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
                              <span>{steam_id}</span>
                              <span className="text-primary cursor-pointer" style={{ marginLeft: '8px' }} onClick={this.toggleDisplaySteamId.bind(this)}>แก้ไข</span>
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
              </div>
            </div>
          )
        }
        <style jsx>{`
          .post-containers {
            margin: 8px;
            display: inline-block;
          }
          .overlay {
            z-index: 2;
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,.4);
            padding-top: 80px;
          }
          .popup-containers {
            position: relative;
            margin: auto;
            width: 700px;
            padding: 0;
            outline: 0;
            background: #fff;
            box-shadow: 0 4px 10px 0 rgba(0,0,0,0.2), 0 4px 20px 0 rgba(0,0,0,0.19);
            overflow: hidden;
          }
          .popup-header {
            padding: 8px;
            color: #fff;
            font-size: 18px;
            background: #d80157;
          }
          .popup-content {
            padding: 12px 24px;
            font-size: 12px;
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
            .popup-containers {
              margin: 0 10px;
              width: auto!important;
            }

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