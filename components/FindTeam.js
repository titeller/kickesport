import React, { Component } from 'react'
// import { Card } from './uikit/Theme'
import Card from './Card'
import { getSteamProfileById } from '../helpers/steam'
import { getFacebookProfileById } from '../helpers/facebook'
import { getDateFromNow } from '../helpers/dateTime'
import { getAvatarByGameId } from '../helpers/game'

export default class FindTeam extends Component {
  state = {
    description_seemore: this.props.description ? this.props.description.substring(200).length > 0 : false,
    description_short: this.props.description ? this.props.description.substring(0, 200) : '',
  }
  toggleSeeMoreDescription() {
    this.setState({
      description_seemore: !this.state.description_seemore,
    })
  }
  render() {
    const { avatar, first_name, last_name, position, steam_id, create_date, description, game_id, facebook_id, rov_name, current_game_id } = this.props
    const { description_seemore, description_short } = this.state
    return (
      <Card padding="4px 4px 4px 4px">
        <div className="poster-header">
          <a href={getFacebookProfileById(facebook_id)} className="poster-avatar" target="_blank">
            <img className="avatar" src={avatar} />
          </a>
          <div className="poster-contact">
            <div>
              <a href={getFacebookProfileById(facebook_id)} className="poster-name" target="_blank">{first_name} {last_name}</a>
              {
                !current_game_id && (
                  <span>
                <small className="text-gray find-team-game-label">ประกาศหาทีม</small>
                <img src={getAvatarByGameId(game_id)} className="find-team-game" />
              </span>
                )
              }
            </div>
            <div>
              <div className="poster-label">
                <span className="text-gray">ตำแหน่ง </span>
                <strong>{position}</strong>
              </div>
              {/*<div className="poster-label">*/}
                {/*<a href={getSteamProfileById(steam_id)} target="_blank" style={{ color: '#555' }}>*/}
                  {/*<i className="fa fa-steam-square" aria-hidden="true" style={{ fontSize: '14px' }} />*/}
                  {/*<span> Steam</span>*/}
                {/*</a>*/}
              {/*</div>*/}
              <div className="poster-label">
                <small className="text-gray">{getDateFromNow(create_date)}</small>
              </div>
            </div>
          </div>
          <div className="poster-description">
            {
              game_id == 4 && rov_name && (
                <div style={{ marginBottom: '4px' }}>
                  <span>ชื่อในเกมส์ </span>
                  <strong style={{ fontSize: '16px' }}>{rov_name}</strong>
                </div>
              )
            }
            {
              description_seemore ? `${description_short}...` : description
            }
            {
              description_seemore && (
                <div className="seemore">
                  <span className="text-primary" onClick={this.toggleSeeMoreDescription.bind(this)}>ดูเพิ่มเติม</span>
                </div>
              )
            }
          </div>
          <div className="poster-action">
            {
              facebook_id && (
                <a href={getFacebookProfileById(facebook_id)} target="_blank" className="poster-action-row" alt="ดู Facebook โปรไฟล์">
                  <button className="facebook loginBtn--facebook">
                    <i className="fa fa-facebook" aria-hidden="true" />
                    <span>Facebook โปรไฟล์</span>
                  </button>
                </a>
              )
            }
            {
              game_id != 4 && steam_id && (
                <a href={getSteamProfileById(steam_id)} target="_blank" className="poster-action-row" alt="ดู Steam โปรไฟล์">
                  <button className="steam">
                    <i className="fa fa-steam-square" aria-hidden="true" />
                    <span>Steam โปรไฟล์</span>
                  </button>
                </a>
              )
            }
          </div>
        </div>
        <style jsx>{`
          .poster-avatar {
            margin-right: 8px;
          }
          .poster-avatar > .avatar {
            width: 40px;
            height: 40px;
            border-radius: 1px;
            border: solid 1px #e9e9e9;
          }
          .poster-contact {
            display: inline-block;
            vertical-align: top;
          }
          .poster-name {
            font-weight: bold;
          }
          .poster-label {
            font-size: 12px;
            display: inline-block;
            margin: 4px;
            margin-right: 0;
            padding-right: 4px;
            border-right: solid 1px #e9e9e9;
          }
          .poster-label:first-child {
            margin-left: 0;
            padding-left: 0;
          }
          .poster-label:last-child {
            border-right: none;
            padding-right: 0;
          }
          .poster-description {
            font-size: 13px;
            margin: 4px;
            word-break: break-word;
            white-space: pre-line;
          }
          .poster-action {
            margin-top: 8px;
            padding-top: 12px;
            border-top: solid 1px #e9e9e9;
            text-align: right;
          }
          .seemore {
            margin-left: 4px;
            text-align: center;
          }
          .seemore > span {
            font-size: 12px;
            cursor: pointer;
          }
          .seemore > span:hover {
            text-decoration: underline;
          }
          .poster-action-row {
            margin: 2px;
          }
          .steam, .facebook {
            color: #fff;
            padding-left: 8px;
            padding-right: 8px;
          }
          .steam {
            background: #3e4148;
          }
          .steam:hover {
            background: #4c5058;
          }
          .steam > span,.facebook > span {
            font-size: 12px;
            margin-left: 12px;
          }
          .steam > i,.facebook > i {
            font-size: 16px;
            vertical-align: middle;
            margin-top: -3px;
          }
          .find-team-game-label {
            margin-left: 8px;
          }
          .find-team-game {
            width: 30px;
            vertical-align: middle;
            margin-left: 4px;
            opacity: .6;
          }
          @media only screen and (max-width: 768px) {
            .steam, .facebook {
              padding-left: 12px;
              padding-right: 12px;
            }
            .steam > span,.facebook > span {
              display: none;
            }
          }
        `}</style>
      </Card>
    )
  }
}
