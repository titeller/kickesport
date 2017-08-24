import { getSteamProfileById } from '../helpers/steam'

export default ({ id }) => (
  <a href={getSteamProfileById(id)} target="_blank" className="steam">
    <span><i className="fa fa-steam-square" aria-hidden="true" /> Steam</span>
    <style jsx>{`
      .steam {
        background: #3e4148;
        font-size: 14px;
        display: inline-block;
        padding: 2px 4px;
        border-radius: 2px;
        margin: 4px;
        color: #fff;
      }
    `}</style>
  </a>
)