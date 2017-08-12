import React, { Component } from 'react'
import DashboardLayout from '../../components/dashboard/Layout'
import PostFindTeam from '../../components/PostFindTeam'
import AddGameId from '../../components/AddGameId'

export default class Dashboard extends Component {
  static async getInitialProps ({ req }) {
    const { member, cookies } = req
    const { currentGame } = cookies
    return { member, currentGame }
  }
  render() {
    const { member, currentGame } = this.props
    return (
      <DashboardLayout member={member} currentGame={currentGame}>
        <div className="dashboard-content-containers">
          <AddGameId steam_id={member.steam_id} />
          {
            ['Carry', 'Support', 'Offlane', 'Midlane'].map((n, index) => (
              <PostFindTeam key={index} n={n} />
            ))
          }
        </div>
        <style jsx>{`
          .dashboard-content-containers {
            max-width: 1200px;
          }
        `}</style>
      </DashboardLayout>
    )
  }
}
