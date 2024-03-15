import React, { useEffect, useState, useRef} from "react";
import classNames from "classnames";
import { SkillInterface } from "./SkillComponent";

export const BuildInterface = () => {

    const [IsDown, setIsDown] = useState(false);
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
    const [scrollLeftState, setScrollLeftState] = useState(null);
    const [scrollDownState, setScrollDownState] = useState(null);
    const [mouseMovedX, setStateMouseMovedX] = useState(0);
    const [mouseMovedY, setStateMouseMovedY] = useState(0);

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

    return ( 
        <div className="InterfaceSelectionGrid">
            <button>Abilities</button>
            <button>Talents</button>
            <h1> Levels {totalLevel}</h1>
            <div className="DraggableContainer" >
                <div className={classNames("ItemsContainer", { "activeItemsContainer" : IsDown })} 
                    ref={itemsContainer}
                    onMouseDown={((e) => handleMouseDown(e))}
                    onMouseUp={((e) => handleMouseUp(e))}
                    onMouseLeave={((e) => handleMouseLeaveContainer(e))}
                    onMouseMove={((e) => handleMouseMove(e))}
                >
                    <SkillInterface handleTotalLevel = {handleTotalLevel} 
                    handleEnterInterfaceButton = {handleEnterInterfaceButton}
                    handleLeaveInterfaceButton = {handleLeaveInterfaceButton}/>
                </div>
            </div>
    </div> );
}