import React, { useState, useEffect } from 'react';
import { motion, type Variants, AnimatePresence } from 'framer-motion';
import { 
  Github, Linkedin, Mail, 
  Zap, Trophy, Terminal,
  Music, Pizza, GraduationCap, Mountain,
  Languages, Fish, Monitor, FileText, ArrowUpRight, ChevronDown, X
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- UTILS ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- PHYSICS CONFIG ---
const SPRING_PHYSICS = { 
  type: "spring" as const, 
  mass: 1, 
  stiffness: 280, 
  damping: 18 
};

const ICON_PHYSICS = {
  type: "spring" as const,
  mass: 1,
  stiffness: 300,
  damping: 20
};

const MODAL_PHYSICS = {
  type: "spring" as const,
  mass: 1,
  stiffness: 400,
  damping: 25
};

// --- ANIMATION VARIANTS ---
const KEYWORD_VARIANTS: Variants = {
  rest: { 
    scale: 1, 
    rotate: 0,
    transition: { duration: 0.2, type: "tween" }
  },
  hover: { 
    scale: 1.1, 
    rotate: [0, 2, -2, 0],
    transition: { 
      duration: 0.3, 
      repeat: Infinity, 
      repeatType: "reverse"
    }
  }
};

// --- DATA ---
const PERSONAL = {
  name: "Jacob Lindland",
  role: "Mechanical Engineer + CS Minor",
  location: "Gainesville, FL",
  emoji: "👋"
};

const EXPERIENCE = [
  { 
    company: "GE Aerospace", 
    role: "Engines Engineering Intern", 
    year: "2026", 
    emoji: "✈️",
    desc: [
      "Performed thermal simulation and analysis in ANSYS to validate the design of an IR camera probe for the RISE compact core High Pressure Turbine.",
      "Supported root cause investigations by manufacturing thin-film sensor arrays using RF sputtering and photolithography."
    ]
  },
  { 
    company: "Univ. of Florida", 
    role: "Teaching Assistant", 
    year: "2026", 
    emoji: "🐊",
    desc: [
      "Hosted weekly office hours for 300+ students to review lecture content and break down complex topics.",
      "Graded and evaluated over 200 implementations of numerical methods across homework and exams."
    ]
  },
  { 
    company: "GE Appliances", 
    role: "Manufacturing Eng. Co-op", 
    year: "2024", 
    emoji: "🏠",
    desc: [
      "Collaborated on a lean team to design and prototype an alignment fixture, eliminating 80% of downtime caused by common line stoppage.",
      "Developed analytics to track 10,000+ granular ESD safety compliance indicators, boosting compliance by 90%.",
      "Automated a compliance tracking and reporting system with scripting and data visualization to save 300+ hours annually."
    ]
  },
  { 
    company: "Dept. of State", 
    role: "Consulate Intern", 
    year: "2023", 
    emoji: <img src="https://flagcdn.com/w80/us.png" alt="US Flag" className="w-6 h-4 object-cover rounded-sm" />,
    desc: [
      "Assisted in reforming our Smart Traveler Enrollment Program database to secure details of American citizens traveling throughout eastern and central Europe."
    ]
  },
  { 
    company: "ABB Robotics", 
    role: "Web Dev Intern", 
    year: "2022", 
    emoji: "🤖",
    desc: [
      "Prototyped WebGL app for customers to modularly build their custom configurations in a 3D environment."
    ]
  }
];

const PROJECTS = [
  { 
    title: "Autonomous Bamboo Harvester", 
    tag: "Robotics & CV", 
    desc: "Trained a real-time YOLO model for segmenting bamboo culms alongside a custom 6-axis robot pruner.",
    longDesc: "Designed and fabricated a custom electric pruner end-effector mounted to a 6-axis robotic arm. The hardware integrates specific bearings and a gear train verified with tight GD&T. To drive autonomous operation, I developed a ROS2-Python reinforcement learning pipeline that trains a real-time YOLO computer vision model to identify and segment bamboo culms in chaotic environments.",
    stack: ["ROS2", "Python", "YOLO", "SolidWorks"],
    emoji: "🎋", 
    gradient: "bg-gradient-to-r from-green-500 to-emerald-700",
    images: [
      "/point_cloud.png",
      "/cutting.png"
    ]
  },
  { 
    title: "Mars Rover Sky Crane", 
    tag: "Controls", 
    desc: "Designed PID and state-feedback controllers in Simulink with frequency-domain loop shaping.",
    longDesc: "Engineered the control architecture for a multi-stage Sky Crane landing system. Implemented PID and state-feedback controllers in Simulink, utilizing frequency-domain loop shaping on Bode plots to optimize phase and gain margins. The system's stability was rigorously validated against non-linear dynamics using a high-fidelity MATLAB state-space matrix simulation to ensure safe payload delivery.",
    stack: ["MATLAB", "Simulink", "Control Theory"],
    emoji: "🚀", 
    gradient: "bg-gradient-to-r from-red-500 to-orange-600",
    images: [
      "bode_plot.png",
      "nonlinear_sym.png"
    ]
  },
  { 
    title: "Compressed Air Engine", 
    tag: "Manufacturing & Design", 
    desc: "Designed and machined a pneumatic engine utilizing compressed air for power generation.",
    longDesc: "Led the mechanical design and manufacturing of a pneumatic engine powered entirely by compressed air. Emphasized extremely tight tolerances and applied rigorous GD&T principles to ensure optimal fluid dynamic efficiency. The components were manually machined using standard mills and lathes, bringing a high degree of physical precision to the final operational assembly.",
    stack: ["SolidWorks", "Machining", "GD&T"],
    emoji: "⚙️", 
    gradient: "bg-gradient-to-r from-emerald-400 to-cyan-400",
    images: [
      "/flywheel.png",
      "/engine_assem.png"
    ]
  },
  { 
    title: "Manual Wheelchair Motorization", 
    tag: "Controls", 
    desc: "Developed closed-loop PID control system for regenerative braking and motorization.",
    longDesc: "Developed a closed-loop PID control system to motorize a manual wheelchair with advanced regenerative braking capabilities. Modelled the vehicle kinematics and battery dynamics in MATLAB/Simulink, and successfully deployed the resulting C++ control algorithms to an embedded microcontroller. This ensured a smooth, highly responsive user experience while efficiently recovering kinetic energy.",
    stack: ["C++", "Matlab", "Simulink"],
    emoji: "♿", 
    gradient: "bg-gradient-to-r from-blue-500 to-indigo-500",
    images: [
      "/wheelchair_assem.png",
      "/wheelchair_forces.png"
    ]
  },
  { 
    title: "Regolith Printing Rover", 
    tag: "Materials", 
    desc: "Formulated Lunar regolith PLA matrix composites suitable for FDM additive manufacturing.",
    longDesc: "Researched In-situ Resource Utilization (ISRU) technologies by developing novel Lunar regolith-PLA matrix composites tailored for FDM 3D printing. Characterized the composite material's mechanical properties by conducting extensive Instron UTM uniaxial loading tests and applying statistical analyses, aiming to validate the feasibility of autonomous lunar habitat construction using native surface materials.",
    stack: ["ROS2", "Python", "Ansys"],
    emoji: "🌑", 
    gradient: "bg-gradient-to-r from-violet-500 to-fuchsia-500",
    images: [
      "/fefil_evo.jpg",
      "/regolith.jpg"
    ]
  },
];

const SKILLS_ROW_1 = [
  "SOLIDWORKS", "MATLAB", "FEA", "ANSYS", "PYTHON", "ROS2", "GIT"
];

const SKILLS_ROW_2 = [
  "SIMULINK", "GD&T", "SIMULINK", "FUSION 360", "CONTROLS", "EMBEDDED", "PYTHON"
];

const INTERESTS = [
  { icon: <Pizza size={16} />, label: "Vegetarian Cooking" }, 
  { icon: <Music size={16} />, label: "Bass Guitar" },
  { icon: <Languages size={16} />, label: "German" },
  { icon: <Fish size={16} />, label: "Scuba" },
  { icon: <Mountain size={16} />, label: "Rock Climbing" },
];

// --- COMPONENTS ---

const MobileView = () => {
  return (
    <div className="h-screen w-screen bg-zinc-950 text-white flex flex-col items-center justify-center p-8 text-center overflow-hidden relative">
      <div className="absolute top-[-20%] left-[-20%] w-[140%] h-[140%] bg-gradient-to-br from-indigo-900/40 via-purple-900/40 to-rose-900/40 blur-3xl -z-10" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center max-w-sm"
      >
        <div className="mb-8 relative">
          <div className="w-40 h-40 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center shadow-2xl">
             <img src="/memoji2.png" alt="Me" className="w-32 h-32 object-contain drop-shadow-lg" />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-white text-black p-2 rounded-full shadow-lg">
            <Monitor size={20} />
          </div>
        </div>

        <h1 className="text-4xl font-black mb-2 tracking-tight">Jacob Lindland</h1>
        <p className="text-white/60 mb-8 font-medium">Mechanical Engineer + CS Minor</p>

        <div className="bg-white/10 border border-white/10 rounded-2xl p-6 backdrop-blur-md mb-8">
          <h2 className="text-lg font-bold mb-2 flex items-center justify-center gap-2">
            <Terminal size={18} /> Desktop Recommended
          </h2>
          <p className="text-sm text-white/70 leading-relaxed">
            This portfolio features a complex, physics-based interactive grid designed for larger screens. Please open this link on your computer for the full experience!
          </p>
        </div>

        <div className="flex gap-6 opacity-80">
          <Github />
          <Linkedin />
          <Mail />
        </div>
      </motion.div>
    </div>
  );
};

const InfiniteTicker = ({ 
  items, 
  direction = "left", 
  speed = 20,
  active = false 
}: { 
  items: string[], 
  direction?: "left" | "right", 
  speed?: number,
  active?: boolean 
}) => {
  return (
    <div className={cn(
      "flex overflow-hidden whitespace-nowrap relative transition-all duration-300 ease-out",
      active ? "pt-14 pb-2" : "pt-4 pb-0"
    )}>
       <div className="absolute left-0 top-0 bottom-0 w-8 z-10 bg-gradient-to-r from-black/20 to-transparent pointer-events-none" />
       <div className="absolute right-0 top-0 bottom-0 w-8 z-10 bg-gradient-to-l from-black/20 to-transparent pointer-events-none" />
       
      <motion.div 
        className={cn("flex transition-all duration-300 ease-out", active ? "gap-8" : "gap-2")}
        animate={{ 
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] 
        }}
        transition={{ 
          duration: speed, 
          ease: "linear", 
          repeat: Infinity 
        }}
      >
        {[...items, ...items].map((item, i) => (
          <div key={i} className={cn("flex items-end py-2 transition-all duration-300 ease-out", active ? "gap-8" : "gap-2")}>
            <span 
              className={cn(
                "text-4xl md:text-5xl font-black uppercase tracking-tighter text-white/90 transform origin-bottom inline-block transition-transform duration-300 ease-out",
                active ? "scale-y-[2.5]" : "scale-y-[0.75]"
              )}
            >
              {item}
            </span>
            <span className="text-2xl text-white/20 flex items-center justify-center mb-1">
              ★
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const ContentSwitch = ({ 
  isActive, 
  collapsed, 
  expanded 
}: { 
  isActive: boolean; 
  collapsed: React.ReactNode; 
  expanded: React.ReactNode; 
}) => {
  return (
    <div className="w-full h-full relative overflow-hidden">
      <motion.div 
        initial={false}
        animate={{ 
          opacity: isActive ? 0 : 1, 
          scale: isActive ? 0.5 : 1,
          y: isActive ? 50 : 0
        }}
        transition={SPRING_PHYSICS}
        className="absolute inset-0 flex items-center justify-center p-2 text-center pointer-events-none"
      >
        <div className="text-4xl md:text-6xl filter drop-shadow-lg transition-transform">
          {collapsed}
        </div>
      </motion.div>

      <motion.div 
        initial={false}
        animate={{ 
          opacity: isActive ? 1 : 0, 
          scale: isActive ? 1 : 1.1,
          y: isActive ? 0 : 20
        }}
        transition={{ ...SPRING_PHYSICS, delay: isActive ? 0.1 : 0 }}
        className={cn("absolute inset-0 p-6 overflow-y-auto no-scrollbar hide-scrollbar", !isActive && "pointer-events-none")}
      >
        <div className="h-full flex flex-col">
           {expanded}
        </div>
      </motion.div>
    </div>
  );
};

const App = () => {
  const [activeCol, setActiveCol] = useState<number>(0);
  const [activeRow, setActiveRow] = useState<string | null>(null);
  const [hoveredSocial, setHoveredSocial] = useState<'github' | 'linkedin' | 'mail' | null>(null);
  const [expandedJob, setExpandedJob] = useState<number | null>(null);
  const [maxExpandedProj, setMaxExpandedProj] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleHover = (colIndex: number, rowId: string | null) => {
    // If we drift over Col 1 or Col 2, collapse the expanded project
    if (maxExpandedProj !== null && colIndex !== 2) {
       setMaxExpandedProj(null);
    }
    setActiveCol(colIndex);
    setActiveRow(rowId);
  };

  const handleLeaveGrid = () => {
    // If the mouse drifts completely off the browser window, freeze the current grid state.
    if (maxExpandedProj !== null) return;
    
    setActiveCol(0);
    setActiveRow(null);
    setExpandedJob(null);
  };

  if (isMobile) {
    return <MobileView />;
  }

  return (
    <div className="h-screen w-screen bg-white p-4 md:p-8 flex items-center justify-center font-sans selection:bg-pink-500 selection:text-white relative overflow-hidden">
      
      {/* --- IMAGE MODAL OVERLAY --- */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-12 bg-black/80 backdrop-blur-sm cursor-pointer"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors z-50"
            >
              <X className="text-white" size={24} />
            </button>
            <motion.img 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={MODAL_PHYSICS}
              src={selectedImage} 
              alt="Enlarged detail" 
              className="max-w-full max-h-full rounded-2xl shadow-2xl object-contain cursor-default"
              onClick={(e) => e.stopPropagation()} // Prevent click on image from closing modal
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN GRID */}
      <div 
        className="w-full h-full flex flex-col md:flex-row gap-4 relative z-10"
        onMouseLeave={handleLeaveGrid} 
      >
        
        {/* --- COLUMN 1: IDENTITY --- */}
        <motion.div 
          layout
          className="flex-1 flex flex-col rounded-[2rem] bg-gradient-to-br from-indigo-600 via-purple-600 to-fuchsia-600 relative overflow-hidden shadow-xl text-white shrink-0"
          animate={{ flex: activeCol === 0 ? 3 : 1 }}
          transition={SPRING_PHYSICS}
          onHoverStart={() => handleHover(0, null)}
        >
          <div className="flex-1 relative">
             <ContentSwitch 
               isActive={activeCol === 0}
               collapsed={PERSONAL.emoji}
               expanded={
                 <div className="h-full flex flex-col justify-between">
                   <div>
                     <div className="mb-6">
                       <motion.img 
                        src="/memoji2.png" 
                        alt="Me" 
                        className="w-32 h-32 md:w-48 md:h-48 object-contain drop-shadow-2xl saturate-125 cursor-pointer"
                        whileHover={{ scale: 1.1, rotate: 3 }}
                        transition={{ type: "spring", stiffness: 300, damping: 15 }}
                       />
                     </div>
                     
                     <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none mb-4 drop-shadow-md cursor-default">
                       JACOB<br/>
                       <motion.span 
                         className="text-white/50 inline-block"
                         initial={{ letterSpacing: "-0.05em" }}
                         whileHover={{ letterSpacing: "0.1em" }}
                         transition={{ type: "spring", stiffness: 300, damping: 10 }}
                       >
                         LINDLAND
                       </motion.span>
                     </h1>

                     <div className="mb-4">
                       <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-lg border border-white/10 backdrop-blur-sm">
                         <GraduationCap size={16} />
                         <span className="font-bold text-sm">University of Florida</span>
                       </div>
                     </div>

                     <p className="text-lg md:text-xl font-bold text-white/90 max-w-lg leading-relaxed drop-shadow-sm">
                       <span className="text-white">Mechanical Engineer</span> + <span className="text-white">CS Minor</span>. 
                       <br/>
                       Interested in 
                       
                       <motion.span 
                         className="text-purple-600 bg-white px-2 py-0.5 rounded-md text-sm align-middle mx-1 inline-block cursor-default"
                         variants={KEYWORD_VARIANTS}
                         initial="rest"
                         whileHover="hover"
                       >
                         analysis
                       </motion.span> 
                       
                       , 
                       
                       <motion.span 
                         className="text-indigo-600 bg-white px-2 py-0.5 rounded-md text-sm align-middle mx-1 inline-block cursor-default"
                         variants={KEYWORD_VARIANTS}
                         initial="rest"
                         whileHover="hover"
                       >
                         control systems
                       </motion.span> 

                       , and 
                       
                       <motion.span 
                         className="text-purple-600 bg-white px-2 py-0.5 rounded-md text-sm align-middle mx-1 inline-block cursor-default"
                         variants={KEYWORD_VARIANTS}
                         initial="rest"
                         whileHover="hover"
                       >
                         sensing
                       </motion.span>.
                     </p>
                   </div>
                   
                   <div className="flex gap-2 mt-8">
                     <div className="flex items-center gap-2 px-4 py-2 bg-black/30 rounded-full font-mono text-xs md:text-sm backdrop-blur-md border border-white/20 font-bold">
                       <span>📍 {PERSONAL.location}</span>
                     </div>
                   </div>
                   
                 </div>
               }
             />
          </div>

          <motion.div 
            animate={{ 
              height: activeCol === 0 ? (hoveredSocial ? 120 : 80) : 0,
              opacity: activeCol === 0 ? 1 : 0
            }}
            transition={ICON_PHYSICS}
            className="bg-black/20 backdrop-blur-lg flex justify-evenly items-center border-t border-white/10 shrink-0 relative z-20 overflow-hidden pointer-events-auto"
          >
            <motion.a 
               href="https://github.com/jdljake" 
               target="_blank" 
               rel="noopener noreferrer"
               onHoverStart={() => setHoveredSocial('github')}
               onHoverEnd={() => setHoveredSocial(null)}
               animate={{ 
                 scale: hoveredSocial === 'github' ? 1.8 : hoveredSocial ? 0.8 : 1,
                 opacity: hoveredSocial && hoveredSocial !== 'github' ? 0.5 : 1
               }}
               transition={ICON_PHYSICS}
               className="p-6 rounded-xl text-white relative z-30"
            >
              <Github size={24}/>
            </motion.a>

            <motion.a 
               href="https://www.linkedin.com/in/jacob-lindland/" 
               target="_blank" 
               rel="noopener noreferrer"
               onHoverStart={() => setHoveredSocial('linkedin')}
               onHoverEnd={() => setHoveredSocial(null)}
               animate={{ 
                 scale: hoveredSocial === 'linkedin' ? 1.8 : hoveredSocial ? 0.8 : 1,
                 opacity: hoveredSocial && hoveredSocial !== 'linkedin' ? 0.5 : 1
               }}
               transition={ICON_PHYSICS}
               className="p-6 rounded-xl text-white relative z-30"
            >
              <Linkedin size={24}/>
            </motion.a>

            <motion.a 
               href="mailto:jacoblindland@gmail.com" 
               onHoverStart={() => setHoveredSocial('mail')}
               onHoverEnd={() => setHoveredSocial(null)}
               animate={{ 
                 scale: hoveredSocial === 'mail' ? 1.8 : hoveredSocial ? 0.8 : 1,
                 opacity: hoveredSocial && hoveredSocial !== 'mail' ? 0.5 : 1
               }}
               transition={ICON_PHYSICS}
               className="p-6 rounded-xl text-white relative z-30"
            >
              <Mail size={24}/>
            </motion.a>
          </motion.div>
        </motion.div>


        {/* --- COLUMN 2: EXPERIENCE --- */}
        <motion.div 
          layout
          className="flex-1 flex flex-col rounded-[2rem] bg-gradient-to-b from-rose-500 via-orange-500 to-amber-500 text-white shadow-xl overflow-hidden shrink-0"
          animate={{ flex: activeCol === 1 ? 3 : 1 }}
          transition={SPRING_PHYSICS}
          onHoverStart={() => handleHover(1, null)}
        >
          <ContentSwitch 
            isActive={activeCol === 1}
            collapsed="⚡"
            expanded={
               <div className="h-full flex flex-col">
                 <h2 className="text-3xl font-black uppercase mb-8 flex items-center gap-4 drop-shadow-md shrink-0">
                   <Zap size={32} className="text-yellow-200" /> Experience
                 </h2>
                 <div className="space-y-3 flex-1 overflow-y-auto no-scrollbar hide-scrollbar pb-4">
                   {EXPERIENCE.map((job, i) => {
                     const isExpanded = expandedJob === i;
                     return (
                       <motion.div 
                         key={i}
                         layout
                         onClick={() => setExpandedJob(isExpanded ? null : i)}
                         initial={{ x: -20, opacity: 0 }}
                         animate={{ x: 0, opacity: 1 }}
                         transition={{ delay: i * 0.1 }}
                         className="group relative p-5 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-2xl border border-white/20 transition-all hover:scale-[1.02] cursor-pointer overflow-hidden"
                       >
                         <motion.div layout className="flex justify-between items-start mb-1">
                           <h3 className="text-xl font-extrabold text-white drop-shadow-sm flex items-center gap-2">
                             <span className="text-2xl">{job.emoji}</span> {job.company}
                           </h3>
                           <span className="font-mono text-white/80 bg-black/20 px-2 py-1 rounded text-xs font-bold shrink-0 ml-2">{job.year}</span>
                         </motion.div>
                         
                         <motion.p layout className="text-sm font-bold text-white/90 pl-9 pr-6">
                           {job.role}
                         </motion.p>
                         
                         <AnimatePresence>
                           {isExpanded && (
                             <motion.div
                               initial={{ opacity: 0, height: 0, marginTop: 0 }}
                               animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                               exit={{ opacity: 0, height: 0, marginTop: 0 }}
                               transition={{ opacity: { duration: 0.2 } }}
                               className="pl-9 overflow-hidden"
                             >
                               <ul className="list-disc list-outside ml-4 text-sm text-white/80 leading-relaxed font-medium space-y-2 pr-4 marker:text-white/50">
                                 {job.desc.map((bullet, idx) => (
                                   <li key={idx}>{bullet}</li>
                                 ))}
                               </ul>
                             </motion.div>
                           )}
                         </AnimatePresence>
                         
                         <motion.div 
                            layout 
                            className="absolute top-5 right-5 text-white/70"
                         >
                           {isExpanded ? (
                             <ChevronDown size={16} className="rotate-180 transition-transform" />
                           ) : (
                             <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity text-white" />
                           )}
                         </motion.div>
                       </motion.div>
                     );
                   })}
                 </div>
                 
                 <div className="pt-4 mt-auto relative z-20 shrink-0">
                   <motion.a
                     href="/resume.pdf"
                     target="_blank"
                     rel="noopener noreferrer"
                     className="flex items-center justify-center gap-3 px-6 py-4 bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/20 rounded-2xl font-bold text-white transition-all w-full group shadow-lg"
                     whileHover={{ scale: 1.02 }}
                     whileTap={{ scale: 0.98 }}
                   >
                     <FileText className="group-hover:rotate-6 transition-transform" />
                     <span className="tracking-wide">Open Resume</span>
                   </motion.a>
                 </div>
               </div>
            }
          />
        </motion.div>


        {/* --- COLUMN 3: PROJECTS --- */}
        <motion.div 
          layout
          className="flex flex-col gap-4 bg-transparent overflow-hidden h-full" 
          animate={{ flex: maxExpandedProj !== null ? 4 : (activeCol === 2 ? 3 : 1) }}
          transition={SPRING_PHYSICS}
          onHoverStart={() => { if (maxExpandedProj === null) handleHover(2, null) }}
        >
          <AnimatePresence>
            {PROJECTS.map((proj, i) => {
              if (maxExpandedProj !== null && maxExpandedProj !== i) return null;

              const isHovered = maxExpandedProj === null && activeCol === 2 && activeRow === `proj-${i}`;
              const isMax = maxExpandedProj === i;

              return (
                <motion.div 
                  key={`proj-${i}`}
                  layout
                  onClick={() => { if (!isMax) setMaxExpandedProj(i) }}
                  onHoverStart={(e) => { e.stopPropagation(); if (!isMax) handleHover(2, `proj-${i}`); }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    flex: isMax ? 1 : (isHovered ? 4 : 1),
                    height: "auto",
                    marginBottom: 0
                  }}
                  exit={{ 
                    opacity: 0, 
                    flex: 0,
                    height: 0,
                    marginBottom: -16,
                    transition: { duration: 0.2 }
                  }}
                  transition={SPRING_PHYSICS}
                  className={cn(
                    "w-full rounded-[2rem] relative overflow-hidden shadow-lg text-white shrink-0 min-h-[80px]",
                    isMax ? "cursor-default" : "cursor-pointer",
                    proj.gradient
                  )}
                >
                  {/* STATE 1: Collapsed (Emoji Only) */}
                  <motion.div
                    animate={{ 
                      opacity: !isHovered && !isMax ? 1 : 0, 
                      scale: !isHovered && !isMax ? 1 : 0.5 
                    }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  >
                    <span className="text-4xl md:text-6xl filter drop-shadow-lg">{proj.emoji}</span>
                  </motion.div>

                  {/* STATE 2: Hovered (Text Brief & CTA) */}
                  <motion.div
                    animate={{ 
                      opacity: isHovered && !isMax ? 1 : 0, 
                      y: isHovered && !isMax ? 0 : 20 
                    }}
                    transition={{ ...SPRING_PHYSICS, delay: isHovered && !isMax ? 0.1 : 0 }}
                    className={cn(
                      "absolute inset-0 p-6 flex flex-col justify-center",
                      (!isHovered || isMax) && "pointer-events-none"
                    )}
                  >
                     <div className="mb-auto">
                       <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-black uppercase tracking-widest text-white border border-white/20">
                         {proj.tag}
                       </span>
                     </div>
                     <h3 className="text-3xl md:text-5xl font-black leading-tight mb-2 drop-shadow-md">{proj.title}</h3>
                     <p className="text-sm md:text-base font-medium text-white/90 mb-6 drop-shadow-sm line-clamp-2">{proj.desc}</p>
                     
                     <motion.div 
                       animate={{ 
                         scale: [1, 1.03, 1], 
                         boxShadow: ["0px 0px 0px rgba(255,255,255,0)", "0px 0px 15px rgba(255,255,255,0.4)", "0px 0px 0px rgba(255,255,255,0)"] 
                       }}
                       transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                       className="px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full text-sm md:text-base font-black text-white flex items-center justify-center gap-2 uppercase tracking-widest w-max shadow-xl border border-white/40"
                     >
                       Click to expand <ArrowUpRight size={20} />
                     </motion.div>
                  </motion.div>

                  {/* STATE 3: Max Expanded (Full Details & Imagery) */}
                  <motion.div
                    animate={{ 
                      opacity: isMax ? 1 : 0, 
                      y: isMax ? 0 : 40 
                    }}
                    transition={{ ...SPRING_PHYSICS, delay: isMax ? 0.1 : 0 }}
                    className={cn(
                      "absolute inset-0 p-8 flex flex-col overflow-y-auto no-scrollbar hide-scrollbar",
                      !isMax && "pointer-events-none"
                    )}
                  >
                    <div className="flex justify-between items-start mb-6 shrink-0">
                      <div>
                        <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-black uppercase tracking-widest text-white border border-white/20 inline-block mb-4">
                          {proj.tag}
                        </span>
                        <h3 className="text-4xl md:text-5xl font-black leading-tight drop-shadow-md pr-8">
                          {proj.title}
                        </h3>
                      </div>
                      
                      <button 
                        onClick={(e) => { e.stopPropagation(); setMaxExpandedProj(null); }} 
                        className="p-3 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full transition-colors shrink-0 pointer-events-auto"
                      >
                        <X size={24} className="text-white" />
                      </button>
                    </div>

                    <div className="flex gap-2 flex-wrap mb-8 shrink-0">
                      {proj.stack.map(tech => (
                        <span key={tech} className="px-3 py-1.5 bg-black/30 rounded border border-white/20 text-sm font-mono font-bold text-white">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <p className="text-lg md:text-xl font-medium text-white/95 leading-relaxed mb-10 drop-shadow-sm shrink-0">
                      {proj.longDesc}
                    </p>

                    <div className="grid grid-cols-2 gap-4 mt-auto pb-4 shrink-0">
                      {proj.images.map((img, idx) => (
                        <div 
                          key={idx} 
                          className="relative rounded-2xl overflow-hidden aspect-square shadow-lg group cursor-pointer pointer-events-auto"
                          onClick={(e) => { e.stopPropagation(); setSelectedImage(img); }}
                        >
                          <img 
                            src={img} 
                            alt={`${proj.title} detail`} 
                            className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110" 
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-50 pointer-events-none" />
                        </div>
                      ))}
                    </div>
                  </motion.div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>


        {/* --- COLUMN 4: MISC --- */}
        <AnimatePresence>
          {maxExpandedProj === null && (
            <motion.div 
              layout
              initial={{ opacity: 0, flex: 0 }}
              animate={{ opacity: 1, flex: activeCol === 3 ? 3 : 1 }}
              exit={{ opacity: 0, flex: 0, transition: { duration: 0.2 } }}
              transition={SPRING_PHYSICS}
              className="flex flex-col gap-4 bg-transparent overflow-hidden shrink-0"
              onHoverStart={() => handleHover(3, null)}
            >
               {/* Row 1: Leadership */}
               <motion.div 
                 className="flex-1 rounded-[2rem] relative bg-gradient-to-br from-yellow-400 to-orange-500 text-white shadow-lg overflow-hidden hide-scrollbar no-scrollbar"
                 animate={{ flex: activeCol === 3 && activeRow === 'lead' ? 2 : 1 }}
                 onHoverStart={(e) => { e.stopPropagation(); handleHover(3, 'lead'); }}
               >
                 <ContentSwitch 
                   isActive={activeCol === 3}
                   collapsed="🏆"
                   expanded={
                     <div className="overflow-y-auto hide-scrollbar no-scrollbar h-full">
                       <h2 className="text-2xl font-black uppercase mb-4 flex items-center gap-2 drop-shadow-md">
                         <Trophy size={24} className="text-white" /> Leadership
                       </h2>
                       <div className="space-y-4 pb-2">
                         <div className="bg-white/10 p-5 rounded-2xl backdrop-blur-sm border border-white/20">
                            <div className="text-xs font-black uppercase tracking-widest text-white/60 mb-1">Theta Tau</div>
                            <div className="text-2xl font-black mb-1 drop-shadow-sm">Regent</div>
                            <div className="text-sm font-bold text-white/80">Current President of Executive Council</div>
                         </div>
                         <div className="bg-white/10 p-5 rounded-2xl backdrop-blur-sm border border-white/20">
                            <div className="text-xs font-black uppercase tracking-widest text-white/60 mb-1">Theta Tau</div>
                            <div className="text-2xl font-black mb-1 drop-shadow-sm">Vice Regent</div>
                            <div className="text-sm font-bold text-white/80">Fall 25</div>
                         </div>
                         <div className="bg-white/10 p-5 rounded-2xl backdrop-blur-sm border border-white/20">
                            <div className="text-xs font-black uppercase tracking-widest text-white/60 mb-1">Theta Tau</div>
                            <div className="text-2xl font-black mb-1 drop-shadow-sm">Philanthropy Chair</div>
                            <div className="text-sm font-bold text-white/80">Spring 25</div>
                         </div>
                       </div>
                     </div>
                   }
                 />
               </motion.div>

               {/* Row 2: Skills (TICKER) */}
               <motion.div 
                 className="flex-1 rounded-[2rem] relative bg-gradient-to-br from-slate-900 to-purple-900 text-white shadow-lg overflow-hidden"
                 animate={{ flex: activeCol === 3 && activeRow === 'skills' ? 2 : 1 }}
                 onHoverStart={(e) => { e.stopPropagation(); handleHover(3, 'skills'); }}
               >
                 <ContentSwitch 
                   isActive={activeCol === 3}
                   collapsed="🧠"
                   expanded={
                     <div className="h-full flex flex-col overflow-hidden">
                        <h2 className="text-2xl font-black uppercase mb-4 drop-shadow-md shrink-0">Skills</h2>
                        <div className={cn(
                          "flex-1 flex flex-col justify-center relative overflow-hidden transition-all duration-300 ease-out", 
                          activeRow === 'skills' ? "gap-6" : "gap-0"
                        )}>
                          <InfiniteTicker 
                            items={SKILLS_ROW_1} 
                            direction="left" 
                            speed={35} 
                            active={activeRow === 'skills'}
                          />
                          <InfiniteTicker 
                            items={SKILLS_ROW_2} 
                            direction="right" 
                            speed={45} 
                            active={activeRow === 'skills'}
                          />
                        </div>
                     </div>
                   }
                 />
               </motion.div>

               {/* Row 3: Interests */}
               <motion.div 
                 className="flex-1 rounded-[2rem] relative bg-gradient-to-tr from-sky-400 to-blue-600 text-white shadow-lg overflow-hidden hide-scrollbar no-scrollbar"
                 animate={{ flex: activeCol === 3 && activeRow === 'interests' ? 2 : 1 }}
                 onHoverStart={(e) => { e.stopPropagation(); handleHover(3, 'interests'); }}
               >
                 <ContentSwitch 
                   isActive={activeCol === 3}
                   collapsed="🎨"
                   expanded={
                     <div className="overflow-y-auto hide-scrollbar no-scrollbar h-full">
                        <h2 className="text-2xl font-black uppercase mb-4 drop-shadow-md">Interests</h2>
                        <div className="space-y-2 pb-2">
                          {INTERESTS.map((item, i) => (
                            <div key={i} className="flex items-center gap-3 p-2 hover:bg-white/10 rounded-lg transition-colors border border-transparent hover:border-white/10">
                               <div className="p-1.5 bg-white/20 rounded-md">{item.icon}</div>
                               <span className="font-bold text-sm text-white">{item.label}</span>
                            </div>
                          ))}
                        </div>
                     </div>
                   }
                 />
               </motion.div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default App;