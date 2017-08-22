import React, { Component } from 'react'
import * as Api from '../api'

export default class AddSteamId extends Component {
  state = {
    display: !this.props.rov_name,
    rov_name: this.props.rov_name,
    message_error: ''
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
          display: false
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
      rov_name: event.target.value,
      message_error: ''
    })
  }
  render() {
    const { display, rov_name, message_error } = this.state
    return (
      <div className="rov-input-containers">
        {
          display && (
            <div className="input-information input-steam">
              <div className="input-information-title">
                <span>ชื่อใน Rov</span>
              </div>
              <div className="input-information-field">
                <input type="text" placeholder="ชื่อใน Rov" onChange={this.setInput.bind(this)} />
              </div>
              <div className="input-information-button">
                <button className="primary" onClick={this.saveRovName.bind(this)}>บันทึก</button>
              </div>
              {
                message_error && (
                  <div className="message-error">
                    <div>{message_error}</div>
                  </div>
                )
              }
            </div>
          )
        }
        <style jsx>{`
          .rov-input-containers {
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
            .rov-input-containers {
              display: block;
            }
            .input-steam {
              width: 100%;
            }
            .input-information-field {
              width: calc(100% - 172px);
            }
          }
        `}</style>
      </div>
    )
  }
}