import React from "react";

export const LevelDownButton = (props) => {
    //create button and hold logic for number of levels in the skill here
    return <button onMouseDown={props.handleMouseDown}
        onMouseEnter={props.handleEnterInterfaceButton}
        onMouseLeave={props.handleLeaveInterfaceButton}>
        LevelDown
    </button>
}

export const LevelUpButton = (props) => {
    //create button and hold logic for number of levels in the skill here
    return <button onMouseDown={props.handleMouseDown}
            onMouseEnter={props.handleEnterInterfaceButton}
            onMouseLeave={props.handleLeaveInterfaceButton}>
        LevelUp
    </button>
}

export const LevelIndicatorsContainer = (props) => {
    const maxLevel = props.maxLearnableTier;
    const currentLevel = props.totalLevels;
    return <div>
            { //Render the skill pips based on number of pips needed
                props.maxLearnableTier > 3 ?
                    props.maxLearnableTier > 9 ?
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

export const LevelIndicators = (props) => {
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