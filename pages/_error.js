import React from 'react'
import StandardLayout from '../components/layout/StandardLayout'

export default class Error extends React.Component {
  static getInitialProps ({ res, jsonPageRes }) {
    const statusCode = res ? res.statusCode : (jsonPageRes ? jsonPageRes.status : null)
    return { statusCode }
  }

  render () {
    const { statusCode } = this.props
    let message = 'Something went wrong.'
    switch (statusCode) {
      case 404:
        message = 'Page not found.'
        break;
      default:
        message = 'Something went wrong.'
        break;
    }
    return (
      <StandardLayout displayFooter={false} displayHeader={false}>
        <div className="error-container">
          <div className="middle">
            <div className="inner">
              <div className="error-title">{statusCode}</div>
              <div className="error-description">{message}</div>
              <a href="/">
                <button className="primary">Back to home</button>
              </a>
            </div>
          </div>
        </div>
        <style jsx>{`
          .error-container {
            display: table;
            position: absolute;
            height: 100%;
            width: 100%;
            background: #555;
            color: #fff;
            margin: 0;
            text-align: center;
          }
          .middle {
            display: table-cell;
            vertical-align: middle;
          }
          .inner {
            margin-left: auto;
            margin-right: auto;
          }
          .error-title {
            font-size: 160px;
          }
          .error-description {
            font-size: 20px;
            margin-bottom: 24px;
          }
        `}</style>
      </StandardLayout>
    )
  }
}