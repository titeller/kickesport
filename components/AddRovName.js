import React, { Component } from 'react'
import Card from './Card'
import * as Api from '../api'
import { isEmptry } from '../helpers/validation'

export default class AddRovName extends Component {
  state = {
    display: !this.props.rov_name,
    rov_name: this.props.rov_name || '',
    message_error: ''
  }
  async saveRovName() {
    let { rov_name } = this.state

    this.setState({
      message_error: ''
    })

    if(!isEmptry(rov_name)) {
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
      <div className="container">
        <Card noPadding={true}>
          <div className="rov-container">
            <div>
              <strong>กรุณากรอกชื่อในเกมส์ Rov ของคุณ</strong>
            </div>
            <div className="rov-input">
              <input className="rov-text" placeholder="กรุณากรอกชื่อในเกมส์ Rov ของคุณ" onChange={this.setInput.bind(this)} />
              <button className="primary rov-button" onClick={this.saveRovName.bind(this)}>บันทึก</button>
              {
                message_error && (
                  <div className="message-error">
                    <small className="text-error">{message_error}</small>
                  </div>
                )
              }
            </div>
          </div>
        </Card>
        <style jsx>{`
          .container {
            margin-top: -8px;
          }
          .rov-container {
            padding: 8px;
          }
          .rov-input {
            margin-top: 4px;
          }
          .rov-text {
            width: calc(100% - 80px);
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
          }
          .rov-button {
            width: 80px;
            padding: 0;
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
          }
          @media only screen and (max-width: 480px) {

          }
        `}</style>
      </div>
    )
  }
}