import React, { Component } from 'react'
import { isEmptry } from '../helpers/validation'

export default class Comment extends Component {
  render() {
    return (
      <div className="comment-container">
        <div className="commentor">
          <a href="">
            <img src="https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/20245834_1347171215331474_646142474986379144_n.jpg?oh=0c2e2aaa907ce79d19e3e132685f9a68&oe=5A13BF5F" className="commentor-avatar" />
          </a>
        </div>
        <div className="message-container">
          <div>
            <a className="commentor-name" href="">
              <strong>Ti Teller</strong>
            </a>
            <span className="message">
            After achieving the #1 MMR ranking, he was invited by N0tail to join (monkey) Business, a new team formed from the post-TI5 reshuffle to compete in the upcoming Majors. The team reformed as OG after being sponsored.
          </span>
          </div>
          <div>
            <small className="text-gray">16 Minutes Ago</small>
          </div>
        </div>
        <style jsx>{`
          .comment-container {
            background: #F6F7F9;
            padding: 6px 8px;
          }
          .commentor {
            display: inline-block;
            width: 30px;
            vertical-align: top;
            margin-top: 4px;
            margin-right: 4px;
          }
          .commentor-avatar {
            width: 100%;
            border-radius: 100%;
          }
          .commentor-name {
            margin-right: 4px;
          }
          .commentor-name:hover {
            text-decoration: underline;
          }
          .message-container {
            display: inline-block;
            width: calc(100% - 38px);
            padding: 0 2px;
          }
        `}</style>
      </div>
    )
  }
}