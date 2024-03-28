import React, {useEffect, useState} from "react";
import { BuildInterface } from "./Background";
import abilities_descriptions from "/abilities_descriptions.json";
import skillDescriptions from "/skill_descriptions.json";
import classNames from "classnames";

export const OrganizedInterface = () => {
    const [description, setDescription] = useState("");
    const [displayDescription , setDisplayDescription] = useState(false);

    function handleAbilityDescription(e) {
        var fullText = "";
        abilities_descriptions.data[e].description.forEach(element => {
                    fullText = fullText + element.text
                }
            );
        setDescription(fullText);
        setDisplayDescription(true);
    }
    
    function handleTalentDescription(e) {
        var fullText = "";
        var description = skillDescriptions.descriptions[e]
        description.forEach(element => {
                    fullText = fullText + element.text
                }
            );
        setDescription(fullText);
        setDisplayDescription(true);
    }

    return <div className={classNames("OrganizedInterfaceFull", {"OrganizedInterfacePartial" : displayDescription})}>
        <BuildInterface handleAbilityDescription={handleAbilityDescription} 
        handleTalentDescription = {handleTalentDescription}/>
        {displayDescription ? <DescriptionsBox description = {description}/> : <></>}
    </div>
}

const DescriptionsBox = (props) => {
    return <div className="DescriptionBox">
        {props.description}
    </div>
}