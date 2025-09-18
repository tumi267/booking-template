
interface Props {
    select:(val: any) => void
    viewNum:(val:any)=>void
    viewselected:number
  }
function Calender({select,viewNum,viewselected}:Props) {
  return (
    <div>
        <h2>Select Date</h2>
        <input type="date"/>
        <br/>
        <button onClick={()=>{viewNum(viewselected+1)}}>next</button>
    </div>
  )
}

export default Calender