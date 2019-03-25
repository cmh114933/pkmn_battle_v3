import { pokemons, pokemonType } from "./pokemon/pokemons";
import { skills } from './pokemon/skills'
import { question } from 'readline-sync'

let myPokemon: pokemonType = pokemons["1"]
myPokemon['own'] = true
myPokemon['turnActionTaken'] = false

let oppPokemon: pokemonType = pokemons["2"]
oppPokemon['own'] = false
oppPokemon['turnActionTaken'] = false

let divider = '='.repeat(22)

function nextPokemon(){
  return currentPokemon === myPokemon ? oppPokemon: myPokemon
}

// refactored functions
function displayTurnStatus(currentTurn){
  console.log(divider)
  console.log('|' + `Turn ${currentTurn}`.padEnd(20) + '|')
  console.log('|' + `${oppPokemon.race}: ${oppPokemon.hp} HP`.padEnd(20) + '|')
  console.log('|' + ''.padStart(20) + '|')
  console.log('|' + `${myPokemon.race}: ${myPokemon.hp} HP`.padStart(20) + '|')
  console.log(divider)
}

function useSkill(skillUsed){
  console.log(`${currentPokemon.race} uses ${skillUsed}`)
  skills[skillUsed].effect(currentPokemon, nextPokemon())
}

function useRandomSkill(){
  useSkill(currentPokemon.skills[ Math.floor(Math.random() * currentPokemon.skills.length) ])
}


// User interactivity: Let user select skill usage


function askUserAction(){
  console.log('Available skills')
  currentPokemon.skills.forEach(function(skill, index){
    console.log(`${index + 1}. ${skill}`)
  })
  console.log(divider)
  const answer = question("Choose a skill (number)\n")
  const selectedIndex = parseInt(answer)
  const skillUsed = currentPokemon.skills[selectedIndex - 1] 

  if(selectedIndex && skillUsed){
    useSkill(skillUsed)
  } else {
    console.log(`No such skill available. ${currentPokemon.race} uses a random skill!`)
    useRandomSkill()
  }
}

function pause(callback){
  displayTurnStatus(turn)

  callback && callback()

  question(">>>")
//   process.stdout.write('\033c');
}

function preBattleEval(){
  if(!myPokemon.turnActionTaken && !oppPokemon.turnActionTaken){
    currentPokemon = myPokemon.spd > oppPokemon.spd ? myPokemon: oppPokemon
    console.log(`${currentPokemon.race} strikes first!`)
  }

  currentPokemon.statuses.forEach((status, index) => {
    if(status.duration == 0 ){
      status.revertEffect()
    }
  })
  currentPokemon.statuses = currentPokemon.statuses.filter((status) => (status.duration !== 0))

  currentPokemon.statuses.forEach((status, index) => {
    if(status.duration > 0 ){
      status.continuousEffect()
    }
  })

  victoryEval()
}


function postBattleEval(){
  // After using skill, evaluate if opponent still alive

  victoryEval()
  if(!winner) {
    currentPokemon.turnActionTaken = true
    console.log(`${nextPokemon().race} turn`)
    currentPokemon = nextPokemon()
  }
}

function victoryEval(){
  if(!winner && (nextPokemon().hp <= 0 || currentPokemon.hp <= 0)){
    winner = currentPokemon.hp > 0 ? currentPokemon : nextPokemon()
    // console.log(winner)
    const loser = currentPokemon.hp <= 0 ? currentPokemon : nextPokemon()
    console.log(`${loser.race} faints`)
    console.log(winner.own ? "Congratulations! You've won!": 'GAME OVER' )
  }
}


let turn = 1
let myTurn = function(){
  return currentPokemon.own
}


let currentPokemon = null
let winner = null

// Display encounter
// process.stdout.write('\033c');
console.log(`A wild ${oppPokemon.race} appears!`)
console.log(`I choose you ${myPokemon.race}`)
pause(() => {})

while(!winner){
  pause( () => {
    preBattleEval()
    if(!winner){
      myTurn() ? askUserAction():useRandomSkill()
      postBattleEval()
    }
  })
  
  if(myPokemon.turnActionTaken && oppPokemon.turnActionTaken){
    myPokemon.turnActionTaken = false
    oppPokemon.turnActionTaken = false
    turn += 1 
  }
}
