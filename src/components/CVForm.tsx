import React from 'react';
import { CVData, Experience, Education, Skill, Project } from '../types';
import { Plus, Trash2, ChevronDown, ChevronUp, User, Briefcase, GraduationCap, Code, FolderKanban, Languages, Layout } from 'lucide-react';
import { cn } from '../lib/utils';

interface CVFormProps {
  data: CVData;
  onChange: (data: CVData) => void;
}

const Section: React.FC<{ 
  title: string; 
  icon: React.ReactNode; 
  isOpen: boolean; 
  onToggle: () => void; 
  children: React.ReactNode 
}> = ({ title, icon, isOpen, onToggle, children }) => (
  <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm transition-all duration-200 hover:shadow-md">
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between p-4 bg-white hover:bg-primary-50/50 transition-colors"
    >
      <div className="flex items-center gap-3">
        <div className={cn(
          "p-2 rounded-lg transition-colors",
          isOpen ? "bg-primary-600 text-white" : "bg-slate-100 text-slate-600"
        )}>
          {icon}
        </div>
        <span className={cn(
          "font-bold tracking-tight transition-colors",
          isOpen ? "text-primary-700" : "text-slate-800"
        )}>{title}</span>
      </div>
      {isOpen ? <ChevronUp size={20} className="text-primary-400" /> : <ChevronDown size={20} className="text-slate-400" />}
    </button>
    {isOpen && <div className="p-6 border-t border-slate-100 space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">{children}</div>}
  </div>
);

