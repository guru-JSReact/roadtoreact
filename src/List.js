import React from "react";
import Button from "./Button";

const List = ({list, onDismiss}) => {
    return (
        <div>
            {
                list.map(item =>
                    <div key={item.objectID}>
                       <span>{item.title}</span>
                       <span>{item.author}</span>
                        <span>{item.num_comments}</span>
                        <span>{item.points}</span>
                        <span>
                            <Button onclick={()=>onDismiss(item.objectID)}>Dismiss </Button>
                        </span>
                    </div>

            )
            }
        </div>
    )
}
export default List;
