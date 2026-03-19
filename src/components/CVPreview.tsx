import React from 'react';
import { CVData } from '../types';
import { Mail, Phone, MapPin, Globe, ExternalLink } from 'lucide-react';
import { cn } from '../lib/utils';

interface TemplateProps {
  data: CVData;
}

const ModernTemplate: React.FC<TemplateProps> = ({ data }) => {
  return (
    <div className="flex flex-col h-full bg-white text-slate-900 font-sans">
      {/* Header */}
      <header className="bg-slate-900 text-white p-10">
        <h1 className="text-4xl font-bold tracking-tight uppercase">{data.personalInfo.fullName}</h1>
        <p className="text-xl text-slate-300 mt-2 font-medium">{data.personalInfo.jobTitle}</p>
        
        <div className="flex flex-wrap gap-4 mt-6 text-sm text-slate-300">
          {data.personalInfo.email && (
            <div className="flex items-center gap-1.5">
              <Mail size={14} />
              <span>{data.personalInfo.email}</span>
            </div>
          )}
          {data.personalInfo.phone && (
            <div className="flex items-center gap-1.5">
              <Phone size={14} />
              <span>{data.personalInfo.phone}</span>
            </div>
          )}
          {data.personalInfo.location && (
            <div className="flex items-center gap-1.5">
              <MapPin size={14} />
              <span>{data.personalInfo.location}</span>
            </div>
          )}
          {data.personalInfo.website && (
            <div className="flex items-center gap-1.5">
              <Globe size={14} />
              <span>{data.personalInfo.website}</span>
            </div>
          )}
        </div>
      </header>

      <div className="flex flex-1">
        {/* Main Content */}
        <main className="flex-[2] p-10 space-y-8">
          {/* Summary */}
          <section>
            <h2 className="text-lg font-bold uppercase border-b-2 border-slate-900 pb-1 mb-4">Professional Summary</h2>
            <p className="text-slate-700 leading-relaxed">{data.personalInfo.summary}</p>
          </section>

          {/* Experience */}
          <section>
            <h2 className="text-lg font-bold uppercase border-b-2 border-slate-900 pb-1 mb-4">Experience</h2>
            <div className="space-y-6">
              {data.experiences.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-slate-900">{exp.position}</h3>
                      <p className="text-slate-600 font-medium">{exp.company}</p>
                    </div>
                    <span className="text-sm text-slate-500 font-mono">
                      {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <p className="text-sm text-slate-700 mt-2 whitespace-pre-line">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section>
            <h2 className="text-lg font-bold uppercase border-b-2 border-slate-900 pb-1 mb-4">Education</h2>
            <div className="space-y-4">
              {data.educations.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-slate-900">{edu.degree}</h3>
                      <p className="text-slate-600 font-medium">{edu.school}</p>
                    </div>
                    <span className="text-sm text-slate-500 font-mono">
                      {edu.startDate} — {edu.current ? 'Present' : edu.endDate}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>

        {/* Sidebar */}
        <aside className="flex-1 bg-slate-50 p-10 border-l border-slate-200 space-y-8">
          {/* Skills */}
          <section>
            <h2 className="text-lg font-bold uppercase border-b-2 border-slate-900 pb-1 mb-4">Skills</h2>
            <div className="space-y-3">
              {data.skills.map((skill) => (
                <div key={skill.id} className="space-y-1">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                    <span>{skill.name}</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-slate-900 rounded-full" 
                      style={{ width: `${(skill.level / 5) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Projects */}
          {data.projects.length > 0 && (
            <section>
              <h2 className="text-lg font-bold uppercase border-b-2 border-slate-900 pb-1 mb-4">Projects</h2>
              <div className="space-y-4">
                {data.projects.map((project) => (
                  <div key={project.id}>
                    <h3 className="font-bold text-sm text-slate-900 flex items-center gap-1">
                      {project.name}
                      {project.link && <ExternalLink size={12} className="text-slate-400" />}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1">{project.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Languages */}
          {data.languages.length > 0 && (
            <section>
              <h2 className="text-lg font-bold uppercase border-b-2 border-slate-900 pb-1 mb-4">Languages</h2>
              <ul className="text-sm text-slate-700 space-y-1">
                {data.languages.map((lang, i) => (
                  <li key={i}>{lang}</li>
                ))}
              </ul>
            </section>
          )}
        </aside>
      </div>
    </div>
  );
};

const ClassicTemplate: React.FC<TemplateProps> = ({ data }) => {
  return (
    <div className="p-12 bg-white text-stone-900 font-serif h-full">
      <header className="text-center border-b border-stone-300 pb-8 mb-8">
        <h1 className="text-4xl font-light tracking-widest uppercase mb-2">{data.personalInfo.fullName}</h1>
        <p className="text-stone-500 italic mb-4">{data.personalInfo.jobTitle}</p>
        <div className="flex justify-center flex-wrap gap-x-6 gap-y-2 text-xs uppercase tracking-widest text-stone-600">
          <span>{data.personalInfo.email}</span>
          <span>{data.personalInfo.phone}</span>
          <span>{data.personalInfo.location}</span>
        </div>
      </header>

      <div className="space-y-8">
        <section>
          <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-stone-400 mb-4 border-b border-stone-100 pb-1">Profile</h2>
          <p className="text-sm leading-relaxed text-stone-700">{data.personalInfo.summary}</p>
        </section>

        <section>
          <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-stone-400 mb-4 border-b border-stone-100 pb-1">Experience</h2>
          <div className="space-y-6">
            {data.experiences.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-stone-900">{exp.company}</h3>
                  <span className="text-[10px] uppercase tracking-widest text-stone-500">
                    {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <p className="text-xs italic text-stone-600 mb-2">{exp.position}</p>
                <p className="text-xs leading-relaxed text-stone-700 whitespace-pre-line">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-2 gap-12">
          <section>
            <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-stone-400 mb-4 border-b border-stone-100 pb-1">Education</h2>
            <div className="space-y-4">
              {data.educations.map((edu) => (
                <div key={edu.id}>
                  <h3 className="font-bold text-xs text-stone-900">{edu.school}</h3>
                  <p className="text-[10px] italic text-stone-600">{edu.degree}</p>
                  <p className="text-[10px] text-stone-400 mt-1">{edu.startDate} — {edu.endDate}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-stone-400 mb-4 border-b border-stone-100 pb-1">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill) => (
                <span key={skill.id} className="text-[10px] uppercase tracking-wider bg-stone-100 px-2 py-1 text-stone-600">
                  {skill.name}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

const MinimalTemplate: React.FC<TemplateProps> = ({ data }) => {
  return (
    <div className="p-16 bg-white text-zinc-900 font-sans h-full max-w-4xl mx-auto">
      <header className="mb-12">
        <h1 className="text-5xl font-black tracking-tighter mb-2">{data.personalInfo.fullName}</h1>
        <p className="text-xl text-zinc-500 font-medium">{data.personalInfo.jobTitle}</p>
        <div className="mt-6 pt-6 border-t border-zinc-100 flex flex-wrap gap-6 text-sm font-medium text-zinc-400">
          <span>{data.personalInfo.email}</span>
          <span>{data.personalInfo.phone}</span>
          <span>{data.personalInfo.location}</span>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-12">
        <div className="col-span-8 space-y-12">
          <section>
            <p className="text-lg leading-relaxed text-zinc-600 font-medium">{data.personalInfo.summary}</p>
          </section>

          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-300 mb-6">Experience</h2>
            <div className="space-y-10">
              {data.experiences.map((exp) => (
                <div key={exp.id} className="relative pl-6 border-l-2 border-zinc-100">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-2 border-zinc-200" />
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="text-lg font-bold">{exp.company}</h3>
                    <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                      {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <p className="text-zinc-500 font-bold mb-4">{exp.position}</p>
                  <p className="text-sm leading-relaxed text-zinc-600 whitespace-pre-line">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="col-span-4 space-y-12">
          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-300 mb-6">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill) => (
                <span key={skill.id} className="text-xs font-bold px-3 py-1.5 bg-zinc-900 text-white rounded-full">
                  {skill.name}
                </span>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-300 mb-6">Education</h2>
            <div className="space-y-6">
              {data.educations.map((edu) => (
                <div key={edu.id}>
                  <h3 className="font-bold text-zinc-900">{edu.school}</h3>
                  <p className="text-sm text-zinc-500">{edu.degree}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export const CVPreview = React.forwardRef<HTMLDivElement, TemplateProps>(({ data }, ref) => {
  return (
    <div ref={ref} className="w-[210mm] min-h-[297mm] shadow-2xl mx-auto overflow-hidden print:shadow-none print:m-0">
      {data.template === 'modern' && <ModernTemplate data={data} />}
      {data.template === 'classic' && <ClassicTemplate data={data} />}
      {data.template === 'minimal' && <MinimalTemplate data={data} />}
    </div>
  );
});

CVPreview.displayName = 'CVPreview';
