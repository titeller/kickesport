import Card from './Card'
import Avatar from './Avatar'
import Position from './Position'
import Steam from './Steam'

export default ({ n }) => (
  <Card>
    <div>
      <a href="" target="_blank">
        <Avatar src="https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/17795875_1248072241908039_7940853351446935125_n.jpg?oh=840d259c8d877bf14f19b0da5b7d5a2c&oe=59D2FBA5" />
        <strong>Teller</strong>
      </a>
      <Position name={n} />
      <Steam id={n} />
      <span className="date"> 24 นาทีที่แล้ว</span>
    </div>
    <div className="description">{n}</div>
    <style jsx>{`
      .description {
        font-size: 12px;
        margin-top: 8px;
      }
      .date {
        text-align: right;
        margin-top: 4px;
        font-size: 10px;
        color: #888888;
      }
    `}</style>
  </Card>
)