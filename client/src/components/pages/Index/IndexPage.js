import React, { Component } from 'react';
import EmpCard from '../../EmpCard/EmpCard'
import { card, concepts, concept, link } from './IndexPage.module.scss'
import characterConcepts from '../../../gameData/characterConcepts.json'
class IndexPage extends Component {
  render() {
    return (
      <div>
        <p>Welcome to the Empowered RPG System!</p>
        <p>
          Click "How to Play" to learn the rules, or follow the steps below to make your
          first character!
        </p>
        <EmpCard title="Creating a Character" contentClassName={card}>
          Follow these steps to create a character:
          <ol>
            <li>Come up with a concept based on one or more of the suggestions in the table below.</li>
            <li>Go to the Character page and click "New".</li>
            <li>Fill out all the bio details. You can click on the name of a field for more information.</li>
            <li>Go to the Shop page and spend 20 advancements on ability scores.</li>
            <li>Save your character and send it to your DM. They will add features and equipment to your character based on your bio and send the file back.</li>
            <li>Load the updated character, and go to the shop tab. Spend the rest of your advancements on anything in the shop.</li>
            <li>Send the completed character back to your DM so they have the final version.</li>
          </ol>
          <EmpCard title="Character Concepts" contentClassName={[card, concepts].join(' ')}>
            {characterConcepts.map((characterConcept, index) =>
              <div key={index} className={concept}>{characterConcept}</div>
            )}
          </EmpCard>
        </EmpCard>
        <EmpCard title="Setting" contentClassName={card}>
          The Empowered RPG System is designed to be setting independent. It can be used
          for gritty low fantasy, hard science fiction, or anything in between. However,
          the default setting for Empowered is Eochora. More about Eochora can be found
          in the links below:
          <a
            href="https:/docs.google.com/presentation/d/1H5h-JR5U3ElDHoe3jb9z_efW2N-Jk2JLePFMJBR0PZw/edit?usp=sharing"
            className={link}
            target="_blank"
            rel="noopener noreferrer"
          >
            People Places and Gods of Eochora
          </a>
          <a
            href="https://drive.google.com/open?id=1Lbd4tBYnR8F5GhFDH9I2vDE2TrAFPWgt"
            className={link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Map of Eochora
          </a>
        </EmpCard>
      </div>
    );
  }
}

export default IndexPage;
