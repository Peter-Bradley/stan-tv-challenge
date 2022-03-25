import React from "react";
import './Skeleton.css'

const SkeletonElement = (skeleton: {type: string}) => {
    const classes = `skeleton ${skeleton.type}`;
    return (
        <div className={classes}></div>
    );
}

export default SkeletonElement;