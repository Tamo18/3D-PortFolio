import {
    contact,
    css,
    todo,
    seaborn,
    pandas,
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
    nodejs,
    react,
    redux,
    tailwindcss,
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
        imageUrl: pandas,
        name: "Pandas",
        type: "library",
    },
    {
        imageUrl: seaborn,
        name: "seaborn",
        type: "library",
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
        link: 'https://github.com/Tamo18',
    },
    {
        name: 'LinkedIn',
        iconUrl: linkedin,
        link: 'https://www.linkedin.com/in/tamo18',
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
    {
        iconUrl: todo,
        theme: 'btn-back-red',
        name: 'Currency Converter Application',
        description: 'I integrated a third-party API to fetch live exchange rates, ensuring accurate and up-to-date currency conversion, while leveraging custom React hooks for efficient state management and side effect handling. Additionally, I utilized CSS for styling and Material-UI for UI components to enhance the visual appeal and overall user experience.',
        // link: 'https://github.com/Tamo18/PERN_TODO.git',
    },
    {
        iconUrl: todo,
        theme: 'btn-back-red',
        name: 'Airlines Data Analysis',
        description: 'I performed comprehensive analysis of restaurant data using SQL queries for advanced data extraction, transformation, and analysis, including complex joins, aggregations, and subqueries to derive actionable insights. Additionally, I processed data with Pandas and Numpy, and visualized review counts, tip counts, and ratings trends using Matplotlib and Seaborn.',
        link: 'https://github.com/Tamo18/Airlines-Data-Analysis-using-SQL-and-Python.git',
    },
    {
        iconUrl: todo,
        theme: 'btn-back-red',
        name: 'User Engagement Analysis for Restaurant Success',
        description: 'Analyzing User Engagement for Restaurant Success: This study explores how customer interactions, such as reviews, tips, and check-ins, impact restaurant performance and success. The goal is to leverage user engagement data to drive growth and enhance business outcomes.',
        link: 'https://github.com/Tamo18/User-Engagement-Analysis-for-Restaurant-Success.git',
    },
    {
        iconUrl: todo,
        theme: 'btn-back-red',
        name: 'Exploratory Data Analysis (EDA) on an automobile dataset',
        description: 'Conducted exploratory data analysis (EDA) on an automobile dataset in Jupyter Notebook, using Pandas and Numpy for data cleaning and handling missing values. Utilized Matplotlib and Seaborn to visualize data and perform univariate and bivariate analysis, exploring feature relationships.',
        link: 'https://github.com/Tamo18/Exploratory-Data-Analysis-on-Automobile-Dataset.git',
    },
];