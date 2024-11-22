import { SKILL_LIST } from "../consts";

export default function Skill({ Attribute, skills, changeSkill, Index }) {
  const avalSkillValue =
    10 + Math.floor((Attribute["Intelligence"] - 10) / 2) * 4;
  return (
    <div>
      <span className="title-font">Skills</span>
      <div className="content-font">
        Total skill points available : {avalSkillValue}
      </div>
      <ul>
        {SKILL_LIST.map((skill, index) => {
          const skillNameKey = skill.name.replace(/\s+/g, ""); // Key for accessing the skill value in the state
          const skillVal = skills[skillNameKey];
          const skillModifier = Math.floor(
            (Attribute[skill.attributeModifier] - 10) / 2
          );
          const total = skillVal + skillModifier;
          return (
            <li>
              <span>
                {skill.name} : {skillVal} (Modifier:{skill.attributeModifier}):
                {skillModifier}
              </span>
              <button
                onClick={() =>
                  changeSkill(Index, skillNameKey, avalSkillValue, 1)
                }
              >
                +
              </button>
              <button
                onClick={() =>
                  changeSkill(Index, skillNameKey, avalSkillValue, -1)
                }
              >
                -
              </button>
              <span>total: {total}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
