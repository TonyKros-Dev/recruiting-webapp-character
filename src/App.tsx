import { useState } from 'react';
import './App.css';
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from './consts';


interface Character {
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

  const [characters, setCharacters] = useState<Character[]>([
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
    setCharacters([
      ...characters,
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
    setCharacters([
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


  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>
      <section className="App-section">
        <div className="App-featureBtn">
          <button onClick={addNewCharacter}>Add New Character</button>
          <button onClick={resetAllCharacters}>Reset All Characters</button>
          <button>Save All Characters</button>
        </div>

        <div className="App-result">
          <div className="title">Skill Check Results</div>
          <div className="characterName">
            <span>Character: 1</span>
            <span></span>
          </div>
          <div>
            <span>Skill: AnimalHandling</span>
          </div>
          <div>
            <span>You Rolled: 12 </span>
          </div>
          <div>
            <span>The DC was: 12</span>
          </div>
          <div>
            <span>Result: Successful</span>
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
              <button>Roll</button>
            </div>
          </div>
        </div>

        {characters.map((character, index) => (
          <div>{character.Charisma}, {character.Intelligence}</div>
        ))}
      </section>
    </div>
  );
}

export default App;
