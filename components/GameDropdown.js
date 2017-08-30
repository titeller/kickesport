import React, { Component } from 'react'
import DropdownMenu from 'react-dd-menu'
import * as Cookie from '../helpers/cookies'

export default class GameDropdown extends Component {
  constructor(props) {
    super(props)
    const { currentGame = null } = this.props
    const games = ['dota2', 'csgo', 'overwatch', 'rov']
    const current = games.filter((n) => n == currentGame)[0]
    this.state = {
      isMenuOpen: false,
      current: current || null,
      games: games
    }
  }
  toggle = () => {
    this.setState({ isMenuOpen: !this.state.isMenuOpen });
  }
  close = () => {
    this.setState({ isMenuOpen: false });
  }

  selectGame = (game) => {
    Cookie.savingCookies({ cookieName: 'currentGame', data: game })
    location.reload()
  }

  render() {
    const { current, games } = this.state
    let menuOptions = {
      isOpen: this.state.isMenuOpen,
      close: this.close.bind(this),
      toggle: (
        <div onClick={this.toggle.bind(this)}>
          <i className="fa fa-angle-down" aria-hidden="true"></i>
        </div>
      ),
      align: 'right',
      className: 'hamberger-menu'
    }
    return (
      <span>
        {
          current ? (
            <div className={`cursor-pointer game-current game-current-display ${current}`} onClick={this.toggle.bind(this)}>{current}</div>
          ) : (
            <div className="cursor-pointer game-current-display" onClick={this.toggle.bind(this)}>เลือก Game</div>
          )
        }
        <DropdownMenu {...menuOptions}>
          {
            games.map((n, index) => (
              <li key={index}><a className={`game-current ${n} game-dropdown-row`} onClick={this.selectGame.bind(this, n)}>{n}</a></li>
            ))
          }
        </DropdownMenu>
        <style jsx>{`
          .game-current {
            position: relative;
            padding: 0.75rem 0.25rem 0.725rem 3.25rem;
            font-size: 16px;
            font-weight: 600;
            text-transform: uppercase;
          }
          .game-current-display {
            display: inline-block;
            width: calc(100% - 19px);
          }
          .game-current:before {
            content: "";
            box-sizing: border-box;
            position: absolute;
            top: 0;
            left: 4px;
            width: 2.5rem;
            height: 100%;
          }
          .dota2.game-current:before {
            background: url(/static/images/games/dota2-logo.png) no-repeat center/cover;
            background-size: 100%;
          }
          .csgo.game-current:before {
            background: url(/static/images/games/csgo-logo.png) no-repeat center/cover;
            background-size: 100%;
          }
          .overwatch.game-current:before {
            background: url(/static/images/games/ow-logo.png) no-repeat center/cover;
            background-size: 100%;
          }
          .rov.game-current:before {
            background: url(/static/images/games/rov-logo.png) no-repeat center/cover;
            background-size: 100%;
          }
          .game-dropdown-row {
            padding-right: 12px;
          }
          .cursor-pointer {
            cursor: pointer;
          }
    `}</style>
      </span>
    )
  }
}