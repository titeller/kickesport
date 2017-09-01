import React, { Component } from 'react'
import Textarea from 'react-textarea-autosize'
import { isEmptry } from '../helpers/validation'

export default class CommentInput extends Component {
  state = {
    message: '',
  }

  handleMessage(event) {
    this.setState({
      message: event.target.value
    })
  }

  handleSubmitMessage() {
    const { member_looking_id } = this.props
    const { message } = this.state

    if(!isEmptry(message)) {

    }
  }

  render() {
    const { message } = this.state
    return (
      <div className="comment-container">
        <div className="commentor">
          <img src="https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/20245834_1347171215331474_646142474986379144_n.jpg?oh=0c2e2aaa907ce79d19e3e132685f9a68&oe=5A13BF5F" className="commentor-avatar" />
        </div>
        <Textarea
          minRows={1}
          style={{
            position: 'relative',
            padding: '9px 12px',
            minHeight: '37px',
            resize: 'none',
            transition: '.2s ease-in-out',
            overflowY: 'hidden',
            border: 'solid 1px #dddfe2',
            borderRight: 'none',
            borderRadius: '22px',
            borderTopRightRadius: '0px',
            borderBottomRightRadius: '0px',
            width: 'calc(100% - 74px)',
            fontSize: '13px',
          }}
          placeholder="Comment..."
          value={message}
          onChange={this.handleMessage.bind(this)}
        />
        <button className="comment-button">
          <i className="fa fa-paper-plane" aria-hidden="true" />
        </button>
        <style jsx>{`
          .comment-container {
            background: #F6F7F9;
            border-top: solid 1px #e9e9e9;
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
          .comment-button {
            width: 40px;
            padding: 0;
            text-align: center;
            height: 37px;
            font-size: 12px;
            border-radius: 22px;
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
            vertical-align: top;
            color: #aaa;
            background: #ffffff;
            border: solid 1px #dddfe2;
            border-left: none;
          }
          .comment-button:hover {
            color: #d80157;
          }
        `}</style>
      </div>
    )
  }
}