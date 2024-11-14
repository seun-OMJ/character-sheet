import { useState } from 'react';
import './App.css';
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from './consts.js';
import { incrementAttribute, decrementAttribute } from './attributes';

function App() {
  const [selectedClass, setSelectedClass] = useState(null);
  const [attributes, setAttributes] = useState({
    Strength: 10,
    Dexterity: 10,
    Constitution: 10,
    Intelligence: 10,
    Wisdom: 10,
    Charisma: 0,
});
const [skills, setSkills] = useState(
  SKILL_LIST.reduce((acc, skill) => {
    acc[skill.name] = 0;
    return acc;
  }, {})
);

const getAvailableSkillPoints = () => {
  const abilityModifier = getAbilityModifier(attributes.Intelligence);
  return 10 + (4 * abilityModifier);
};

const getTotalSkillPoints = () => {
  return Object.values(skills).reduce((total, points) => total + points, 0);
};

const handleSkillPointsChange = (skillName, change) => {
  const newSkills = { ...skills };
  const totalSkillPoints = getTotalSkillPoints();
  const availablePoints = getAvailableSkillPoints();
  
  if (totalSkillPoints + change <= availablePoints) {
    newSkills[skillName] = Math.max(0, newSkills[skillName] + change);
    setSkills(newSkills);
  } else {
    alert('Total skill points cannot exceed available skill points');
  }
};

const getTotalAttributes = () => {
  return Object.values(attributes).reduce((total, value) => total + value, 0);
};

const handleClassClick = (className) => {
  setSelectedClass(className); 
};

const getAbilityModifier = (attributeValue) => {
  return Math.floor((attributeValue - 10) / 2);
};

const handleIncrement = (attribute) => {
  const newAttributes = incrementAttribute(attributes, attribute);
  if (getTotalAttributes() < 70) {
    setAttributes(newAttributes);
  } else {
    alert('Total attributes cannot exceed 70');
  }
};

const handleDecrement = (attribute) => {
  const newAttributes = decrementAttribute(attributes, attribute);
  if (getTotalAttributes() > 0) {
    setAttributes(newAttributes);
  } else {
    alert('Total attributes cannot be less than 0');
  }
};

const isClassAvailable = (className) => {
  const classAttributes = CLASS_LIST[className];
  return ATTRIBUTE_LIST.every((attribute) => attributes[attribute] >= classAttributes[attribute]);
};
const handleCloseClassAttributes = () => {
  setSelectedClass(null);
};

return (
<div>
  
  <div className='generalAttributes'>
  <h2>General Attributes</h2>
      {ATTRIBUTE_LIST.map((attribute) => (
        <div   key={attribute} style={{ marginBottom: '1em' }}>
          <h3>{attribute}</h3>
          <button onClick={() => handleDecrement(attribute)}>-</button>
          <span style={{ margin: '0 1em' }}>{attributes[attribute]}</span>
          <button onClick={() => handleIncrement(attribute)}>+</button>
          <span style={{ marginLeft: '1em' }}>
            {attribute} Modifier: {getAbilityModifier(attributes[attribute])}
          </span>
        </div>
      ))}
</div>
<div className='classList'>
      <h1>Select a Class</h1>
      <div >
        {Object.keys(CLASS_LIST).map((className) => (
          <button
            key={className}
            onClick={() => handleClassClick(className)}
            style={{
              margin: '5px',
              padding: '10px',
              backgroundColor: isClassAvailable(className) ? '#4CAF50' : '#f1f1f1', // Change color if class is available
              color: isClassAvailable(className) ? 'white' : 'black',
              border: '1px solid #ddd',
              cursor: 'pointer',
            }}
          >
            {className}
          </button>
        ))}</div>
      </div>

      <div className='minimumReq'>
      {selectedClass && (
        <div  style={{ marginTop: '20px' }} key={selectedClass}>
          <h2>{selectedClass} Attributes</h2>
          {ATTRIBUTE_LIST.map((attribute) => (
            <div key={attribute} style={{ marginBottom: '1em' }}>
              <h3>{attribute}</h3>
              {/* Display the value of the selected class's attribute (static, does not change) */}
              <span style={{ margin: '0 1em' }}>
                {CLASS_LIST[selectedClass][attribute]}
              </span>
            </div>
          ))}

            <button onClick={handleCloseClassAttributes} style={{ marginTop: '20px' }}>
            Close Class Attributes
          </button>
        </div>
        
      )}
      </div>

      <div className="skills">
  <h2>Skills</h2>
  <h4>available Skill Points: {getAvailableSkillPoints()}</h4>
  {SKILL_LIST.map((skill) => {
    // Get the attribute modifier based on the skill's corresponding attribute
    const attributeModifier = getAbilityModifier(attributes[skill.attributeModifier]);
    
    // Calculate the total value for the skill (points spent + attribute modifier)
    const skillValue = skills[skill.name] + attributeModifier;

    return (
      <div key={skill.name} style={{ marginBottom: '1em' }}>
        <h3>{skill.name}</h3>
        <div className='points' >
          
          <button onClick={() => handleSkillPointsChange(skill.name, -1)}>-</button> 
          Points: {skills[skill.name]}
          <button onClick={() => handleSkillPointsChange(skill.name, 1)}>+</button>
        </div>
        <div className='skillMod'>
          (Modifier{skill.attributeModifier}): ({attributeModifier  })  Total: {skillValue}
        </div>
      </div>
    );
  })}
</div>


    </div>

  
);
}

export default App;
