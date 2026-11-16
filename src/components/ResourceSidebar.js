import React, { useState } from "react";
import { Link } from "react-router-dom";
import pagesContent from "../data/pagesContent";

const ResourceSidebar = () => {
  const resources = [
    {
      name: "Ghidra",
      link: "https://github.com/NationalSecurityAgency/ghidra",
    },
    { name: "Cuckoo", link: "https://cuckoo.cert.ee/" },
    { name: "Resource Hacker", link: "https://www.angusj.com/resourcehacker/" },
    { name: "Resource Cracker", link: "https://www.pelock.com/products/resource-cracker" },
    { name: "Kaiju", link: "https://github.com/cmu-sei/Kaiju" },
    { name: "Fakenet", link: "https://github.com/mandiant/flare-fakenet-ng" },
  ];

  const [openPage, setOpenPage] = useState(null);

  // Function to toggle the dropdown for a specific page
  const toggleDropdown = (pageIndex, hasSubheadings, pageLink) => {
    if (hasSubheadings) {
      setOpenPage(openPage === pageIndex ? null : pageIndex);
    } else {
      window.location.href = `./${pageIndex + 1}`;
    }
  };

  return (
    <div className="flex w-1/5 max-lg:hidden left-0 z-10 flex-col overflow-y-auto sticky h-screen text-white p-4 shadow-lg bg-stone-950 shadow-black scroll-smooth">
      <div className="ml-2 text-4xl font-bold mt-4">Chapters</div>
      <div className="mt-4">
        {Object.entries(pagesContent).map((page, index) => {
          const hasSubheadings = page[1].content.some(
            (item) => item.type === "subheading"
          );

          return (
            <div className="max-w-screen-sm p-2" key={index}>
              <button
                onClick={() =>
                  toggleDropdown(index, hasSubheadings, `./${index + 1}`)
                }
                className="text-xl font-bold mt-2 text-red-900 hover:underline w-full text-left"
              >
                <span className="absolute">| </span>
                <p className="pl-2">{page[1].title}</p>
              </button>
              {openPage === index && hasSubheadings && (
                <div>
                  {page[1].content.map((item) => {
                    if (item.type === "subheading")
                      return (
                        <div className="pt-1 pl-2" key={item.id}>
                          <a
                            href={`./${index + 1}#${item.id}`}
                            className="p-1 text-gray-500 hover:text-red-950"
                          >
                            {item.value}
                          </a>
                        </div>
                      );
                    else return null;
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="">
        <hr className="mt-6" />
        <h2 className="text-lg ml-2 font-bold mt-5 mb-2">Resources</h2>
        <ul>
          {resources.map((resource, index) => (
            <li key={index} className="mb-2 ml-2">
              <Link
                to={resource.link}
                className="text-white hover:text-red-950 relative"
              >
                {resource.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ResourceSidebar;
