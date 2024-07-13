import React from 'react'

const HighlightedText = ({text,clr}) => {
  return (
    <span className={`text-transparent bg-clip-text ${clr} text-4xl font-bold`}>
        {" "}
        {text}
    </span>
  )
}

export default HighlightedText