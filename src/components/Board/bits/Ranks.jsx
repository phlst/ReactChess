import "./Ranks.css";

function Ranks(props) {
  const ranks = props.ranks;
  return (
    <div className="ranks">
      {ranks.map((rank,index) => <span key={index}>{rank}</span>)}
    </div>
  )
}

export default Ranks;