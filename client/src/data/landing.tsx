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
export const webEmail = "uwe.ethiopia@gmail.com";
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
    title: "Study hub",
    desc: "Share your learning progress, shrare what you know with short post and insights with the community through posts and updates.",
    icon: <MdPostAdd />,
  },
  {
    title: "Resource Library",
    desc: "Access a curated library of books, articles, and other study resources.",
    icon: <ImBook />,
  },
  // {
  //   title: "Schedule Management",
  //   desc: " Plan and manage your study schedule with integrated calendar features and reminders.",
  //   icon: <RiCalendarScheduleFill />,
  // },
];

export const whyChooseUs = [
  {
    title: "Unique First",
    desc: "Unit Wise Ethiopia is the first web app of its kind in Ethiopia, specifically designed to address the needs of students preparing for entrance exams.",
  },
  {
    title: "Free to use",
    desc: "free to use this app all resourse.",
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
  price: 0,
  discount: 0,
};

export const testimonials = [
  {
    name: "Ubeyid Oumer",
    school: "Milinium secondayr and preparatory school",
    feedback:
      "This app is exactly what I needed to manage my study schedule. The lifetime access is a great value for all the features provided.",
    photoUrl:
      "https://yt3.ggpht.com/5uKpxh2YUHCIlkYephS74ALIhYAQXNP94fYlMEHmKU2caU9dyg6HL1lhhOvUp7U-fQ9bO1Eo6A=s88-c-k-c0x00ffffff-no-rj",
  },
];

export const faqs = [
  {
    id: 2,
    title: "What study materials are included?",
    answer:
      "The app includes a comprehensive set of study materials for grades 9-12, covering both the old and new curriculums. These include textbooks, notes, quizzes, and other resources tailored to help you prepare effectively for your exams.",
  },
  {
    id: 3,
    title: "Can I switch between natural and social study types?",
    answer: `No, once you select your study type (natural or social) during the initial setup, it cannot be changed. This ensures a focused and tailored study experience. But if you want relly change you can contact us at ${webEmail}`,
  },
  {
    id: 4,
    title: "How does progress tracking work?",
    answer:
      "The dashboard provides real-time tracking of your study progress, including completed topics, remaining topics, and overall readiness for your exams. This feature helps you stay on track and identify areas that need more focus.",
  },
  {
    id: 5,
    title: "What if I need support or have questions?",
    answer: `We offer dedicated support through email(${webEmail}). If you have any questions or need assistance, you can reach out to us anytime, and we'll be happy to help.`,
  },
];

export const paymentInfo = {
  accountName: "unit wise ethiopia",
  accountNumber: "000000000000",
};

export const sources = [
  { value: "youtube", label: "YouTube" },
  { value: "social media", label: "Social Media" },
  { value: "friend", label: "Friend" },
  { value: "family", label: "Family" },
  { value: "teacher", label: "Teacher" },
  { value: "school", label: "School" },
  { value: "news articles", label: "News Articles" },
  { value: "search engines", label: "Search Engines" },
  { value: "others", label: "Others" },
  { value: "dont know", label: "I Don't Know" },
];
