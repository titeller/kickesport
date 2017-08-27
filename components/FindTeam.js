import React, { Component } from 'react'
import Card from './Card'

export default class FindTeam extends Component {
  render() {
    return (
      <Card>
        <div className="poster-header">
          <a href="" className="poster-avatar">
            <img className="avatar" src="https://thedotascene.files.wordpress.com/2015/08/rtz.jpg?w=240" />
          </a>
          <div className="poster-contact">
            <div>
              <a href="" className="poster-name">Artour Babaev</a>
            </div>
            <div>
              <div className="poster-label">
                <span className="text-gray">ตำแหน่ง </span>
                <strong>Support</strong>
              </div>
              <div className="poster-label">
                <i className="fa fa-steam-square" aria-hidden="true" style={{ fontSize: '14px' }} />
                <span> Steam</span>
              </div>
              <div className="poster-label">
                <small className="text-gray">14 Minutes Ago</small>
              </div>
            </div>
          </div>
          <div className="poster-description">
            Artour was born in Tashkent, Uzbekistan on July 1st, 1996.[1] Before playing Dota 2 professionally he played the original DotA as well as Starcraft II. Arteezy played Protoss, and reached Masters before he started playing Dota 2.[2]
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
          }
        `}</style>
      </Card>
    )
  }
}
