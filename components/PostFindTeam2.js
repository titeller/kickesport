import { getDateFromNow } from '../helpers/dateTime'
import Card from './Card'
import Avatar from './Avatar'
import Position from './Position'
import Steam from './Steam'
import Rov from './Rov'
import DateFromNow from './DateFromNow'

export default ({ game_id, game_name, currentGameId, first_name, last_name, picture_profile, role_name, description, steam_id, rov_name, create_date }) => (
  <Card>
    <div>
      <Avatar src={picture_profile} />
      <strong className="username">{first_name} {last_name}</strong>
      {
        !currentGameId && (
          <span className="game-name">{game_name}</span>
        )
      }
      <Position name={role_name} />
      {
        game_id != 4 ? steam_id && <Steam id={steam_id} />
          : rov_name && <Rov rov_name={rov_name} />
      }
      <span> <DateFromNow create_date={create_date} /></span>
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
      .game-name {
        font-size: 14px;
        margin: 8px;
      }
    `}</style>
  </Card>
)