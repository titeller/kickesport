import React, { Component } from 'react'
import { getDateFromNow } from '../helpers/dateTime'

export default class DateFromNow extends Component {
  state = {
    create_date: this.props.create_date,
    date_from_now: getDateFromNow(this.props.create_date),
  }
  componentDidMount() {
    this.fetchDateFromNow()
  }
  fetchDateFromNow() {
    const { create_date } = this.state
    setTimeout(() => {
      this.setState({
        date_from_now: getDateFromNow(create_date),
      });
      this.fetchDateFromNow()
    }, 1000 * 20)
  }
  render() {
    const { date_from_now } = this.state
    return (
      <span className="date">
        <span>{date_from_now}</span>
        <style jsx>{`
          .date {
            text-align: right;
            margin-top: 4px;
            font-size: 12px;
            color: #888888;
          }
        `}</style>
      </span>
    )
  }
}