import { cache } from "react";

export interface PortfolioData {
  name: string;
  tagline: string;
  profileImage: string;
  about: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
  techStack: {
    category: string;
    items: {
      name: string;
      icon: string;
      url: string;
    }[];
  }[];
  projects: {
    id: string;
    title: string;
    description: string;
    longDescription?: string;
    image: string;
    tags: string[];
    demoUrl?: string;
    githubUrl?: string;
    category: string;
  }[];
  achievements: {
    id: string;
    title: string;
    date: string;
    address?: string;
    description: string;
    icon?: string;
  }[];
}

// Mock data
const portfolioData: PortfolioData = {
  name: "Vemuri Prince Tarun",
  tagline: "Full Stack Developer & UI/UX Enthusiast",
  profileImage: "https://img.freepik.com/free-vector/hacker-operating-laptop-cartoon-icon-illustration-technology-icon-concept-isolated-flat-cartoon-style_138676-2387.jpg",
  about:
    "🌟 Aspiring Software Engineer | CSE Student | DSA Enthusiast 🌟\n\n" +
    "Hello! I’m currently a second-year Computer Science and Engineering student, passionately diving into the world of technology and software development.\n\n" +
    "My journey is focused on mastering Data Structures and Algorithms (DSA), as I believe they are the backbone of efficient programming and problem-solving.\n\n" +
    "💻 I’m actively enhancing my skills in full-stack development, exploring various programming languages and frameworks to create innovative solutions.\n\n" +
    "I enjoy tackling complex problems and turning ideas into functional applications.\n\n" +
    "🔍 I'm always eager to learn and grow, whether through collaborative projects, internships, or personal coding challenges.\n\n" +
    "My goal is to leverage my skills to contribute to impactful tech projects and eventually make a mark in the industry.\n\n" +
    "📫 Let’s connect! I’m excited to network with fellow tech enthusiasts, share knowledge, and explore new opportunities together.",
  socialLinks: {
    github: "https://github.com/TARUN062005",
    linkedin: "https://www.linkedin.com/in/vemuri-prince-tarun-9b8821326",
    email: "princetarunvemuri@gmail.com",
  },
  techStack: [
    {
      category: "Programming Languages",
      items: [
        { name: "C", icon: "https://upload.wikimedia.org/wikipedia/commons/1/18/C_Programming_Language.svg", url: "https://en.wikipedia.org/wiki/C_(programming_language)" },
        { name: "C++", icon: "https://upload.wikimedia.org/wikipedia/commons/1/18/ISO_C%2B%2B_Logo.svg", url: "https://en.wikipedia.org/wiki/C%2B%2B" },
        { name: "Java", icon: "https://upload.wikimedia.org/wikipedia/en/3/30/Java_programming_language_logo.svg", url: "https://en.wikipedia.org/wiki/Java_(programming_language)" },
        { name: "Python", icon: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg", url: "https://en.wikipedia.org/wiki/Python_(programming_language)" },
        { name: "JavaScript", icon: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png", url: "https://en.wikipedia.org/wiki/JavaScript" },
        { name: "TypeScript", icon: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg", url: "https://www.typescriptlang.org/" },
      ],
    },
    {
      category: "Frontend",
      items: [
        { name: "Html & Css", icon: "https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg", url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
        { name: "JavaScript", icon: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
        { name: "Tailwind CSS", icon: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg", url: "https://tailwindcss.com/" },
        { name: "Next.js", icon: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg", url: "https://nextjs.org/" },
        { name: "ShadCN/UI", icon: "https://images.seeklogo.com/logo-png/51/1/shadcn-ui-logo-png_seeklogo-519786.png", url: "https://ui.shadcn.com/" },
        { name: "React", icon: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg", url: "https://reactjs.org/" },
      ],
    },
    {
      category: "Backend",
      items: [
        { name: "Node.js", icon: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg", url: "https://nodejs.org/" },
        { name: "Express", icon: "https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png", url: "https://expressjs.com/" },
        { name: "MongoDB", icon: "https://pbs.twimg.com/profile_images/1452637606559326217/GFz_P-5e_400x400.png", url: "https://www.mongodb.com/" },
        { name: "PostgreSQL", icon: "https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg", url: "https://www.postgresql.org/" },
        { name: "GraphQL", icon: "https://upload.wikimedia.org/wikipedia/commons/1/17/GraphQL_Logo.svg", url: "https://graphql.org/" },
        { name: "Firebase", icon: "https://upload.wikimedia.org/wikipedia/commons/3/37/Firebase_Logo.svg", url: "https://firebase.google.com/" },
      ],
    },
    {
      category: "Tools & Others",
      items: [
        { name: "Git", icon: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Git-logo.svg", url: "https://git-scm.com/" },
        { name: "AWS", icon: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg", url: "https://aws.amazon.com/" },
        { name: "Figma", icon: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg", url: "https://www.figma.com/" },
        { name: "CI/CD", icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAABUoTg0hRIRysVXsNZg21ojLCOSsljUElA&s", url: "https://en.wikipedia.org/wiki/CI/CD" },
        { name: "Vercel", icon: "https://curity.io/images/resources/code-examples/code-examples-vercel.jpg", url: "https://vercel.com/" }
      ],
    },
  ],
  projects: [
    {
      id: "1",
      title: "Swap-Skill",
      description: "A platform for exchanging skills and services with others in the community.",
      longDescription:
        "Skill-Swap is a peer-to-peer skill-sharing platform that enables users to learn and teach skills by exchanging knowledge with each other. Whether someone is an expert in coding, graphic design, marketing, language learning, music, or fitness, they can offer their skills in exchange for learning something new from another user.\n\n" +
        "Skill-Swap eliminates the barrier of cost by allowing direct exchanges between users, fostering a community-driven learning ecosystem where people can grow together.",
      image: "https://media.istockphoto.com/id/1023100470/vector/businessmen-handshake-with-elements-and-icons-of-finance-and-corporate-life-tools.jpg?s=612x612&w=0&k=20&c=QQCXSnQt21cgu6Uq4nP412Uo07Hea9G4BApk25vc4oU=",
      tags: ["Html", "CSS", "MongoDB", "Javascript", "Node.js", "Express"],
      demoUrl: "https://example.com",
      githubUrl: "https://github.com",
      category: "web",
    },
    {
      id: "2",
      title: "AI CODE-EDITOR",
      description: "An AI-powered code editor that helps developers write better code faster.",
      longDescription:
        "🔍 Introduction\nIn today’s fast-paced world of software development, coding is no longer a solo journey. Developers work in teams, contributing to projects from different locations, debugging errors, and reviewing each other’s code. But switching between VS Code, GitHub, Slack, and debugging tools is time-consuming and inefficient.\n\n" +
        "💡 What if there was an all-in-one solution?\n\n" +
        "Welcome to our AI-powered collaborative code editor, an advanced development environment that:\n" +
        "✔ Fixes coding errors automatically using AI.\n" +
        "✔ Explains code in simple terms for better understanding.\n" +
        "✔ Generates code from scratch based on user instructions.\n" +
        "✔ Supports real-time collaboration like Google Docs but for coding!\n" +
        "✔ Has built-in chat so teams can communicate without switching apps.\n" +
        "✔ Works like GitHub pull/push, allowing code sharing and version control.\n\n" +
        "This editor combines AI intelligence, real-time teamwork, and cloud-based coding into one powerful tool!",
      image: "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/59/88/4d/59884d4d-60fd-75ae-717c-9106ae600592/AppIcon-0-0-1x_U007epad-0-1-85-220.png/1200x630wa.png",
      tags: ["ReactJs", "NodeJS", "Gpt-4", "VS Code"],
      demoUrl: "https://example.com",
      githubUrl: "https://github.com",
      category: "mobile",
    },
    {
      id: "3",
      title: "Face-Detection-App",
      description: "A web application that detects faces in images using machine learning.",
      longDescription:
        "This face detection app uses a pre-trained machine learning model to detect faces in images. Users can use the app to upload images, and the model will highlight the faces with bounding boxes. It also provides the option to download the image with the detected faces highlighted.",
      image: "https://media.licdn.com/dms/image/v2/D4D12AQFYAwqCnVPChg/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1691045078079?e=2147483647&v=beta&t=xrwkrzF7rrtdri-Z_2ZyeLQF5jMQ3dfpp_-4Re8yqr0",
      tags: ["Python", "Machine Learning", "Django"],
      demoUrl: "https://example.com",
      githubUrl: "https://github.com",
      category: "web",
    },
  ],
  achievements: [
    {
      id: "1",
      title: "Industrial Trainee",
      date: "June 2023 - November 2023",
      address: "MSME-CITD Hyderabad Sub Centre Vijaywada",
      description:
        "During my industrial training at MSME-CITD Hyderabad Sub Centre Vijaywada, I got exposure to industry standards in product manufacturing and learned how low-level systems work. I explored meta-programming, compilers, and the basics of system operations.",
    },
    {
      id: "2",
      title: "Round-Qualifier in TCS Codevita 12",
      date: "2024",
      description: "Participated in TCS Codevita 12 and qualified for the next round. It was a great learning experience and a chance to test my problem-solving skills.",
    },
    {
      id: "3",
      title: "Data-Science Workshop - BRAINOVISION Solutions",
      date: "November 2024",
      description:
        "Attended a workshop on data science and machine learning, where I learned about data analysis, predictive modeling, and the latest trends in AI. I worked on a project and developed an Area Safety Prediction Web Application.",
    },
    {
      id: "4",
      title: "Hackathon - National level",
      date: "Feb 2025",
      description:
        "I had the incredible opportunity to participate in the National Level Hackathon on Web Development conducted by Sir C.R. Reddy College of Engineering. It was an amazing learning experience where I collaborated with talented individuals, tackled real-world challenges, and explored innovative web solutions.",
    },
  ],
};

export const getPortfolioData = cache(async () => {
  // In a real app, you would fetch from a database
  // Simulate a delay to mimic a database call
  await new Promise((resolve) => setTimeout(resolve, 100));

  return portfolioData;
});

export async function getProjectById(id: string) {
  const data = await getPortfolioData();
  return data.projects.find((project) => project.id === id);
}

export async function getAchievementById(id: string) {
  const data = await getPortfolioData();
  return data.achievements.find((achievement) => achievement.id === id);
}