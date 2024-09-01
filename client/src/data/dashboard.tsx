import { RxDashboard } from "react-icons/rx";
import { PiBooks, PiMoneyWavyLight } from "react-icons/pi";
import { MdOutlineTaskAlt } from "react-icons/md";
import { IoReaderOutline } from "react-icons/io5";
import { LuCalendarDays, LuMicroscope } from "react-icons/lu";
import { LiaBookSolid } from "react-icons/lia";
import { FaRegNoteSticky } from "react-icons/fa6";
import { TbMath } from "react-icons/tb";
import { SlChemistry, SlVector } from "react-icons/sl";
import { HiOutlineLanguage } from "react-icons/hi2";
import { GrMapLocation } from "react-icons/gr";

export const sideLinks = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <RxDashboard />,
  },
  {
    label: "Subjects",
    href: "/dashboard/subjects",
    icon: <PiBooks />,
  },
  {
    label: "Study Hub",
    href: "/dashboard/study-hub",
    icon: <IoReaderOutline />,
  },
  {
    label: "Tasks",
    href: "/dashboard/tasks",
    icon: <MdOutlineTaskAlt />,
  },
  {
    label: "Short Notes",
    href: "/dashboard/notes",
    icon: <FaRegNoteSticky />,
  },
  {
    label: "schedule",
    href: "/dashboard/schedule",
    icon: <LuCalendarDays />,
  },
  {
    label: "Books",
    href: "/dashboard/books",
    icon: <LiaBookSolid />,
  },
];

export const announcement = [
  {
    id: "1",
    message:
      "The Ministry of Education has announced that the Grade 12 national exams for 2017 will take place from Sené 17 to Sené 27, 2017. Best of luck to all of us.",
    date: "Sené 17, 2017",
  },
];

export const subjectIcons = {
  math: <TbMath />,
  physics: <SlVector />,
  english: <HiOutlineLanguage />,
  biology: <LuMicroscope />,
  chemistry: <SlChemistry />,
  economics: <PiMoneyWavyLight />,
  history: <PiBooks />,
  geography: <GrMapLocation />,
};
