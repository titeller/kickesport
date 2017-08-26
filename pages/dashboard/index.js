import React, { Component } from 'react'
import * as Api from '../../api'
import StandardLayout from '../../components/layout/StandardLayout'
import MenuNavigator from '../../components/MenuNavigator'
import PostFindTeam from '../../components/PostFindTeam'
import FindTeam from '../../components/FindTeam'
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

    return {
      member,
      game_id,
      roleMaster: roleMaster.data
    }
  }

  render() {
    const { member, game_id, roleMaster } = this.props
    return (
      <StandardLayout member={member} displayFooter={false}>
        <div className="global-container">
          <div className="container">
            <MenuNavigator />
            <div className="feed-container">
              <PostFindTeam game_id={game_id} roleMaster={roleMaster} />

              <FindTeam />
              <FindTeam />
              <FindTeam />
              <FindTeam />
              <FindTeam />
              <FindTeam />
              <FindTeam />
              <FindTeam />
              <FindTeam />
              <FindTeam />
              <FindTeam />
              <FindTeam />
              <FindTeam />
              <FindTeam />
              <FindTeam />
              <FindTeam />
              <FindTeam />
              <FindTeam />
              <FindTeam />

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
        `}</style>
      </StandardLayout>
    )
  }
}
