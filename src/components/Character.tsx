import { SKILL_LIST } from "../consts";
import { useState } from "react";

export default function Character({
  AttList,
  Index,
  ChangeAtt,
  ChangeSkill,
  Attribute,
  Skills,
  SkillCheck,
}) {
  const [selectedSkill, setSelectedSkill] = useState<String>(SKILL_LIST[0].name);
  const [dc, setDC] = useState<number>(0);

  const onRollSkill = () => {
    const skillNameKey = selectedSkill.replace(/\s+/g, "");

    let randomNumber = Math.floor(Math.random() * 21);
    let skillNumber = Object.entries(Skills[Index]).find(
      ([key, val]) => key === skillNameKey
    )[1];
    let skillModifierName = SKILL_LIST.filter(
      (skill) => skill.name.replace(/\s+/g, "") === skillNameKey
    )[0].attributeModifier;
    let skillModifier = Math.floor(
      (Attribute[Index][skillModifierName] - 10) / 2
    );
    const total = Number(skillNumber) + skillModifier;
    console.log(skillModifier, typeof skillNumber);

    let result = randomNumber + dc > total ? "success" : "failure";
    SkillCheck({
      index: Index + 1,
      skill: selectedSkill,
      skillNumber: total,
      rollNumber: randomNumber,
      DC: dc,
      result: result,
    });
  };

  return (
    <div className="App-character">
      <span className="title-font">Charactor: {Index + 1}</span>
      <div className="skill-check">
        <span className="title-font">Skill Check</span>
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
          <button onClick={() => onRollSkill()}>Roll</button>
        </div>
      </div>
    </div>
  );
}
