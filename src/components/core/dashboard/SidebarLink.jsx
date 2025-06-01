import React, { useState, useEffect } from "react";
import * as Icons from "react-icons/vsc";
import { useSelector } from "react-redux";
import { NavLink, useLocation, matchPath } from "react-router-dom";

const SidebarLink = ({ link, iconName ,setIsSidebarOpen}) => {
  const {user} = useSelector((state)=> state.profile);
  const patientId = user?._id
  const Icon = Icons[iconName];
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const hasChildren = link.children && link.children.length > 0;


  // Match the current route
  const matchRoute = (route) => {
    return matchPath({ path: route, end: false }, location.pathname);
  };

  // Check if parent or any child is active
  const isParentOrChildActive = () => {
    if (matchRoute(link.path)) return true;
    if (hasChildren) {
      return link.children.some((child) => matchRoute(child.path));
    }
    return false;
  };

  // Auto-expand if any child is active
  useEffect(() => {
    if (hasChildren && isParentOrChildActive()) {
      setIsOpen(true);
    }
  }, [location.pathname]);

  const clickHandler =() => {
    setIsSidebarOpen(false);
  }

  return (
    <div className="w-full">

      {/* Parent Link or Button (with submenu) */}
      {hasChildren ? (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full px-8 py-2 text-sm cursor-pointer font-medium flex items-center justify-between transition-all duration-200
            ${isParentOrChildActive() ? "bg-yellow-950 text-yellow-300" : "text-gray-500"}`}
        >
          <div className="flex items-center gap-x-2">
            <Icon />
            <span className="text-lg">{link.name}</span>
          </div>
          <span>{isOpen ? "▲" : "▼"}</span>
        </button>
      ) : (
        <NavLink
          to={link.path}
          onClick={clickHandler}
          className={`relative px-8 py-2 text-sm font-medium flex items-center gap-x-2
            ${matchRoute(link.path) ? "bg-yellow-950 text-yellow-300" : "text-gray-500"}`}
        >
          <span
            className={`absolute -mt-2 left-0 right-0 h-full w-[0.2rem] bg-yellow-300 
              ${matchRoute(link.path) ? "opacity-100" : "opacity-0"}`}
          />
          <Icon />
          <span className="text-lg">{link.name}</span>
        </NavLink>
      )}

      {/* Submenu Items */}
      {hasChildren && isOpen && (
        <div className="ml-10 mt-2 flex flex-col gap-1 cursor-pointer">
          {link.children.map((child) => (
            <NavLink
              key={child.id}
              onClick={clickHandler}
              to={child.path.replace(":patientId", patientId)}
              className={`px-4 py-1 text-sm cursor-pointer rounded-md
                ${matchRoute(child.path)
                  ? "bg-yellow-700 text-black font-bold"
                  : "text-gray-600 hover:text-gray-900"}`}
            >
              {child.name}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
};

export default SidebarLink;
