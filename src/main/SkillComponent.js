import React, {useEffect, useState} from "react";
import abilities from '/abilities.json';
import classNames from "classnames";

export const SkillInterface = (props) => {
    return <Skills handleTotalLevel = {props.handleTotalLevel} 
        handleEnterInterfaceButton={props.handleEnterInterfaceButton}
        handleLeaveInterfaceButton={props.handleLeaveInterfaceButton}/>
}

const Skills = (props) => {
    // create an individual component for each skill to keep track of their own levels
    return abilities.tree.skills.map(skill => {
        return <SkillComponent skill = {skill}
         handleTotalLevel = {props.handleTotalLevel} 
         key={skill.id}
         handleEnterInterfaceButton={props.handleEnterInterfaceButton}
         handleLeaveInterfaceButton={props.handleLeaveInterfaceButton} />
    });
}

const SkillComponent = (props) => {
    const [level, setLevel] = useState(0)

    function handleLevelUp(){
        if(level < props.skill.maxLearnableLevel || level < props.skill.maxLearnableTier){
            setLevel(level+1)
            props.handleTotalLevel(1)
        }
    }

    function handleLevelDown(){
        if(level > 0){
            setLevel(level-1)
            props.handleTotalLevel(-1)
        }
    }

    return <div>
            <LevelUpButton handleMouseDown = {handleLevelUp} 
            handleEnterInterfaceButton={((e) => props.handleEnterInterfaceButton(e))}/>
            <LevelDownButton handleMouseDown = {handleLevelDown} 
            handleEnterInterfaceButton={((e) => props.handleEnterInterfaceButton(e))}/>
            <div className="item">
                <Specializations specializations = {props.skill.specializations}
                    handleEnterInterfaceButton={((e) => props.handleEnterInterfaceButton(e))}
                    handleLeaveInterfaceButton={props.handleLeaveInterfaceButton} />
                <LevelIndicatorsContainer skill={props.skill} 
                    totalLevels={level}
                    handleEnterInterfaceButton={props.handleEnterInterfaceButton}
                    handleLeaveInterfaceButton={props.handleLeaveInterfaceButton} />
            </div>
        </div>
}

const Specializations = (props) => {
    const [specializationSelected, setSpecializationSelected] = useState('');

    function handleMultipleSpecializations(e){
        setSpecializationSelected(e);
    }

    return props.specializations.map(specialization => {
        return <Specialization key = {specialization.id}
                    selected = {specializationSelected == specialization.id ? true : false}
                    specialization = {specialization}
                    handleMouseEnter = {props.handleEnterInterfaceButton}
                    handleMouseLeave = {props.handleLeaveInterfaceButton}
                    handleMouseDown = {handleMultipleSpecializations}/>
    })
}

const Specialization = (props) => {
    return <button className ={classNames("specializationButton", {"activeSpecializationButton" : props.selected})}
            key={props.specialization.id}
            onMouseEnter={((e) => props.handleMouseEnter(e))}
            onMouseLeave={props.handleMouseLeave}
            onMouseDown={((e) => props.handleMouseDown(props.specialization.id))}>
                {props.specialization.name}
        </button>
}

const LevelDownButton = (props) => {
    //create button and hold logic for number of levels in the skill here
    return <button onMouseDown={props.handleMouseDown}
        onMouseEnter={((e) => props.handleEnterInterfaceButton(e))}
        onMouseLeave={(() => props.handleLeaveInterfaceButton)}>
        LevelDown
    </button>
}

const LevelUpButton = (props) => {
    //create button and hold logic for number of levels in the skill here
    return <button onMouseDown={props.handleMouseDown}
            onMouseEnter={((e) => props.handleEnterInterfaceButton(e))}
            onMouseLeave={props.handleLeaveInterfaceButton}>
        LevelUp
    </button>
}

const LevelIndicatorsContainer = (props) => {
    const maxLevel = props.skill.maxLearnableTier > 0 ? props.skill.maxLearnableTier : props.skill.maxLearnableLevel;
    const currentLevel = props.totalLevels;
    //console.log(props)
    return <div key={props.skill.id} >
            { //Render the skill pips based on number of pips needed
                props.skill.maxLearnableTier > 3 || props.skill.maxLearnableLevel > 3 ? 
                props.skill.maxLearnableTier > 9 || props.skill.maxLearnableLevel > 9 ?
                    <div className="SkillPipsContainerLarge">
                        <LevelIndicators maxLevels={maxLevel} currentLevels={currentLevel} />
                    </div> :
                <div className="SkillPipsContainerMedium">
                    <LevelIndicators maxLevels={maxLevel} currentLevels={currentLevel} />
                </div> :
                <div className="SkillPipsContainerSmall">
                    <LevelIndicators maxLevels={maxLevel} currentLevels={currentLevel} />
                </div>
            }
        </div>;
}

const LevelIndicators = (props) => {
    let items = [];
    for(var i = 0; i < props.maxLevels; i++){
        if(i - props.currentLevels < 0){
            items.push(<div key={i} className="SkillPipsActive"/>)
        }
        else{
            items.push(<div key={i} className="SkillPipsInactive"/>)
        }
    }
    return items;
}