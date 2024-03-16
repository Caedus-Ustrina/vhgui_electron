import React, {useEffect, useState} from "react";
import { BuildInterface } from "./Background";
import abilities_descriptions from "/abilities_descriptions.json";
import classNames from "classnames";

export const OrganizedInterface = () => {
    const [description, setDescription] = useState("");
    const [displayDescription , setDisplayDescription] = useState(false);

    function handleDescription(e) {
        var fullText = "";
        abilities_descriptions.data[e].description.forEach(element => {
                    fullText = fullText + element.text
                }
            );
        setDescription(fullText);
        setDisplayDescription(true);
    }
    
    return <div className={classNames("OrganizedInterfaceFull", {"OrganizedInterfacePartial" : displayDescription})}>
        <BuildInterface handleDescription={handleDescription} />
        {displayDescription ? <DescriptionsBox description = {description}/> : <></>}
    </div>
}

const DescriptionsBox = (props) => {
    return <div>
        {props.description}
    </div>
}