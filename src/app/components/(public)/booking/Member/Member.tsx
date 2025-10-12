'use client'

import Image from "next/image";
import { useEffect, useState } from "react";

interface Props {
  select: (val: any) => void;
  viewNum: (val: any) => void;
  viewselected: number;
  data: any;
  bookingsetting:any;
}
interface TeamMember {
  firstName: string;
  lastName: string;
  role: string;
  price: number;
  avatar?: string;
}
function Member({ select, viewNum, viewselected, data ,bookingsetting}: Props) {
  // need a loading state
  const [members,setMembers]=useState<TeamMember[]>([])
  const getteam=async()=>{
    // need to get all providers by id
    const response = await fetch('/api/team')
    const data = await response.json()
    setMembers(data)
  }
  useEffect(()=>{
    const providerData = Array.isArray(bookingsetting[data.serviceNum]?.provider)
  ? bookingsetting[data.serviceNum].provider
  : [bookingsetting[data.serviceNum]?.provider].filter(Boolean);
    const fetchTeamMembers = async () => {
      try {
        getteam()
      } catch (error) {
        console.error('Error fetching team members:', error)
      }
    }
   console.log(providerData)
    // fetchTeamMembers() 
  },[])

  return (
    <div className="w-[90%] mx-auto">
      <h2 className="text-xl font-semibold mb-4">Member</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {members.map((member, index) => {
          const isSelected = data?.firstName === member.firstName;

          return (
            <div
              key={index}
              onClick={() =>
                select({ ...data, firstName: member.firstName, lastName: member.lastName})
              }
              className={`p-4 border rounded-lg cursor-pointer shadow hover:shadow-lg transition
                ${isSelected ? "bg-gray-400 border-gray-400" : "bg-white"}`}
            >
              <Image
                src={'next.svg'}
                alt={member.firstName}
                height={200}
                width={200}
                className="mx-auto mb-2"
              />
              <h3 className="text-lg font-semibold text-center">{member.firstName} {member.lastName}</h3>
              <p className="text-gray-500">{member.role}</p>
              {member.price&&<p className="text-gray-700 text-center">R{member.price}</p>}
            </div>
          );
        })}
      </div>

      <div className="">
        <button
          onClick={() => viewNum(viewselected - 1)}
          className=""
        >
          Prev
        </button>
        <button
          onClick={() => viewNum(viewselected + 1)}
          className=""
          disabled={data.firstName === ""}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Member;

