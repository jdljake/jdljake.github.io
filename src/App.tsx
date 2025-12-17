import React, { useState, useEffect } from 'react';
import { motion, type Variants, AnimatePresence } from 'framer-motion';
import { 
  Github, Linkedin, Mail, 
  Zap, Trophy, Terminal,
  Music, Pizza, Palette, GraduationCap,
  Languages, Fish, X, Monitor, FileText, ArrowUpRight // Removed ArrowRight, Kept ArrowUpRight
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
    year: "2025", 
    emoji: "✈️",
    desc: "I am an incoming Engines Engineering Intern, super excited to contribute!"
  },
  { 
    company: "GE Appliances", 
    role: "Manufacturing Quality Co-op", 
    year: "2024", 
    emoji: "🏠",
    desc: "At GE Appliances, I implemented automated factory health detection systems, spearheading culture reset and increasing compliance by 85%. I also got to develop a line fixture to reduce conveyor jams 95%."
  },
  { 
    company: "Dept. of State", 
    role: "Consulate Intern", 
    year: "2023", 
    emoji: "🇺🇸",
    desc: "At the Prague Consulate I assisted in reforming our Smart Traveler Enrollment Program database to secure details of American citizens traveling throughout eastern and central Europe."
  },
  { 
    company: "ABB Robotics", 
    role: "Web Dev Intern", 
    year: "2022", 
    emoji: "🤖",
    desc: "Prototyped WebGL app for customers to modularly build their custom configurations in a 3D environment."
  },
];

