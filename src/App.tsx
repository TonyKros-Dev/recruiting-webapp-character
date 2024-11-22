import { useState, useCallback } from 'react';
import './App.css';

import Character from './components/Character';

import { postCharacters } from './utils';
import { SKILL_LIST } from './consts';


interface Attribute {
  Strength: number;
  Dexterity: number;
  Constitution: number;
  Intelligence: number;
  Wisdom: number;
  Charisma: number;
}

interface Skill {
  Acrobatics: Number;
  AnimalHandling: Number;
  Arcana: Number;
  Athletics: Number;
  Deception: Number;
  History: Number;
  Insight: Number;
  Intimidation: Number;
  Investigation: Number;
  Medicine: Number;
  Nature: Number;
  Perception: Number;
  Performance: Number;
  Persuasion: Number;
  Religion: Number;
  SleightofHand: Number;
  Stealth: Number;
  Survival: Number;
}

interface SkillCheck {
  index: String;
  skill: String;
  skillNumber: String;
  rollNumber: String;
  DC: String;
  result: String;
}

function App() {

  const [selectedSkill, setSelectedSkill] = useState<String>(SKILL_LIST[0].name);
  const [dc, setDC] = useState<number>(0);

  const [attributes, setAttributes] = useState<Attribute[]>([
    {
      Strength: 10,
      Dexterity: 10,
      Constitution: 10,
      Intelligence: 10,
      Wisdom: 10,
      Charisma: 10,
    }
  ]);

  const [skill, setSkill] = useState<Skill[]>([
    {
      Acrobatics: 0,
      AnimalHandling: 0,
      Arcana: 0,
      Athletics: 0,
      Deception: 0,
      History: 0,
      Insight: 0,
      Intimidation: 0,
      Investigation: 0,
      Medicine: 0,
      Nature: 0,
      Perception: 0,
      Performance: 0,
      Persuasion: 0,
      Religion: 0,
      SleightofHand: 0,
      Stealth: 0,
      Survival: 0,
    },
  ]);

  const [skillCheck, setSkillCheck] = useState<SkillCheck>({
    index: "",
    skill: "",
    skillNumber: "",
    rollNumber: "",
    DC: "",
    result: "",
  });

  const addNewCharacter = () => {
    setAttributes([
      ...attributes,
      {
        Strength: 10,
        Dexterity: 10,
        Constitution: 10,
        Intelligence: 10,
        Wisdom: 10,
        Charisma: 10,
      },
    ]);
    setSkill([
      ...skill,
      {
        Acrobatics: 0,
        AnimalHandling: 0,
        Arcana: 0,
        Athletics: 0,
        Deception: 0,
        History: 0,
        Insight: 0,
        Intimidation: 0,
        Investigation: 0,
        Medicine: 0,
        Nature: 0,
        Perception: 0,
        Performance: 0,
        Persuasion: 0,
        Religion: 0,
        SleightofHand: 0,
        Stealth: 0,
        Survival: 0,
      },
    ]);
  };

  const resetAllCharacters = () => {
    setAttributes([
      {
        Strength: 10,
        Dexterity: 10,
        Constitution: 10,
        Intelligence: 10,
        Wisdom: 10,
        Charisma: 10,
      },
    ]);
    setSkill([
      {
        Acrobatics: 0,
        AnimalHandling: 0,
        Arcana: 0,
        Athletics: 0,
        Deception: 0,
        History: 0,
        Insight: 0,
        Intimidation: 0,
        Investigation: 0,
        Medicine: 0,
        Nature: 0,
        Perception: 0,
        Performance: 0,
        Persuasion: 0,
        Religion: 0,
        SleightofHand: 0,
        Stealth: 0,
        Survival: 0,
      },
    ]);
    setSkillCheck({
      index: "",
      skill: "",
      skillNumber: "",
      rollNumber: "",
      DC: "",
      result: "",
    });
  };

  const onParyRollSkill = () => {
    const totalValue = skill.map((s) => {
      let total = Object.values(s).reduce(
        (sum: number, value: number) => sum + value,
        0
      );
      return total;
    });
    const maxCha = Math.max(...totalValue);
    const maxIndex = totalValue.indexOf(maxCha);

    let randomNumber = Math.floor(Math.random() * 21);
    const skillNameKey = selectedSkill.replace(/\s+/g, "");
    let skillNumber = Object.entries(skill[maxIndex]).find(
      ([key, val]) => key === skillNameKey
    )[1];
    let skillModifierName = SKILL_LIST.filter(
      (skill) => skill.name.replace(/\s+/g, "") === skillNameKey
    )[0].attributeModifier;
    let skillModifier = Math.floor((attributes[maxIndex][skillModifierName] - 10) / 2);
    const total = Number(skillNumber) + skillModifier;
    console.log(skillModifier, typeof skillNumber);

    let result = randomNumber + dc > total ? "success" : "failure";

    setSkillCheck({
      index: (maxIndex + 1).toString(), // Convert index to string
      skill: selectedSkill.toString(), // Ensure skill is a string
      skillNumber: total.toString(), // Convert skillNumber to string
      rollNumber: randomNumber.toString(), // Convert rollNumber to string
      DC: dc.toString(), // Convert DC to string
      result: result.toString(), // Convert result to string
    });
  };

  const saveCharacters = useCallback(async () => {
    try {
      const payload = attributes.map((att, index) => {
        return {
          attribute: att,
          skill: skill[index]
        }
      })
      await postCharacters(payload);
      window.alert("The characters has been saved successfully")
    } catch (err) {
      console.log(err);
      window.alert("Something went wrong while saving characters")
    }
  }, [attributes, skill]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>
      <section className="App-section">
        <div className="App-featureBtn">
          <button onClick={addNewCharacter}>Add New Character</button>
          <button onClick={resetAllCharacters}>Reset All Characters</button>
          <button onClick={saveCharacters}>Save All Characters</button>
        </div>

        <div className="App-result">
          <div className="title">Skill Check Results</div>
          <div className="characterName">
            <span>Character: {skillCheck["index"]} </span>
            <span></span>
          </div>
          <div>
            <span>
              Skill: {skillCheck["skill"]} : {skillCheck["skillNumber"]}
            </span>
          </div>
          <div>
            <span>You Rolled: {skillCheck["rollNumber"]} </span>
          </div>
          <div>
            <span>The DC was: {skillCheck["DC"]}</span>
          </div>
          <div>
            <span>Result: {skillCheck["result"]}</span>
          </div>
        </div>

        <div className="App-character">
          {/* <span className='title-font'>Charactor: {Index + 1}</span> */}
          <div className="skill-check">
            <span className="title-font">Party Skill Check</span>
            <div className="skill-input">
              <div className="content-font">
                <span>Skill:</span>
                <select
                  onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                    setSelectedSkill(event.target.value);
                  }}
                >
                  {SKILL_LIST.map((skill) => (
                    <option>{skill.name}</option>
                  ))}
                </select>
              </div>
              <div className="content-font">
                <span>DC:</span>
                <input
                  type="number"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    const value = event.target.value;
                    setDC(value ? Number(value) : 0);
                  }}
                  value={dc}
                />
              </div>
              <button onClick={() => onParyRollSkill()}>Roll</button>
            </div>
          </div>
        </div>

        {attributes.map((attList, index) => (
          <Character
            key={index} // Provide a unique key
            attList={attList}
            index={index}
            attribute={attributes}
            skills={skill}
            changeAtt={setAttributes}
            changeSkill={setSkill}
            setSkillCheck={setSkillCheck}
          />
        ))}
      </section>
    </div>
  );
}

export default App;
