export function applyStatusEffect(statusEffect, phase){
  switch(statusEffect.label){
    case "DEF UP":
      if(phase === "initial"){
        statusEffect.target.def = statusEffect.target.def * 2
        console.log(`${statusEffect.target.race}'s defense has increased`)
      } else if (phase === "continuous"){
        statusEffect.duration -= 1
      } else if (phase === "revert"){
        console.log(`${statusEffect.target.race}'s defense has reverted to normal`)
        statusEffect.target.def = statusEffect.target.def / 2
      }
      break
    case "Burn":
      if(phase === "initial"){
        console.log(`${statusEffect.target.race} has been burned!`)
      } else if (phase === "continuous"){
        statusEffect.target.hp -= 3
        console.log(`${statusEffect.target.race} suffers from Burn! ${statusEffect.target.race} takes 3 DMG`)
        statusEffect.duration -= 1
      } else if (phase === "revert"){
        console.log(`${statusEffect.target.race} no longer suffers from Burn.`)
      }
      break
    case "Sword Dance":
      if(phase === "initial"){
        statusEffect.target.atk = statusEffect.target.atk * 2
        console.log(`${statusEffect.target.race}'s attack has increased`)
      } else if (phase === "continuous"){
        statusEffect.duration -= 1
      } else if (phase === "revert"){
        statusEffect.target.atk = statusEffect.target.atk /2
        console.log(`${statusEffect.target.race}'s attack has reverted to normal.`)
      }
      break
    case "Paralysis":
      if(phase === "initial"){
        console.log(`${statusEffect.target.race} has been paralyzed!`)
        statusEffect.target.turnActionTaken = true
      } else if (phase === "continuous"){
        console.log(`${statusEffect.target.race} suffers from Paralysis! ${statusEffect.target.race} cannot move!`)
        statusEffect.target.turnActionTaken = true
        statusEffect.duration -= 1
      } else if (phase === "revert"){
        console.log(`${statusEffect.target.race} no longer suffers from Burn.`)
      }
      break
    case "Leech Seed":
      if(phase === "initial"){
        console.log(`${statusEffect.target.race} is being leeched!`)
      } else if (phase === "continuous"){
        statusEffect.target.hp -= 5
        console.log(`${statusEffect.target.race} suffers from leech seed! ${statusEffect.target.race} takes 5 DMG`)
        statusEffect.user.hp += 5
        console.log(`${statusEffect.user.race} recovers 5 HP.`)
        statusEffect.duration -= 1
      } else if (phase === "revert"){
        console.log(`${statusEffect.target.race} is no longer affected by leech seed.`)
      }
      break
    case "Disabled":
      if(phase === "initial"){
        console.log(`${statusEffect.target.race} has been disabled!`)
        statusEffect.target.turnActionTaken = true
      } else if (phase === "continuous"){
        console.log(`${statusEffect.target.race} is disabled! ${statusEffect.target.race} cannot move!`)
        statusEffect.target.turnActionTaken = true
        statusEffect.duration -= 1
      } else if (phase === "revert"){
        console.log(`${statusEffect.target.race} is no longer disabled.`)
      }
      break
  }
}

export const statusEffects = {
    "DEF UP": {
      label: "DEF UP",
      user: null,
      target: null,
      duration: 3,
      stackable: true,
    },
    "Burn": {
      label: "Burn",
      user: null,
      target: null,
      duration: 3,
      stackable: false,
    },
    "Sword Dance": {
      label: "Sword Dance",
      user: null,
      target: null,
      duration: 3,
      stackable: true,
    },
    "Paralysis": {
      label: "Paralysis",
      user: null,
      target: null,
      duration: 2,
      stackable: false,
    },
    "Leech Seed": {
      label: "Leech Seed",
      user: null,
      target: null,
      duration: 5,
      stackable: false,
    },
    "Disabled": {
      label: "Disabled",
      user: null,
      target: null,
      duration: 1,
      stackable: false,
    }
  }