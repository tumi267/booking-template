import { useState } from "react";

interface Props {
  select: (val: any) => void;
  viewNum: (val: any) => void;
  viewselected: number;
  data: any;
}

function Calendar({ select, viewNum, viewselected, data }: Props) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  // Compute first day of the month (0 = Sun, 6 = Sat)
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  // Compute number of days in month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Generate days array
  const daysOfMonth = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Handlers for prev/next month
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  // Weekday labels
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="w-[90%] mx-auto my-4">
      <div className="flex justify-between items-center mb-2">
        <button
          onClick={handlePrevMonth}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          Prev
        </button>
        <h2 className="text-lg font-semibold">
          {new Date(currentYear, currentMonth).toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        <button
          onClick={handleNextMonth}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          Next
        </button>
      </div>

      {/* Weekday header */}
      <div className="grid grid-cols-7 text-center border-b font-semibold">
        {weekdays.map((day) => (
          <div key={day} className="p-2">
            {day}
          </div>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-0">
        {/* Empty slots for days before first day */}
        {Array.from({ length: firstDayOfMonth }).map((_, i) => (
          <div key={`empty-${i}`} className="min-h-[5em] border border-transparent" />
        ))}

        {/* Actual days */}
        {daysOfMonth.map((d) => {
          const selectedDate = `${currentYear}-${currentMonth + 1}-${
            d < 10 ? `0${d}` : d
          }`;

          const isToday =
            d === today.getDate() &&
            currentMonth === today.getMonth() &&
            currentYear === today.getFullYear();

          const isSelected = data?.date === selectedDate;

          return (
            <div
              key={d}
              className={`min-h-[5em] p-2 box-border border border-black text-right cursor-pointer
                hover:bg-gray-200 ${
                  isToday ? "text-red-500 font-bold" : ""
                } ${isSelected ? "bg-gray-400 font-bold" : ""}`}
              onClick={() => select({ ...data, date: selectedDate })}
            >
              {d}
            </div>
          );
        })}
      </div>
      <br />
      <button onClick={() => viewNum(viewselected + 1)}>next</button>
    </div>
  );
}

export default Calendar;

