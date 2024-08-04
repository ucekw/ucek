"use client";
import React, { useEffect, useRef, useState } from "react";
import Logo from "@/public/img/logo.png";
import {
  BookOpenCheck,
  BusFront,
  CodeXml,
  Cpu,
  MoreHorizontal,
  Network,
  NotebookPen,
  SwatchBook,
  Utensils,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const Nav = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);
  const dropDownButtons = useRef([]);
  const pathname = usePathname();
  const menu = [
    {
      id: 1,
      title: "Associations",
      link: "",
    },
    {
      id: 2,
      title: "Admissions",
      link: "/admissions/btech",
    },
    {
      id: 3,
      title: "PTA",
      link: "",
    },
    {
      id: 4,
      title: "Placements",
      link: "",
    },
    {
      id: 5,
      title: "Students Portal",
      link: "",
    },
    {
      id: 6,
      title: "Cells & Committes",
      link: "",
    },
    {
      id: 7,
      title: "Achievements",
      link: "",
    },
    {
      id: 8,
      title: "Image Gallery",
      link: "",
    }
  ];

  const setButtonRef = (index) => (element) => {
    dropDownButtons.current[index] = element;
  };
  const handleDropdownToggle = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      !dropDownButtons.current.some((button) => button.contains(event.target))
    ) {
      // setOpenDropdown(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white border-b z-30 h-[205px] flex items-center flex-col">
      <div className="w-full py-4 px-2 md:px-16 md:h-[155px] flex flex-col md:flex-row items-center justify-between">
        <Link href="/">
        <div className="flex items-center space-x-4">
          <Image
            width={85}
            height={85}
            src={Logo.src}
            alt="University of Kerala Logo"
            className="h-[50px] w-[50px] md:h-[85px] md:w-[85px]"
          />
          <div>
            <h1 className="text-lg font-bold text-[17.99px] md:text-[27px]">
              University College Of Engineering
            </h1>
            <p className="text-sm text-[12px] md:text-[14px]">
              Kariavattom, Thiruvananthapuram
            </p>
          </div>
        </div>
        </Link>
        <nav className="flex-wrap justify-evenly gap-3 flex md:space-x-10 mt-4 md:mt-0 text-[14px] md:text-[16px] font-[500]">
          {pathname != "/" && (
            <Link href="/" className="text-gray-600 hover:text-gray-800">
              Home
            </Link>
          )}
          <div className="relative">
            <button
              ref={setButtonRef(1)}
              onClick={() => handleDropdownToggle("academics")}
              className="text-gray-600 hover:text-gray-800 flex items-center"
            >
              Cells & Committes
              <svg
                className="w-3 h-3 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div
              ref={dropdownRef}
              className={`absolute left-0 mt-2 w-40 bg-white border rounded-xl md:text-[14px] text-[12px] z-10 shadow-lg ${
                openDropdown === "academics" ? "block" : "hidden"
              }`}
            >
              <Link
                href="/cells/union"
                className="flex px-4 text-gray-600 hover:bg-gray-100 gap-2 items-center py-3"
              >
                College Union
              </Link>
              <Link
                href="/cells/pta"
                className="flex px-4 text-gray-600 hover:bg-gray-100 gap-2 items-center py-3"
              >
                PTA
              </Link>
              <Link
                href="/cells/anti-ragging"
                className="flex px-4 text-gray-600 hover:bg-gray-100 gap-2 items-center py-3"
              >
                Anti Ragging
              </Link>
              <Link
                href="/cells/womencell"
                className="flex px-4 text-gray-600 hover:bg-gray-100 gap-2 items-center py-3"
              >
                Women Cell
              </Link>
              <Link
                href="/cells/placement"
                className="flex px-4 text-gray-600 hover:bg-gray-100 gap-2 items-center py-3"
              >
                Placement Cell
              </Link>
              <Link
                href="/cells"
                className="flex px-4 text-gray-600 hover:bg-gray-100 gap-2 items-center py-3"
              >
                <MoreHorizontal/>View All
              </Link>


            </div>
          </div>

          <div className="relative">
            <button
              ref={setButtonRef(2)}
              onClick={() => handleDropdownToggle("facilities")}
              className="text-gray-600 hover:text-gray-800 flex items-center"
            >
              Clubs
              <svg
                className="w-3 h-3 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div
              ref={dropdownRef}
              className={`absolute left-0 mt-2 w-40 bg-white border rounded-xl md:text-[14px] text-[12px] z-10 shadow-lg ${
                openDropdown === "facilities" ? "block" : "hidden"
              }`}
            >
              <Link
                href="#"
                className="flex px-4 text-gray-600 hover:bg-gray-100 gap-2 items-center py-3"
              >
                Mulearn UCEK
              </Link>
              
              <Link
                href="#"
                className="flex px-4 text-gray-600 hover:bg-gray-100 gap-2 items-center py-3"
              >
                Google DSC
              </Link>
              <Link
                href="#"
                className="flex px-4 text-gray-600 hover:bg-gray-100 gap-2 items-center py-3"
              >
                IEEE SB UCEK
              </Link>
              <Link
                href="#"
                className="flex px-4 text-gray-600 hover:bg-gray-100 gap-2 items-center py-3"
              >
                Legacy IEDC
              </Link>
              <Link
                href="#"
                className="flex px-4 text-gray-600 hover:bg-gray-100 gap-2 items-center py-3"
              >
                NSS
              </Link>
              <Link
                href="#"
                className="flex px-4 text-gray-600 hover:bg-gray-100 gap-2 items-center py-3"
              >
                FOSS Club
              </Link>
              
            </div>
          </div>
          <div className="relative">
            <button
              ref={setButtonRef(3)}
              onClick={() => handleDropdownToggle("departments")}
              className="text-gray-600 hover:text-gray-800 flex items-center "
            >
              Departments
              <svg
                className="w-3 h-3 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div
              ref={dropdownRef}
              className={`origin-top-right absolute right-0 md:left-0 mt-2 w-72 bg-white border rounded-xl md:text-[14px] text-[12px] z-10 shadow-lg ${
                openDropdown === "departments" ? "block" : "hidden"
              }`}
            >
              <Link
                href="/departments/cse"
                className="flex px-4 text-gray-600 hover:bg-gray-100 gap-2 items-center py-3"
              >
                <CodeXml className="md:w-6 w-5" />
                Computer Science &amp; Engineering
              </Link>
              <Link
                href="/departments/ece"
                className="flex px-4 text-gray-600 hover:bg-gray-100 gap-2 items-center py-3"
              >
                <Cpu className="md:w-6 w-5" />
                Electronics &amp; Communication Engineering
              </Link>
              <Link
                href="/departments/it"
                className="flex px-4 text-gray-600 hover:bg-gray-100 gap-2 items-center py-3"
              >
                <Network className="md:w-6 w-5" />
                Information Technology
              </Link>
              <Link
                href="/departments/gen"
                className="flex px-4 text-gray-600 hover:bg-gray-100 gap-2 items-center py-3"
              >
                <BookOpenCheck className="md:w-6 w-5" />
                General Departments
              </Link>
            </div>
          </div>
          <Link href="#" className="text-gray-600 hover:text-gray-800">
            About Us
          </Link>
        </nav>
      </div>
      <div className="md:h-[50px] bg-white border-t-[1.8px] border-[#2D3E50] w-full flex items-center ">
        <div className="w-full px-5 md:px-4 md:py-0 mt-2 md:mt-0 flex flex-wrap justify-center md:justify-evenly ">
          {menu.map((item, idx) => (
            <div key={`p${idx}`} className="flex items-center">
              <Link
                key={item.id}
                href={item.link}
                className="text-[#2D3E50] text-[12px] md:text-[14px] hover:text-gray-800 font-[600] border-gray-300 md:border-none md:last:border-none"
              >
                {item.title}
              </Link>
              {idx < menu.length - 1 && (
                <span className="mx-2 visible md:hidden text-gray-300">•</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Nav;
