export const profile = {
  name: 'Khoury Smith',
  firstName: 'Khoury',
  lastName: 'Smith',
  role: 'Tech Lead Frontend Engineer',
  disciplines: 'Graphic design, websites, expertise — and more.',
  tagline: 'Front-end developer by day, freelancer & couch potato by night.',
  studio: "It's deeper than code",
  location: 'Atlanta, GA',
  coordinates: '33°44′56″N 84°23′24″W',
  origin: 'Born and raised in the county of Dade',
  timeZone: 'America/New_York',
  email: 'khoury.smith@gmail.com',
  phone: '786 972 9717',
  resume:
    'https://res.cloudinary.com/dh0pbh1ah/raw/upload/v1749491763/khoury_smith_resume.docx',
  social: [
    { name: 'LinkedIn', handle: 'in/khourysmith', url: 'https://www.linkedin.com/in/khourysmith/' },
    { name: 'GitHub', handle: '@krock07', url: 'https://github.com/krock07' },
  ],
};

export const manifesto =
  'I use an obsessive attention to detail, an unequivocal love for making things, and a mission-driven work ethic to build interfaces that feel effortless — and to literally change the world.';

export const bio = [
  "Hey, I'm Khoury — a software engineer who leads teams, architects platforms and still sweats the last pixel. A background in graphic design and marketing means I think about how a product looks, reads and sells, not just how it runs.",
  "Once upon a time I thought I was going to be a professional football player. Obviously that didn't happen, but I'd bet I'm the fastest developer you ever met. We can race at any time.",
];

export const offTheClock = [
  { label: 'Call of Duty', detail: "If I use the shotgun, you won't have a chance" },
  { label: 'Ex-football hopeful', detail: 'Still the fastest one in the room' },
  { label: '#flexboxninja', detail: 'Layouts bend, they never break' },
  { label: 'Couch potato', detail: 'A professional at rest, too' },
];

// `kind` drives the Work filter: shipped code vs. design work in Figma.
export const projects = [
  {
    title: 'Cleryc',
    kind: 'Development',
    summary:
      'Caregiver management for home care and Child Care agencies — roster, compliance documents and a caregiver portal in one calm workspace.',
    stack: ['Next.js', 'Tailwind CSS', 'SaaS'],
    image: '/images/work/Cleryc.png',
    url: 'https://www.cleryc.com/',
    domain: 'cleryc.com',
    featured: true,
  },
  {
    title: 'picknbuild',
    kind: 'Development',
    summary:
      'Car-buying comparison engine — one search prices the same car four ways: auction, dealer, private seller and picknbuild.',
    stack: ['Next.js', 'Tailwind CSS', 'Automotive'],
    image: '/images/work/PicknBuild.png',
    url: 'https://picknbuild.com/',
    domain: 'picknbuild.com',
    featured: true,
  },
  {
    title: 'Gap Gambler',
    kind: 'Development',
    summary: 'Stock application landing page for a catalyst sentiment platform.',
    stack: ['React', 'TypeScript'],
    image: '/images/work/GGSite.png',
    url: 'https://gapgambler.com/',
    domain: 'gapgambler.com',
    featured: true,
  },
  {
    title: 'Earnings Tournament',
    kind: 'Development',
    summary: 'Predict stock market outcomes — build the longest streak of gap picks to win up to $5,000.',
    stack: ['React', 'TypeScript'],
    image: '/images/work/ETournament.png',
    url: 'https://earningstournament.com/',
    domain: 'earningstournament.com',
    featured: true,
  },
  {
    title: 'Posh Beauty Supply',
    kind: 'Development',
    summary: 'Storefront site for an Atlanta beauty supply brand.',
    stack: ['JavaScript', 'CSS'],
    image: '/images/work/POSH.png',
    url: 'https://poshbeautysupply.com/',
    domain: 'poshbeautysupply.com',
    featured: true,
  },
  {
    title: 'Nubian Roots Beauty & Spa',
    kind: 'Development',
    summary: 'Spa website with services, booking paths and brand storytelling.',
    stack: ['JavaScript', 'CSS', 'HTML'],
    image: '/images/work/NubianRoots.png',
    url: 'https://nubianrootsbeautyandspa.com/',
    domain: 'nubianrootsbeautyandspa.com',
  },
  {
    title: 'Queendom Connections',
    kind: 'Development',
    summary: 'Youth mentorship nonprofit website.',
    stack: ['JavaScript', 'CSS', 'HTML'],
    image: '/images/work/QConnections.png',
    url: 'https://www.queendomconnectionsinc.org/',
    domain: 'queendomconnectionsinc.org',
  },
  {
    title: 'Dynasty Solutions',
    kind: 'Design',
    summary: 'Responsive website design system delivered in Figma.',
    stack: ['Figma', 'Responsive'],
    image: '/images/work/DynastySolutions.png',
    url: 'https://www.figma.com/proto/koSjS0EUPETxLUnCGCHtww/Dynasty-Solutions-Delivery_file-?node-id=4302-313&p=f&t=uLQTE1LWzVfh13rw-1&scaling=min-zoom&content-scaling=fixed&page-id=4302%3A46',
    domain: 'Figma prototype',
  },
  {
    title: 'Mary Bush Insurance',
    kind: 'Design',
    summary: 'Responsive website design for an insurance provider.',
    stack: ['Figma', 'Responsive'],
    image: '/images/work/MBush.png',
    url: 'https://www.figma.com/proto/zibhdzbmy83lL1H3hbTTP7/Figma-source-file?page-id=3336%3A59&node-id=5190-1303&viewport=250%2C107%2C0.25&t=dsSD4k74ACAHR7B3-1&scaling=min-zoom&content-scaling=fixed',
    domain: 'Figma prototype',
  },
  {
    title: 'King Los',
    kind: 'Design',
    summary: 'Music and video website design for the artist King Los.',
    stack: ['Figma', 'Music'],
    image: '/images/work/kingLos.png',
    url: 'https://www.figma.com/proto/VOM7uRN0LHVIswGyMnhiSJ/YORN_MUSIC---VIDEO-UI-TEMPLATE?page-id=101%3A6&node-id=101-79&viewport=236%2C97%2C0.13&t=eBcFl2SlRboLtuYi-1&scaling=min-zoom&content-scaling=fixed',
    domain: 'Figma prototype',
  },
];

