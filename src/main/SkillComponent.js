import React, {useEffect, useState, useLayoutEffect} from "react";
import abilities from '/abilities.json';
import classNames from "classnames";
import { ReadBuildInfo, StoreLevelInfo } from "./StoreBuildInfo"

export const SkillInterface = (props) => {
    return <Skills handleTotalLevel = {props.handleTotalLevel} 
        handleEnterInterfaceButton={props.handleEnterInterfaceButton}
        handleLeaveInterfaceButton={props.handleLeaveInterfaceButton}
        handleDescription = {props.handleDescription}/>
}

const Skills = (props) => {
    // create an individual component for each skill to keep track of their own levels
    return abilities.tree.skills.map(skill => {
        return <SkillComponent skill = {skill}
         handleTotalLevel = {props.handleTotalLevel} 
         key={skill.id}
         handleEnterInterfaceButton={props.handleEnterInterfaceButton}
         handleLeaveInterfaceButton={props.handleLeaveInterfaceButton}
         handleDescription = {props.handleDescription} />
    });
}

const SkillComponent = (props) => {
    const [level, setLevel] = useState(0)

    // Should be an object of this kind
    //{
    //  name : "ability_name"
    //  specialization : "specialization.id",
    //  level : 1,
    //}
    const [skillInfo, setSkillInfo] = useState({
        name: "",
        specialization: "",
        level: 0,
    });

    useEffect(() => {
     setSkillInfo(ReadBuildInfo(props.skill.id));
     setLevel(ReadBuildInfo(props.skill.id).level);
    }, []);

    function handleLevelUp(){
        if(level < props.skill.maxLearnableLevel || level < props.skill.maxLearnableTier){
            setLevel(level+1);
            props.handleTotalLevel(1);
        }

        StoreLevelInfo(props.skill.id, 1);
        console.log(skillInfo);
        console.log(level);
    }

    function handleLevelDown(){
        if(level > 0){
            setLevel(level-1);
            props.handleTotalLevel(-1);
        }

        StoreLevelInfo(props.skill.id, -1);
    }

    return <div className="SkillContainer">
            <LevelUpButton handleMouseDown = {handleLevelUp} 
            handleEnterInterfaceButton={((e) => props.handleEnterInterfaceButton(e))}
            handleLeaveInterfaceButton={props.handleLeaveInterfaceButton}/>
            <LevelDownButton handleMouseDown = {handleLevelDown} 
            handleEnterInterfaceButton={((e) => props.handleEnterInterfaceButton(e))}
            handleLeaveInterfaceButton={props.handleLeaveInterfaceButton}/>
            <div className="item">
                <Specializations specializations = {props.skill.specializations}
                    selectedSpecialization = {skillInfo.specialization}
                    handleEnterInterfaceButton={((e) => props.handleEnterInterfaceButton(e))}
                    handleLeaveInterfaceButton={props.handleLeaveInterfaceButton} 
                    handleDescription = {props.handleDescription} 
                    specializationSelected = {} />
                <LevelIndicatorsContainer skill={props.skill} 
                    totalLevels={level}/>
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
                    handleMouseDown = {handleMultipleSpecializations}
                    handleDescription = {props.handleDescription} />
    })
}

const Specialization = (props) => {

    function handleMouseDown(e) {
        props.handleMouseDown(props.specialization.id)
        props.handleDescription(props.specialization.id)
    }
    
    return <button className ={classNames("specializationButton", {"activeSpecializationButton" : props.selected})}
            key={props.specialization.id}
            onMouseEnter={props.handleMouseEnter}
            onMouseLeave={props.handleMouseLeave}
            onMouseDown={() => handleMouseDown(props.specialization.id)}>
                {props.specialization.name}
        </button>
}

const LevelDownButton = (props) => {
    //create button and hold logic for number of levels in the skill here
    return <button onMouseDown={props.handleMouseDown}
        onMouseEnter={props.handleEnterInterfaceButton}
        onMouseLeave={props.handleLeaveInterfaceButton}>
        LevelDown
    </button>
}

const LevelUpButton = (props) => {
    //create button and hold logic for number of levels in the skill here
    return <button onMouseDown={props.handleMouseDown}
            onMouseEnter={props.handleEnterInterfaceButton}
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