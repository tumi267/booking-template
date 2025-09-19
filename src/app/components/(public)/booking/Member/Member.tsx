'use client'
interface Props {
    select:(val: any) => void
    viewNum:(val:any)=>void
    viewselected:number
    data:any
  }

function Member({select,viewNum,viewselected,data}:Props) {
  const memebers=[{name:"John Doe",price:50},{name:"Jane Smith",price:60}]
  return (
    <div>
        <h2>Member</h2>
        {memebers.map((member,index)=>(
            <div key={index}>
                <input type="radio" name="member" value={member.name} onChange={(e)=>{select({...data,member:e.target.value,price:member.price})}}/>
                {member.name} - R{member.price}
            </div>
        ))}
        <br/>
        <button onClick={()=>{viewNum(viewselected-1)}}>prev</button>
        <button onClick={()=>{viewNum(viewselected+1)}}>next</button>
    </div>
  )
}

export default Member