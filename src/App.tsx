import ApiCall from "./components/layout/ApiCall";
import Navbar from "./components/layout/Navbar";

import { useState } from "react";

function App() {
  const [search, setSearch] = useState("");
  const [emptySearch, setEmptySearch] = useState(false);
  const [shouldFetch, setShouldFetch] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState("celsius");
  const [isNavDropdownOpen, setIsNavDropdownOpen] = useState(false);
  const [isDayDropdownOpen, setIsDayDropdownOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState("");

  const handleSearchClick = (e) => {
    e.preventDefault();
    if (search.trim() === "") return setEmptySearch(true);
    setEmptySearch(false);
    setShouldFetch(true);
  };

  const toggleUnitSystem = () => {
    setSelectedUnit(selectedUnit === "celsius" ? "fahrenheit" : "celsius");
    setShouldFetch(true);
  };

  return (
    <div className="h-full w-full bg-neutral-900 flex">
      <div className="mt-12 mb-20 px-28 w-full">
        <Navbar
          selectedUnit={selectedUnit}
          toggleUnitSystem={toggleUnitSystem}
          isDropdownOpen={isNavDropdownOpen}
          setIsDropdownOpen={setIsNavDropdownOpen}
        />
        <h1 className="font-bold text-white text-5xl  text-center my-16 mx-auto max-w-[731px]">
          How's the sky looking today?
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-4 mx-auto max-w-[656px] px-4">
          <div className="relative flex-1 w-full md:max-w-[526px]">
            <img
              src="/assets/images/icon-search.svg"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5"
              alt="search"
            />
            <input
              onChange={(e) => {
                setSearch(e.target.value.toLowerCase());
                if (emptySearch && e.target.value.trim() !== "") {
                  setEmptySearch(false);
                }
              }}
              onKeyDown={(e) => e.key === "Enter" && handleSearchClick(e)}
              placeholder="Search for a place..."
              className=" w-full rounded-xl bg-neutral-800 border border-neutral-600 h-14 pl-12 pr-4 py-4 text-white"
            ></input>
          </div>

          <button
            className="bg-blue-500 text-white font-semibold w-full md:max-w-[114px] md:min-w-[114px] h-14 rounded-xl text-xl font-dm-sans"
            onClick={handleSearchClick}
          >
            Search
          </button>
        </div>
        <ApiCall
          search={search}
          shouldFetch={shouldFetch}
          setShouldFetch={setShouldFetch}
          selectedUnit={selectedUnit}
          isDropdownOpen={isDayDropdownOpen}
          setIsDropdownOpen={setIsDayDropdownOpen}
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
          setSearch={setSearch}
        />
      </div>
    </div>
  );
}

export default App;
