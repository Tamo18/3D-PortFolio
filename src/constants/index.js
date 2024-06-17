import { meta, shopify, starbucks, tesla } from "../assets/images";
import {
    contact,
    css,
    todo,
    estate,
    express,
    github,
    python,
    postgres,
    cLan,
    html,
    mysql,
    javascript,
    linkedin,
    mongodb,
    mui,
    nextjs,
    nodejs,
    pricewise,
    react,
    redux,
    snapgram,
    summiz,
    tailwindcss,
    threads,
} from "../assets/icons";

export const skills = [
    {
        imageUrl: cLan,
        name: "C++",
        type: "Language",
    },
    {
        imageUrl: python,
        name: "Python",
        type: "Language",
    },
    {
        imageUrl: postgres,
        name: "Postgres",
        type: "Database",
    },
    {
        imageUrl: css,
        name: "CSS",
        type: "Frontend",
    },
    {
        imageUrl: express,
        name: "Express",
        type: "Backend",
    },
    {
        imageUrl: github,
        name: "GitHub",
        type: "Version Control",
    },
    {
        imageUrl: html,
        name: "HTML",
        type: "Frontend",
    },
    {
        imageUrl: javascript,
        name: "JavaScript",
        type: "Frontend",
    },
    {
        imageUrl: mongodb,
        name: "MongoDB",
        type: "Database",
    },
    {
        imageUrl: mui,
        name: "Material-UI",
        type: "Frontend",
    },
    {
        imageUrl: mysql,
        name: "mysql",
        type: "Database",
    },
    {
        imageUrl: nodejs,
        name: "Node.js",
        type: "Backend",
    },
    {
        imageUrl: react,
        name: "React",
        type: "Frontend",
    },
    {
        imageUrl: redux,
        name: "Redux",
        type: "State Management",
    },
    {
        imageUrl: tailwindcss,
        name: "Tailwind CSS",
        type: "Frontend",
    }
];

// export const experiences = [
//     {
//         title: "",
//         company_name: "",
//         icon: ,
//         iconBg: "",
//         date: "",
//         points: [
//             "",
//         ],
//     },
//     {
//         title: "",
//         company_name: "",
//         icon: ,
//         iconBg: "",
//         date: "",
//         points: [
//             "",
//         ],
//     },
// ];

export const socialLinks = [
    {
        name: 'Contact',
        iconUrl: contact,
        link: '/contact',
    },
    {
        name: 'GitHub',
        iconUrl: github,
        link: 'https://github.com/YourGitHubUsername',
    },
    {
        name: 'LinkedIn',
        iconUrl: linkedin,
        link: 'https://www.linkedin.com/in/YourLinkedInUsername',
    }
];

export const projects = [
    {
        iconUrl: todo,
        theme: 'btn-back-red',
        name: 'Todo List',
        description: 'Developed a full-stack web application using the PERN stack (PostgreSQL, Express.js, React, Node.js) to help users manage and track their daily tasks. The app includes features like task creation, updating, deletion, and real-time updates, all wrapped in a responsive design.',
        link: 'https://github.com/Tamo18/PERN_TODO.git',
    },
];