export const stats = [
  { value: 4000, suffix: '+', label: 'Users on Vitras.ai, the AI platform I spearheaded at Cove' },
  { value: 5000, suffix: '+', label: 'Monthly users on the Next.js platform I led at 7th Ave' },
  { value: 63, suffix: '%', label: 'Shorter development cycles at BundleIQ' },
  { value: projects.length, suffix: '', label: 'Products, client sites and designs in the work index' },
];

export const experience = [
  {
    company: 'Cove',
    title: 'Tech Lead Frontend Engineer',
    start: '2023',
    end: 'Now',
    period: 'April 2023 — Present',
    summary: 'Leading frontend architecture for scalable platforms built with React, TypeScript and Vite.',
    highlights: [
      'Spearheaded Vitras.ai, an AI platform serving 4,000+ users.',
      'Delivered full-stack solutions integrating 3D data for carbon reports.',
      'Built server-driven UIs and enforced code quality through reviews.',
      'Implemented robust Cypress test suites for reliability.',
    ],
    stack: ['React', 'TypeScript', 'Vite', 'Cypress', '3D data'],
  },
  {
    company: 'Per Scholas',
    title: 'Senior Manager of Product Engineering',
    start: '2022',
    end: '2023',
    period: 'August 2022 — June 2023',
    summary: 'Led the innovation and design of software engineering curricula for in-person and remote learners.',
    highlights: [
      'Aligned curricula with industry needs and learner outcomes.',
      'Designed and prototyped new modules in React, JavaScript and TypeScript.',
      'Partnered with cross-functional teams to ship scalable educational products.',
    ],
    stack: ['React', 'JavaScript', 'TypeScript', 'Curriculum design'],
  },
  {
    company: '7th Ave',
    title: 'Lead Frontend Engineer',
    start: '2021',
    end: '2023',
    period: 'March 2021 — March 2023',
    summary: 'Engineered a high-traffic, multidimensional website with Next.js from ideation to launch.',
    highlights: [
      'Drove 5,000+ monthly users and boosted engagement by 20%.',
      'Owned delivery end to end, keeping performance and UX goals on track.',
      'Mentored junior engineers and championed best practices.',
    ],
    stack: ['Next.js', 'React', 'Performance', 'Mentorship'],
  },
  {
    company: 'BundleIQ',
    title: 'Frontend Engineer',
    start: '2020',
    end: '2021',
    period: 'August 2020 — February 2021',
    summary: 'Shipped features with cross-functional teams in agile standups, focused on precise delivery.',
    highlights: [
      'Reduced development cycles by 63%.',
      'Revamped the login flow and menu architecture in React.',
      'Delivered a 20% increase in daily user acquisition.',
    ],
    stack: ['React', 'Agile', 'Auth flows'],
  },
];

