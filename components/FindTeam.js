import React, { Component } from 'react'
import Card from './Card'

export default class FindTeam extends Component {
  render() {
    return (
      <Card>
        <div className="poster-header">
          <a className="poster-avatar">
            <img className="avatar" src="https://thedotascene.files.wordpress.com/2015/08/rtz.jpg?w=240" />
          </a>
          <a className="poster-name">5555</a>
        </div>
        <style jsx>{`
          .avatar-avatar {
            float: left;
            margin-right: 6px;
            border-radius: 2px;
          }
          .poster-avatar > .avatar {
            width: 40px;
            height: 40px;
          }
          .poster-name {
            float: left;
            margin-left: 12px;
          }
        `}</style>
      </Card>
    )
  }
}
