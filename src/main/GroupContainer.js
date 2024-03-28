import { TalentComponent } from "./TalentComponent";

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
    return <div className="GroupComponent" >
        <h1 className = "GroupTitle">{_.group.id}</h1> 
        {_.group.children.map(talent => {
            return <TalentComponent talent = {talent}
            handleTotalLevel = {_.props.props.handleTotalLevel} 
            key={talent.id}
            handleEnterInterfaceButton={_.props.props.handleEnterInterfaceButton}
            handleLeaveInterfaceButton={_.props.props.handleLeaveInterfaceButton}
            handleDescription = {_.props.props.handleDescription} 
            totalLevel = {_.totalLevel}/>
        })}
    </div>
}