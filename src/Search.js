import React from "react";

const Search = ({input, onChange, children}) =>
    <form>
        {children}
        <input
            type="text"
            value={input}
            onChange={onChange}
        />
    </form>;
export default Search;
