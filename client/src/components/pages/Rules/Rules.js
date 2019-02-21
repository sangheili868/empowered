import React, { Component } from 'react';
import {blockTitle, ruleBlock} from "./rules.module.scss"

class Rules extends Component {
  render() {
    return (
      <div>
        <p><a target="_blank" rel="noopener noreferrer" href="https://drive.google.com/drive/folders/1NSLfgle6cozbaGc-UWQiO6iCd1t7JVw6?usp=sharing">Rules</a></p>
        <div className={blockTitle}>
          Ability Scores
        </div>
        <div className={ruleBlock}>
          You have six ability scores and fifteen skills. Most skills are tied to two different ability scores. Each of these skills has a modifier equal to the sum of each of these ability scores. For example, the skill Athletics is tied to the abilities Strong and Quick. So if your Strong score is +3 and your Quick score is -1, your Athletics modifier is +2. Some other skills are tied to only one ability. Their modifiers are equal to twice the ability score. For example, a Strong score of +3 gives you a Brawn modifier of +6.
          When the DM asks you to roll a skill, roll a d20 and add the appropriate skill modifier. The DM will then tell you the results of your roll. The DM will never ask you to roll for an ability, only skills. If you roll a 1 on the d20, you automatically fail, and if you roll a 20, you might automatically succeed, or gain some other benefit. If you make a roll with advantage, roll 2 d20’s and use the higher number. If you make a roll with disadvantage, roll 2 d20’s and use the lower number. If there is a tie, then the player succeeds. If two players are rolling against each other and tie, they redo the roll. When something refers to a passive skill, it means the skill modifier plus ten. For example, if you have +3 Fortitude, your passive fortitude is 13. 
        </div>
        <div className={blockTitle}>
          Athletics
        </div>
        <div className={ruleBlock}>
          Athletics describes your ability to precisely control your body when performing feats of strength. This includes wrestling, climbing, swimming, jumping across a gap, balancing on a tightrope, grabbing a handhold while falling, or running across ice. Athletics should only be used if precision or speed as well as brute strength. When only one of these qualities is present, the roll should be agility or brawn instead. Some melee weapons and all thrown weapons use athletics rolls when attacking and deal more damage with higher athletics. The Wrestle action in combat relies on athletics.
        </div>
        ... and so on
      </div>
    );
  }
}

export default Rules;
