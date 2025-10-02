'use client'

interface Props {
  select: (val: any) => void;
  viewNum: (val: any) => void;
  viewselected: number;
  data: any;
}

function Member({ select, viewNum, viewselected, data }: Props) {
  const members = [
    { name: "John Doe", price: 50 },
    { name: "Jane Smith", price: 60 },
  ];

  return (
    <div className="w-[90%] mx-auto">
      <h2 className="text-xl font-semibold mb-4">Member</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {members.map((member, index) => {
          const isSelected = data?.member === member.name;
          return (
            <div
              key={index}
              onClick={() => select({ ...data, member: member.name, price: member.price })}
              className={`p-4 border cursor-pointer shadow hover:shadow-lg transition
                ${isSelected ? "bg-gray-400 " : "bg-white"}`}
            >
              <Image src={`next.svg`} height=200 width=200/>
              <h3 className="text-lg font-semibold">{member.name}</h3>
              <p className="text-gray-700">R{member.price}</p>
            </div>
          );
        })}
      </div>

      <div className="flex">
        <button
          onClick={() => viewNum(viewselected - 1)}
          className=""
        >
          Prev
        </button>
        <button
          onClick={() => viewNum(viewselected + 1)}
          className=""
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Member;
