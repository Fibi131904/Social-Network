import axios from "axios";

export const apiConfig = axios.create(
  {
      withCredentials: true,
      baseURL: 'https://social-network.samuraijs.com/api/1.0/',
      headers: {
          'API-KEY': '02e961ee-045c-4729-a140-71aed19c7552'
      }
  }
);

