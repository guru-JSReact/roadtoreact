import React from "react";

const Search = (props) => {
    const {input, onChange, children} = props;
    return (
        <form>
            {children}
            <input
                type="text"
                value={input}
                onChange={onChange}
            />
        </form>
    );
};
export default Search;
