'use client'
interface Props {
    viewNum:(val:any)=>void
    viewselected:number
  }

function Summery({viewNum,viewselected}:Props) {
  return (
    <div>
    <h2>Summery</h2>
    <br/>
    <button onClick={()=>{viewNum(viewselected-1)}}>prev</button>
    </div>
  )
}

export default Summery