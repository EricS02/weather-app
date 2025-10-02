
interface UnitOption {
  value: string;
  label: string;
  system: string
}

interface UnitSectionProps {
  title: string;
  unitOptions: UnitOption[]
  selectedUnit: string
}

const UnitSection = ({ title, selectedUnit, unitOptions }: UnitSectionProps) => {
  
  return (
    <>
    <p className="text-sm font-semibold text-neutral-300 text-left mt-1 mb-2 px-4 font-dm-sans">
      {title}
    </p>
    {unitOptions.map((option) => (
      <div 
      key={option.value}
      className={`text-white font-semibold font-dm-sans text-sm flex w-full
      text-let py-2.5 px-4 justify-between items-center rounded-lg ${option.system === selectedUnit ? "bg-neutral-700" : ""}`}>
        <span>{option.label}</span>
        <div className="bg-neutral-600 max-w-[198px] h-1"></div>
        {option.system === selectedUnit && (
          <img src="/assets/images/icon-checkmark.svg" alt="checkmark" className="w-4 h-4" />

        )}
      </div>
    ))}
    
  </>
  )
 
};

export default UnitSection;
