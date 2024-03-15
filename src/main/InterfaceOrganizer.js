import React, {useEffect, useState} from "react";
import { BuildInterface } from "./Background";

export const OrganizedInterface = () => {


    return <div className="OrganizedInterface">
        <BuildInterface />
        <DescriptionsBox />
    </div>
}

const DescriptionsBox = () => {
    return <h1>
        This is Text.
    </h1>
}