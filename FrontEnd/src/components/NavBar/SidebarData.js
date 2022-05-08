import React from "react";
import * as giIcon from "react-icons/md";
import * as AiIcons from "react-icons/ai";
import * as RiIcons from "react-icons/ri";
import * as IconName from "react-icons/ai";
import * as BaIcon from "react-icons/bs";

export const SidebarData = [
  {
    title: "Dashboard",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: "Teacher",
    path: "/tecahers",
    icon: <BaIcon.BsFillPersonFill />,
  },
  {
    title: "Student",
    path: "/students/",
    icon: <BaIcon.BsPersonLinesFill />,
  },

  {
    title: "Announcement",
    path: "/anouncements",
    icon: <giIcon.MdOutlineAnnouncement />,
  },
  {
    title: "Class",
    path: "/classes",
    icon: <IconName.AiOutlineDollar />,
  },
];
