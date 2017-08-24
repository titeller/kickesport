import React, { Component } from 'react'
import * as Api from '../api'
import { isSteamId, isSteamCustomId } from '../helpers/validation'

export default class AddSteamId extends Component {
  state = {
    steam_display: !this.props.steam_id,
    steam_id: this.props.steam_id,
    message_error: ''
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
          steam_display: false
        })
        location.reload()
      }
    } else {
      this.setState({
        message_error: 'กรุณากรอกข้อมูลให้ถูกต้อง'
      })
    }
  }
  setInput(event) {
    this.setState({
      steam_id: event.target.value,
      message_error: ''
    })
  }
  render() {
    const { steam_display, message_error } = this.state
    return (
      <div className="steam-input-containers">
        {
          steam_display && (
            <div className="input-information input-steam">
              <div className="input-information-title">
                <i className="fa fa-steam-square" aria-hidden="true" />
              </div>
              <div className="input-information-field">
                <input type="text" placeholder="Steam id" onChange={this.setInput.bind(this)} />
              </div>
              <div className="input-information-button">
                <button className="primary" onClick={this.saveSteamId.bind(this)}>บันทึก</button>
              </div>
              {
                message_error && (
                  <div className="message-error">
                    <div>{message_error} ตัวอย่างเช่น</div>
                    <div>https://steamcommunity.com/profiles/76561198057258855</div>
                    <div>https://steamcommunity.com/id/kickesport</div>
                  </div>
                )
              }
            </div>
          )
        }
        <style jsx>{`
          .steam-input-containers {
            display: inline-block;
          }
          .input-information {
            background: #444546;
            display: inline-block;
            color: #ffffff;
            padding: 6px 8px;
            border-radius: 2px;
            font-size: 13px;
            border: solid 1px #e9e9e9;
            border-radius: 2px;
          }
          .input-information-title {
            display: inline-block;
            margin: 0 4px 0 2px;
          }
          .fa-steam-square {
            font-size: 24px;
            vertical-align: middle;
            margin-top: -2px;
          }
          .input-information-field {
            display: inline-block;
            margin-left: 4px;
            width: 300px;
          }
          .input-information-button {
            display: inline-block;
          }
          .message-error {
            margin-top: 4px;
            text-align: right;
            font-size: 11px;
          }

          @media only screen and (max-width: 768px) {
            .steam-input-containers {
              display: block;
            }
            .input-steam {
              width: 100%;
            }
            .input-information-field {
              width: calc(100% - 130px);
            }
          }
        `}</style>
      </div>
    )
  }
}