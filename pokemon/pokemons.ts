export interface pokemonType {
    race: string
    hp: number
    maxHp: number
    atk: number
    def: number
    spd: number
    skills: string[]
    type: string
    statuses: any[]
    turnActionTaken: boolean
    own: boolean
  }
  export const pokemons = {
    "1": {
      "race": "Charmander",
      "hp": 80,
      "maxHp": 30,
      "atk": 8,
      "def": 2,
      "spd": 4,
      "skills": ["Scratch", "Ember", "Sword Dance"],
      "type": "Fire",
      "statuses": [],
      "own": false,
      "turnActionTaken": false
    },
    "2": {
      "race": "Squirtle",
      "hp": 35,
      "maxHp": 35,
      "atk": 6,
      "def": 4,
      "spd": 2,
      "skills": ["Ice beam", "Defend"],
      "type": "Water",
      "statuses": [],
      "own": false,
      "turnActionTaken": false
    },
    "3": {
      "race": "Bulbasaur",
      "hp": 40,
      "maxHp": 40,
      "atk": 5,
      "def": 2,
      "spd": 3,
      "skills": ["Leech Seed", "Recover"],
      "type": "Grass",
      "statuses": [],
      "own": false,
      "turnActionTaken": false
    },
    "4": {
      "race": "Pidgey",
      "hp": 20,
      "maxHp": 20,
      "atk": 4,
      "def": 1,
      "spd": 6,
      "skills": ["Tackle", "Gust"],
      "type": "Normal",
      "statuses": [],
      "own": false,
      "turnActionTaken": false
    },
    "5": {
      "race": "Pikachu",
      "hp": 25,
      "maxHp": 25,
      "atk": 7,
      "def": 2,
      "spd": 7,
      "skills": ["Thunder", "Body Slam"],
      "type": "Lightning",
      "statuses": [],
      "own": false,
      "turnActionTaken": false
    }
  }