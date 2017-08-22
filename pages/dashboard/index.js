import React, { Component } from 'react'
import * as Api from '../../api'
import DashboardLayout from '../../components/dashboard/Layout'
import PostFindTeam from '../../components/PostFindTeam'
import PostFindTeamInput from '../../components/PostFindTeamInput'
import Loader from '../../components/Loader'

import { getIdByGameName } from '../../helpers/game'

export default class Dashboard extends Component {
  static async getInitialProps ({ req }) {
    const { member, cookies } = req
    const { currentGame } = cookies
    const game_id = getIdByGameName(currentGame)
    const member_looking_limit = 20

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
        limit: member_looking_limit,
        offset: 0,
        order_by: 'create_date',
        sort_by: 'DESC',
      }
    })

    return { game_id, member, currentGame, roleMaster: roleMaster.data, member_looking: member_looking.data, member_looking_limit }
  }

  state = {
    member_looking: this.props.member_looking,
    member_looking_offset: 0,
    loadmore_loading: false,
    loadmore_is_full: false,
  }

  async getMemberLooking() {
    const { game_id, member_looking_limit } = this.props
    const { member_looking, member_looking_offset } = this.state

    this.setState({
      loadmore_loading: true,
    })
    const member_looking_res = await Api.get({
      url: '/api/member_looking',
      params: {
        game_id,
        limit: member_looking_limit,
        offset: member_looking_offset + member_looking_limit,
        order_by: 'create_date',
        sort_by: 'DESC',
      }
    })
    this.setState({
      loadmore_loading: false,
    })

    const { axiosData } = member_looking_res
    const { status } = axiosData
    if(status) {
      const { data } = axiosData
      if(data.length > 0) {
        const new_member_looking = member_looking.concat(data)
        this.setState({
          member_looking_offset: member_looking_offset + member_looking_limit,
          member_looking: new_member_looking,
        })
      } else {
        this.setState({
          loadmore_is_full: true,
        })
      }
    }
  }

  render() {
    const { member, game_id, currentGame, roleMaster, member_looking_limit } = this.props
    const { member_looking, loadmore_loading, loadmore_is_full } = this.state
    return (
      <DashboardLayout member={member} currentGame={currentGame}>
        <div className="dashboard-content-containers">
          <PostFindTeamInput steam_id={member.steam_id} rov_name={member.rov_name} currentGame={currentGame} roleMaster={roleMaster} />
          {
            member_looking.map(looking => (
              <PostFindTeam key={looking.id} {...looking} game_id={game_id} />
            ))
          }
          {
            member_looking.length >= member_looking_limit && !loadmore_is_full && (
              <div className="loadmore">
                {
                  !loadmore_loading ? <button className="default" onClick={this.getMemberLooking.bind(this)}>โหลดเพิ่มเติม</button> : <Loader />
                }
              </div>
            )
          }
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
