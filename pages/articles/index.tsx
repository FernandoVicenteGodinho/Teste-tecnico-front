import DefaultLayout from '@/components/Layouts/DefaultLayout';
import api, { fetchArticles } from '@/services/api';
import { useEffect, useState } from 'react';


const ArticlesPage = () => {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const { data: articles } = await fetchArticles();
      setArticles(articles);
    };
    fetchData();
  }, []);

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Articles</h1>
      <ul>
        {articles.map((article: any) => (
          <li key={article.id} className="mb-4">
            <h2 className="text-xl font-semibold">{article.attributes.title}</h2>
            <p>{article.attributes.content}</p>
          </li>
        ))}
      </ul>
        </>
  );
}

ArticlesPage.getLayout = (page: any) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default ArticlesPage;
