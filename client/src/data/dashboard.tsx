import { RxDashboard } from "react-icons/rx";
import { PiBooks } from "react-icons/pi";
import { MdOutlineTaskAlt } from "react-icons/md";
import { IoReaderOutline } from "react-icons/io5";
import { LuCalendarDays } from "react-icons/lu";
import { LiaBookSolid } from "react-icons/lia";
import { FaRegNoteSticky } from "react-icons/fa6";

export const sideLinks = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <RxDashboard />,
  },
  {
    label: "Subjects",
    href: "/subjects",
    icon: <PiBooks />,
  },
  {
    label: "Study Hub",
    href: "/study-hub",
    icon: <IoReaderOutline />,
  },
  {
    label: "Tasks",
    href: "/tasks",
    icon: <MdOutlineTaskAlt />,
  },
  {
    label: "Short Notes",
    href: "/notes",
    icon: <FaRegNoteSticky />,
  },
  {
    label: "schedule",
    href: "/schedule",
    icon: <LuCalendarDays />,
  },
  {
    label: "Books",
    href: "/books",
    icon: <LiaBookSolid />,
  },
];

export const announcement = [
  {
    id: "1",
    message:
      "The Ministry of Education has announced that the Grade 12 national exams for 2017 will take place from Sené 17 to Sené 27, 2017. Best of luck to all of us.",
    date: "Sené 27, 2017",
  },
];
