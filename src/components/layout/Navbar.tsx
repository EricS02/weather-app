import Dropdown from "../ui/Dropdown";
import UnitSection from "../ui/UnitSection";

interface NavBarProps {
  selectedUnit: string;
  toggleUnitSystem: () => void;
  isDropdownOpen: boolean;
  setIsDropdownOpen: (value: boolean) => void;
}

interface UnitOption {
  value: string;
  label: string;
  system: string;
}

interface UnitOptions {
  temperature: UnitOption[];
  windSpeed: UnitOption[];
  precipitation: UnitOption[];
}

const NavBar = ({selectedUnit, toggleUnitSystem, isDropdownOpen, setIsDropdownOpen}: NavBarProps) => {

  // const [selectedTemp, setSelectedTemp] = useState("Celcius");
  // const [selectedWind, setSelectedWind] = useState("km/h");
  // const [selectedPrecip, setSelectedPrecip] = useState("mm");

  const unitOptions: UnitOptions = {
    temperature: [
      { value: "Celcius", label: "Celsius (°C)", system: "celsius" },
      { value: "Farhrenheit", label: "Fahrenheit (°F)", system: "fahrenheit" },
    ],
    windSpeed: [
      { value: "kmh", label: "km/h", system: "celsius" },
      { value: "mph", label: "mph", system: "fahrenheit" },
    ],
    precipitation: [
      { value: "mm", label: "Millimeters (mm)", system: "celsius" },
      { value: "inches", label: "Inches (in)", system: "fahrenheit" },
    ],
  };

  
  return (
    <nav className="bg-neutral-900 w-full">
      <div className="w-full flex items-center justify-between gap-4 px-4 md:px-8 py-2">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="/assets/images/logo.svg" alt="weather-logo" />
        </a>
        <Dropdown
          closedText={
            <span className="flex items-center gap-2">
              <img src="assets/images/icon-units.svg" />
              <span>Units</span>
              <img
                src="/assets/images/icon-dropdown.svg"
                alt="dropdown"
                className="w-4 h-4"
              />
            </span>
          }
          isOpen={isDropdownOpen}
          onToggle={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <button className="text-white font-semibold px-4 py-2.5 mt-1.5 mb-1 text-sm" onClick={toggleUnitSystem}>
            {selectedUnit === "celsius"
              ? "Switch To Imperial"
              : "Switch To Metric"}
          </button>
          <UnitSection
            title="Temperature"
            unitOptions={unitOptions.temperature}
            selectedUnit={selectedUnit}
          />
          <UnitSection
            title="Wind Speed"
            unitOptions={unitOptions.windSpeed}
            selectedUnit={selectedUnit}

          />
          <UnitSection
            title="Precipitation"
            unitOptions={unitOptions.precipitation}
            selectedUnit={selectedUnit}

          />
        </Dropdown>
      </div>
    </nav>
  );
};

export default NavBar;
