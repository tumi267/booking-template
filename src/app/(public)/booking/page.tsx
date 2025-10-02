'use client'
import Calender from "@/app/components/(public)/booking/Clendar/Calender"
import Confirm from "@/app/components/(public)/booking/Comfirm/Confirm"
import Member from "@/app/components/(public)/booking/Member/Member"
import Summery from "@/app/components/(public)/booking/Summery/Summery"
import Time from "@/app/components/(public)/booking/Time/Time"

import { useState } from "react"

function page() {
  const [bookingdata,setbookingdata]=useState({
    date:"",
    time:"",
    member:"",
    price:""
  })
  const [view,setview]=useState(0)
  const viewstate = () => {
    switch (view) {
      case 0:
        return <Calender 
        select={setbookingdata}
        data={bookingdata}
        viewNum={setview}
        viewselected={view}
        />
      case 1:
        return <Time 
        select={setbookingdata}
        data={bookingdata}
        viewNum={setview}
        viewselected={view}/>
      case 2:
        return <Member 
        select={setbookingdata}
        data={bookingdata}
        viewNum={setview}
        viewselected={view}/>
      case 3:
        return <Summery 
        viewNum={setview}
        data={bookingdata}
        viewselected={view}/>
      case 4:
        return <Confirm
        viewNum={setview}
        data={bookingdata}
        viewselected={view}/>
      default:
        return <Calender 
        select={setbookingdata}
        data={bookingdata}
        viewNum={setview}
        viewselected={view}/> // fallback
    }
  }
  return (
    <div className="text-center">
      <h1>Book Time</h1>
      {viewstate()}
    </div>
  )
}

export default page