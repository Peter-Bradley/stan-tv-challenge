import React from "react";
import './Skeleton.css'

let SkeletonElement = (skeleton: {type: string}) => {
    let classes = `skeleton ${skeleton.type}`;
    return (
        <div className={classes}></div>
    );
}

export default SkeletonElement;