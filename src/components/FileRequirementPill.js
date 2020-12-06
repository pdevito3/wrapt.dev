import React from 'react'

function FileRequirementPill(props) {
  // if doing any more with this, abstracts these to enums 
  const paddingLeft = props.padLeft === "sm" ? "pl-3" : "";
  const pillColors = props.type === "optional" ? "bg-blue-200 text-blue-800" : "bg-green-200 text-green-800";
  

  return (
    <span className={paddingLeft}>
      <span className={`inline-flex items-center px-6 py-1.5 rounded-full text-sm font-semibold ${pillColors} shadow`}>
        {props.type === "optional" ? "Optional" : "Required"}
      </span>
    </span>
  )
}

export default FileRequirementPill
