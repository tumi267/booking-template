'use client'
interface Props {
    select:(val: any) => void
    viewNum:(val:any)=>void
    viewselected:number
  }
function Time({select,viewNum,viewselected}:Props) {
  return (
    <div>
        <h2>Time</h2>
        <br/>
        <button onClick={()=>{viewNum(viewselected-1)}}>prev</button>
        <button onClick={()=>{viewNum(viewselected+1)}}>next</button>
    </div>
  )
}

export default Time