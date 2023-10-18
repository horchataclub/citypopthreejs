import { forwardRef } from "react"
import OutlinesEffect from "./OutlinesEffect"

export default forwardRef(function Outlines (props, ref)
{
    const effect = new OutlinesEffect(props)
    
    return <primitive  ref={ ref } object={ effect } />
})