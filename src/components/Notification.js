import React from 'react'

const Notification = ({text, type}) => {
    console.log(text, type)
    if(text === "") return null

    return(
        <div className={type}>
            {text}
        </div>
    )
}

export default Notification 