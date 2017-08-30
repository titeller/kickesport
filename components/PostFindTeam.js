import React, { Component } from 'react'
import Card from './Card'
import Loader from './Loader'
import Textarea from 'react-textarea-autosize'
import * as Api from '../api'
import { getNameByGameId } from '../helpers/game'

export default class PostFindTeam extends Component {
  state = {
    minRow: 2,
    description: '',
    role_id: null,
    role_id_message_error: '',
    description_message_error: '',
    roleMaster: this.props.roleMaster,
    loading: false,
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
  }

  handleRoleId(event) {
    const role_id = event.target.value
    this.setState({
      role_id,
    })
  }

  async submitFindTeam() {
    const { game_id } = this.props
    const { description, role_id } = this.state
    let flag = true

    await this.setState({
      role_id_message_error: '',
      description_message_error: '',
    })

    if(!role_id) {
      flag = false
      this.setState({
        role_id_message_error: 'กรุณาเลือกตำแหน่ง',
      })
    }
    if(!description || (description && description.replace(/\s\s+/g, ' ').replace(/[\r\n]+/g, '').length < 30)) {
      flag = false
      this.setState({
        description_message_error: 'อธิบายการเล่นหรือสิ่งที่เกี่ยวกับคุณมาอย่างน้อย 30 ตัวอักษร',
      })
    }

    if(flag) {
      this.setState({
        loading: true,
      })
      const member_looking = await Api.post({
        url: '/api/member_looking',
        data: {
          game_id,
          role_id,
          description
        }
      })
      const { axiosData } = member_looking
      const { status } = axiosData
      if(status) {
        location.reload()
      } else {
        this.setState({
          loading: false,
        })
        alert('Something went wrong.')
      }
    }

  }

  render() {
    const { game_id } = this.props
    const { minRow, description, role_id, roleMaster, description_message_error, role_id_message_error, loading } = this.state
    return (
      <Card noMargin={true} noPadding={true}>
        <div className="post-header">
          <i className="fa fa-bullhorn navigator-icon" aria-hidden="true" />
          <span style={{ marginLeft: '8px' }}>อธิบายการเล่นหรือสิ่งที่เกี่ยวกับตัวคุณ</span>
        </div>
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
          />
          {
            description_message_error && (
              <div className="post-form-container text-error message-error">
                <small>{description_message_error}</small>
              </div>
            )
          }
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
            {
              role_id_message_error && (
                <div className="text-error message-error">
                  <small>{role_id_message_error}</small>
                </div>
              )
            }
          </div>
          <div className="post-row">
            <div className="post-left">
              <a href="/api/steam">
                <small className="text-default">
                  <span>คุณกำลังประกาศหาทีมเกมส์โดย </span>
                  <strong>{getNameByGameId(game_id)}</strong>
                  {/*<strong>*/}
                    {/*<span>เชื่อมต่อกับ </span>*/}
                    {/*<i className="fa fa-steam-square" aria-hidden="true" />*/}
                    {/*<span> Steam เพื่อประกาศหาทีม</span>*/}
                  {/*</strong>*/}
                </small>
              </a>
            </div>
            <div className="post-right">
              <button className="primary" onClick={this.submitFindTeam.bind(this)} disabled={loading ? 'disabled' : ''}>
                {
                  loading ? (
                    <Loader color="#ffffff" size="12px" />
                  ) : (
                    <i className="fa fa-bullhorn navigator-icon" aria-hidden="true" />
                  )
                }
                <span style={{ marginLeft: '8px' }}>ประกาศ</span>
              </button>
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
          .message-error {
            margin-top: 4px;
          }
        `}</style>
      </Card>
    )
  }
}
