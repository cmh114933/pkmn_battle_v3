import {typeAdvantages} from './typeAdvantages'
import {statusEffects, applyStatusEffect} from './statusEffects'


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
  
    applyStatusEffect(appliedEffect,"initial")
    target.statuses.push(appliedEffect)
  }
}

export function applySkillEffect(skillName, user, target){
  let type = ""
  let damage = 0
  let totalDamage = 0
  switch(skillName){
    case "Scratch":
      type = "Normal"
      damage = Math.floor((user.atk * 1.1 - target.def))
      totalDamage = typeDamageCalculation(damage, type, target.type)
      hpAdjuster(target, totalDamage, 'damage')
      break
    case "Ember":
      type = "Fire"
      damage = Math.floor((user.atk * 1.5 - target.def * 0.8))
      totalDamage = typeDamageCalculation(damage, type, target.type)
      hpAdjuster(target, totalDamage, 'damage')
      applyEffect(user, target, "Burn")
      break
    case "Ice beam":
      type = "Ice"
      damage = Math.floor((user.atk * 1.3 - target.def))
      totalDamage = typeDamageCalculation(damage, type, target.type)
      hpAdjuster(target, totalDamage, 'damage')
      break
    case "Defend":
      applyEffect(user, user, "DEF UP")
      break
    case "Leech Seed":
      applyEffect(user, target, "Leech Seed")
      break
    case "Recover":
      hpAdjuster(user, 5, 'heal')
      break
    case "Tackle":
      type = "Normal"
      damage = Math.floor((user.atk * 1.1 - target.def))
      totalDamage = typeDamageCalculation(damage, type, target.type)
      hpAdjuster(target, totalDamage, 'damage')
      break
    case "Gust":
      type = "Wind"
      damage = Math.floor((user.atk * 1.3 - target.def))
      totalDamage = typeDamageCalculation(damage, type, target.type)
      hpAdjuster(target, totalDamage, 'damage')
      break
    case "Thunder":
      type = "Lightning"
      damage = Math.floor((user.atk * 2.5 - target.def * 0.5))
      totalDamage = typeDamageCalculation(damage, type, target.type)
      hpAdjuster(target, totalDamage, 'damage')
      applyEffect(user, target, "Paralysis")
      break
    case "Body Slam":
      type = "Normal"
      damage = Math.floor((user.atk * 1.5 - target.def))
      totalDamage = typeDamageCalculation(damage, type, target.type)
      hpAdjuster(target, totalDamage, 'damage')
      applyEffect(user, target, "Disabled")
      break
    case "Sword Dance":
      applyEffect(user, user, "Sword Dance")
      break
  }
}
