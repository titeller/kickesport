import React, { Component } from 'react'
import * as Api from '../../api'
import StandardLayout from '../../components/layout/StandardLayout'
import MenuNavigator from '../../components/MenuNavigator'
import PostFindTeam from '../../components/PostFindTeam'
import FindTeam from '../../components/FindTeam'
import AddRovName from '../../components/AddRovName'
import AddBattleNet from '../../components/AddBattleNet'
import SteamLink from '../../components/SteamLink'
import Loader from '../../components/Loader'
import Card from '../../components/Card'
import GameDropdown from '../../components/GameDropdown'
import MenuProfile from '../../components/MenuProfile'
import { getIdByGameName } from '../../helpers/game'

export default class Dashboard extends Component {
  static async getInitialProps ({ req }) {
    const { member, cookies } = req
    const { currentGame } = cookies
    const game_id = currentGame ? getIdByGameName(currentGame) : null

    const roleMaster = await Api.get({
      url: '/api/role',
      baseURL: Api.getFullBaseUrl(req),
      params: {
        game_id,
      }
    })

    const member_looking_offset = 0
    const member_looking_limit = 15
    const member_looking = await Api.get({
      url: '/api/member_looking',
      baseURL: Api.getFullBaseUrl(req),
      params: {
        game_id,
        limit: member_looking_limit,
        offset: member_looking_offset,
        order_by: 'create_date',
        sort_by: 'DESC',
      }
    })

    return {
      member,
      current_game_id: game_id,
      currentGame,
      roleMaster: roleMaster.data,
      member_looking: member_looking.data,
      member_looking_limit
    }
  }

  state = {
    member_looking: this.props.member_looking || [],
    member_looking_offset: 0,
    display_loading: false,
    loadmore_is_full: false,
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll.bind(this))
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll.bind(this))
  }
  async handleScroll() {
    if((window.innerHeight + window.scrollY) >= (document.body.offsetHeight + 150)) {
      const { member_looking_limit, current_game_id } = this.props
      const { member_looking, display_loading, member_looking_offset, loadmore_is_full } = this.state
      if(!loadmore_is_full) {
        this.setState({
          display_loading: true,
        })
        if(!display_loading) {
          const get_member_looking = await Api.get({
            url: '/api/member_looking',
            params: {
              game_id: current_game_id,
              limit: member_looking_limit,
              offset: member_looking_offset + member_looking_limit,
              order_by: 'create_date',
              sort_by: 'DESC',
            }
          })

          this.setState({
            display_loading: false,
          })

          const { axiosData } = get_member_looking
          console.log(axiosData)
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
      }
    }
  }

  render() {
    const { member, current_game_id, currentGame, roleMaster } = this.props
    const { member_looking, display_loading, loadmore_is_full } = this.state
    return (
      <StandardLayout member={member} displayFooter={false}>
        <div className="global-container">
          <div className="container">
            <MenuNavigator currentGame={currentGame} />
            <div className="feed-container">
              {
                (current_game_id == 1 || current_game_id == 2) && member && !member.steam_id && (
                  <SteamLink />
                )
              }
              {
                current_game_id == 3 && member && !member.battlenet && (
                  <AddBattleNet />
                )
              }
              {
                current_game_id == 4 && member && !member.rov_name && (
                  <AddRovName />
                )
              }
              {
                member ? current_game_id ? (
                  <PostFindTeam game_id={current_game_id} roleMaster={roleMaster} />
                ) : (
                  <Card>
                    <strong>กรุณาเลือกเกมส์เพื่อประกาศหาทีม</strong>
                    <div className="game-empty-right">
                      <GameDropdown />
                    </div>
                  </Card>
                ) : (
                  <Card>
                    <div style={{ textAlign: 'center' }}>
                      <strong>กรุณาเข้าสู่ระบบเพื่อประกาศหาทีม</strong>
                      <MenuProfile />
                    </div>
                  </Card>
                )
              }
              {
                member_looking.map(({ id, picture_profile, facebook_id, first_name, last_name, steam_id, rov_name, create_date, description, role_name, game_id, battlenet }) =>
                  <FindTeam
                    key={id}
                    avatar={picture_profile}
                    first_name={first_name}
                    last_name={last_name}
                    position={role_name}
                    facebook_id={facebook_id}
                    steam_id={steam_id}
                    create_date={create_date}
                    description={description}
                    game_id={game_id}
                    rov_name={rov_name}
                    battlenet={battlenet}
                    current_game_id={current_game_id}
                  />
                )
              }
              {
                display_loading && (
                  <div className="loadmore">
                    <Loader color="#aaaaaa" />
                  </div>
                )
              }
              {
                loadmore_is_full && (
                  <div style={{ textAlign: 'center' }}>
                    <h4 className="text-gray">ไม่พบข้อมูล</h4>
                  </div>
                )
              }
            </div>
          </div>
        </div>
        <style jsx>{`
          .global-container {
            padding-top: 60px;
          }
          .container {
            max-width: 1012px;
            margin: 12px auto;
          }
          .feed-container {
            float: left;
            margin-left: 12px;
            width: 500px;
          }
          .loadmore {
            padding: 20px 0 30px;
            text-align: center;
          }
          .game-empty-right {
            float: right;
            width: 150px;
          }
          @media only screen and (max-width: 768px) {
            .feed-container {
              float: inherit;
              margin: 0 4px;
              width: calc(100% - 8px);
            }
          }
        `}</style>
      </StandardLayout>
    )
  }
}