export const CVForm: React.FC<CVFormProps> = ({ data, onChange }) => {
  const [openSection, setOpenSection] = React.useState<string>('personal');

  const updatePersonalInfo = (info: Partial<CVData['personalInfo']>) => {
    onChange({ ...data, personalInfo: { ...data.personalInfo, ...info } });
  };

  const addExperience = () => {
    const newExp: Experience = {
      id: crypto.randomUUID(),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    };
    onChange({ ...data, experiences: [...data.experiences, newExp] });
  };

  const updateExperience = (id: string, updates: Partial<Experience>) => {
    onChange({
      ...data,
      experiences: data.experiences.map((exp) => (exp.id === id ? { ...exp, ...updates } : exp)),
    });
  };

  const removeExperience = (id: string) => {
    onChange({ ...data, experiences: data.experiences.filter((exp) => exp.id !== id) });
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: crypto.randomUUID(),
      school: '',
      degree: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    };
    onChange({ ...data, educations: [...data.educations, newEdu] });
  };

  const updateEducation = (id: string, updates: Partial<Education>) => {
    onChange({
      ...data,
      educations: data.educations.map((edu) => (edu.id === id ? { ...edu, ...updates } : edu)),
    });
  };

  const removeEducation = (id: string) => {
    onChange({ ...data, educations: data.educations.filter((edu) => edu.id !== id) });
  };

  const addSkill = () => {
    const newSkill: Skill = { id: crypto.randomUUID(), name: '', level: 3 };
    onChange({ ...data, skills: [...data.skills, newSkill] });
  };

  const updateSkill = (id: string, updates: Partial<Skill>) => {
    onChange({
      ...data,
      skills: data.skills.map((skill) => (skill.id === id ? { ...skill, ...updates } : skill)),
    });
  };

  const removeSkill = (id: string) => {
    onChange({ ...data, skills: data.skills.filter((skill) => skill.id !== id) });
  };

  const addProject = () => {
    const newProject: Project = { id: crypto.randomUUID(), name: '', link: '', description: '' };
    onChange({ ...data, projects: [...data.projects, newProject] });
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    onChange({
      ...data,
      projects: data.projects.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    });
  };

  const removeProject = (id: string) => {
    onChange({ ...data, projects: data.projects.filter((p) => p.id !== id) });
  };

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? '' : section);
  };

  return (
    <div className="space-y-4 max-w-2xl mx-auto pb-20">
      {/* Template Selection */}
      <Section title="Templates" icon={<Layout size={18} />} isOpen={openSection === 'template'} onToggle={() => toggleSection('template')}>
        <div className="grid grid-cols-3 gap-4">
          {(['modern', 'classic', 'minimal'] as const).map((t) => (
            <button
              key={t}
              onClick={() => onChange({ ...data, template: t })}
              className={cn(
                "p-4 rounded-xl border-2 transition-all text-sm font-bold uppercase tracking-wider",
                data.template === t 
                  ? "border-primary-600 bg-primary-600 text-white shadow-lg shadow-primary-200" 
                  : "border-slate-100 bg-slate-50 text-slate-500 hover:border-primary-200 hover:text-primary-600"
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </Section>

      {/* Personal Info */}
      <Section title="Personal Information" icon={<User size={18} />} isOpen={openSection === 'personal'} onToggle={() => toggleSection('personal')}>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase">Full Name</label>
            <input
              type="text"
              value={data.personalInfo.fullName}
              onChange={(e) => updatePersonalInfo({ fullName: e.target.value })}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
              placeholder="John Doe"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase">Job Title</label>
            <input
              type="text"
              value={data.personalInfo.jobTitle}
              onChange={(e) => updatePersonalInfo({ jobTitle: e.target.value })}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
              placeholder="Software Engineer"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase">Email</label>
            <input
              type="email"
              value={data.personalInfo.email}
              onChange={(e) => updatePersonalInfo({ email: e.target.value })}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
              placeholder="john@example.com"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase">Phone</label>
            <input
              type="text"
              value={data.personalInfo.phone}
              onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
              placeholder="+1 234 567 890"
            />
          </div>
          <div className="space-y-2 col-span-2">
            <label className="text-xs font-bold text-slate-500 uppercase">Summary</label>
            <textarea
              value={data.personalInfo.summary}
              onChange={(e) => updatePersonalInfo({ summary: e.target.value })}
              rows={4}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all resize-none"
              placeholder="Brief professional summary..."
            />
          </div>
        </div>
      </Section>

      {/* Experience */}
      <Section title="Work Experience" icon={<Briefcase size={18} />} isOpen={openSection === 'experience'} onToggle={() => toggleSection('experience')}>
        <div className="space-y-6">
          {data.experiences.map((exp, index) => (
            <div key={exp.id} className="p-4 border border-slate-100 rounded-xl space-y-4 relative group bg-slate-50/30">
              <button 
                onClick={() => removeExperience(exp.id)}
                className="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition-colors"
              >
                <Trash2 size={18} />
              </button>
              <div className="grid grid-cols-2 gap-4">
                <input
                  placeholder="Company"
                  value={exp.company}
                  onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                  className="p-2 bg-white border border-slate-200 rounded-lg outline-none focus:ring-1 focus:ring-primary-500"
                />
                <input
                  placeholder="Position"
                  value={exp.position}
                  onChange={(e) => updateExperience(exp.id, { position: e.target.value })}
                  className="p-2 bg-white border border-slate-200 rounded-lg outline-none focus:ring-1 focus:ring-primary-500"
                />
                <input
                  placeholder="Start Date"
                  value={exp.startDate}
                  onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                  className="p-2 bg-white border border-slate-200 rounded-lg outline-none focus:ring-1 focus:ring-primary-500"
                />
                <input
                  placeholder="End Date"
                  value={exp.endDate}
                  disabled={exp.current}
                  onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                  className="p-2 bg-white border border-slate-200 rounded-lg outline-none focus:ring-1 focus:ring-primary-500 disabled:opacity-50"
                />
                <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase cursor-pointer">
                  <input
                    type="checkbox"
                    checked={exp.current}
                    onChange={(e) => updateExperience(exp.id, { current: e.target.checked })}
                    className="rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                  />
                  I currently work here
                </label>
              </div>
              <textarea
                placeholder="Description"
                value={exp.description}
                onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
                rows={3}
                className="w-full p-2 bg-white border border-slate-200 rounded-lg outline-none focus:ring-1 focus:ring-primary-500 resize-none"
              />
            </div>
          ))}
          <button
            onClick={addExperience}
            className="w-full py-3 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 hover:text-primary-600 hover:border-primary-300 transition-all flex items-center justify-center gap-2 font-bold text-sm uppercase tracking-wider"
          >
            <Plus size={18} /> Add Experience
          </button>
        </div>
      </Section>

      {/* Education */}
      <Section title="Education" icon={<GraduationCap size={18} />} isOpen={openSection === 'education'} onToggle={() => toggleSection('education')}>
        <div className="space-y-6">
          {data.educations.map((edu) => (
            <div key={edu.id} className="p-4 border border-slate-100 rounded-xl space-y-4 relative">
              <button 
                onClick={() => removeEducation(edu.id)}
                className="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition-colors"
              >
                <Trash2 size={18} />
              </button>
              <div className="grid grid-cols-2 gap-4">
                <input
                  placeholder="School"
                  value={edu.school}
                  onChange={(e) => updateEducation(edu.id, { school: e.target.value })}
                  className="p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-1 focus:ring-slate-900"
                />
                <input
                  placeholder="Degree"
                  value={edu.degree}
                  onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                  className="p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-1 focus:ring-slate-900"
                />
                <input
                  placeholder="Start Date"
                  value={edu.startDate}
                  onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })}
                  className="p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-1 focus:ring-slate-900"
                />
                <input
                  placeholder="End Date"
                  value={edu.endDate}
                  onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })}
                  className="p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-1 focus:ring-slate-900"
                />
              </div>
            </div>
          ))}
          <button
            onClick={addEducation}
            className="w-full py-3 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 hover:text-slate-600 hover:border-slate-300 transition-all flex items-center justify-center gap-2 font-bold text-sm uppercase tracking-wider"
          >
            <Plus size={18} /> Add Education
          </button>
        </div>
      </Section>

      {/* Skills */}
      <Section title="Skills" icon={<Code size={18} />} isOpen={openSection === 'skills'} onToggle={() => toggleSection('skills')}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {data.skills.map((skill) => (
            <div key={skill.id} className="flex items-center gap-2 p-2 bg-slate-50 border border-slate-200 rounded-lg group hover:border-primary-300 transition-colors">
              <input
                placeholder="Skill"
                value={skill.name}
                onChange={(e) => updateSkill(skill.id, { name: e.target.value })}
                className="flex-1 bg-transparent outline-none text-sm font-medium focus:text-primary-600"
              />
              <select
                value={skill.level}
                onChange={(e) => updateSkill(skill.id, { level: parseInt(e.target.value) })}
                className="bg-transparent text-xs font-bold outline-none text-slate-400 focus:text-primary-600"
              >
                {[1, 2, 3, 4, 5].map(l => <option key={l} value={l}>{l}/5</option>)}
              </select>
              <button onClick={() => removeSkill(skill.id)} className="text-slate-300 hover:text-red-500">
                <Trash2 size={14} />
              </button>
            </div>
          ))}
          <button
            onClick={addSkill}
            className="col-span-full py-2 border border-dashed border-slate-200 rounded-lg text-slate-400 hover:text-primary-600 hover:border-primary-300 transition-all flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider"
          >
            <Plus size={14} /> Add Skill
          </button>
        </div>
      </Section>

      {/* Projects */}
      <Section title="Projects" icon={<FolderKanban size={18} />} isOpen={openSection === 'projects'} onToggle={() => toggleSection('projects')}>
        <div className="space-y-6">
          {data.projects.map((project) => (
            <div key={project.id} className="p-4 border border-slate-100 rounded-xl space-y-4 relative bg-slate-50/30">
              <button 
                onClick={() => removeProject(project.id)}
                className="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition-colors"
              >
                <Trash2 size={18} />
              </button>
              <div className="grid grid-cols-2 gap-4">
                <input
                  placeholder="Project Name"
                  value={project.name}
                  onChange={(e) => updateProject(project.id, { name: e.target.value })}
                  className="p-2 bg-white border border-slate-200 rounded-lg outline-none focus:ring-1 focus:ring-primary-500"
                />
                <input
                  placeholder="Link"
                  value={project.link}
                  onChange={(e) => updateProject(project.id, { link: e.target.value })}
                  className="p-2 bg-white border border-slate-200 rounded-lg outline-none focus:ring-1 focus:ring-primary-500"
                />
              </div>
              <textarea
                placeholder="Description"
                value={project.description}
                onChange={(e) => updateProject(project.id, { description: e.target.value })}
                rows={2}
                className="w-full p-2 bg-white border border-slate-200 rounded-lg outline-none focus:ring-1 focus:ring-primary-500 resize-none"
              />
            </div>
          ))}
          <button
            onClick={addProject}
            className="w-full py-3 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 hover:text-primary-600 hover:border-primary-300 transition-all flex items-center justify-center gap-2 font-bold text-sm uppercase tracking-wider"
          >
            <Plus size={18} /> Add Project
          </button>
        </div>
      </Section>

      {/* Languages */}
      <Section title="Languages" icon={<Languages size={18} />} isOpen={openSection === 'languages'} onToggle={() => toggleSection('languages')}>
        <div className="space-y-4">
          {data.languages.map((lang, index) => (
            <div key={index} className="flex items-center gap-2 group">
              <input
                value={lang}
                onChange={(e) => {
                  const newLangs = [...data.languages];
                  newLangs[index] = e.target.value;
                  onChange({ ...data, languages: newLangs });
                }}
                className="flex-1 p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-1 focus:ring-primary-500 group-hover:border-primary-200 transition-colors"
                placeholder="e.g. English (Native)"
              />
              <button 
                onClick={() => {
                  const newLangs = data.languages.filter((_, i) => i !== index);
                  onChange({ ...data, languages: newLangs });
                }}
                className="text-slate-300 hover:text-red-500"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
          <button
            onClick={() => onChange({ ...data, languages: [...data.languages, ''] })}
            className="w-full py-2 border border-dashed border-slate-200 rounded-lg text-slate-400 hover:text-primary-600 hover:border-primary-300 transition-all flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider"
          >
            <Plus size={14} /> Add Language
          </button>
        </div>
      </Section>
    </div>
  );
};
