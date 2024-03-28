import React, {useEffect, useState, useLayoutEffect} from "react";
import abilities from '/abilities.json';
import classNames from "classnames";
import { ReadBuildInfo, StoreLevelInfo, StoreSkillInfo, InitializeBuildInfo } from "./StoreBuildInfo";
import { LevelUpButton, LevelDownButton, LevelIndicatorsContainer, LevelIndicators } from "./LevelingButtons";

const images = {};

function importAll(r){
    r.keys().forEach((key) => images[key] = r(key));
}

importAll(require.context('../abilities', false));

export const SkillInterface = (props) => {
    return <Skills handleTotalLevel = {props.handleTotalLevel} 
        handleEnterInterfaceButton={props.handleEnterInterfaceButton}
        handleLeaveInterfaceButton={props.handleLeaveInterfaceButton}
        handleDescription = {props.handleDescription}
        totalLevel = {props.totalLevel}/>
}

const Skills = (props) => {
    // create an individual component for each skill to keep track of their own levels
    return abilities.tree.skills.map(skill => {
        return <SkillComponent skill = {skill}
         handleTotalLevel = {props.handleTotalLevel} 
         key={skill.id}
         handleEnterInterfaceButton={props.handleEnterInterfaceButton}
         handleLeaveInterfaceButton={props.handleLeaveInterfaceButton}
         handleDescription = {props.handleDescription} 
         totalLevel = {props.totalLevel} />
    });
}

const SkillComponent = (props) => {
    const [level, setLevel] = useState(0);
    const [isInitialized, setIsInitialized] = useState(false);
    const [costToLearn, setCostToLearn] = useState(0);
    const [maxLevel, setMaxLevel] = useState(0);

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

    // When mounting the component, check the current build info to populate the information.
    useEffect(() => {
        if(isInitialized === false){
            InitializeBuildInfo(props.skill.id, props.skill.specializations[0].id, level, true);
        }
        setCostToLearn(props.skill.specializations[0].tiers[0].learnPointCost);
        setMaxLevel(props.skill.maxLearnableLevel || props.skill.maxLearnableTier || props.skill.specializations[0].maxLearnableTier);
        var skillInformation = ReadBuildInfo(props.skill.id);
        setSkillInfo(skillInformation);
        setLevel(skillInformation.level);
    }, [props.skill]);

    function handleLevelUp(){
        if(props.totalLevel + costToLearn <= 100){
            if(level < maxLevel){
            setLevel(level+1)
                props.handleTotalLevel(costToLearn);
            }

            StoreLevelInfo(props.skill.id, level < maxLevel ? 1 : 0, true);
        }
    }

    function handleLevelDown(){
        if(level > 0){
            setLevel(level-1);
            props.handleTotalLevel(-costToLearn);
        }

        StoreLevelInfo(props.skill.id, level > 0 ? -1 : 0, true);
    }

    function handleSkillInfoSpecialization(e){
        setSkillInfo({...skillInfo, specialization: e});
        StoreSkillInfo(props.skill.id, e, level);
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
                    handleSpecilizationInfo = {handleSkillInfoSpecialization}
                    handleDescription = {props.handleDescription} 
                    specializationSelected = {skillInfo.specialization} />
                <LevelIndicatorsContainer 
                    maxLearnableTier={maxLevel}
                    totalLevels={level} />
            </div>
        </div>
}

const Specializations = (props) => {
    const [specializationSelected, setSpecializationSelected] = useState('');

    function handleMultipleSpecializations(e){
        setSpecializationSelected(e);
    }

    useEffect(() => {
        setSpecializationSelected(props.specializationSelected);
    }, [props.specializationSelected]);

    return props.specializations.map(specialization => {
        return <Specialization key = {specialization.id}
                    selected = {specializationSelected == specialization.id ? true : false}
                    specialization = {specialization}
                    handleSpecilizationInfo = {props.handleSpecilizationInfo}
                    handleMouseEnter = {props.handleEnterInterfaceButton}
                    handleMouseLeave = {props.handleLeaveInterfaceButton}
                    handleMouseDown = {handleMultipleSpecializations}
                    handleDescription = {props.handleDescription} />
    })
}

const Specialization = (props) => {
    const [imageSource, setImageSource] = useState('');
    function handleMouseDown(e) {
        props.handleMouseDown(props.specialization.id)
        props.handleDescription(props.specialization.id)
        props.handleSpecilizationInfo(props.specialization.id);
        console.log("./" + toLower(props.specialization.id) + ".png");
    }

    function toLower(string){
        let newString = string.toLowerCase();
        return newString.replace(/\s/, '_');
    }

    useEffect(() =>{
        setImageSource(images["./" + toLower(props.specialization.id) + ".png"]);
    }, []);
    
    return <button className ={classNames("specializationButton", {"activeSpecializationButton" : props.selected})}
            key={props.specialization.id}
            onMouseEnter={props.handleMouseEnter}
            onMouseLeave={props.handleMouseLeave}
            onMouseDown={() => handleMouseDown(props.specialization.id)}>
                <img src={imageSource} />
                {props.specialization.name}
        </button>
}