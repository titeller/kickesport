const games = [
  {
    id: 1,
    name: 'dota2',
    avatar: '/static/images/games/dota2-logo.png',
  },
  {
    id: 2,
    name: 'csgo',
    avatar: '/static/images/games/csgo-logo.png',
  },
  {
    id: 3,
    name: 'overwatch',
    avatar: '/static/images/games/ow-logo.png',
  },
  {
    id: 4,
    name: 'rov',
    avatar: '/static/images/games/rov-logo.png',
  }
]

export function getIdByGameName(name) {
  const currentGame = games.filter((game) => game.name == name)[0]
  const { id } = currentGame
  return id
}

export function getNameByGameId(game_id) {
  const currentGame = games.filter((game) => game.id == game_id)[0]
  const { name } = currentGame
  return name
}

export function getAvatarByGameId(game_id) {
  const currentGame = games.filter((game) => game.id == game_id)[0]
  const { avatar } = currentGame
  return avatar
}