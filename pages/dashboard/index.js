import React, { Component } from 'react'
import * as Api from '../../api'
import StandardLayout from '../../components/layout/StandardLayout'
import MenuNavigator from '../../components/MenuNavigator'
import PostFindTeam from '../../components/PostFindTeam'
import FindTeam from '../../components/FindTeam'
import AddRovName from '../../components/AddRovName'
import SteamLink from '../../components/SteamLink'
import Loader from '../../components/Loader'
import Card from '../../components/Card'
import GameDropdown from '../../components/GameDropdown'
import { getIdByGameName } from '../../helpers/game'


const findTeamList = [
  {
    id: 1,
    avatar: 'https://cdn0.gamesports.net/storage/59000/59313.jpg',
    first_name: 'Artour',
    last_name: 'Babaev',
    position: 'Carry',
    steam_id: '76561198057258855',
    create_date: '2017-08-25 00:55:18',
    description: 'Artour was born in Tashkent, Uzbekistan on July 1st, 1996.[1] Before playing Dota 2 professionally he played the original DotA as well as Starcraft II. Arteezy played Protoss, and reached Masters before he started playing Dota 2.',
  },
  {
    id: 2,
    avatar: 'http://a.espncdn.com/combiner/i?img=/photo/2016/0811/r112447_800x450_16-9.jpg&w=800',
    first_name: 'Amer',
    last_name: 'Al-Barqawi',
    position: 'Middle',
    steam_id: '76561198057258855',
    create_date: '2017-08-25 00:55:18',
    description: 'Miracle- joined Balkan Bears at the beginning of 2015, only to be removed from the team about four months later. While he was teamless, he began gaining recognition in the European scene by climbing the matchmaking rating leaderboards in pub games. Miracle- eventually became the #1 player by MMR in the European division and the world, surpassing w33.',
  },
  {
    id: 3,
    avatar: 'http://images.indianexpress.com/2015/08/clintonloomis_korieyang.jpg',
    first_name: 'Clinton',
    last_name: 'Loomis',
    position: 'Support',
    steam_id: '76561198057258855',
    create_date: '2017-08-25 00:55:18',
    description: 'Clinton "Fear" Loomis is an American player from Medford, Oregon. Fear is one of the most storied Dota players, and has been widely regarded as one of the best North American players for the past decade. His versatility has allowed him to play every position at a competitive level, which makes Fear a great fit for almost any team. He is currently the coach and a part-owner of Evil Geniuses.',
  },
]

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

    const member_looking_limit = 20
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

    return {
      member,
      current_game_id: game_id,
      currentGame,
      roleMaster: roleMaster.data,
      member_looking: member_looking.data,
    }
  }

  state = {
    member_looking: this.props.member_looking || [],
    display_loading: false,
  }

  render() {
    const { member, current_game_id, currentGame, roleMaster } = this.props
    const { display_loading, member_looking } = this.state
    return (
      <StandardLayout member={member} displayFooter={false}>
        <div className="global-container">
          <div className="container">
            <MenuNavigator currentGame={currentGame} />
            <div className="feed-container">
              {
                current_game_id != 4 && member && !member.steam_id && (
                  <SteamLink />
                )
              }
              {
                current_game_id == 4 && member && !member.rov_name && (
                  <AddRovName />
                )
              }
              {
                current_game_id ? (
                  <PostFindTeam game_id={current_game_id} roleMaster={roleMaster} />
                ) : (
                  <Card>
                    <strong>กรุณาเลือกเกมส์เพื่อประกาศหาทีม</strong>
                    <div className="game-empty-right">
                      <GameDropdown />
                    </div>
                  </Card>
                )
              }
              {
                member_looking.map(({ id, picture_profile, facebook_id, first_name, last_name, steam_id, rov_name, create_date, description, role_name, game_id }) =>
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
