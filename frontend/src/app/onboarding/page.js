"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  User, 
  Link as LinkIcon, 
  GraduationCap, 
  FileText, 
  ChevronRight, 
  ChevronLeft,
  CheckCircle2,
  Upload,
  Code2
} from 'lucide-react';

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    linkedin_url: '',
    github_url: '',
    leetcode_url: '',
    current_year: '',
    graduation_year: '',
    short_bio: '',
    manual_skills: '', // Comma-separated string
    education_history: [{ degree: '', institution: '' }],
    resume: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, resume: e.target.files[0] }));
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleEducationChange = (index, field, value) => {
    const newEdu = [...formData.education_history];
    newEdu[index][field] = value;
    setFormData(prev => ({ ...prev, education_history: newEdu }));
  };

  const addEducation = () => {
    setFormData(prev => ({ 
      ...prev, 
      education_history: [...prev.education_history, { degree: '', institution: '', year: '' }] 
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === 'resume' && formData[key]) {
        data.append('resume', formData[key]);
      } else if (key === 'education_history') {
        data.append(key, JSON.stringify(formData[key]));
      } else if (key === 'manual_skills') {
        // Convert comma-string to JSON array for backend
        const skillArray = formData[key].split(',').map(s => s.trim()).filter(s => s);
        data.append(key, JSON.stringify(skillArray));
      } else {
        data.append(key, formData[key]);
      }
    });

    try {
      const response = await fetch('http://127.0.0.1:8001/api/v1/user/intake', {
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        setStep(5); // Success step
      } else {
        console.error('Submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <User className="text-tertiary" /> Basic Identity
              </h2>
              <p className="text-on-surface-variant text-sm">Let's start with who you are.</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-outline mb-2">Full Name</label>
                <input 
                  type="text" 
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleInputChange}
                  className="w-full bg-surface-container border border-outline-variant/20 rounded-lg p-3 text-white focus:outline-none focus:border-tertiary/50 transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-outline mb-2">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-surface-container border border-outline-variant/20 rounded-lg p-3 text-white focus:outline-none focus:border-tertiary/50 transition-colors"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-outline mb-2">Technical Skills (Comma separated)</label>
                <input 
                  type="text" 
                  name="manual_skills"
                  value={formData.manual_skills}
                  onChange={handleInputChange}
                  className="w-full bg-surface-container border border-outline-variant/20 rounded-lg p-3 text-white focus:outline-none focus:border-tertiary/50 transition-colors"
                  placeholder="Python, React, AWS, FastAPI..."
                />
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <LinkIcon className="text-tertiary" /> Professional Links
              </h2>
              <p className="text-on-surface-variant text-sm">Connect your profiles for automatic intelligence extraction.</p>
            </div>
            
            <div className="space-y-4">
              <div className="relative">
                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-outline w-5 h-5" />
                <input 
                  type="text" 
                  name="linkedin_url"
                  value={formData.linkedin_url}
                  onChange={handleInputChange}
                  className="w-full bg-surface-container border border-outline-variant/20 rounded-lg p-3 pl-10 text-white focus:outline-none focus:border-tertiary/50 transition-colors"
                  placeholder="LinkedIn Profile URL"
                />
              </div>
              <div className="relative">
                <Code2 className="absolute left-3 top-1/2 -translate-y-1/2 text-outline w-5 h-5" />
                <input 
                  type="text" 
                  name="github_url"
                  value={formData.github_url}
                  onChange={handleInputChange}
                  className="w-full bg-surface-container border border-outline-variant/20 rounded-lg p-3 pl-10 text-white focus:outline-none focus:border-tertiary/50 transition-colors"
                  placeholder="GitHub Profile URL"
                />
              </div>
              <div className="relative">
                <Code2 className="absolute left-3 top-1/2 -translate-y-1/2 text-outline w-5 h-5" />
                <input 
                  type="text" 
                  name="leetcode_url"
                  value={formData.leetcode_url}
                  onChange={handleInputChange}
                  className="w-full bg-surface-container border border-outline-variant/20 rounded-lg p-3 pl-10 text-white focus:outline-none focus:border-tertiary/50 transition-colors"
                  placeholder="LeetCode Profile URL"
                />
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <GraduationCap className="text-tertiary" /> Academic Background
              </h2>
              <p className="text-on-surface-variant text-sm">Tell us about your current status to find eligible opportunities.</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-outline mb-2">Current Year</label>
                <select 
                  name="current_year"
                  value={formData.current_year}
                  onChange={handleInputChange}
                  className="w-full bg-surface-container border border-outline-variant/20 rounded-lg p-3 text-white focus:outline-none focus:border-tertiary/50 transition-colors appearance-none"
                >
                  <option value="">Select Year</option>
                  <option value="1">1st Year</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                  <option value="5">Graduated</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-outline mb-2">Graduation Year</label>
                <input 
                  type="number" 
                  name="graduation_year"
                  value={formData.graduation_year}
                  onChange={handleInputChange}
                  className="w-full bg-surface-container border border-outline-variant/20 rounded-lg p-3 text-white focus:outline-none focus:border-tertiary/50 transition-colors"
                  placeholder="2026"
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-outline">Detailed Education</label>
              {formData.education_history.map((edu, idx) => (
                <div key={idx} className="p-4 bg-surface-container rounded-xl border border-outline-variant/10 space-y-3">
                  <input 
                    type="text" 
                    placeholder="Degree (e.g. B.Tech Computer Science)"
                    value={edu.degree}
                    onChange={(e) => handleEducationChange(idx, 'degree', e.target.value)}
                    className="w-full bg-transparent border-b border-outline-variant/30 py-1 text-sm text-white focus:outline-none focus:border-tertiary/50"
                  />
                  <input 
                    type="text" 
                    placeholder="Institution (e.g. Stanford University)"
                    value={edu.institution}
                    onChange={(e) => handleEducationChange(idx, 'institution', e.target.value)}
                    className="w-full bg-transparent border-b border-outline-variant/30 py-1 text-sm text-white focus:outline-none focus:border-tertiary/50"
                  />
                </div>
              ))}
              <button 
                type="button"
                onClick={addEducation}
                className="text-[10px] uppercase tracking-widest font-bold text-tertiary hover:underline"
              >
                + Add Another Institution
              </button>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <FileText className="text-tertiary" /> Resume & Bio
              </h2>
              <p className="text-on-surface-variant text-sm">The final step to complete your unified career profile.</p>
            </div>
            
            <div className="space-y-4">
              <div className="border-2 border-dashed border-outline-variant/20 rounded-xl p-8 text-center hover:border-tertiary/50 transition-colors cursor-pointer relative group">
                <input 
                  type="file" 
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <Upload className="w-8 h-8 text-outline mx-auto mb-2 group-hover:text-tertiary transition-colors" />
                <p className="text-white font-medium">{formData.resume ? formData.resume.name : "Upload Resume (PDF)"}</p>
                <p className="text-on-surface-variant text-xs mt-1">Maximum file size: 10MB</p>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-outline mb-2">Short Bio</label>
                <textarea 
                  name="short_bio"
                  value={formData.short_bio}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full bg-surface-container border border-outline-variant/20 rounded-lg p-3 text-white focus:outline-none focus:border-tertiary/50 transition-colors resize-none"
                  placeholder="Briefly describe your career goals..."
                />
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="text-center py-12 space-y-6 animate-in zoom-in-95 duration-500">
            <div className="w-20 h-20 bg-tertiary/10 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10 text-tertiary" />
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-white">All Set!</h2>
              <p className="text-on-surface-variant">Your intelligent profile is being built in the background. We're analyzing your links and resume now.</p>
            </div>
            <button 
              onClick={() => router.push('/')}
              className="bg-tertiary text-on-tertiary py-3 px-8 rounded-full font-bold hover:scale-105 active:scale-95 transition-all"
            >
              Go to Dashboard
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-6">
      <div className="w-full max-w-xl">
        {/* Progress Dots */}
        {step < 5 && (
          <div className="flex justify-center gap-2 mb-8">
            {[1, 2, 3, 4].map(i => (
              <div 
                key={i} 
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === step ? 'w-8 bg-tertiary' : 'w-2 bg-outline-variant/20'
                }`}
              />
            ))}
          </div>
        )}

        {/* Form Container */}
        <div className="bg-surface-container-low border border-outline-variant/10 rounded-3xl p-10 shadow-2xl relative overflow-hidden">
          {/* Subtle decoration */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-tertiary/5 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            {renderStep()}

            {step < 5 && (
              <div className="flex items-center justify-between mt-12 pt-8 border-t border-outline-variant/10">
                <button 
                  onClick={prevStep}
                  disabled={step === 1}
                  className={`flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition-all ${
                    step === 1 ? 'opacity-0 pointer-events-none' : 'text-outline hover:text-white'
                  }`}
                >
                  <ChevronLeft size={18} /> Back
                </button>
                
                {step === 4 ? (
                  <button 
                    onClick={handleSubmit}
                    disabled={loading}
                    className="bg-white text-black py-3 px-8 rounded-full font-bold hover:bg-tertiary hover:text-on-tertiary transition-all active:scale-95 flex items-center gap-2"
                  >
                    {loading ? "Processing..." : "Complete Setup"}
                  </button>
                ) : (
                  <button 
                    onClick={nextStep}
                    className="bg-white text-black py-3 px-8 rounded-full font-bold hover:bg-tertiary hover:text-on-tertiary transition-all active:scale-95 flex items-center gap-2"
                  >
                    Next <ChevronRight size={18} />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
        
        <p className="text-center mt-8 text-outline text-xs uppercase tracking-widest font-bold">
          SmartApply AI Core &bull; Intelligence System
        </p>
      </div>
    </div>
  );
}
