import React from "react";

interface ISearchForm {
  submitForm: () => void;
  minSalary: number;
  maxSalary: number;
  setMinSalary: React.Dispatch<React.SetStateAction<number>>;
  setMaxSalary: React.Dispatch<React.SetStateAction<number>>;
}

const SearchForm = ({
  submitForm,
  minSalary,
  maxSalary,
  setMinSalary,
  setMaxSalary,
}: ISearchForm) => {
  return (
    <form
      className="flex flex1 items-center h-12 w-full"
      onSubmit={(e) => {
        e.preventDefault();
        submitForm();
      }}
    >
      <button className="bg-gray-400 rounded-l h-full px-4 ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 30 30"
          width="30px"
          height="30px"
        >
          <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z" />
        </svg>
      </button>
      <InputBox isMin={true} value={minSalary} setValue={setMinSalary} />
      <h1 className="mx-10 text-lg text-gray-700 flex-grow text-center">-</h1>
      <InputBox isMin={false} value={maxSalary} setValue={setMaxSalary} />
    </form>
  );
};

interface IInputBox {
  isMin: boolean;
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
}

const InputBox = ({ isMin, value, setValue }: IInputBox) => {
  return (
    <div
      className={`border border-gray-400 rounded-r h-full w-5/12 flex items-center ${
        isMin ? "" : "rounded-l"
      }`}
    >
      <div className="mx-2 flex flex-col justify-center">
        <div className="text-sm text-gray-400 font-bold">
          {isMin ? "Minimum salary" : "Maximum salary"}{" "}
        </div>
        <div className="text-xs font-bold">Enter amount</div>
      </div>
      <h1 className="mx-2 text-xl">$</h1>
      <input
        className="flex-1 h-full p-2"
        value={value}
        type="number"
        pattern="[0-9]"
        required={false}
        onChange={(e) => setValue(Number(e.target.value))}
      />
    </div>
  );
};

export default SearchForm;
