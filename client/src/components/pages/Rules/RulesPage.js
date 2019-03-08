import React, { Component } from 'react';
import { rules, card, table, columnHeader, nestingCard } from "./rules.module.scss"
import EmpCard from '../../EmpCard/EmpCard'
import skills from '../../../gameData/skills.json'
import { startCase, invert } from 'lodash'
class RulesPage extends Component {
  topScores = ['strong', 'aware', 'smart']
  leftScores = ['quick', 'determined', 'social']
  render() {
    return (
      <div className={rules}>
        <EmpCard title="Skill Grid" isStartingOpen>
          <table className={table}>
            <tbody>
              <tr>
                <td></td>
                {this.topScores.map(topScore =>
                  <td key={topScore} className={columnHeader}>{startCase(topScore)}</td>
                )}
              </tr>
              {this.leftScores.map(leftScore =>
                <tr key={leftScore}>
                  <td className={columnHeader}>{startCase(leftScore)}</td>
                  {this.topScores.map(topScore =>
                    <td key={topScore}>{startCase(invert(skills)[[topScore, leftScore]])}</td>
                  )}
                  <td>{startCase(invert(skills)[[leftScore, leftScore]])}</td>
                </tr>
              )}
              <tr>
                <td></td>
                {this.topScores.map(topScore =>
                  <td key={topScore}>
                    <div>{startCase(invert(skills)[[topScore, topScore]])}</div>
                  </td>
                )}
              </tr>
            </tbody>
          </table>
        </EmpCard>
        <EmpCard title="Using Skills" className={nestingCard}>
          <div className={card}>
            <p>
              You have six ability scores and fifteen skills. Most skills are tied to two
              different ability scores. Each of these skills has a modifier equal to the sum
              of each of these ability scores. For example, the skill Athletics is tied to
              the abilities Strong and Quick. So if your Strong score is +3 and your Quick
              score is -1, your Athletics modifier is +2. Some other skills are tied to
              only one ability. Their modifiers are equal to twice the ability score. For
              example, a Strong score of +3 gives you a Brawn modifier of +6.
            </p>
            <p>
              When the DM asks you to roll a skill, roll a d20 and add the appropriate
              skill modifier. The DM will then tell you the results of your roll. The DM
              will never ask you to roll for an ability, only skills. If you roll a 1 on
              the d20, you automatically fail, and if you roll a 20, you might
              automatically succeed, or gain some other benefit. If you make a roll with 
              advantage, roll 2 d20’s and use the higher number. If you make a roll with
              disadvantage, roll 2 d20’s and use the lower number. If there is a tie, then
              the player succeeds. If two players are rolling against each other and tie,
              they redo the roll. When something refers to a passive skill, it means the
              skill modifier plus ten. For example, if you have +3 Fortitude, your passive
              fortitude is 13. 
            </p>
          </div>
          <EmpCard title="Athletics">
            <div className={card}>
              Athletics describes your ability to precisely control your body when
              performing feats of strength. This includes wrestling, climbing, swimming,
              jumping across a gap, balancing on a tightrope, grabbing a handhold while
              falling, or running across ice. Athletics should only be used if precision
              or speed as well as brute strength. When only one of these qualities is
              present, the roll should be agility or brawn instead. Some melee weapons
              and all thrown weapons use athletics rolls when attacking and deal more
              damage with higher athletics. The Wrestle action in combat relies on
              athletics.
            </div>
          </EmpCard>
          <EmpCard title="Fortitude">
            <div className={card}>
              Fortitude describes your physical constitution and bodily defenses. Mostly
              it is used to calculate your hit points, but fortitude rolls can be made to
              resist poisons and endure harsh conditions. 
            </div>
          </EmpCard>
          <EmpCard title="Intimidation">
            <div className={card}>
              Intimidation allows you to use your physical presence to impress, threaten,
              and bully others to get your way. It can be rolled in social situations, as
              well as when you perform the Frighten action in combat. Besides scaring
              enemies off and forcing people to talk, you can also use intimidation to
              show off your might and earn favors that way, such as negotiating for higher
              pay as a mercenary or bodyguard.
            </div>
          </EmpCard>
          <EmpCard title="Brawn">
            <div className={card}>
              Brawn represents your pure physical strength. Brawn is primarily used for
              melee weapon attacks, and high brawn is required for wearing heavy armor and
              using heavy shields and ranged weapons. Additionally, you can carry more
              equipment with higher brawn. Finally, brawn rolls can be used when moving
              something heavy, breaking an object with your bare hands, or hanging on to
              something in a tough situation.
            </div>
          </EmpCard>
          <EmpCard title="Stealth">
            <div className={card}>
              Stealth allows you to perform actions without being noticed. Pickpocketing,
              theft, covering tracks, sneaking around, and trailing someone all require
              stealth rolls, usually contested by perception rolls. Some types of armor
              give a penalty to stealth.
            </div>
          </EmpCard>
          <EmpCard title="Investigation">
            <div className={card}>
              You roll Investigation when searching for clues, tracking creatures,
              identifying footprints, looking for something in a city, determining if
              something is an illusion, sensing direction, and navigating the wilderness.
              When deciding whether to use investigation or perception, ask who would be
              better: Sherlock Holmes or an eagle. Investigation is most relevant when
              having stronger senses would not help you accomplish the task, because you
              can already sense all the important aspects or it is more important to
              decide where to look rather than be able to see better.
            </div>
          </EmpCard>
          <EmpCard title="Insight">
            <div className={card}>
              Insight measures your ability to read the intent and disposition of others.
              This skill is a combination of detecting facial expressions and subtle
              movements, as well as figuring out how those tells can describe a person’s
              mental state. Primarily, this skill is used for figuring out if someone is
              lying, but also can be used to predict people’s actions and reading their
              general mood.
            </div>
          </EmpCard>
          <EmpCard title="Perception">
            <div className={card}>
              Perception is used only when the capability of your eyes, ears, and other
              senses determine whether you succeed or fail on the task at hand. This
              includes seeing in darkness, hearing a creature trying to sneak up on you,
              and noticing a noxious gas. Most of the time, the DM will use your Passive
              Perception rather than ask you to roll perception. Also, perception rolls
              are used when attacking with all ranged weapons other than thrown weapons.
            </div>
          </EmpCard>
          <EmpCard title="Handiwork">
            <div className={card}>
              Handiwork describes your ability to use tools and your hands to perform
              complex tasks. Picking a lock, forging a document, disabling a trap,
              crafting an object, repairing something, and controlling a vehicle all rely
              on handiwork. Some weapons that you craft can also use handiwork to attack
              with, if they are complex and unique enough to rely on your skill as a
              craftsman. 
            </div>
          </EmpCard>
          <EmpCard title="Wisdom">
            <div className={card}>
              The DM can call for a wisdom roll when you petition a higher power, make an
              educated guess, attempt to decipher a puzzle or coded message, or understand
              an otherworldly or philosophical experience. Wisdom also governs the use of
              divine and nature focused spells, and divine focuses use wisdom to attack
              with. Wisdom-based spells often involve healing, necromancy, divination, and
              blocking or disabling magic. Some wisdom-based spells are Recovery, Raise
              Zombie, Resurrection, Smite, Augury, Bless, Counterspell, Magic Armor, and
              Anti Magic Shell.
            </div>
          </EmpCard>
          <EmpCard title="Synergy">
            <div className={card}>
              Synergy is the capability to work well with others. The Help action is the
              primary use of synergy, as it allows you to add your synergy modifier
              whenever you assist another creature with a task. Organizing groups of
              people is a synergy roll, as well as performing leadership-based tasks.
              Also, if your synergy score is 3 or higher, you learn an additional language
              for each point above 2. Synergy is the attack skill of unity focuses, and
              synergy-based spells often enhance spells, weapons, and the abilities of
              allies, manipulate the minds of others, summon creatures from other places,
              and allow for teleportation. Some synergy-based spells are Extend Spell,
              Inspire, Haste, Suggestion, Friend to Foe, Feeblemind, Summon Demon, Banish,
              and Blink.
            </div>
          </EmpCard>
          <EmpCard title="Knowledge">
            <div className={card}>
              Knowledge describes the various facts about the world that you know. At any
              time you can ask the DM if your character would know something about the
              world or the people, places or organizations in it, and if the DM thinks
              that it is reasonable that your character would, they will ask for a
              knowledge roll. The higher the roll, the more information your character
              would know about the topic. Arcane focuses use knowledge as their attack
              skill, and there are many knowledge-based spells. These spells govern
              control of the elements and other physical forces, manipulation of physical
              forms and bodies, and the creation of illusions. Some knowledge-based spells
              are Magic Missile, Fireball, Disintegrate, Polymorph, Enlarge, Fabricate,
              Minor Illusion, Nightmare, Darkness. Finally, knowledge is used to learn
              details about features with the identify reaction.
            </div>
          </EmpCard>
          <EmpCard title="Agility">
            <div className={card}>
              You use agility to avoid harmful effects, such as attacks, traps, and some
              physical features, such as Fireball and Disintegrate. The dodge action gives
              you a bonus to agility against attacks each time you take it, and shields
              give you a similar bonus.
            </div>
          </EmpCard>
          <EmpCard title="Willpower">
            <div className={card}>
              Willpower lets you resist the effects of many spells that are more mental in
              nature, such as Charm, Fear, and Banish. Also, you must make a willpower
              roll to resist death once you take five wounds, and the DM may ask for a
              willpower roll in order to handle particularly disturbing situations.
              Finally willpower is used to resist the effects of actions such as distract
              and frighten.
            </div>
          </EmpCard>
          <EmpCard title="Persuasion">
            <div className={card}>
              Persuasion is the primary skill used in social situations, as it lets you
              convince others of your opinion, lie without being caught, haggle prices, or
              get more information. Persuasion should not be used if the person you are
              trying to work with is already on your side or in agreement with you. You
              can also use persuasion to distract others in combat.
            </div>
          </EmpCard>
        </EmpCard>
        <EmpCard title="Health">
          <div className={card}>
            <p>
              You have a number of hit points equal to your passive fortitude. When you take damage that reduces your hit points to 0, you take a wound, and then your hit points return to their max. Then, any remaining damage carries over to this new health pool. When you take the fifth wound, make a DC 10 willpower check. If you fail, you die. If you succeed, you fall unconscious for 5 hours and gain a permanent, negative feature of the DM’s choice. 
            </p>
            <p>
              While unconscious this way, keep track of your negative hit points. If your hit points ever go beneath zero minus your maximum hit points, you die. If you take any additional damage, roll willpower versus DC 10. If you fail, you die. If you receive enough healing to return your hit points to 1 or more, you wake up. After five hours unconscious this way, you return to 1 hit point and wake up.
            </p>
            <p>
              If you regain hit points from any source, and you are healed above your hit point maximum, and you have at least one wound, the remaining healing becomes temporary hit points. You cannot have more THP than your passive fortitude. THP goes away when you take a short rest, and if you gain THP while you have THP, you must choose to replace the current THP with the new THP, or not gain the new THP. Healing cannot restore wounds unless it specifically says so. 
            </p>
          </div>
        </EmpCard>
        <EmpCard title="Power Dice">
          <div className={card}>
            <p>
              You have a number of power dice of various sizes. For example, you might have 2d4 and 1d6 power dice. These dice are used for various features. Any part of a feature that uses power dice is called a power. When you use a power dice in any way, roll it, and then it is gone. When you sleep, all your power dice come back. 
            </p>
            <p>
              Powers can ask you to expend a power dice, make an empowered action, or empower a roll. When you make an empowered action, you must expend a power die to perform that action, and you can only perform that action once per turn. When you expend a power die, roll it, and if the result is 4 or higher, you also gain the Boosted ability listed in the power. When you make a roll that you are able to empower, after rolling the d20 but before hearing the results, you can expend a power die and add the result to your total. 
            </p>
          </div>
        </EmpCard>
        <EmpCard title="Recovery">
          <div className={card}>
            There are two types of recovery: rest and downtime. Rest takes about 8 hours to complete, and you can only rest once every 24 hours. After completing a rest, you regain all of your spent power dice and lost hit points. Downtime takes at least five days but can last as long as you want. For every five days that you spend in downtime, you recover all of your wounds and can perform one downtime activity. Also, when you take downtime, you can spend advancements. Finally, you can reject any features from the advancement shop. Those features are removed from your shop, and the DM creates new ones to fill the empty spaces.
          </div>
        </EmpCard>
        <EmpCard title="Advancements">
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
        <EmpCard title="Equipment">
          <div className={card}>
            <p>
              Equipment refers to special items that require training to use. These include weapons, armor, shields, focuses, tools, and vehicles. To properly use equipment, you must take the feature that gives you proficiency with it. The only exceptions are basic armor and improvised weapons, which anyone can use. When you use a weapon that you are not proficient with, it counts as an improvised weapon.  When you take this feature, you also get one type of the chosen equipment of your choice. For example, if you take the feature One-Handed Weapon Training, you immediately acquire a one-handed weapon of your choice, such as a longsword or a mace.
            </p>
            <p>
              You have a carrying capacity equal to your passive brawn. Every item is either Heavy, Medium, or Light. Heavy counts as 1. Medium counts as 0.5, and Light counts as 0.05. A coin counts as 0.0005, so 100 coins is 1 Light Item and 2000 coins is one Heavy Item. If you are over your carrying capacity, you have disadvantage on all quick rolls and your speed is reduced by half.
            </p>
          </div>
        </EmpCard>
        <EmpCard title="Armor, Shields, and Weapons">
          <div className={card}>
            <p>
              Whenever you take physical damage from any source, before applying the damage to your hit points, reduce the damage by the amount of damage reduction that your armor has, to a minimum of 1 damage. If your armor has a stealth penalty, whenever you make a stealth roll, reduce the result by the stealth penalty. If you are wearing armor that you are not proficient in, your movement speed is halved, and you have disadvantage on all quick and attack rolls. 
            </p>
            <p>
              If you are wielding a shield with which you are proficient, you can take the Raise a Shield action. This allows you to apply the listed bonus when you roll agility against an attack or spell until your side’s next turn.
            </p>
            <p>
            When you take the attack action, you can make an attack using a weapon with which you are proficient. If you attack with a weapon with which you are not proficient, it counts as an improvised weapon. If a weapon falls into multiple categories, you must be proficient in the category to use that attack option. For example, if you have Light Weapon Training but not Light Thrown Weapon Training, and you try to throw a dagger, it counts as an improvised weapon.
            </p>
          </div>
        </EmpCard>
        <EmpCard title="Combat">
          <div className={card}>
            <p>
              When combat begins, the DM organizes all of the creatures present into sides. The side of the creature that initiated combat goes first. At any time the DM can decide that combat ends and can have a creature change sides. On a side’s turn, each creature on that side can take up to three actions. The creatures on that side can take these actions in any order, and can even separate their actions around the actions of other creatures on that side.  The lists below include actions that every creature can take, but often features add more actions to each of these lists for that character. 
            </p>
            <p>
              There are three types of actions. You can only take one cardinal action per turn. You can take each skill action once per turn. However, you can take multiple skill actions that require the same skill, as long as they are different actions. You can take each basic action any number of times per turn. If an action specifies that you must spend Also, each creature can perform a reaction on any turn. When you perform a reaction, you cannot perform another reaction until the start of your side’s next turn.
            </p>
            <p>
             You can only take the attack action once per turn, and you cannot take any other cardinal actions on a turn where you take the attack action. When you make an attack, choose a target that you can see. If the weapon does not have a range, the target must be within 5ft of you. If it does have a range, the target can be within twice the range listed. If the target is greater than the range listed but less than twice the range listed, the attack roll is made at disadvantage. Then, roll the skill listed under attack skill. If the damage type is physical or does multiple types of damage, the target rolls agility, otherwise, the target rolls willpower. If you succeed, the attack hits. Roll the damage die listed for that weapon, add the modifier for the attack skill, and the target takes that much damage.
            </p>
            <p>
              If you roll a natural 20 on an attack roll, any damage you deal as a result of that attack is doubled, and you roll on the critical success table below. If you roll a natural 1 on the attack roll, the attack automatically misses, and you roll a d24 on the critical fail table below. If you attack a creature within 5 feet of you, and an enemy of your target is flanking it (on the opposite side of them from you), you gain advantage on the attack. If you attack a creature that cannot sense you, you gain advantage on the attack roll. You can also attack a location if you believe there to be a target there. The attack has disadvantage, and if there is nothing there to hit, it is an automatic miss. 
            </p>
          </div>
        </EmpCard>
        <EmpCard title="Conditions">
          <div className={card}>
            <p>
              Various actions and features can cause conditions. Each condition grants a new action that allows you to attempt to end the condition. Conditions can also end early if the action or feature that caused it gives a way to.
            </p>
          </div>
        </EmpCard>
        <EmpCard title="Magic">
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
          </div>
        </EmpCard>
      </div>
    );
  }
}

export default RulesPage;
