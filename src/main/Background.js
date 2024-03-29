import React, { useEffect, useState, useRef} from "react";
import classNames from "classnames";
import { SkillInterface } from "./SkillComponent";
import { TalentInterface } from "./TalentComponent";
import { ReadFullBuild } from "./StoreBuildInfo";
import {CopyToClipboard} from "react-copy-to-clipboard";

export const BuildInterface = (props) => {

    const [IsDown, setIsDown] = useState(false);
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
    const [scrollLeftState, setScrollLeftState] = useState(null);
    const [scrollDownState, setScrollDownState] = useState(null);
    const [mouseMovedX, setStateMouseMovedX] = useState(0);
    const [mouseMovedY, setStateMouseMovedY] = useState(0);
    const [buildInfo, setBuildInfo] = useState("");

    // This hook is resonsible for disabling click and drag functionality why hovering a level up or level down button
    const [canDrag, setCanDrag] = useState(true);

    const [totalLevel, setTotalLevel] = useState(0);

    const itemsContainer = useRef();

    function handleMouseDown(e){
        if(canDrag){
            setIsDown(true);
            setStartX(e.pageX - itemsContainer.current.offsetLeft);
            setStartY(e.pageY - itemsContainer.current.offsetTop);
            setScrollLeftState(itemsContainer.current.scrollLeft);
            setScrollDownState(itemsContainer.current.scrollTop);
            setStateMouseMovedX(0);
            setStateMouseMovedY(0);
        }
    }

    function handleMouseUp(){
        setIsDown(false);
        setStartX(0);
        setStartY(0);
    }

    function handleMouseLeaveContainer(){
        setIsDown(false);
    }

    function handleMouseMove(e){
        if(!IsDown || !canDrag){
            return
        }

        const currentMousePositionInsideContainerX = e.pageX - itemsContainer.current.offsetLeft;
        const currentMousePositionInsideContainerY = e.pageY - itemsContainer.current.offsetTop;

        setStateMouseMovedX(currentMousePositionInsideContainerX - startX);
        setStateMouseMovedY(currentMousePositionInsideContainerY - startY);
    }

    useEffect(() => {
        itemsContainer.current.scrollLeft = scrollLeftState - mouseMovedX;
        itemsContainer.current.scrollTop = scrollDownState - mouseMovedY;
    }, [scrollLeftState, mouseMovedX, scrollDownState, mouseMovedY]);

    useEffect(() => {
        setCanDrag(canDrag);
        setBuildInfo(buildString());
    });
    
    function handleTotalLevel(e){
        setTotalLevel(totalLevel + e)
    }

    function handleEnterInterfaceButton(){
        setCanDrag(false);
    }

    function handleLeaveInterfaceButton(){
        setCanDrag(true);
    }

    const [selectedAbilities, setSelectedAbilities] = useState(true)

    function selectAbilities(selected)
    {
        setSelectedAbilities(selected);
    }

    function buildString(){
        // This function should return a string with the build information
        const buildInformation = ReadFullBuild();
        var buildString = "";

        for (const key in buildInformation){
            if(buildInformation[key].isAbility && buildInformation[key].level > 0){
                buildString += buildInformation[key].specialization + ":" + buildInformation[key].level + "|";
            }
        }

        buildString = buildString.slice(0, -1) + ";";

        for (const key in buildInformation){
            if(!buildInformation[key].isAbility && buildInformation[key].level > 0){
                buildString += buildInformation[key].name + ":" + buildInformation[key].level + "|";
            }
        }

        return buildString = buildString.slice(0, -1) + ";a";
    }

    return ( 
        <div className="InterfaceSelectionGrid">
            <button onMouseDown={() => selectAbilities(true)}>Abilities</button>
            <button onMouseDown={() => selectAbilities(false)}>Talents</button>
            <h1> Levels {totalLevel}</h1>
            <CopyToClipboard text={buildInfo}>
                <button>Copy Build To Clipboard</button>
            </CopyToClipboard>
            <div className="DraggableContainer" >
                <div className={classNames("ItemsContainer", { "activeItemsContainer" : IsDown })} 
                    ref={itemsContainer}
                    onMouseDown={((e) => handleMouseDown(e))}
                    onMouseUp={((e) => handleMouseUp(e))}
                    onMouseLeave={((e) => handleMouseLeaveContainer(e))}
                    onMouseMove={((e) => handleMouseMove(e))}
                >
                    {selectedAbilities ?
                    <SkillInterface handleTotalLevel = {handleTotalLevel} 
                    handleEnterInterfaceButton = {handleEnterInterfaceButton}
                    handleLeaveInterfaceButton = {handleLeaveInterfaceButton}
                    handleDescription = {props.handleAbilityDescription}
                    totalLevel = {totalLevel} />:
                    <TalentInterface handleTotalLevel = {handleTotalLevel} 
                    handleEnterInterfaceButton = {handleEnterInterfaceButton}
                    handleLeaveInterfaceButton = {handleLeaveInterfaceButton}
                    handleDescription = {props.handleTalentDescription}
                    totalLevel = {totalLevel} />
                    }   
                </div>
            </div>
    </div> );
}