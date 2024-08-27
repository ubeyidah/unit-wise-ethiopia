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

export const whyChooseUs = [
  {
    title: "Unique First",
    desc: "Unit Wise Ethiopia is the first web app of its kind in Ethiopia, specifically designed to address the needs of students preparing for entrance exams.",
  },
  {
    title: "Student-Centric",
    desc: "Created by a student for students, our platform understands and addresses the real challenges you face during your exam preparation.",
  },
  {
    title: "User-Friendly Design",
    desc: "Enjoy a seamless user experience with our intuitive UI design that makes studying and tracking your progress easier and more engaging.",
  },
  {
    title: "Modern Design",
    desc: "Our beautifully designed dashboard offers a comprehensive view of your study progress and tasks, helping you stay organized and motivated.",
  },
  {
    title: "Dark/Light Mode Design",
    desc: "Our platform designed both light and dark mode. you can use your preference theme, and our platform can ditect you system theme",
  },
];