export const principles = [
  {
    eyebrow: 'Collaborate',
    title: 'Engineering is a team sport.',
    body: "The best software isn't built in silos — it's forged in collaboration. From designers and developers to stakeholders and users, every voice shapes a better product. That's why the process is open, iterative, and deeply human.",
  },
  {
    eyebrow: 'Quality',
    title: 'Bold & direct. Never compromise.',
    body: "In software engineering, quality isn't a bonus — it's the baseline. Every line of code, every architecture decision, and every deployment reflects a commitment to excellence: systems that last, scale, and adapt.",
  },
];

export const process = [
  {
    title: 'Business needs',
    body: "Tell me about your business goals and challenges, and I'll tailor a solution to your specific needs.",
  },
  {
    title: 'Inquiry form',
    body: "Have a question or ready to take the next step? Fill out the inquiry form below and I'll get back to you promptly.",
  },
  {
    title: 'Consultation',
    body: 'We dig into your challenges and opportunities together, with insights and recommendations tailored to your goals.',
  },
  {
    title: 'Develop & review',
    body: "Throughout development you'll review progress, give feedback, and make sure everything aligns with your vision.",
  },
  {
    title: 'Project delivery',
    body: 'From concept to completion, a smooth and timely delivery — with close collaboration at every stage.',
  },
];

export const services = [
  {
    title: 'Web development',
    body: 'Landing pages to complex platforms — functional, secure, scalable and engaging.',
  },
  {
    title: 'Mobile development',
    body: 'Apps for iOS and Android that run smoothly and securely in your pocket.',
  },
  {
    title: 'UI / UX design',
    body: 'Interfaces people understand at a glance, and experiences that feel effortless.',
  },
  {
    title: 'Graphic design',
    body: 'Brand, layout and visual systems — the craft my career started with.',
  },
];

export const marqueeWords = ['React', 'TypeScript', 'Next.js', 'Vite', 'Figma', 'CSS', 'Cypress', 'Jest', 'Python', 'HTML5'];

export const capabilities = [
  { group: 'Languages', items: ['TypeScript', 'JavaScript', 'HTML5', 'CSS', 'Python'] },
  { group: 'Frameworks', items: ['React', 'Next.js', 'Vite', 'Server-driven UI'] },
  { group: 'Quality', items: ['Cypress', 'Jest', 'Code review', 'Git'] },
  { group: 'Design', items: ['Figma', 'UI design', 'Graphic design', 'Design systems'] },
];

export const education = [
  { school: 'Florida State University', degree: 'M.S. Marketing & Management Communication', year: '2016' },
  { school: 'Florida A&M University', degree: 'B.S. Graphic Design', year: '2012' },
];

export const testimonials = [
  {
    quote:
      'We want to thank Khoury for the wonderful job in helping us build our website. He was professional, excellent and hard working.',
    author: 'Posh Beauty Supply',
    context: 'Website client',
  },
  {
    quote: 'I was really impressed by the quality of work from Khoury.',
    author: 'Nubian Roots Beauty and Spa',
    context: 'Website client',
  },
];

export const faqs = {
  'Web dev': [
    {
      question: 'What is web development?',
      answer:
        'Web development is the process of building and maintaining websites and web applications. It covers everything from the interface people see to the systems that power it behind the scenes. From simple landing pages to complex platforms, it keeps your digital presence functional, secure, scalable and engaging.',
    },
    {
      question: 'How do I know if I need it?',
      answer:
        "If you're launching a business, upgrading an outdated site, building a product, or need a better way to connect with your audience online — you need web development.",
    },
    {
      question: 'What does it cost?',
      answer:
        'It depends on your needs. A simple, static website may start at a few thousand dollars, while custom platforms with advanced features — user accounts, payments, dashboards — require a larger investment.',
    },
  ],
  'Mobile dev': [
    {
      question: 'What is mobile development?',
      answer:
        'Mobile development is creating apps designed to run on smartphones and tablets — iOS and Android. It spans designing the interface through writing the code that makes your app run smoothly and securely.',
    },
  ],
  'UI/UX': [
    {
      question: 'What is UI/UX?',
      answer:
        'UI (user interface) and UX (user experience) work together to shape how people interact with your product. UI is the visual side — the buttons, colors, typography and layout people see and tap. UX is the experience — how easy, intuitive and satisfying it feels to use.',
    },
  ],
};

export const sections = [
  { id: 'top', label: 'Index' },
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'process', label: 'Process' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contact', label: 'Contact' },
];
