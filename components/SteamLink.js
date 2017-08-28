import React, { Component } from 'react'
import Card from './Card'

export default class SteamLink extends Component {
  render() {
    return (
      <div className="container">
        <Card noPadding={true}>
          <div className="steam-container">
            <div className="steam-left">
              <strong>คุณต้องการเชื่อมต่อกับ <i className="fa fa-steam-square" aria-hidden="true" style={{ fontSize: '14px' }} /> Steam เข้ากับบัญชีนี้ ?</strong>
            </div>
            <div className="steam-right">
              <a href="/api/steam">
                <button className="steam">เชื่อมต่อ</button>
              </a>
            </div>
          </div>
        </Card>
        <style jsx>{`
          .container {
            margin-top: -8px;
          }
          .steam-container {
            padding: 8px;
          }
          .steam-left {
            float: left;
            margin-top: 8px;
            font-size: 12px;
          }
          .steam-right {
            text-align: right;
          }
          .steam {
            background: #1B2838;
            color: #ffffff;
            font-size: 12px;
          }
          @media only screen and (max-width: 480px) {
            .steam-container {
              text-align: center;
            }
            .steam-left,.steam-right {
              float: inherit;
              text-align: inherit;
              margin: 4px 0;
            }
          }
        `}</style>
      </div>
    )
  }
}