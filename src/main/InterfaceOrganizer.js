import React, {useEffect, useState} from "react";
import { BuildInterface } from "./Background";
import abilities_descriptions from "/abilities_descriptions.json";
import skillDescriptions from "/skill_descriptions.json";
import classNames from "classnames";

export const OrganizedInterface = () => {
    const [description, setDescription] = useState([]);
    const [displayDescription , setDisplayDescription] = useState(false);

    function handleAbilityDescription(e) {
        setDescription(abilities_descriptions.data[e].description);
        setDisplayDescription(true);
    }
    
    function handleTalentDescription(e) {
        setDescription(skillDescriptions.descriptions[e]);
        setDisplayDescription(true);
    }

    function incrementId(){
        setDescriptionUID(descriptionUID + 1);
    }

    return <div className={classNames("OrganizedInterfaceFull", {"OrganizedInterfacePartial" : displayDescription})}>
        <BuildInterface handleAbilityDescription={handleAbilityDescription} 
        handleTalentDescription = {handleTalentDescription}/>
        {displayDescription ? <DescriptionsBox description = {description}/> : null}
    </div>
}

const DescriptionsBox = (props) => {
    return <div className="DescriptionBox">
        {props.description.map((textSection, index) => {
            let color = textSection.color || "black";
            return <React.Fragment key={textSection.text + index}>
            <span style={{color: color}}>
                {textSection.text.split(/\n/).length > 1 ? 
                textSection.text.split(/\n/).map((line, index) => {
                    return line !== "" && line !== " "? <React.Fragment key={line + index}> {line} </React.Fragment> :
                    <br key={index}/>
                }):
                textSection.text}
            </span>
            </React.Fragment>
        })}
    </div>
}