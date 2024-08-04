import { ThemeSwitcher } from "@/lib/ThemeSwitcher";


/** Header Props */
type HeaderProps = {
  title?: string;
  isToggled?: boolean;
  onToggle?: () => void;
};

export const CHeader = (props?: HeaderProps) => {
  const { title, isToggled, onToggle } = props || {};

  return (
    <header className="max-w-full max-h-14 overflow-auto">
      <nav className="bg-stone-800 dark:bg-gray-900">
        <div className="px-2 sm:px-4 lg:px-2 max-w-full">
          <div className="flex justify-between items-center h-16">
            <div className="left-0 inset-y-0 flex items-center">
              {/* <button
                type="button"
                className="sm:inline-flex relative justify-center items-center hidden hover:bg-gray-700 p-2 rounded-md text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
                onClick={onToggle}
              >
                <span className="absolute -inset-0.5"></span>
                <span className="sr-only">Open main menu</span>
                <svg
                  className="block w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>

                <svg
                  className="hidden w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button> */}
            </div>
            <div className="flex flex-1 justify-center sm:justify-start items-center sm:items-stretch">
              <div className="sm:block hidden sm:ml-6">
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="hover:bg-gray-700 px-3 py-2 rounded-md font-medium text-gray-300 text-sm hover:text-white"
                  >
                    {title}
                  </a>
                </div>
              </div>
            </div>
            <div className="right-0 sm:static inset-y-0 sm:inset-auto flex items-center sm:ml-6 pr-2 sm:pr-0">
              <ThemeSwitcher />
              <button
                type="button"
                className="relative bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <span className="absolute -inset-1.5"></span>
                <span className="sr-only">View notifications</span>
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                  />
                </svg>
              </button>
              <div className="relative ml-3">
                <div>
                  <button
                    type="button"
                    className="relative flex bg-gray-800 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    id="user-menu-button"
                    aria-expanded="false"
                    aria-haspopup="true"
                  >
                    <span className="absolute -inset-1.5"></span>
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="rounded-full w-8 h-8"
                      src="https://cdn-icons-png.flaticon.com/512/4646/4646084.png"
                      width={200}
                      height={200}
                      alt="/"
                    />
                  </button>
                </div>
                {/* <div
                  className="right-0 z-10 absolute bg-white ring-opacity-5 shadow-lg mt-2 py-1 rounded-md w-48 origin-top-right ring-1 ring-black focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                  tabIndex={-1}
                >
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-700 text-sm"
                    role="menuitem"
                    tabIndex={-1}
                    id="user-menu-item-0"
                  >
                    Your Profile
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-700 text-sm"
                    role="menuitem"
                    tabIndex={-1}
                    id="user-menu-item-1"
                  >
                    Settings
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-700 text-sm"
                    role="menuitem"
                    tabIndex={-1}
                    id="user-menu-item-2"
                  >
                    Sign out
                  </a>
                </div> */}
              </div>
            </div>
          </div>
        </div>
        {/* Mobile View */}
        {/* <div className="sm:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pt-2 pb-3">
            <a
              href="#"
              className="block bg-gray-900 px-3 py-2 rounded-md font-medium text-base text-white"
              aria-current="page"
            >
              Dashboard
            </a>
            <a
              href="#"
              className="block hover:bg-gray-700 px-3 py-2 rounded-md font-medium text-base text-gray-300 hover:text-white"
            >
              Calendar
            </a>
          </div>
        </div> */}
      </nav>
    </header>
  );
};

export default CHeader;
