import {typeAdvantages} from './typeAdvantages'
import {statusEffects} from './statusEffects'


const typeDamageCalculation = (damage, attackType, targetType) => {
  if(typeAdvantages[targetType].weakness.includes(attackType)){
    console.log("It's super effective!")
    return damage * 2
  }
  if(typeAdvantages[attackType].weakness.includes(targetType)){
    console.log("It's not so effective...")
    return Math.floor(damage * 0.5)
  }
  return damage
}

const hpAdjuster = (target, hpEffectVal, hpEffectType) => {
  let remHp = target.hp
  if(hpEffectType === 'damage'){
    const actualDmg = (hpEffectVal <= 0 ? 0 : hpEffectVal)
    remHp = remHp - actualDmg
    console.log(`${target.race} takes ${actualDmg} DMG`)
  } else {
    const actualHeal = (hpEffectVal >= 0 ? hpEffectVal: 0)
    remHp = remHp + actualHeal
    console.log(`${target.race} heals ${actualHeal} HP`)
  }

  if(remHp > target.maxHp){
    target.hp = target.maxHp
  } else if(remHp < 0){
    target.hp = 0
  } else {
    target.hp = remHp
  }
}

const applyEffect = (user, target, effect) => {
  if(
    !statusEffects[effect].stackable 
    && (target.statuses.filter((status) => (status.label === effect)).length > 0)
    ){
    for(let i = 0; i < target.statuses.length ; i += 1){
      if(target.statuses[i].label === effect){
        console.log(effect, " has been renewed!")
        target.statuses[i].duration = statusEffects[effect].duration
      }
    }
  } else {
    const appliedEffect = {
      ...statusEffects[effect],
      user: user,
      target: target
    }
  
    appliedEffect.initialEffect && appliedEffect.initialEffect()
    target.statuses.push(appliedEffect)
  }
}

export const skills = {
  "Scratch": {
    effect: (user, target) => {
      const type = "Normal"
      let damage = Math.floor((user.atk * 1.1 - target.def))
      const totalDamage = typeDamageCalculation(damage, type, target.type)
      hpAdjuster(target, totalDamage, 'damage')
    }
  },
  "Ember": {
    effect: (user, target) => {
      const type = "Fire"
      let damage = Math.floor((user.atk * 1.5 - target.def * 0.8))
      const totalDamage = typeDamageCalculation(damage, type, target.type)
      hpAdjuster(target, totalDamage, 'damage')
      applyEffect(user, target, "Burn")
    }
  },
  "Ice beam": {
    effect: (user, target) => {
      const type = "Ice"
      let damage = Math.floor((user.atk * 1.3 - target.def))
      const totalDamage = typeDamageCalculation(damage, type, target.type)
      hpAdjuster(target, totalDamage, 'damage')
    }
  },
  "Defend": {
    effect: (user, target) => {
      applyEffect(user, user, "DEF UP")
    }
  },
  "Leech Seed": {
    effect: (user, target) => {
      const type = "Grass"
      applyEffect(user, target, "Leech Seed")
    }
  },
  "Recover": {
    effect: (user, target) => {
      hpAdjuster(user, 5, 'heal')
    }
  },
  "Tackle": {
    effect: (user, target) => {
      const type = "Normal"
      let damage = Math.floor((user.atk * 1.1 - target.def))
      const totalDamage = typeDamageCalculation(damage, type, target.type)
      hpAdjuster(target, totalDamage, 'damage')
    }
  },
  "Gust": {
    effect: (user, target) => {
      const type = "Wind"
      let damage = Math.floor((user.atk * 1.3 - target.def))
      const totalDamage = typeDamageCalculation(damage, type, target.type)
      hpAdjuster(target, totalDamage, 'damage')
    }
  },
  "Thunder": {
    effect: (user, target) => {
      const type = "Lightning"
      let damage = Math.floor((user.atk * 2.5 - target.def * 0.5))
      const totalDamage = typeDamageCalculation(damage, type, target.type)
      hpAdjuster(target, totalDamage, 'damage')
      applyEffect(user, target, "Paralysis")
    }
  },
  "Body Slam": {
    effect: (user, target) => {
      const type = "Normal"

      let damage = Math.floor((user.atk * 1.5 - target.def))
      const totalDamage = typeDamageCalculation(damage, type, target.type)
      hpAdjuster(target, totalDamage, 'damage')
      applyEffect(user, target, "Disabled")
    }
  },
  "Sword Dance": {
    effect: (user, target) => {
      applyEffect(user, user, "Sword Dance")
    }
  }
}


