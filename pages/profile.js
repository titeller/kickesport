import React, { Component } from 'react'
import * as Api from '../api'
import DashboardLayout from '../components/dashboard/Layout'
import Loader from '../components/Loader'
import Card from '../components/Card'
import { getIdByGameName } from '../helpers/game'

export default class Profile extends Component {
  static async getInitialProps ({ req }) {
    const { member, cookies } = req
    const { currentGame } = cookies
    const game_id = currentGame ? getIdByGameName(currentGame) : null

    return { game_id, member, currentGame }
  }

  render() {
    const { member, currentGame } = this.props
    return (
      <DashboardLayout member={member} currentGame={currentGame}>
        <div className="dashboard-content-containers">
          <div className="profile-section">
            <Card>
              555
            </Card>
          </div>
        </div>
        <style jsx>{`
          .dashboard-content-containers {
            max-width: 1200px;
          }
          .profile-section {

          }
        `}</style>
      </DashboardLayout>
    )
  }
}
