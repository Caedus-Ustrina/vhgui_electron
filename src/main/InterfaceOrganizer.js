import React, {useEffect, useState} from "react";
import { BuildInterface } from "./Background";
import abilities_descriptions from "/abilities_descriptions.json";
import skillDescriptions from "/skill_descriptions.json";
import classNames from "classnames";

const colorMapping = {
    $text: "black",
    $distance: "#F2E685",
    $castType: "blue",
    $damage: "#C23627",
    $force: "#5AE09C",
    $name: "#FCF5C5",
    $radius: "#33FF6D",
    $delay: "#8C4916",
    $baby: "#F5B2F9",
    $heal: "#7DF587",
    $duration: "#7024AC",
    $absorb: "#8EEDD9",
    $manaCost: "#0353D7",
    $chance: "#FFEB07",
    $ability_power: "#CD009B",
    $slowness: "#D1D0AE",
    $chains: "#CC3639",
    $leech: "#CF0000",
    $chilled: "#2FFFFA",
    $maxGlacialPrison: "#2FFFFA",
    $eternals: "#C7FFE7",
    $speed: "#F6CD0E",
    $vulnerability: "#FF4682",
    $maxTargets: "#CD009B",
    $blocks: "#945D38",
    $unbreaking: "#DCC4F0",
    $fortune: "black",
    $knockback: "#FFB00F",
    $piercing: "#4020B8",
    $numberOfJavelins: "#DEB308",
    $numberOfBounces: "#085EDE",
    $damageInterval: "#A86225",
    $durabilityWearReduction: "#DBB0DC",
    $slowDuration: "#7024AC",
    $frostbiteChance: "#2FFFFA",
    $maxStacks: "#36FFA7",
    $stacksUsedPerHit: "#6B1C00",
    $abilityPowerPerStack: "#CD009B",
    $luckyHit: "#6DF5A3",
}

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
            let color = colorMapping[textSection.color] || textSection.color || "black";
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