import React, { Component } from 'react'
import * as Api from '../../api'
import DashboardLayout from '../../components/dashboard/Layout'
import PostFindTeam from '../../components/PostFindTeam'
import PostFindTeamInput from '../../components/PostFindTeamInput'

import { getIdByGameName } from '../../helpers/game'

export default class Dashboard extends Component {
  static async getInitialProps ({ req }) {
    const { member, cookies, headers } = req
    const { currentGame } = cookies
    const game_id = getIdByGameName(currentGame)

    const roleMaster = await Api.get({
      url: '/api/role',
      baseURL: Api.getFullBaseUrl(req),
      params: {
        game_id,
      }
    })

    const member_looking = await Api.get({
      url: '/api/member_looking',
      baseURL: Api.getFullBaseUrl(req),
      params: {
        game_id,
        limit: 2,
        offset: 0,
        order_by: 'create_date',
        sort_by: 'DESC',
      }
    })

    return { game_id, member, currentGame, roleMaster: roleMaster.data, member_looking: member_looking.data }
  }

  state = {
    member_looking: this.props.member_looking,
    member_looking_offset: 0,
  }

  async getMemberLooking() {
    const { game_id } = this.props
    const { member_looking, member_looking_offset } = this.state

    const member_looking_res = await Api.get({
      url: '/api/member_looking',
      params: {
        game_id,
        limit: 2,
        offset: member_looking_offset + 2,
        order_by: 'create_date',
        sort_by: 'DESC',
      }
    })

    const { axiosData } = member_looking_res
    const { status } = axiosData
    if(status) {
      const { data } = axiosData
      const new_member_looking = member_looking.concat(data)
      this.setState({
        member_looking: new_member_looking
      })
    }
  }

  render() {
    const { member, game_id, currentGame, roleMaster } = this.props
    const { member_looking } = this.state
    return (
      <DashboardLayout member={member} currentGame={currentGame}>
        <div className="dashboard-content-containers">
          <PostFindTeamInput steam_id={member.steam_id} rov_name={member.rov_name} currentGame={currentGame} roleMaster={roleMaster} />
          {
            member_looking.map(looking => (
              <PostFindTeam key={looking.id} {...looking} game_id={game_id} />
            ))
          }
          <div className="loadmore">
            <button className="default" onClick={this.getMemberLooking.bind(this)}>โหลดเพิ่มเติม</button>
          </div>
        </div>
        <style jsx>{`
          .dashboard-content-containers {
            max-width: 1200px;
          }
          .loadmore {
            text-align: center;
          }
        `}</style>
      </DashboardLayout>
    )
  }
}
