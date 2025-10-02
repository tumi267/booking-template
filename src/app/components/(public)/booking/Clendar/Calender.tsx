
interface Props {
    select:(val: any) => void
    viewNum:(val:any)=>void
    viewselected:number
    data:any
  }
function Calender({select,viewNum,viewselected,data}:Props) {
  const date=new Date()
  let year=date.getFullYear()
  let month=date.getMonth() 
  let day=date.getDate()
  let endMouthdate=new Date(year, month + 1, 0).getDate();
  let daysOfMonth = new Array(endMouthdate).fill(null)
  .map((_, i) => i + 1)
  
  return (
    <div>
      <h3>{day}/{month + 1}/{year}</h3>
      
        <h2>Select Date</h2>
        <div className="w-[80%] mx-auto">
        <div className="grid grid-cols-7 text-center border-b font-semibold">
          <div className="p-2">Sun</div>
          <div className="p-2">Mon</div>
          <div className="p-2">Tue</div>
          <div className="p-2">Wed</div>
          <div className="p-2">Thu</div>
          <div className="p-2">Fri</div>
          <div className="p-2">Sat</div>
        </div>
        <div className="grid grid-cols-7 gap-0">
          {daysOfMonth.map((d, i) => {
            const isToday = d === day; // check if current date
            return (
            <div
            key={i}
            className={`min-h-[5em] p-2 box-border border border-black text-left ${
              isToday ? "text-[red] font-bold" : ""
              }`}
              >
            <div className="text-right">
              <p>{d}</p>
            </div>
          </div>
          );
          })}
        </div>
        </div>
        {/* <input type="date" onChange={(e)=>{select({...data,date:e.target.value})}}/> */}
        <br/>
        <button onClick={()=>{viewNum(viewselected+1)}}>next</button>
    </div>
  )
}

export default Calender