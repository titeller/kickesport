import React, { Component } from 'react'
import * as Api from '../../api'
import StandardLayout from '../../components/layout/StandardLayout'
import MenuNavigator from '../../components/MenuNavigator'
import PostFindTeam from '../../components/PostFindTeam'
import FindTeam from '../../components/FindTeam'
import SteamLink from '../../components/SteamLink'
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

    return {
      member,
      game_id,
      currentGame,
      roleMaster: roleMaster.data
    }
  }

  render() {
    const { member, game_id, currentGame, roleMaster } = this.props
    return (
      <StandardLayout member={member} displayFooter={false}>
        <div className="global-container">
          <div className="container">
            <MenuNavigator currentGame={currentGame} />
            <div className="feed-container">

              <SteamLink />
              <PostFindTeam game_id={game_id} roleMaster={roleMaster} />

              {
                findTeamList.map(({ id, avatar, first_name, last_name, position, steam_id, create_date, description }) =>
                  <FindTeam
                    key={id}
                    avatar={avatar}
                    first_name={first_name}
                    last_name={last_name}
                    position={position}
                    steam_id={steam_id}
                    create_date={create_date}
                    description={description}
                  />
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
