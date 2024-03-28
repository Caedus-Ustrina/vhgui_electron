import React, {useEffect, useState, useLayoutEffect} from "react";
import skill_descriptions from "/skill_descriptions.json";
import talents from "/talents.json";
import classNames from "classnames";
import { ReadBuildInfo, StoreLevelInfo, StoreTalentInfo } from "./StoreBuildInfo";
import { LevelUpButton, LevelDownButton, LevelIndicatorsContainer, LevelIndicators } from "./LevelingButtons";
import { GroupContainer } from "./GroupContainer";

export const TalentInterface = (props) => {
    return <div className="TalentContainer">
            <Talents handleTotalLevel = {props.handleTotalLevel} 
            handleEnterInterfaceButton={props.handleEnterInterfaceButton}
            handleLeaveInterfaceButton={props.handleLeaveInterfaceButton}
            handleDescription = {props.handleDescription}
            totalLevel = {props.totalLevel}/>
            <GroupContainer props = {props}
            talents = {talents} 
            totalLevel = {props.totalLevel}/>
        </div>
    
}

const Talents = (props) => {
    return talents.tree.skills.map(talent => {
        return talent.type == "grouped" ? null :
        <TalentComponent talent = {talent}
         handleTotalLevel = {props.handleTotalLevel} 
         key={talent.id}
         handleEnterInterfaceButton={props.handleEnterInterfaceButton}
         handleLeaveInterfaceButton={props.handleLeaveInterfaceButton}
         handleDescription = {props.handleDescription}
         totalLevel = {props.totalLevel}/>
    });
}

export const TalentComponent = (props) => {
    const [level, setLevel] = useState(0);
    const [costToLearn, setCostToLearn] = useState(0);
    const maxLearnableTier = props.talent.tiers !== undefined ? props.talent.tiers.length : 0;

    // Should be an object of this kind
    //{
    //  name : "ability_name"
    //  specialization : "specialization.id",
    //  level : 1,
    //}
    const [talentInfo, setTalentInfo] = useState({
        name: "",
        specialization: "",
        level: 0,
    });

    // When mounting the component, check the current build info to populate the information.
    useEffect(() => {
        var talentInformation = ReadBuildInfo(props.talent.id);
        setCostToLearn(props.talent.tiers[level].learnPointCost);
        setTalentInfo(talentInformation);
        setLevel(talentInformation.level);
    }, []);

    function handleLevelUp(){
        if(props.totalLevel + costToLearn <= 100 && props.groupLevel + costToLearn <= props.maxGroupLevel){
            if(level < maxLearnableTier){
                setLevel(level+1);
                props.handleTotalLevel(props.talent.tiers[level].learnPointCost);
            }
            StoreLevelInfo(props.talent.id,  level < maxLearnableTier ? 1 : 0, false);
        }
    }

    function handleLevelDown(){
        if(level > 0){
            setLevel(level-1);
            props.handleTotalLevel(-(props.talent.tiers[level-1].learnPointCost));
        }

        StoreLevelInfo(props.talent.id,  level > 0 ? -1 : 0, false);
    }

    return <div className="SkillContainer">
        <LevelUpButton handleMouseDown = {handleLevelUp} 
            handleEnterInterfaceButton={((e) => props.handleEnterInterfaceButton(e))}
            handleLeaveInterfaceButton={props.handleLeaveInterfaceButton}/>
        <LevelDownButton handleMouseDown = {handleLevelDown} 
            handleEnterInterfaceButton={((e) => props.handleEnterInterfaceButton(e))}
            handleLeaveInterfaceButton={props.handleLeaveInterfaceButton}/>
        <div className="item">
            <button className="specializationButton" onMouseDown={() => props.handleDescription(props.talent.id)}>
                {props.talent.name}
            </button>
            <LevelIndicatorsContainer maxLearnableTier={maxLearnableTier}
                    totalLevels={level}/>
        </div>
    </div>  
}