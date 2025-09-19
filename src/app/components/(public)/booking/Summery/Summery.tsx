'use client'
interface Props {
    viewNum:(val:any)=>void
    viewselected:number
    data:any
  }

function Summery({viewNum,viewselected,data}:Props) {
  return (
    <div>
    <h2>Summery</h2>
    {data.date && <p>Date: {data.date}</p>}
    {data.time && <p>Time: {data.time}</p>}
    {data.member && <p>Member: {data.member}</p>}
    {data.price && <p>Price: R{data.price}</p>} 
    <br/>
    <button onClick={()=>{viewNum(viewselected-1)}}>prev</button>
    </div>
  )
}

export default Summery