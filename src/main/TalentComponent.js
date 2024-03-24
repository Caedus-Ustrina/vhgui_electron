import React, {useEffect, useState, useLayoutEffect} from "react";
import skill_descriptions from "/skill_descriptions.json";
import talents from "/talents.json";
import classNames from "classnames";
import { ReadBuildInfo, StoreLevelInfo, StoreTalentInfo } from "./StoreBuildInfo";
import { LevelUpButton, LevelDownButton, LevelIndicatorsContainer, LevelIndicators } from "./LevelingButtons";

export const TalentInterface = (props) => {
    return <Talents handleTotalLevel = {props.handleTotalLevel} 
        handleEnterInterfaceButton={props.handleEnterInterfaceButton}
        handleLeaveInterfaceButton={props.handleLeaveInterfaceButton}
        handleDescription = {props.handleDescription}/>
}

const Talents = (props) => {
    return talents.tree.skills.map(talent => {
        return <TalentComponent talent = {talent}
         handleTotalLevel = {props.handleTotalLevel} 
         key={talent.id}
         handleEnterInterfaceButton={props.handleEnterInterfaceButton}
         handleLeaveInterfaceButton={props.handleLeaveInterfaceButton}
         handleDescription = {props.handleDescription} />
    });
}

const TalentComponent = (props) => {
    const [level, setLevel] = useState(0);

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
        setTalentInfo(talentInformation);
        setLevel(talentInformation.level);
    }, []);

    function handleLevelUp(){
        if(level < maxLearnableTier){
            setLevel(level+1);
            props.handleTotalLevel(1);
        }

        StoreLevelInfo(props.talent.id,  level < maxLearnableTier ? 1 : 0);
    }

    function handleLevelDown(){
        if(level > 0){
            setLevel(level-1);
            props.handleTotalLevel(-1);
        }

        StoreLevelInfo(props.talent.id,  level > 0 ? -1 : 0);
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
            <LevelIndicatorsContainer maxLearnableTier={props.talent.tiers !== undefined ? props.talent.tiers.length : 0}
                    totalLevels={level}/>
        </div>
    </div>
}
