import React from "react"
import { Status } from "../../constant"
import { useAppContext } from "../../contexts/context"
import { closePopup } from "../../reducer/actions/popup"
import "./Popup.css"


const Popup = ({children}) => {

  const {appState,dispatch} = useAppContext()

  const onClosePopup = () => {
    dispatch(closePopup())
  }

  if(appState.status === Status.ongoing)
    return null
  
  return<div className="popup" >
    {React.Children.toArray(children).map(child => React.cloneElement(child , {onClosePopup}))}
  </div>
}
export default Popup