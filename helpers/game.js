export function getIdByGameName(name) {
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

  const currentGame = games.filter((game) => game.name == name)[0]
  const { id } = currentGame
  return id
}