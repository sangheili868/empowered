import React, { Component } from 'react';
import EmpCard from '../../EmpCard/EmpCard'
import { card, concepts, concept, links, link } from './IndexPage.module.scss'
import characterConcepts from '../../../gameData/characterConcepts.json'
import EmpButton from '../../EmpButton/EmpButton'

class IndexPage extends Component {
  render() {
    return (
      <div>
        <p>
          Click "How to Play" to learn the rules, or follow the steps below to make your
          first character!
        </p>
        <EmpCard title="Creating a Character" noSpacing>
          <div className={card}>
            Follow these steps to create a character:
            <ol>
              <li>Talk to your DM about the setting and any other assumptions and general ideas they have for the game.</li>
              <li>Come up with a concept based on one or more of the suggestions in the table below.</li>
              <li>Go to the Character page and click "New".</li>
              <li>Give your character a name. This saves the character to the character list.</li>
              <li>Fill out all the bio details. You can click on the name of a field for more information.</li>
              <li>Go to the Shop page and spend 20 advancements on ability scores.</li>
              <li>Tell your DM your character's name. They will load the character and add features and equipment to your character based on your bio.</li>
              <li>Once your character has been updated, load it and go to the shop tab. Spend the rest of your advancements on anything in the shop.</li>
              <li>Let your DM know your character is complete.</li>
            </ol>
            <EmpCard title="Character Concepts" contentClassName={[card, concepts].join(' ')}>
              {characterConcepts.map((characterConcept, index) =>
                <div key={index} className={concept}>{characterConcept}</div>
              )}
            </EmpCard>
          </div>
        </EmpCard>
        <EmpCard title="Setting" noSpacing>
          <div className={card}>
            <p>
              The Empowered RPG System is designed to be setting independent. It can be used
              for gritty low fantasy, hard science fiction, or anything in between. However,
              the default setting for Empowered is Eochora. More about Eochora can be found
              in the links below:
            </p>
            <div className={links}>
              <a
                href="https://www.worldanvil.com/w/eochora-tyrzaphir"
                target="_blank"
                rel="noopener noreferrer"
              >
                <EmpButton mode="secondary" className={link}>People, Places, and Gods of Eochora</EmpButton>
              </a>
              <a
                href="http://imgur.com/a/j1D6NZF"
                target="_blank"
                rel="noopener noreferrer"
              >
                <EmpButton mode="secondary" className={link}>Map of Eochora</EmpButton>
              </a>
            </div>
          </div>
        </EmpCard>
      </div>
    );
  }
}

export default IndexPage;
