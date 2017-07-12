import React from 'react'
import DashboardLayout from '../../components/dashboard/Layout'

export default class extends React.Component {
  static async getInitialProps ({ req }) {
    const { member } = req
    const { currentGame } = req.cookies
    return { member, currentGame }
  }
  render() {
    const { member, currentGame } = this.props
    return (
      <DashboardLayout member={member} currentGame={currentGame} >
        GG wp
      </DashboardLayout>
    )
  }
}