import { create } from 'zustand';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const API_BASE = 'http://127.0.0.1:8001/api/v1';

export const useAppStore = create((set, get) => ({
  // --- Opportunities ---
  opportunities: [],
  oppLoading: false,
  oppError: null,
  fetchOpportunities: async (filters = {}) => {
    set({ oppLoading: true });
    try {
      const params = new URLSearchParams(filters);
      const response = await axios.get(`${API_BASE}/opportunities?${params.toString()}`);
      set({ opportunities: response.data, oppLoading: false });
    } catch (err) {
      set({ oppError: err.message, oppLoading: false });
      toast.error("Failed to fetch opportunities");
    }
  },
  runScan: async () => {
    set({ oppLoading: true });
    try {
      await axios.post(`${API_BASE}/opportunities/scan`);
      toast.success("Scan initiated successfully");
      await get().fetchOpportunities();
    } catch (err) {
      set({ oppError: err.message, oppLoading: false });
      toast.error("System scan failed");
    }
  },

  // --- Calendar ---
  events: [],
  calLoading: false,
  fetchEvents: async () => {
    set({ calLoading: true });
    try {
      const response = await axios.get(`${API_BASE}/calendar/events`);
      set({ events: response.data, calLoading: false });
    } catch (err) {
      set({ calLoading: false });
      toast.error("Failed to load calendar events");
    }
  },
  addEvent: async (eventData) => {
    try {
      const response = await axios.post(`${API_BASE}/calendar/event`, eventData);
      set(state => ({ events: [...state.events, response.data] }));
      toast.success("Event scheduled");
      return response.data;
    } catch (err) {
      toast.error("Failed to schedule event");
      console.error("Add event failed", err);
    }
  },

  // --- Resume ---
  resumeData: null,
  resumeAnalysis: null,
  resLoading: false,
  uploadResume: async (formData) => {
    set({ resLoading: true });
    try {
      const response = await axios.post(`${API_BASE}/resume/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      set({ resumeData: response.data, resLoading: false });
      toast.success("Resume uploaded successfully");
      return response.data;
    } catch (err) {
      set({ resLoading: false });
      toast.error("Resume upload failed");
      throw err;
    }
  },
  analyzeResume: async (jobDescription) => {
    set({ resLoading: true });
    try {
      const params = new URLSearchParams();
      params.append('job_description', jobDescription);
      const response = await axios.post(`${API_BASE}/resume/analyze?${params.toString()}`);
      set({ resumeAnalysis: response.data, resLoading: false });
      toast.success("Resume analysis complete");
      return response.data;
    } catch (err) {
      set({ resLoading: false });
      toast.error("Analysis engine failed");
      throw err;
    }
  },

  // --- Analytics ---
  analytics: {
    total_tracked: 0,
    total_sent: 0,
    replied: 0,
    match_rate: 0,
    trend: []
  },
  fetchAnalytics: async () => {
    try {
      const response = await axios.get(`${API_BASE}/analytics/overview`);
      set({ analytics: response.data });
    } catch (err) {
      console.error("Analytics fetch failed", err);
    }
  },

  // --- Interviews & Pipeline ---
  interviews: [],
  intLoading: false,
  fetchInterviews: async () => {
    set({ intLoading: true });
    try {
      const response = await axios.get(`${API_BASE}/interviews/pipeline`);
      set({ interviews: response.data, intLoading: false });
    } catch (err) {
      set({ intLoading: false });
      toast.error("Failed to fetch interview pipeline");
    }
  },
  updateInterviewStage: async (id, stage) => {
    try {
      const response = await axios.patch(`${API_BASE}/interviews/${id}/stage?stage=${stage}`);
      set(state => ({
        interviews: state.interviews.map(i => i.id === id ? response.data : i)
      }));
      toast.success(`Moved to ${stage}`);
    } catch (err) {
      toast.error("Failed to update stage");
    }
  },

  // --- Portfolio ---
  portfolio: [],
  portLoading: false,
  fetchPortfolio: async () => {
    set({ portLoading: true });
    try {
      const response = await axios.get(`${API_BASE}/portfolio/projects`);
      set({ portfolio: response.data, portLoading: false });
    } catch (err) {
      set({ portLoading: false });
      toast.error("Failed to fetch portfolio projects");
    }
  },
  analyzeRepo: async (githubUrl) => {
    set({ portLoading: true });
    try {
      await axios.post(`${API_BASE}/portfolio/analyze-repo?github_url=${encodeURIComponent(githubUrl)}`);
      const response = await axios.get(`${API_BASE}/portfolio/projects`);
      set({ portfolio: response.data, portLoading: false });
      toast.success("Repository analysis initiated!");
    } catch (err) {
      set({ portLoading: false });
      toast.error("Failed to analyze repository");
    }
  },

  // --- Market Intel ---
  marketTrends: [],
  techVelocity: [],
  marketLoading: false,
  fetchMarketIntel: async () => {
    set({ marketLoading: true });
    try {
      const [trendsRes, velocityRes] = await Promise.all([
        axios.get(`${API_BASE}/market/trends`),
        axios.get(`${API_BASE}/market/velocity`)
      ]);
      set({ 
        marketTrends: trendsRes.data, 
        techVelocity: velocityRes.data,
        marketLoading: false 
      });
    } catch (err) {
      set({ marketLoading: false });
      toast.error("Failed to fetch market intelligence");
    }
  },

  // --- User Profile & Onboarding ---
  user: null,
  userLoading: false,
  fetchUser: async () => {
    set({ userLoading: true });
    try {
      const response = await axios.get(`${API_BASE}/user/profile`);
      set({ user: response.data, userLoading: false });
      return response.data;
    } catch (err) {
      set({ user: null, userLoading: false });
      console.error("Failed to fetch user profile", err);
      return null;
    }
  }
}));
