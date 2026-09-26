export const navItems = [
  { name: "About", link: "#about" },
  { name: "Projects", link: "#projects" },
  { name: "Testimonials", link: "#testimonials" },
  { name: "Contact", link: "#contact" },
];

export const gridItems = [
  {
    id: 1,
    title: "I thrive in collaborative tech environments, combining communication with security-first thinking.",
    description: "",
    className: "lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh]",
    imgClassName: "w-full h-full",
    titleClassName: "justify-end",
    img: "puzzle.png",
    spareImg: "",
  },
  {
    id: 2,
    title: "Native Arabic, C1 English, and A1 Russian — I adapt easily across teams and time zones.",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "",
    spareImg: "",
  },
  {
    id: 3,
    title: "My toolbox spans MERN, Python, PHP, and cybersecurity tools — plus Claude Code, n8n, and SQL/PostgreSQL through Metabase.",
    description: "I constantly try to improve",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-center",
    img: "",
    spareImg: "",
  },
  {
    id: 4,
    title: "Cybersecurity-focused developer with a passion for building and securing systems.",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "w-32 h-auto object-contain", // this line is added
    titleClassName: "justify-start",
    img: "",
    spareImg: "",
  },
  {
    id: 5,
    title: "Built projects from e-commerce to AI-integrated diagnosis apps.",
    description: "The Inside Scoop",
    className: "md:col-span-3 md:row-span-2",
    imgClassName: "absolute right-0 bottom-0 md:w-96 w-60",
    titleClassName: "justify-center md:justify-start lg:justify-center",
    img: "Yomna.png",
    spareImg: "",
  },
  {
    id: 6,
    title: "Let’s build secure and intelligent systems together.",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-center md:max-w-full max-w-60 text-center",
    img: "",
    spareImg: "",
  },
];
export const projects = [
  {
    id: 1,
    title: "ITQAN – Full-Stack Cambridge IGCSE Revision Platform",
    des: "~61K lines of TypeScript, 147 API routes, 1,025 automated tests, serving students, tutors, and parents with assignments, marking, and progress tracking — used across the UAE and Egypt.",
    img: "/itqan.svg",
    iconLists: ["/next.svg", "/ts.svg", "/tail.svg", "/three.svg", "/c.svg"],
    link: "https://itqan-web-dy2r.onrender.com",
  },
  {
    id: 2,
    title: "CuraCare – Full-Stack Healthcare Platform",
    des: "Secure platform with structured data models for patient intake, appointment flow, and medical records — admin/provider dashboards with SQL-based access controls and audit trails.",
    img: "/Carepulse.png",
    iconLists: ["/re.svg", "/tail.svg", "/ts.svg", "/three.svg", "/fm.svg"],
    link: "https://claude.ai/artifact/P7raKA66GyFudtepYzFyuf",
  },
  {
    id: 3,
    title: "Lupira – Full-Stack AI-Powered Lupus Detection App",
    des: "SVM models for early lupus risk prediction — custom datasets, clinical-input mapping to diagnostic probabilities, and visualized output guiding patient self-assessments.",
    img: "/Lupira.png",
    iconLists: ["/next.svg", "/tail.svg", "/ts.svg", "/stream.svg", "/c.svg"],
    link: "https://claude.ai/artifact/8MtmHz8e9Nh6fx4rwTQPDy",
  },
  {
    id: 4,
    title: "Horizon Banking – Full-Stack Financial Management Platform",
    des: "Responsive fintech app with secure auth, cross-account transfers, and data-driven spending analysis — SQL-based reporting for user-level insights and budgeting.",
    img: "/horizon.png",
    iconLists: ["/re.svg", "/tail.svg", "/ts.svg", "/three.svg", "/c.svg"],
    link: "https://claude.ai/artifact/TALpCQwdvDFebsQNpca2vA",
  },
];

