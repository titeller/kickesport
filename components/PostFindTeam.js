import { getDateFromNow } from '../helpers/dateTime'
import Card from './Card'
import Avatar from './Avatar'
import Position from './Position'
import Steam from './Steam'
import Rov from './Rov'

export default ({ game_id, first_name, last_name, picture_profile, role_name, description, steam_id, rov_name, create_date }) => (
  <Card>
    <div>
      <Avatar src={picture_profile} />
      <strong className="username">{first_name} {last_name}</strong>
      <Position name={role_name} />
      {
        game_id != 4 ? steam_id && <Steam id={steam_id} />
          : rov_name && <Rov rov_name={rov_name} />
      }
      <span className="date"> {getDateFromNow(create_date)}</span>
    </div>
    <div className="description">{description}</div>
    <style jsx>{`
      .username {
        font-size: 14px;
      }
      .description {
        font-size: 12px;
        margin-top: 8px;
        word-break: break-word;
        white-space: pre-line;
      }
      .date {
        text-align: right;
        margin-top: 4px;
        font-size: 12px;
        color: #888888;
      }
    `}</style>
  </Card>
)