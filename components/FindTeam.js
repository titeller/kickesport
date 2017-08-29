import React, { Component } from 'react'
import Card from './Card'
import { getSteamProfileById } from '../helpers/steam'
import { getDateFromNow } from '../helpers/dateTime'

export default class FindTeam extends Component {
  state = {
    description_seemore: this.props.description ? this.props.description.substring(0, 200).length > 0 : false,
    description_short: this.props.description ? this.props.description.substring(0, 200) : '',
  }
  toggleSeeMoreDescription() {
    this.setState({
      description_seemore: !this.state.description_seemore,
    })
  }
  render() {
    const { avatar, first_name, last_name, position, steam_id, create_date, description } = this.props
    const { description_seemore, description_short } = this.state
    return (
      <Card>
        <div className="poster-header">
          <a href="" className="poster-avatar">
            <img className="avatar" src={avatar} />
          </a>
          <div className="poster-contact">
            <div>
              <a href="" className="poster-name">{first_name} {last_name}</a>
            </div>
            <div>
              <div className="poster-label">
                <span className="text-gray">ตำแหน่ง </span>
                <strong>{position}</strong>
              </div>
              <div className="poster-label">
                <a href={getSteamProfileById(steam_id)} target="_blank" style={{ color: '#555' }}>
                  <i className="fa fa-steam-square" aria-hidden="true" style={{ fontSize: '14px' }} />
                  <span> Steam</span>
                </a>
              </div>
              <div className="poster-label">
                <small className="text-gray">{getDateFromNow(create_date)}</small>
              </div>
            </div>
          </div>
          <div className="poster-description">
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
            margin: 4px 0;
            word-break: break-word;
            white-space: pre-line;
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
        `}</style>
      </Card>
    )
  }
}
