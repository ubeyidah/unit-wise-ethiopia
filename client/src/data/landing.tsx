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

export const pricingAccess = [
  "Access to all study materials and resources",
  "Full use of task and schedule management tools",
  "Progress tracking and dashboard insights",
  "Interactive quizzes and assessments",
  "Community interaction and post-sharing features",
  "Free updates and new features",
];
export const pricing = {
  price: 200,
  discount: 101,
};

export const testimonials = [
  {
    name: "Abebe Alemu",
    school: "Addis Ababa High School",
    feedback: "Unit Wise Ethiopia has been a game-changer for my exam preparation. The dashboard is intuitive and helps me track my progress easily.",
    photoUrl: "https://randomuser.me/api/portraits/men/31.jpg"
  },
  {
    name: "Sara Bekele",
    school: "Hawassa Secondary School",
    feedback: "I love how everything is organized by units and topics. It made my study sessions much more focused and productive.",
    photoUrl: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    name: "Mulugeta Tesfaye",
    school: "Bahir Dar Academy",
    feedback: "This app is exactly what I needed to manage my study schedule. The lifetime access is a great value for all the features provided.",
    photoUrl: "https://randomuser.me/api/portraits/men/75.jpg"
  }
];