export const statusEffects = {
    "DEF UP": {
      label: "DEF UP",
      user: null,
      target: null,
      duration: 3,
      initialEffect: function(){
        this.target.def = this.target.def * 2
        console.log(`${this.target.race}'s defense has increased`)
      },
      continuousEffect: function(){
        this.duration -= 1
      },
      revertEffect: function(){
        console.log(`${this.target.race}'s defense has reverted to normal`)
        this.target.def = this.target.def / 2
      },
      stackable: true,
    },
    "Burn": {
      label: "Burn",
      user: null,
      target: null,
      duration: 3,
      initialEffect: function(){
        console.log(`${this.target.race} has been burned!`)
      },
      continuousEffect: function(){
        this.target.hp -= 3
        console.log(`${this.target.race} suffers from Burn! ${this.target.race} takes 3 DMG`)
        this.duration -= 1
      },
      revertEffect: function(){
        console.log(`${this.target.race} no longer suffers from Burn.`)
      },
      stackable: false,
    },
    "Sword Dance": {
      label: "Sword Dance",
      user: null,
      target: null,
      duration: 3,
      initialEffect: function(){
        this.target.atk = this.target.atk * 2
        console.log(`${this.target.race}'s attack has increased`)
      },
      continuousEffect: function(){
        this.duration -= 1
      },
      revertEffect: function(){
        this.target.atk = this.target.atk /2
        console.log(`${this.target.race}'s attack has reverted to normal.`)
      },
      stackable: true,
    },
    "Paralysis": {
      label: "Paralysis",
      user: null,
      target: null,
      duration: 2,
      initialEffect: function(){
        console.log(`${this.target.race} has been paralyzed!`)
        this.target.turnActionTaken = true
      },
      continuousEffect: function(){
        console.log(`${this.target.race} suffers from Paralysis! ${this.target.race} cannot move!`)
        this.target.turnActionTaken = true
        this.duration -= 1
      },
      revertEffect: function(){
        console.log(`${this.target.race} no longer suffers from Burn.`)
      },
      stackable: false,
    },
    "Leech Seed": {
      label: "Leech Seed",
      user: null,
      target: null,
      duration: 5,
      initialEffect: function(){
        console.log(`${this.target.race} is being leeched!`)
      },
      continuousEffect: function(){
        this.target.hp -= 5
        console.log(`${this.target.race} suffers from leech seed! ${this.target.race} takes 5 DMG`)
        this.user.hp += 5
        console.log(`${this.user.race} recovers 5 HP.`)
        this.duration -= 1
      },
      revertEffect: function(){
        console.log(`${this.target.race} is no longer affected by leech seed.`)
      },
      stackable: false,
    },
    "Disabled": {
      label: "Disabled",
      user: null,
      target: null,
      duration: 1,
      initialEffect: function(){
        console.log(`${this.target.race} has been disabled!`)
        this.target.turnActionTaken = true
      },
      continuousEffect: function(){
        console.log(`${this.target.race} is disabled! ${this.target.race} cannot move!`)
        this.target.turnActionTaken = true
        this.duration -= 1
      },
      revertEffect: function(){
        console.log(`${this.target.race} is no longer disabled.`)
      },
      stackable: false,
    }
  }