import "./Files.css";
import { getCharacter } from "../../../helper";


function Files(props) {

  const files = props.files
  return (
    <div className="files">
      {files.map((file,index) => <span key={index}>{getCharacter(file)}</span>)}
    </div>
  )
}

export default Files;