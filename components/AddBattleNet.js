import React, { Component } from 'react'
import Card from './Card'
import * as Api from '../api'
import { isEmptry } from '../helpers/validation'

export default class AddBattleNet extends Component {
  state = {
    display: !this.props.battlenet,
    battlenet: this.props.battlenet || '',
    message_error: ''
  }
  async saveBattlenet() {
    let { battlenet } = this.state

    this.setState({
      message_error: ''
    })

    if(!isEmptry(battlenet)) {
      const member = await Api.put({
        url: '/api/member',
        data: {
          battlenet
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
      battlenet: event.target.value,
      message_error: ''
    })
  }
  render() {
    const { display, battlenet, message_error } = this.state
    return (
      <div className="container">
        <Card noPadding={true}>
          <div className="input-container">
            <div>
              <strong>กรุณากรอก Battlenet ของคุณ</strong>
            </div>
            <div className="input">
              <input className="input-text" placeholder="กรุณากรอก Battlenet ของคุณ" onChange={this.setInput.bind(this)} />
              <button className="primary input-button" onClick={this.saveBattlenet.bind(this)}>บันทึก</button>
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
          .input-container {
            padding: 8px;
          }
          .input {
            margin-top: 4px;
          }
          .input-text {
            width: calc(100% - 80px);
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
          }
          .input-button {
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