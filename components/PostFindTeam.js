import React, { Component } from 'react'
import Card from './Card'
import Textarea from 'react-textarea-autosize'
import * as Cookie from '../helpers/cookies'

export default class PostFindTeam extends Component {
  state = {
    minRow: 2,
    description: '',
    role_id: null,
    roleMaster: this.props.roleMaster,
  }

  postFocus() {
    this.setState({
      minRow: 4,
    })
  }
  postBlur() {
    this.setState({
      minRow: 2,
    })
  }

  handleDescription(event) {
    const description = event.target.value
    this.setState({
      description,
    })
    Cookie.savingCookies({ cookieName: 'postFindTeamDescription', data: description })
  }

  handleRoleId(event) {
    const role_id = event.target.value
    this.setState({
      role_id,
    })
    Cookie.savingCookies({ cookieName: 'postFindTeamRoleId', data: role_id })
  }

  componentDidMount() {
    const role_id = Cookie.getCookies({ cookieName: 'postFindTeamRoleId' })
    const description = Cookie.getCookies({ cookieName: 'postFindTeamDescription' })
    this.setState({
      role_id,
      description
    })
  }

  render() {
    const { minRow, description, role_id, roleMaster } = this.state
    return (
      <Card noMargin={true} noPadding={true}>
        <div className="post-header">อธิบายการเล่นหรือสิ่งที่เกี่ยวกับตัวคุณ</div>
        <div className="post-row" style={{ padding: '0 4px' }}>
          <Textarea
            placeholder="อธิบายการเล่นหรือสิ่งที่เกี่ยวกับตัวคุณ"
            minRows={minRow}
            style={{
              border: 'none',
              padding: '8px 12px',
              minHeight: '67px',
              resize: 'none',
              transition: '.2s ease-in-out',
              overflowY: 'hidden',
              borderBottom: 'solid 1px #e9e9e9',
            }}
            onFocus={this.postFocus.bind(this)}
            onBlur={this.postBlur.bind(this)}
            onChange={this.handleDescription.bind(this)}
            value={description}
            className="gg"
          />
        </div>

        <div className="post-form-container">
          <div className="post-row">
            <div className="post-title">เลือกตำแหน่งที่คุณต้องการ</div>
            {
              roleMaster.map(role => (
                <div className="radio-container radio-container-sm" key={role.id}>
                  <input type="radio" id={`role-${role.id}`} name="role" value={role.id} onChange={this.handleRoleId.bind(this)} checked={role_id == role.id}  />
                  <label htmlFor={`role-${role.id}`}>
                    <strong>{role.name}</strong>
                  </label>
                  <div className="check"></div>
                </div>
              ))
            }
          </div>
          <div className="post-row">
            <div className="post-left">
              <a href="/api/steam">
                <small className="text-default">
                  <strong>
                    <span>เชื่อมต่อกับ </span>
                    <i className="fa fa-steam-square" aria-hidden="true" />
                    <span> Steam เพื่อประกาศหาทีม</span>
                  </strong>
                </small>
              </a>
            </div>
            <div className="post-right">
              <button className="primary">ประกาศ</button>
            </div>
          </div>
        </div>
        <style jsx>{`
          .post-header {
            background: #e5e5e5;
            height: 30px;
            line-height: 30px;
            padding: 0 8px;
            font-weight: bold;
          }
          .post-row {
            margin: 8px 0;
          }
          .post-form-container {
            padding: 0 12px;
          }
          .post-padding {
            padding: 12px 0;
          }
          .post-left {
            margin-top: 10px;
            float: left;
          }
          .post-right {
            text-align: right;
          }
          .post-title {
            font-size: 12px;
            margin-bottom: 4px;
            font-weight: bold;
          }
        `}</style>
      </Card>
    )
  }
}
