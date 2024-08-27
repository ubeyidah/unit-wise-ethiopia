import { ImBook } from "react-icons/im";
import { FaChartLine } from "react-icons/fa";
import { LuListTodo } from "react-icons/lu";
import { MdPostAdd } from "react-icons/md";
import { PiTreeStructureFill } from "react-icons/pi";
import { RiCalendarScheduleFill } from "react-icons/ri";

export const headerLinks = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

export const futures = [
  {
    title: "Comprehensive Curriculum Structure",
    desc: "Access detailed units and chapters from grades 9-12, including 9-10 old and 11-12 new curriculums for 2017(2025) students.",
    icon: <PiTreeStructureFill />,
  },
  {
    title: "Progress Tracking",
    desc: " Track your progress with visual indicators showing completed topics, upcoming tasks, and overall progress.",
    icon: <FaChartLine />,
  },
  {
    title: "Task Management",
    desc: "Create and manage study-related tasks with deadlines, reminders, and checklists.",
    icon: <LuListTodo />,
  },
  {
    title: "Post Creation and Sharing",
    desc: "Share your learning progress, shrare what you know with short post and insights with the community through posts and updates.",
    icon: <MdPostAdd />,
  },
  {
    title: "Resource Library",
    desc: "Access a curated library of books, articles, and other study resources.",
    icon: <ImBook />,
  },
  {
    title: "Schedule Management",
    desc: " Plan and manage your study schedule with integrated calendar features and reminders.",
    icon: <RiCalendarScheduleFill />,
  },
];
