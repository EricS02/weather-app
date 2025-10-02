interface DropdownProps {
  closedText?: React.ReactNode;
  openText?: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  onClick?: () => void;
}

const Dropdown = ({
  children,
  isOpen,
  onToggle,
  closedText,
}: DropdownProps) => {
  return (
    <div className="relative">
      <button onClick={onToggle} className="text-white font-semibold bg-neutral-800 px-4 py-3 rounded-lg text-center items-center whitespace-nowrap">
        {closedText}
      </button>
      {isOpen && (
        <div
          className="absolute top-full right-0
    shadow-lg rounded-md min-w-52 z-10 "
        >
          <div className="bg-neutral-800 rounded-lg p-2 border border-neutral-600 mt-2">{children}</div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
