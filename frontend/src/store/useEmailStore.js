import { create } from 'zustand';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const API_BASE = 'http://127.0.0.1:8001/api/v1';

export const useEmailStore = create((set, get) => ({
  emailHistory: [],
  emailBody: '',
  emailStatus: 'idle', // idle, generating, sending, success, error
  loading: false,
  error: null,

  fetchEmailHistory: async () => {
    set({ loading: true });
    try {
      const response = await axios.get(`${API_BASE}/emails`);
      set({ emailHistory: response.data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
      toast.error("Failed to fetch email history");
    }
  },

  generateEmail: async (companyId) => {
    set({ emailStatus: 'generating', loading: true });
    try {
      const response = await axios.post(`${API_BASE}/email/generate`, { company_id: companyId });
      set({ 
        emailBody: response.data.email_body || response.data.body, 
        emailStatus: 'idle', 
        loading: false 
      });
      toast.success("Email draft generated");
      return response.data;
    } catch (err) {
      set({ error: err.message, emailStatus: 'error', loading: false });
      toast.error("Email generation failed");
    }
  },

  updateEmailBody: (body) => set({ emailBody: body }),

  sendEmail: async (emailId) => {
    set({ emailStatus: 'sending', loading: true });
    try {
      await axios.post(`${API_BASE}/email/send`, { email_id: emailId });
      set({ emailStatus: 'success', loading: false });
      toast.success("Outreach email sent!");
      return true;
    } catch (err) {
      set({ error: err.message, emailStatus: 'error', loading: false });
      toast.error("Failed to send email");
      return false;
    }
  },

  sendFollowUp: async (emailId) => {
    set({ loading: true });
    try {
      await axios.post(`${API_BASE}/email/followup`, { email_id: emailId });
      set({ loading: false });
      toast.success("Follow-up scheduled");
      return true;
    } catch (err) {
      set({ error: err.message, loading: false });
      toast.error("Follow-up scheduling failed");
      return false;
    }
  }
}));
