import { create } from 'zustand';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const API_BASE = 'http://127.0.0.1:8001/api/v1';

export const useOutreachStore = create((set, get) => ({
  companies: [],
  selectedCompany: null,
  loading: false,
  error: null,

  fetchCompanies: async () => {
    set({ loading: true });
    try {
      const response = await axios.get(`${API_BASE}/companies`);
      set({ companies: response.data, loading: false });
    } catch (err) {
      const msg = err.response?.data?.detail || err.message;
      set({ error: msg, loading: false });
      toast.error("Failed to fetch companies");
    }
  },

  fetchCompanyDetail: async (id) => {
    set({ loading: true });
    try {
      const response = await axios.get(`${API_BASE}/companies/${id}`);
      set({ selectedCompany: response.data, loading: false });
      return response.data;
    } catch (err) {
      const msg = err.response?.data?.detail || err.message;
      set({ error: msg, loading: false });
      toast.error("Failed to load company details");
    }
  },

  analyzeCompany: async (url) => {
    set({ loading: true, error: null });
    try {
      const params = new URLSearchParams();
      params.append('url', url);
      const response = await axios.post(`${API_BASE}/companies/analyze?${params.toString()}`);
      
      const newCompany = response.data;
      set(state => ({ 
        companies: [newCompany, ...state.companies],
        loading: false 
      }));
      toast.success("Analysis complete");
      return newCompany;
    } catch (err) {
      const msg = err.response?.data?.detail 
        ? (typeof err.response.data.detail === 'string' ? err.response.data.detail : JSON.stringify(err.response.data.detail))
        : err.message;
      set({ error: msg, loading: false });
      toast.error(`Analysis failed: ${msg}`);
      throw new Error(msg);
    }
  },

  clearInput: () => set({ error: null })
}));