export const testimonials = [
  {
    quote:
      "Working with Yomna was truly impressive. Her professionalism, diligence, and commitment to mastering cybersecurity concepts were evident throughout her internship. Yomna's enthusiasm for penetration testing and capture-the-flag challenges, combined with her ability to tackle complex security problems, was remarkable. If you're looking for a dedicated and talented individual to strengthen your cybersecurity initiatives, Yomna is an outstanding choice.",
    name: "Dr. Alaa Eldin",
    title: "Head of Information Systems Department, Misr University for Science and Technology",
  },
  {
    quote:
      "Collaborating with Yomna was an absolute pleasure. Her professionalism, promptness, and dedication to delivering robust backend solutions were evident throughout her internship. Yomna's enthusiasm for full stack web development, particularly in crafting scalable APIs and optimizing server-side logic with tools like Next.js, truly stood out. If you're seeking to build a reliable and high-performing backend system, Yomna is the ideal partner.",
    name: "Dr. Alaa Zaghloul",
    title: "Head of Computer Science Department, Misr University for Science and Technology",
  },
  {
    quote:
      "Yomna is a highly talented engineer with strong expertise across both full-stack development and data science. She consistently demonstrates a sharp ability to tackle complex technical challenges and she delivers elegant and effective solutions. Yomna is an excellent collaborator as she demonstrated through group discussions and proactively driving team progress. I give her my highest recommendation.",
    name: "Flavia Trotolo",
    title: "Investment Software Engineer at Liwa Capital Advisors",
  },
  {
    quote:
      "Working alongside Yomna was an inspiring experience. Their professionalism, quick problem-solving, and enthusiasm for full stack backend development were contagious throughout our internship. Yomna's knack for optimizing server-side logic and integrating reliable solutions with Next.js and Vercel deployment processes was remarkable. If you're looking for a collaborative and skilled teammate to elevate your backend systems, Yomna is an outstanding choice.",
    name: "Basma Sabour",
    title: "Fellow Intern at Misr University for Science and Technology",
  },
  {
    quote:
      "It was a privilege to mentor Yomna during during her internship. Her professionalism, proactive approach, and dedication to crafting robust backend systems were truly impressive. Yomna's ability to design efficient APIs and ensure seamless server-side performance using Express JS and tools like Sentry demonstrated exceptional skill. Her innovative solutions and commitment to excellence make Yomna an invaluable asset for any team aiming to build scalable and secure backend infrastructure.",
    name: "Kareem Mohammed",
    title: "Cyber Security Engineer at Smart Village, Internship Mentor",
  },
];

export const companies = [
  {
    id: 1,
    name: "cloudinary",
    img: "/cloud.svg",
    nameImg: "/cloudName.svg",
  },
  {
    id: 2,
    name: "appwrite",
    img: "/app.svg",
    nameImg: "/appName.svg",
  },
  {
    id: 3,
    name: "HOSTINGER",
    img: "/host.svg",
    nameImg: "/hostName.svg",
  },
  {
    id: 4,
    name: "stream",
    img: "/s.svg",
    nameImg: "/streamName.svg",
  },
  {
    id: 5,
    name: "docker.",
    img: "/dock.svg",
    nameImg: "/dockerName.svg",
  },
];

export const workExperience = [
  {
    id: 1,
    title: "Cyber Security Intern",
    desc: "Engaged in penetration testing and capture-the-flag challenges, enhancing cybersecurity skills as a cybersecurity intern.",
    className: "md:col-span-2",
    thumbnail: "/exp1.svg",
  },
  {
    id: 2,
    title: "Mobile App Dev",
    desc: "Designed and developed the backend of a mobile app for both iOS & Android platforms using Express JS.",
    className: "md:col-span-2", // change to md:col-span-2
    thumbnail: "/exp2.svg",
  },
  {
    id: 3,
    title: "Freelance App Dev Project",
    desc: "Led the dev of a mobile app for a client, from initial concept to deployment on app stores.",
    className: "md:col-span-2", // change to md:col-span-2
    thumbnail: "/exp3.svg",
  },
  {
    id: 4,
    title: "Lead Backend Developer",
    desc: "Developed and maintained an AI-powered Lupus Diagnosis Assistant mobile app features using modern backend technologies.",
    className: "md:col-span-2",
    thumbnail: "/exp4.svg",
  },
];

export const socialMedia = [
  {
    id: 1,
    img: "/git.svg",
  },
  {
    id: 2,
    img: "/twit.svg",
  },
  {
    id: 3,
    img: "/link.svg",
  },
];
