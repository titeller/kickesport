import React from 'react'
import DashboardLayout from '../../components/dashboard/Layout'

export default class extends React.Component {
  static async getInitialProps ({ req }) {
    const { member } = req
    return { member }
  }
  render() {
    const { member } = this.props
    return (
      <DashboardLayout member={member} >
        GG wp
      </DashboardLayout>
    )
  }
}