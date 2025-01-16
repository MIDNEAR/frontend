import React, { useState } from 'react';
import Graph from './Graph';

const Data = () => {

    return (
        <div className="data_wrap">
            <Graph cate={"day"} />
            <Graph cate={"week"} />
            <Graph cate={"year"} />
        </div>
    );
};

export default Data;