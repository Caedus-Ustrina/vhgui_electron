import { TalentComponent } from "./TalentComponent";
import React, {useState} from "react";

export const GroupContainer = (_) => {
    return <div className="GroupingContainer">
       {_.talents.tree.skills.map(grouping => {
            return grouping.type == "grouped" ? 
            <GroupComponent props = {_}
            group = {grouping} 
            key = {grouping.id} 
            totalLevel = {_.totalLevel}/> : null
       })}
    </div>
}

const GroupComponent = (_) => {
    const [groupLevel, setGroupLevel] = useState(0);



    function handleMaxAndGroupLevel(e){
        setGroupLevel(groupLevel + e);
        _.props.props.handleTotalLevel(e);
    }

    return <div className="GroupComponent" >
        <h1 className = "GroupTitle">{_.group.id + " "}{groupLevel + "/" + _.group.maxSpentLearnPoints}</h1> 
        {_.group.children.map(talent => {
            return <TalentComponent talent = {talent}
            handleTotalLevel = {handleMaxAndGroupLevel}
            key={talent.id}
            handleEnterInterfaceButton={_.props.props.handleEnterInterfaceButton}
            handleLeaveInterfaceButton={_.props.props.handleLeaveInterfaceButton}
            handleDescription = {_.props.props.handleDescription} 
            totalLevel = {_.totalLevel}
            groupLevel = {groupLevel}
            maxGroupLevel = {_.group.maxSpentLearnPoints}/>
        })}
    </div>
}