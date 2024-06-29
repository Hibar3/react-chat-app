import { useState, useEffect } from "react";

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);;
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      document.documentElement.classList.toggle('dark', newMode);
      localStorage.setItem('theme', newMode ? 'dark' : 'light');
      return newMode;
    });
  };


  return (
    <div className="flex justify-center items-center dark:bg-gray-800">
      <button
        onClick={toggleDarkMode}
        className="hover:bg-gray-500 dark:hover:bg-gray-700 p-2 rounded-lg w-12 h-12"
      >
        <svg
          className="block dark:hidden fill-violet-700"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
        </svg>
        <svg
          className="dark:block hidden fill-yellow-500"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
            fillRule="evenodd"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
  );
};

//==== Toggle switch
// <label className="inline-flex relative items-center cursor-pointer">
//   <input
//     type="checkbox"
//     value=""
//     name="light-switch"
//     className="peer sr-only"
//     checked={theme === "dark" ? false : true}
//     onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
//   />
//   <div className="after:top-0.5 after:absolute after:content-[''] peer-checked:after:border-white after:border-gray-300 dark:border-gray-600 bg-gray-200 after:bg-white dark:bg-gray-700 peer-checked:bg-purple-600 after:border rounded-full after:rounded-full w-11 after:w-5 h-6 after:h-5 after:transition-all rtl:peer-checked:after:-translate-x-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 peer-checked:after:translate-x-full after:start-[2px]"></div>
//   <span className="font-medium text-gray-900 text-sm dark:text-gray-300 ms-3">
//     {theme === "light" ? "Dark" : "Light"}
//   </span>
// </label>
