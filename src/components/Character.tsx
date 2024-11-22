import { useState } from "react";

import Attributes from "./Attributes";
import Classes from "./Classes";
import MinReq from "./MinReq";
import Skill from "./Skill";

import { SKILL_LIST } from "../consts";

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

  const [selClassName, setSelClassName] = useState<String>("");

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

  const AttModifier = (attIndex: number, attName: string, val: number) => {
    let tempAtr = [...Attribute];
    tempAtr[attIndex][attName] += val;
    let totalValue: any = Object.values(tempAtr[attIndex]).reduce(
      (sum: number, value: number) => sum + value,
      0
    );

    if (totalValue > 70) {
      window.alert("A Chracter can have up to 70 Delegated Attribute Points");

      return false;
    } else {
      ChangeAtt(tempAtr);
    }
    console.log(totalValue);
  };

  const selectClass = (val: String) => {
    setSelClassName(val);
  };

  const SkillModify = (
    skillIndex: number,
    skillNameKey: string,
    avalSkillValue: number,
    val: number
  ) => {
    let tempSkill = [...Skills];
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
      ChangeSkill(tempSkill);
    }
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

      <section className="skill-board">
        <Attributes AttModifier={AttModifier} AttList={AttList} Index={Index} />
        <Classes Attribute={Attribute[Index]} selClass={selectClass} />
        <MinReq selClassName={selClassName} selClass={selectClass} />
        <Skill
          Attribute={Attribute[Index]}
          skills={Skills[Index]}
          changeSkill={SkillModify}
          Index={Index}
        />
      </section>
    </div>
  );
}
