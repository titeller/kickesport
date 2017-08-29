const games = [
  {
    id: 1,
    name: 'dota2'
  },
  {
    id: 2,
    name: 'csgo'
  },
  {
    id: 3,
    name: 'overwatch'
  },
  {
    id: 4,
    name: 'rov'
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