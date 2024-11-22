import { useState } from "react";

import Attributes from "./Attributes";
import Classes from "./Classes";
import MinReq from "./MinReq";
import Skill from "./Skill";

import { SKILL_LIST } from "../consts";

export default function Character({
  attList,
  index,
  changeAtt,
  changeSkill,
  attribute,
  skills,
  setSkillCheck,
}) {
  const [selectedSkill, setSelectedSkill] = useState<String>(SKILL_LIST[0].name);
  const [dc, setDC] = useState<number>(0);

  const [selClassName, setSelClassName] = useState<String>("");

  const onRollSkill = () => {
    const skillNameKey = selectedSkill.replace(/\s+/g, "");

    let randomNumber = Math.floor(Math.random() * 21);
    let skillNumber = Object.entries(skills[index]).find(
      ([key, val]) => key === skillNameKey
    )[1];
    let skillModifierName = SKILL_LIST.filter(
      (skill) => skill.name.replace(/\s+/g, "") === skillNameKey
    )[0].attributeModifier;
    let skillModifier = Math.floor(
      (attribute[index][skillModifierName] - 10) / 2
    );
    const total = Number(skillNumber) + skillModifier;
    console.log(skillModifier, typeof skillNumber);

    let result = randomNumber + dc > total ? "success" : "failure";
    setSkillCheck({
      index: index + 1,
      skill: selectedSkill,
      skillNumber: total,
      rollNumber: randomNumber,
      DC: dc,
      result: result,
    });
  };

  const updateAtt = (attIndex: number, attName: string, val: number) => {
    let tempAtr = [...attribute];
    tempAtr[attIndex][attName] += val;
    let totalValue: any = Object.values(tempAtr[attIndex]).reduce(
      (sum: number, value: number) => sum + value,
      0
    );

    if (totalValue > 70) {
      window.alert("A Chracter can have up to 70 Delegated attribute Points");

      return false;
    } else {
      changeAtt(tempAtr);
    }
    console.log(totalValue);
  };

  const selectClass = (val: String) => {
    setSelClassName(val);
  };

  const updateSkill = (
    skillIndex: number,
    skillNameKey: string,
    avalSkillValue: number,
    val: number
  ) => {
    let tempSkill = [...skills];
    tempSkill[skillIndex][skillNameKey] += val;

    const totalValue: any = Object.values(tempSkill[skillIndex]).reduce(
      (sum: number, value: number) => sum + value,
      0
    );
    console.log(totalValue, avalSkillValue);

    if (avalSkillValue < totalValue) {
      window.alert(
        "You need more skill points! Upgrade intelligence to get more."
      );
      return false;
    } else {
      changeSkill(tempSkill);
    }
  };

  return (
    <div className="App-character">
      <span className="title-font">Charactor: {index + 1}</span>
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

      <section className="skill-board">
        <Attributes updateAtt={updateAtt} attList={attList} index={index} />
        <Classes attribute={attribute[index]} selClass={selectClass} />
        <MinReq selClassName={selClassName} selClass={selectClass} />
        <Skill
          attribute={attribute[index]}
          skills={skills[index]}
          updateSkill={updateSkill}
          index={index}
        />
      </section>
    </div>
  );
}
