import React from "react";
import PropTypes from "prop-types";

const Button = ({onclick, children}) => {
    return <button
        type="button"
        onClick={onclick}
    >{children}
    </button>
};

Button.prototype = {
    onClick: PropTypes.func,
    children: PropTypes.node,
}

export default Button;
