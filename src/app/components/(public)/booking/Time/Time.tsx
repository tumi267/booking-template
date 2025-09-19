'use client'
interface Props {
    select:(val: any) => void
    viewNum:(val:any)=>void
    viewselected:number
    data:any
  }
function Time({select,viewNum,viewselected,data}:Props) {

    const timeSlots = ['09:00','10:00','11:00','12:00','14:00','15:00','16:00','17:00'];

  return (
    <div>
        <h2>Time</h2>
              <div className="grid grid-cols-3 gap-3">
        {timeSlots.map((slot) => (
          <button
            key={slot}
            onClick={() => select({ ...data, time: slot })}
            className={`px-4 py-2 rounded-lg border 
              ${
                data.time === slot
                  ? 'bg-blue-500 text-white border-blue-600'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
          >
            {slot}
          </button>
        ))}
      </div>
        <br/>
        <button onClick={()=>{viewNum(viewselected-1)}}>prev</button>
        <button onClick={()=>{viewNum(viewselected+1)}}>next</button>
    </div>
  )
}

export default Time