const PROJECTS = [
  { 
    title: "RC Car", 
    tag: "Rapid Prototyping", 
    desc: "High-speed autonomous vehicle design.",
    stack: ["SolidWorks", "C++", "PCB"],
    emoji: "🏎️", 
    gradient: "bg-gradient-to-r from-emerald-400 to-cyan-400"
  },
  { 
    title: "Manual Wheelchair Motorization", 
    tag: "Controls", 
    desc: "PID control for regen braking.",
    stack: ["C++", "Matlab", "Simulink"],
    emoji: "♿", 
    gradient: "bg-gradient-to-r from-blue-500 to-indigo-500"
  },
  { 
    title: "Regolith Printing Rover", 
    tag: "Materials", 
    desc: "Lunar soil additive manufacturing.",
    stack: ["ROS2", "Python", "Ansys"],
    emoji: "🌑", 
    gradient: "bg-gradient-to-r from-violet-500 to-fuchsia-500"
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
  { icon: <Palette size={16} />, label: "Drawing" },
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
        className="absolute inset-0 flex items-center justify-center p-2 text-center"
      >
        <div className="text-4xl md:text-6xl filter drop-shadow-lg cursor-pointer hover:scale-110 transition-transform">
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
        className={cn("absolute inset-0 p-6 overflow-y-auto no-scrollbar", !isActive && "pointer-events-none")}
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
  const [selectedJob, setSelectedJob] = useState<typeof EXPERIENCE[0] | null>(null);
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
    if (selectedJob) return;
    setActiveCol(colIndex);
    setActiveRow(rowId);
  };

  const handleLeaveGrid = () => {
    if (selectedJob) return;
    setActiveCol(0);
    setActiveRow(null);
  };

  if (isMobile) {
    return <MobileView />;
  }

  return (
    <div className="h-screen w-screen bg-white p-4 md:p-8 flex items-center justify-center font-sans selection:bg-pink-500 selection:text-white relative">
      
      {/* --- EXPERIENCE MODAL --- */}
      <AnimatePresence>
        {selectedJob && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedJob(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[50]"
            />
            
            <motion.div 
              className="fixed inset-0 flex items-center justify-center z-[51] pointer-events-none"
            >
              <motion.div 
                layoutId={`job-${selectedJob.company}`} 
                initial={{ scale: 0.5, opacity: 0, y: 100 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.5, opacity: 0, y: 100 }}
                transition={MODAL_PHYSICS}
                className="w-[90%] max-w-md bg-zinc-900 border border-white/20 rounded-[3rem] p-8 md:p-10 pointer-events-auto relative shadow-2xl overflow-hidden flex flex-col items-center text-center"
              >
                <button 
                  onClick={() => setSelectedJob(null)}
                  className="absolute top-6 right-6 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                >
                  <X className="text-white" size={20} />
                </button>

                <div className="text-8xl mb-6 filter drop-shadow-xl">{selectedJob.emoji}</div>

                <h3 className="text-3xl font-black text-white uppercase tracking-tight mb-2">
                  {selectedJob.company}
                </h3>
                <div className="bg-white/10 px-4 py-1.5 rounded-full mb-6">
                  <span className="font-mono text-white/90 font-bold">{selectedJob.role}</span>
                </div>

                <div className="w-full bg-white/5 rounded-3xl p-6 text-left border border-white/5">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs font-bold uppercase tracking-widest text-white/40">Overview</span>
                    <span className="text-xs font-mono text-white/40">{selectedJob.year}</span>
                  </div>
                  <p className="text-lg text-white/80 leading-relaxed font-medium">
                    {selectedJob.desc}
                  </p>
                </div>

                <div className="mt-6 flex gap-2">
                   <div className="h-2 w-12 bg-white/10 rounded-full" />
                   <div className="h-2 w-8 bg-white/10 rounded-full" />
                   <div className="h-2 w-16 bg-white/10 rounded-full" />
                </div>

              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>


      {/* MAIN GRID */}
      <div 
        className="w-full h-full flex flex-col md:flex-row gap-4 relative z-10"
        onMouseLeave={handleLeaveGrid} 
      >
        
        {/* --- COLUMN 1: IDENTITY --- */}
        <motion.div 
          className="flex-1 flex flex-col rounded-[2rem] bg-gradient-to-br from-indigo-600 via-purple-600 to-fuchsia-600 relative overflow-hidden shadow-xl text-white"
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
                         className="text-indigo-600 bg-white px-2 py-0.5 rounded-md text-sm align-middle mx-1 inline-block cursor-default"
                         variants={KEYWORD_VARIANTS}
                         initial="rest"
                         whileHover="hover"
                       >
                         control systems
                       </motion.span> 
                       
                       and 
                       
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
            animate={{ height: hoveredSocial ? 120 : 80 }}
            transition={ICON_PHYSICS}
            className="bg-black/20 backdrop-blur-lg flex justify-evenly items-center border-t border-white/10 shrink-0 relative z-20"
          >
            <motion.a 
               href="#" 
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
               href="#" 
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
               href="#" 
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
          className="flex-1 flex flex-col rounded-[2rem] bg-gradient-to-b from-rose-500 via-orange-500 to-amber-500 text-white shadow-xl overflow-hidden"
          animate={{ flex: (activeCol === 1 || selectedJob !== null) ? 3 : 1 }}
          transition={SPRING_PHYSICS}
          onHoverStart={() => handleHover(1, null)}
        >
          <ContentSwitch 
            isActive={activeCol === 1 || selectedJob !== null}
            collapsed="⚡"
            expanded={
               <div className="h-full flex flex-col">
                 <h2 className="text-3xl font-black uppercase mb-8 flex items-center gap-4 drop-shadow-md">
                   <Zap size={32} className="text-yellow-200" /> Experience
                 </h2>
                 <div className="space-y-3 flex-1 overflow-y-auto no-scrollbar hide-scrollbar">
                   {EXPERIENCE.map((job, i) => (
                     <motion.div 
                       key={i}
                       layoutId={`job-card-${i}`}
                       onClick={() => setSelectedJob(job)}
                       initial={{ x: -20, opacity: 0 }}
                       animate={{ x: 0, opacity: 1 }}
                       transition={{ delay: i * 0.1 }}
                       className="group relative p-5 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-2xl border border-white/20 transition-all hover:scale-[1.02] cursor-pointer"
                     >
                       <div className="flex justify-between items-start mb-1">
                         <h3 className="text-xl font-extrabold text-white drop-shadow-sm flex items-center gap-2">
                           <span className="text-2xl">{job.emoji}</span> {job.company}
                         </h3>
                         <span className="font-mono text-white/80 bg-black/20 px-2 py-1 rounded text-xs font-bold">{job.year}</span>
                       </div>
                       <p className="text-sm font-bold text-white/90 pl-9">{job.role}</p>
                       <ArrowUpRight size={16} className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity text-white" />
                     </motion.div>
                   ))}
                 </div>
                 
                 {/* RESUME BUTTON: Added z-20 to fix layering issue */}
                 <div className="pt-6 mt-auto relative z-20">
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
          className="flex-1 flex flex-col gap-4 bg-transparent" 
          animate={{ flex: activeCol === 2 ? 3 : 1 }}
          transition={SPRING_PHYSICS}
          onHoverStart={() => handleHover(2, null)}
        >
          {PROJECTS.map((proj, i) => {
            const isRowActive = activeCol === 2 && activeRow === `proj-${i}`;
            return (
              <motion.div 
                key={i}
                layout
                onHoverStart={(e) => { e.stopPropagation(); handleHover(2, `proj-${i}`); }}
                animate={{ flex: isRowActive ? 4 : 1 }}
                transition={SPRING_PHYSICS}
                className={cn(
                  "w-full rounded-[2rem] relative overflow-hidden shadow-lg text-white",
                  proj.gradient
                )}
              >
                <ContentSwitch 
                  isActive={isRowActive}
                  collapsed={proj.emoji}
                  expanded={
                    <div className="flex flex-col justify-end h-full">
                       <div className="mb-auto">
                         <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-black uppercase tracking-widest text-white border border-white/20">{proj.tag}</span>
                       </div>
                       <h3 className="text-3xl md:text-5xl font-black leading-tight mb-4 drop-shadow-md">{proj.title}</h3>
                       <p className="text-lg font-bold text-white/90 mb-6 drop-shadow-sm">{proj.desc}</p>
                       <div className="flex gap-2 flex-wrap">
                         {proj.stack.map(tech => (
                           <span key={tech} className="px-3 py-1 bg-black/30 rounded border border-white/20 text-xs md:text-sm font-mono font-bold text-white">{tech}</span>
                         ))}
                       </div>
                    </div>
                  }
                />
              </motion.div>
            )
          })}
        </motion.div>


        {/* --- COLUMN 4: MISC --- */}
        <motion.div 
          className="flex-1 flex flex-col gap-4 bg-transparent"
          animate={{ flex: activeCol === 3 ? 3 : 1 }}
          transition={SPRING_PHYSICS}
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
                 <div>
                   <h2 className="text-2xl font-black uppercase mb-4 flex items-center gap-2 drop-shadow-md">
                     <Trophy size={24} className="text-white" /> Leadership
                   </h2>
                   <div className="bg-white/10 p-5 rounded-2xl backdrop-blur-sm border border-white/20">
                      <div className="text-xs font-black uppercase tracking-widest text-white/60 mb-1">Theta Tau</div>
                      <div className="text-2xl font-black mb-1 drop-shadow-sm">Regent</div>
                      <div className="text-sm font-bold text-white/80">Current President of Executive Council</div>
                   </div>
                   <br></br>
                   <div className="bg-white/10 p-5 rounded-2xl backdrop-blur-sm border border-white/20">
                      <div className="text-xs font-black uppercase tracking-widest text-white/60 mb-1">Theta Tau</div>
                      <div className="text-2xl font-black mb-1 drop-shadow-sm">Vice Regent</div>
                      <div className="text-sm font-bold text-white/80">Fall 25</div>
                   </div>
                   <br></br>
                   <div className="bg-white/10 p-5 rounded-2xl backdrop-blur-sm border border-white/20">
                      <div className="text-xs font-black uppercase tracking-widest text-white/60 mb-1">Theta Tau</div>
                      <div className="text-2xl font-black mb-1 drop-shadow-sm">Philanthropy Chair</div>
                      <div className="text-sm font-bold text-white/80">Spring 25</div>
                   </div>
                   <br></br>
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
                 <div>
                    <h2 className="text-2xl font-black uppercase mb-4 drop-shadow-md">Interests</h2>
                    <div className="space-y-2">
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

      </div>
    </div>
  );
};

export default App;