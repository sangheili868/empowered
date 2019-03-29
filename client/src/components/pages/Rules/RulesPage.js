import React, { Component } from 'react';
import { card, nestedCard, table } from "./RulesPage.module.scss"
import EmpCard from '../../EmpCard/EmpCard'
import CharacterSheetSkills from '../Character/CharacterSheetTable/CharacterSheetSkills'
import RulesActions from './RulesActions'
import RulesConditions from './RulesConditions'
import RulesCriticals from './RulesCriticals'

class RulesPage extends Component {
  render() {
    return (
      <>
        <CharacterSheetSkills noSpacing/>
        <EmpCard title="Using Skills" noSpacing>
          <div className={card}>
            <p>
              You have six ability scores and fifteen skills. Most skills are tied to two different ability scores. Each of these skills has a modifier equal to the sum of each of these ability scores. For example, the skill Athletics is tied to the abilities Strong and Quick. So if your Strong score is +3 and your Quick score is -1, your Athletics modifier is +2. Some other skills are tied to only one ability. Their modifiers are equal to twice the ability score. For example, a Strong score of +3 gives you a Brawn modifier of +6.
            </p>
            <p>
              When the DM asks you to roll a skill, roll a d20 and add the appropriate skill modifier. The DM will then tell you the results of your roll. The DM will never ask you to roll for an ability, only skills. If you roll a 1 on the d20, you automatically fail, and if you roll a 20, you might automatically succeed, or gain some other benefit. If you make a roll with  advantage, roll 2 d20’s and use the higher number. If you make a roll with disadvantage, roll 2 d20’s and use the lower number. If there is a tie, then the player succeeds. If two players are rolling against each other and tie, they redo the roll. When something refers to a passive skill, it means the skill modifier plus ten. For example, if you have +3 Fortitude, your passive fortitude is 13.
            </p>
            <p>
              You can click in the grid above to find out more about each skill and its usage.
            </p>
          </div>
        </EmpCard>
        <EmpCard title="Health" noSpacing>
          <div className={card}>
            <p>
              You have a number of hit points equal to your passive fortitude. When you take damage that reduces your hit points to 0, you take a wound, and then your hit points return to their max. Then, any remaining damage carries over to this new health pool. For example, if you have 10 hitpoints and take 23 damage, you take two wounds and your hit points become 7/10. When you would take a fifth wound, instead make a death roll by rolling willpower against DC 10. If you fail, you die. If you succeed, you return to 1 hit point and 4 wounds and you gain a permanent, negative feature of the DM’s choice, called an injury. The only way to remove an injury is by taking downtime to recuperate. You cannot perform any other downtime activity while recuperating.
            </p>
            <p>
              If you regain hit points from any source, and you have at least one wound, you can be healed to a hit point value above your hit point maximum. This is called overhealing. When overhealing, your hit points cannot go above twice your passive fortitude. Taking a rest or downtime resets your hit points to their normal value, so you lose any overhealing at that time. If you receive any healing while you are overhealed, you must either ignore that healing or lose the overhealing you have before applying the new overhealing. Healing cannot restore wounds unless it specifically says so.
            </p>
          </div>
        </EmpCard>
        <EmpCard title="Power Dice" noSpacing>
          <div className={card}>
            <p>
              You have a number of power dice of various sizes. For example, you might have 2d4 and 1d6 power dice. These dice are used for various features. When you use a power dice in any way, roll it, and then it is gone. When you rest, you regain all your power dice.
            </p>
            <p>
              Powers can ask you to expend a power dice, make an empowered action, or empower a roll. When you make an empowered action, you must expend a power die to perform that action, and you can only perform that action once per turn. When you expend a power die, roll it, and if the result is 4 or higher, you also gain the Boosted ability listed in the power. When you make a roll that you are able to empower, after rolling the d20 but before hearing the results, you can expend a power die and add the result to your total.
            </p>
            <table className={table}>
              <thead><tr><th colSpan="2">Boosted Probabilities</th></tr></thead>
              <tbody>
                {[4,6,8,10,12].map(dieSize =>
                  <tr key={dieSize}><td>d{dieSize}</td><td>{100 - (300 / dieSize)}%</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </EmpCard>
        <EmpCard title="Recovery" noSpacing>
          <div className={card}>
            There are two types of recovery: rest and downtime. Rest takes about 8 hours to complete, and you can only rest once every 24 hours. After completing a rest, you regain all of your spent power dice and lost hit points. Downtime takes at least five days but can last as long as you want. For every five days that you spend in downtime, you recover all of your wounds and can perform one downtime activity. Also, when you take downtime, you can spend advancements. Finally, you can reject any features from the advancement shop. Those features are removed from your shop, and the DM creates new ones to fill the empty spaces at the end of the downtime.
          </div>
        </EmpCard>
        <EmpCard title="Advancements" noSpacing>
          <div className={card}>
            <p>
              Every character starts with 35 advancements, and you can expect to earn on average 1 advancement per session. When you begin your adventure, and every time you take downtime, you can spend your advancements in your advancement shop. Your shop includes several things common to all players, such as increasing ability scores, adding more power dice, increasing the size of power dice, and gaining new proficiencies.
            </p>
            <p>
              In addition to these, each character has ten features unique to that character in their shop. When you purchase a feature, your character gains the described abilities, and then your DM will replace it with a new one for your character, so your shop always has 10 features available for purchase. Replacement features often are related or even enhanced version of the features that you purchase. For example, if you continuously purchase features involving illusion magic, your DM will provide better and better illusion based features.
            </p>
            <p>
              Most features have requirements to take them, such as a certain skill modifier. For example, the Disintegrate feature requires a knowledge modifier of +10. You must meet the requirements to take the feature, and if you ever fail to meet the requirements, you cannot use the feature. For example, if a spell causes your knowledge to fall below 10, you cannot use the Disintegrate feature until it returns to 10 or higher. If a feature has equipment as a requirement, you must have that equipment in your hands and have proficiency in it to use the feature. If a feature has an item as a requirement, you must have that item in your hands, and that item is consumed on each use of the feature if the feature says “consumed” next to the item.
            </p>
          </div>
        </EmpCard>
        <EmpCard title="Equipment and Gear" noSpacing>
          <div className={card}>
            <p>
              Equipment refers to special items that require training to use. These include weapons, armor, shields, focuses, tools, and vehicles. To properly use equipment, you must purchase proficiency with it from your shop. The only exceptions are improvised weapons, which anyone can use. When you use a weapon that you are not proficient with, it counts as an improvised weapon.
            </p>
            <p>
              The items you carrying, including your equipment, are your gear. You have a carrying capacity equal to your passive brawn. Every piece of gear is either Heavy, Medium, or Light. Heavy counts as 2. Medium counts as 1, and Light counts as 0.1. A coin counts as 0.001, so 100 coins is 1 Light Item and 1000 coins is one Medium Item. If you are over your carrying capacity, you are slowed (see conditions).
            </p>
          </div>
        </EmpCard>
        <EmpCard title="Combat" noSpacing>
          <div className={card}>
            <p>
              When combat begins, the DM organizes all of the creatures present into sides. The side of the creature that initiated combat goes first. On a side’s turn, each creature on that side can take up to three actions. The creatures on that side can take these actions in any order, and can even separate their actions around the actions of other creatures on that side.  The lists below include actions that every creature can take, but often features add more actions to each of these lists for that character.
            </p>
            <p>
              There are three types of actions. You can only take one cardinal action per turn. You can take each skill action once per turn. However, you can take multiple skill actions that require the same skill, as long as they are different actions. You can take each basic action any number of times per turn. There are two other options a creature has during combat. Maneuvers are different wrestling techniques that a creature can apply after successfully performing the Wrestle action. Reactions can be performed on any turn, when the appropriate trigger is met. When you perform a reaction, you cannot perform another reaction until the start of your side’s next turn.
            </p>
            <p>
              You can only take the attack action once per turn, and you cannot take any other cardinal actions on a turn where you take the attack action. When you make an attack, choose a target that you can see. If the weapon does not have a range, the target must be within 5ft of you. If it does have a range, the target can be within twice the range listed. If the target is greater than the range listed but less than twice the range listed, the attack roll is made at disadvantage. Then, roll the skill listed under attack skill. If the damage type is physical or does multiple types of damage, the target rolls evasion (normally the agility modifier), otherwise, the target rolls willpower. If you succeed, the attack hits. Roll the damage die listed for that weapon, add the modifier for the attack skill, and the target takes that much damage.
            </p>
            <p>
              Before rolling an attack, you can declare a nonlethal strike. All damage you inflict is halved, and if the target would die, they are knocked unconscious instead, until they recover any hit points. If you attack a creature that cannot sense you, you gain advantage on the attack roll. If a creature that cannot sense you attacks you, you have advantage on the defense roll. You can also attack a location if you believe there to be a target there. The attack has disadvantage, and if there is nothing there to hit, it is an automatic miss.
            </p>
            <RulesActions/>
            <EmpCard title="Critical Hits" className={nestedCard} noSpacing>
              <div className={card}><RulesCriticals/></div>
            </EmpCard>
          </div>
        </EmpCard>
        <EmpCard title="Armor, Shields, and Weapons" noSpacing>
          <div className={card}>
            <p>
              Whenever you take physical damage from any source, before applying the damage to your hit points, reduce the damage by the amount of damage reduction that your armor has, to a minimum of 1 damage. If your armor has a stealth penalty, whenever you make a stealth roll, reduce the result by the stealth penalty. If you are wearing armor that you are not proficient in, your movement speed is halved, and you have disadvantage on all quick and attack rolls.
            </p>
            <p>
              If you are wielding a shield with which you are proficient, you can take the Block reaction when you roll evasion, using the shield's bonus as your evasion modifier, instead of your agility.
            </p>
            <p>
              When you take the attack action, you can make an attack using a weapon with which you are proficient. If you attack with a weapon with which you are not proficient, it counts as an improvised weapon. If a weapon falls into multiple categories, you must be proficient in the category to use that attack option. For example, if you have Light Weapon Training but not Light Thrown Weapon Training, and you try to throw a dagger, it counts as an improvised weapon.
            </p>
          </div>
        </EmpCard>
        <EmpCard title="Conditions" noSpacing>
          <div className={card}>
            <p>
              Various actions and features can cause conditions. Each condition grants a new action that allows you or someone else to attempt to end your condition. Conditions can also end early if the action or feature that caused it gives a way to. The DC of a condition is the DC or result of the roll that caused the condition. If there is no such DC, the DM chooses one.
            </p>
          </div>
          <RulesConditions/>
        </EmpCard>
        <EmpCard title="Magic" noSpacing>
          <div className={card}>
            <p>
              Any feature that requires an arcane, divine, or unity focus is called a spell. Most spells use wisdom, synergy, or knowledge, and are more effective the higher the skill modifier is. To cast a spell, you must have a focus of a certain kind, which draws magical energy from one of the three sources: arcane, divine, or unity. Each focus has a built-in magical attack, using a skill based on the source. To attack with a focus, it must be in your main hand. To cast a spell with a focus, it must be in either your main hand or off-hand.
            </p>
            <p>
              Arcane spells require an arcane focus, such as a staff or wand. Arcane magic comes from the physical world that tie the world together, and arcane spells are cast by understanding and manipulating these forces. Divine spells require a divine focus, such as a holy symbol or totem. Divine magic comes from the powerful beings that shaped and organized the primal forces of creation, and divine spells are cast by working with or harnessing the powers of these beings. Unity spells requires a unity focus, such as an instrument or a trinket. Unity magic comes from the bonds between sentient beings, and unity spells are cast by manipulating these bonds to one’s own ends.
            </p>
            <p>
              Some features, especially spells, require reagents, which are special items that you must have in your inventory to use the feature. Sometimes, the feature will consume the reagent, which means you must have a copy of the reagent for each time you wish to cast the feature. The reagent must be on your person, and you cannot use the feature without the reagent.
            </p>
            <p>
              Be sure to check with your DM if magic exists in their setting. Even if it is not tragitional magic, there could be psychic powers or technology that acts like magic and uses these same skills.
            </p>
          </div>
        </EmpCard>
        <EmpCard title="Technology" noSpacing>
          <div className={card}>
            <p>
              Certain weapons, especially those created and designed by a specific person, are often too complex for someone to use well without advanced understanding of how it works. These sorts of weapons are called crafted weapons, and attack using handiwork. This represents your skill in operating them.
            </p>
            <p>
              When attacking with a crafted weapon or other technological weapon such as a gun, a natural 1 results in a malfunction. You must use an action to make a DC 10 handiworks check. If you succeed, the weapon is usable once more. If you fail, the weapon cannot be used until you spend gold and downtime repairing it.
            </p>
          </div>
        </EmpCard>
      </>
    );
  }
}

export default RulesPage;
