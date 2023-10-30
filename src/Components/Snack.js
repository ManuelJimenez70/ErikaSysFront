import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCheck,
    faTimesCircle
} from "@fortawesome/free-solid-svg-icons";
import "../styles/snack.css";

function Snack({ success, message, show}) {

    return (
        <div className={`snackbar ${success ? "success" : "fail"} ${show ? "show" : ""}`}>
            <span>
                <FontAwesomeIcon icon={success ? faCheck : faTimesCircle} />
            </span>
            <p>{message}</p>
        </div>
    );
};

export default Snack;