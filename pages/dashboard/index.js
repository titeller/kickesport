import React from 'react'
import StandardLayout from '../../components/layout/StandardLayout'

export default class extends React.Component {
  static async getInitialProps ({ req }) {
    const { member } = req
    return { member }
  }
  render() {
    return (
      <StandardLayout displayFooter={false} member={this.props.member} >
        <div className="content-container">
          555
        </div>
        <style jsx>{`
         .content-container {
            position: relative;
            width: 100%;
            min-height: 100vh;
        `}</style>
      </StandardLayout>
    )
  }
}