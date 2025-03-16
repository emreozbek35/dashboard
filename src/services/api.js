import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchDashboardData = async (dateRange) => {
  let url = "/data";
  if (dateRange?.startDate && dateRange?.endDate) {
    url += `?startDate=${dateRange.startDate}&endDate=${dateRange.endDate}`;
  }
  const response = await api.get(url);
  return response.data;
};

export const fetchSummaryStats = async () => {
  const response = await api.get("/stats");
  return response.data;
};

export const fetchDataByDate = async (date) => {
  const response = await api.get(`/data/${date}`);
  return response.data;
};

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const deleteAllData = async () => {
  const response = await api.delete("/data");
  return response.data;
};
