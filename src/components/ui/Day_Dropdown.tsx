
interface Day_DropdownProps {
  onToggle: () => void;
  closedText: React.ReactNode;
  isOpen: boolean;
  onDaySelect: (day: string) => void;
  selectedDay: string;
}

const Day_Dropdown = ({
  onToggle,
  closedText,
  isOpen,
  onDaySelect,
  selectedDay,
}: Day_DropdownProps) => {
  const weekdays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="bg-neutral-600 px-4 py-2.5      
rounded-lg flex justify-between gap-2
items-center mb-4 "
      >
        {closedText}
      </button>
      {isOpen && (
        <div
          className="absolute top-full
right-0 shadow-lg min-w-52 z-10
bg-neutral-800 rounded-lg p-2 border
border-neutral-600 mt-2"
        >
          {weekdays.map((day) => (
            <button
              key={day}
              onClick={() => {
                onDaySelect(day);
                onToggle();
              }}
              className={`text-white
font-semibold font-dm-sans text-sm flex w-full     
text-left py-2.5 px-4 justify-between
items-center rounded-lg hover:bg-neutral-700 ${
                selectedDay === day ? "bg-neutral-700" : ""
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Day_Dropdown;
