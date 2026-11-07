// Everything you are likely to edit on the home page lives in this file.
// Change the text here and the design picks it up; no HTML needed. Blog posts are in src/content/writing.

export const site = {
  url: "https://lokesh-meruva-portfolio.vercel.app", // also set in astro.config.mjs; change both if the domain changes
  name: "Lokesh Meruva",
  title: "Lokesh Meruva | AI/ML Engineer",
  description:
    "Lokesh Meruva is an AI/ML engineer from India building agentic AI systems: multi-agent pipelines, RAG and MCP tool servers with LangGraph, Python and FastAPI.",
  ogDescription: "Agentic AI systems, multi-agent pipelines, RAG and MCP tool servers.",
  updated: "2026-11-07", // last change to the home page, used in the sitemap
  email: "lokeshmeruva10@gmail.com",
  resume: "/assets/resume.pdf",
  links: {
    github: "https://github.com/meruva-lokesh",
    linkedin: "https://linkedin.com/in/lokeshmeruva",
    huggingface: "https://huggingface.co/loki2910",
  },
};

export const hero = {
  archWord: "ENGINEER", // the curved word; geometry is tuned for about 8 letters
  intro: "Hi, I'm Lokesh Meruva. I build AI agents that plan, retrieve and act through real tools.",
  status: "Open to AI/ML engineering roles.",
  statusDetail: "B.Tech CSE (AI/ML) graduate from KL University, based in Nellore, India.",
};

// value is what the counter counts up to; suffix is added after the number
export const stats = [
  { label: "CGPA, B.Tech CSE (AI/ML)", value: "8.72" },
  { label: "AI projects shipped", value: "4" },
  { label: "Test accuracy, BIDA 2026 paper", value: "92.2", suffix: "%" },
  { label: "Industry certifications", value: "3" },
];

export const about = {
  heading: "I build AI that doesn't just answer.",
  lead: "It plans, retrieves, checks its own work and acts through real tools.",
  paragraphs: [
    "I'm an AI/ML engineer with a B.Tech in Computer Science and Engineering (AI/ML) from KL University, where I graduated in 2026 with a CGPA of 8.72. I design agentic AI systems, from voice-driven multi-agent assistants to tool servers that let AI work across spreadsheets, databases and documents.",
    "I care about the parts that make AI useful in practice: retrieval quality that is measured, not guessed, fast responses on ordinary hardware, and clean services that deploy reliably to the cloud, including Microsoft Azure, where I interned in 2025.",
    "My research on CNN-based traffic severity classification was accepted and presented at BIDA 2026. I'm looking for roles where I can build AI that ships.",
  ],
  photo: { webp: "/assets/images/lokesh/photo-about.webp", jpg: "/assets/images/lokesh/photo-about.jpg", alt: "Lokesh Meruva at KL University" },
};

// "wide" cells span two columns; keep the order wide, normal, normal, wide for the 2-1 / 1-2 layout
export const expertise = {
  heading: "What I build",
  cells: [
    {
      title: "Agentic AI systems",
      text: "Multi-agent pipelines in LangGraph that plan, search, reflect on their own output and remember users across sessions.",
      tags: ["LangGraph", "LangChain", "Multi-agent", "Memory"],
      image: "/assets/images/lokesh/svc-agents.svg",
      wide: true,
    },
    {
      title: "RAG and retrieval",
      text: "Text and image retrieval with citations, measured with RAGAS instead of guessed.",
      tags: ["RAGAS", "ChromaDB", "FAISS", "CLIP"],
      image: "/assets/images/lokesh/svc-rag.svg",
    },
    {
      title: "MCP tool servers",
      text: "Tools that let Claude read and write real business data safely.",
      tags: ["FastMCP", "FastAPI", "SQLite"],
      image: "/assets/images/lokesh/svc-mcp.svg",
    },
    {
      title: "Deep learning and NLP",
      text: "CNNs for vision and tabular data, speech-to-text with faster-whisper, and OCR pipelines for documents.",
      tags: ["TensorFlow", "CNNs", "faster-whisper", "OCR"],
      image: "/assets/images/lokesh/svc-dl.svg",
      wide: true,
    },
  ],
  also: "Python, Docker, Microsoft Azure, Streamlit, MongoDB, SQL, Hugging Face, Git and GitHub.",
};

// image is the base name of a pair in public/assets/images/lokesh: <image>.webp and <image>.jpg (1530 x 880)
export const projects = [
  {
    title: "VEDA: multi-agent voice assistant",
    url: "https://github.com/meruva-lokesh/VEDA-Agent",
    description: "LangGraph agents that plan, research, reflect and remember you across sessions, driven by voice in Telugu or English.",
    tags: ["LangGraph", "ChromaDB", "faster-whisper"],
    image: "work-veda",
    alt: "Laptop running VEDA: a spoken request passes through recall, route, plan, search, read, synthesize, reflect and write",
  },
  {
    title: "Multi-Tool MCP Server",
    url: "https://github.com/meruva-lokesh/Multi-Tool-MCP-Server",
    description: "Lets Claude read and write Google Sheets, query SQLite and search PDFs in one conversation: 9 tools and one smart router.",
    tags: ["FastMCP", "FastAPI", "SQLite"],
    image: "work-mcp",
    alt: "Tablet showing Claude answering 'Give me a full business overview' with smart_query pulling from Google Sheets, SQLite and a PDF invoice",
  },
  {
    title: "Multimodal RAG: document chat",
    url: "https://github.com/meruva-lokesh/MULTIMODAL-RAG",
    description: "Chat with PDFs, Word files and CSVs. Answers stream in with page citations and the matching images from the document.",
    tags: ["FAISS", "CLIP", "Streamlit"],
    image: "work-rag",
    alt: "Phone showing the document chat answering 'What are the 3 types of machine learning?' with a retrieved diagram and a page citation",
  },
  {
    title: "Traffic severity classification",
    url: "https://github.com/meruva-lokesh/Traffic-Flow-Prediction-Using-ML-and-DL-Models",
    description: "Published research comparing 5 ML and 4 deep models. A 1D CNN reached 92.2% test accuracy, presented at BIDA 2026.",
    tags: ["TensorFlow", "CNN", "Research"],
    image: "work-traffic",
    alt: "Tablet showing 92.2% test accuracy for the 1D CNN and an accuracy chart comparing all 9 models",
  },
];

export const credentials = {
  heading: "Research, experience and certifications",
  items: [
    { when: "2026", title: "Paper: CNN-based traffic severity classification", detail: "Accepted and presented at BIDA 2026." },
    {
      when: "2025",
      title: "AI intern, Microsoft Azure AI internship",
      detail: "AICTE and Microsoft, run by Edunet Foundation. Built and deployed ML models on Azure.",
    },
    { when: "2026", title: "B.Tech CSE (AI/ML), KL University", detail: "Graduated in 2026 with a CGPA of 8.72." },
    { when: "Certified", title: "Salesforce Certified AI Associate", detail: "Salesforce" },
    { when: "Certified", title: "MongoDB Associate DBA", detail: "MongoDB" },
    { when: "Certified", title: "Aviatrix Certified Engineer (ACE)", detail: "Aviatrix" },
  ],
};

export const contact = {
  heading: "Let's build something that thinks.",
  text: "Tell me about the role or the project. Email is the fastest way to reach me.",
};
