import axios from 'axios';
process.env.NEXT_PUBLIC_API_URL;
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_STRAPI_API_URL,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
  },
});

export async function fetchArticles(locale: string = 'en') {
  const response = await api.get('/api/articles', {
    params: {
      populate: '*',
      locale,
    },
  });

  return response.data;
}

export const generateAIResponse = async (data: string) => {
  const response = await api.post(
    '/api/google-gemini/sudoku',
    { input: data },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  return response.data;
};
export default api;
