import React from 'react'
import StandardLayout from '../components/layout/StandardLayout'
import * as Cookie from '../helpers/cookies'

export default class extends React.Component {
  static async getInitialProps ({ req }) {
    const { member } = req

    return { member }
  }

  selectGame = (game) => {
    Cookie.savingCookies({ cookieName: 'currentGame', data: game })
    window.location = '/dashboard'
  }

  render() {
    return (
      <StandardLayout displayFooter={false} member={this.props.member} headerBackground={false} >
        <div className="content-container">
          <div className="content-constrain">
            <h1>คุณต้องการหาทีม หาผู้เล่น ?</h1>
            <span className="sub-title">เลือกเกมส์ที่คุณต้องการ</span>
            <div className="game-list">
              <div className="game">
                <img src="static/images/games/card/cover-dota.png" onClick={this.selectGame.bind(this, 'dota2')} />
              </div>
              <div className="game">
                <img src="static/images/games/card/cover-csgo.png" onClick={this.selectGame.bind(this, 'csgo')} />
              </div>
              <div className="game">
                <img src="static/images/games/card/cover-overwatch.png" onClick={this.selectGame.bind(this, 'overwatch')} />
              </div>
              <div className="game">
                <img src="static/images/games/card/cover-rov.png" onClick={this.selectGame.bind(this, 'rov')} />
              </div>
            </div>
          </div>
          <div className="footer">
            <div className="footer-left">
              <a href="/terms" className="text-footer">Terms of Service</a>
              <a href="/privacy" className="text-footer">Privacy & Policy</a>
            </div>
            <div className="footer-right">
              <span className="text-footer">© 2017 Kickesport. All Rights Reserved.</span>
            </div>
          </div>
        </div>
        <style jsx>{`
          .game-list {
            margin-top: 50px;
          }
          .game {
            display: inline-block;
            width: 100%;
            max-width: 250px;
            margin: -28px;
          }
          .game > img {
            width: 100%;
            cursor: pointer;
            transition: .2s ease-in-out;
          }
          .game > img:hover {
            transform: scale(1.1, 1.1);
            filter: drop-shadow(0px 4px 8px #d80157);
          }

        .content-container {
          position: relative;
          width: 100%;
          min-height: 100vh;

          background: linear-gradient(
            rgba(0, 0, 0, 0.6),
            rgba(0, 0, 0, 0.6)
          ),url(static/images/landing-cover.jpg) no-repeat center center fixed;
          -webkit-background-size: cover;
          -moz-background-size: cover;
          -o-background-size: cover;
          background-size: cover;
        }
        .content-constrain {
          display: flex;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
          -ms-flex-flow: column nowrap;
          flex-flow: column nowrap;
          padding-top: 20vh;
          text-align: center;
          position: relative;
          width: 100%;
          color: #ffffff;
        }

      .btn-transparent {
        position: relative;
        padding-left: 50px;
        padding: 0.75rem 1.25rem 0.725rem 3.25rem;
        font-size: 18px;
      }
      .btn-transparent:before {
        content: "";
        box-sizing: border-box;
        position: absolute;
        top: 0;
        left: 4px;
        width: 2.5rem;
        height: 100%;
      }
      .dota2.btn-transparent:before {
        background: url(/static/images/games/dota2-logo.png) no-repeat center/cover;
        background-size: 100%;
      }
      .csgo.btn-transparent:before {
        background: url(/static/images/games/csgo-logo.png) no-repeat center/cover;
        background-size: 100%;
      }
      .overwatch.btn-transparent:before {
        background: url(/static/images/games/ow-logo.png) no-repeat center/cover;
        background-size: 100%;
      }
      .rov.btn-transparent:before {
        background: url(/static/images/games/rov-logo.png) no-repeat center/cover;
        background-size: 100%;
      }
      .sub-title {
        font-size: 16px;
      }
      .footer {
        position: absolute;
        bottom: 0;
        padding: 8px 0;
        width: 100%;
        text-align: center;
      }
      .footer-left {
        float: left;
      }
      .footer-right {
        float: right;
      }
      .text-footer {
        margin: 8px;
        font-size: 12px;
        color: #ffffff;
      }
      @media only screen and (max-width: 480px) {
        .activity-row, .btn-transparent {
          display: block;
        }

        .footer-left,.footer-right {
          float: initial;
          margin: 8px 0;
        }

        .content-constrain {
          padding-top: 8vh;
        }
        .game {
          max-width: 150px;
          margin: -8px;
        }
      }
    `}</style>
      </StandardLayout>
    )
  }
}