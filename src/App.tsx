import { useState } from 'react';
import './App.css';
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from './consts';


function App() {
  
  const [selectedSkill, setSelectedSkill] = useState<String>(SKILL_LIST[0].name);
  const [dc, setDC] = useState<number>(0);

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>
      <section className="App-section">
        <div className="App-featureBtn">
          <button>Add New Character</button>
          <button>Reset All Characters</button>
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
      </section>
    </div>
  );
}

export default App;
