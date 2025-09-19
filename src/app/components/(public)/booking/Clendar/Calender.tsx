
interface Props {
    select:(val: any) => void
    viewNum:(val:any)=>void
    viewselected:number
    data:any
  }
function Calender({select,viewNum,viewselected,data}:Props) {
  return (
    <div>
        <h2>Select Date</h2>
        <input type="date" onChange={(e)=>{select({...data,date:e.target.value})}}/>
        <br/>
        <button onClick={()=>{viewNum(viewselected+1)}}>next</button>
    </div>
  )
}

export default Calender