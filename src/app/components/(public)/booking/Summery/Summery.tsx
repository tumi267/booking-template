'use client'

interface Props {
  viewNum: (val: any) => void;
  viewselected: number;
  data: any;
}

function Summery({ viewNum, viewselected, data }: Props) {
  return (
    <div className="w-[90%] mx-auto">
      <h2 className="text-xl font-semibold mb-4">Summary</h2>

      <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
        <tbody>
          {data.date && (
            <tr className="border-b">
              <td className="p-2 font-semibold">Date</td>
              <td className="p-2">{data.date}</td>
            </tr>
          )}
          {data.time && (
            <tr className="border-b">
              <td className="p-2 font-semibold">Time</td>
              <td className="p-2">{data.time}</td>
            </tr>
          )}
          {data.member && (
            <tr className="border-b">
              <td className="p-2 font-semibold">Member</td>
              <td className="p-2">{data.member}</td>
            </tr>
          )}
          {data.price && (
            <tr>
              <td className="p-2 font-semibold">Price</td>
              <td className="p-2">R{data.price}</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="flex ">
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

export default Summery;
