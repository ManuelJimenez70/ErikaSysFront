import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCheck
} from "@fortawesome/free-solid-svg-icons";
import "../styles/snack.css";

function Snack( {success, message}) { 
    return (
        <div className='snack-body'>
            <div className={`content ${success ? "success" : "fail"}`}>
                <span>
                    <FontAwesomeIcon icon={faCheck}/>
                    <p>{message}</p>
                </span>
            </div>
        </div>
    );
};

export default Snack;