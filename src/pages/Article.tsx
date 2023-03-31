import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import parse from 'html-react-parser';

import Header from '../components/Header';
import api from '../services/api';
import date from '../utils/date-formatter';

export interface IArticle {
  id: number;
  title: string;
  subtitle: string;
  author: string;
  content: string;
  date_posted: string;
}

function Article() {
  let { id } = useParams();

  const [article, setArticle] = useState<IArticle>();

  useEffect(() => {
    api.get(`/post/${id}`).then(response => {
      console.log('api.get -> response:', response);

      setArticle(response.data);
    });
  }, []);

  return (
    <>
      <Header />

      <div className="overflow-hidden">
        <div className="max-w-8xl mx-auto">
          <div className="flex px-4 pt-8 pb-10 lg:px-8">
            <Link
              to="/"
              className="group flex font-semibold text-sm leading-6 text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white"
            >
              <svg
                viewBox="0 -9 3 24"
                className="overflow-visible mr-3 text-slate-400 w-auto h-6 group-hover:text-slate-600 dark:group-hover:text-slate-300"
              >
                <path
                  d="M3 0L0 3L3 6"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
              Go back
            </Link>
          </div>
        </div>
        <div className="px-4 sm:px-6 md:px-8">
          <div className="max-w-3xl mx-auto">
            <main>
              {article && (
                <article className="relative pt-10">
                  <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-200 md:text-3xl">
                    {article.title}
                  </h1>

                  <div className="text-sm leading-6">
                    <dt>
                      <dt className="sr-only">Date</dt>
                      <dd className="absolute top-0 inset-x-0 text-slate-700 dark:text-slate-400">
                        <time dateTime={article.date_posted}>
                          {date(article.date_posted)}
                        </time>
                      </dd>
                    </dt>
                  </div>

                  <div className="mt-6 flex justify-between">
                    <ul className="flex flex-wrap text-sm leading-6 -mt-6 -mx-5">
                      <li className="flex items-center font-medium whitespace-nowrap px-5 mt-6">
                        <div className="mr-3 w-9 h-9 rounded-full bg-slate-50 dark:bg-slate-800"></div>

                        <div className="text-sm leading-4">
                          <div className="text-slate-900 dark:text-slate-200">
                            {article.author}
                          </div>

                          <div className="mt-1">
                            <a
                              href=""
                              className="text-sky-500 hover:text-sky-600 dar:text-sky-400"
                            >
                              @jhondoe
                            </a>
                          </div>
                        </div>
                      </li>
                    </ul>

                    <div>
                      <button>Delete</button>
                    </div>
                  </div>

                  <div className="mt-12 prose prose-slate dark:prose-dark">
                    <div className="my-8">
                      <div className="relative not-prose my-[2em] first:mt-0 last:mb-0 rounded-2xl overflow-hidden">
                        <img
                          src="https://tailwindcss.com/_next/static/media/card.bd99fd56.jpg"
                          alt="Tailwind CSS v3.3"
                        />

                        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-slate-900/10 dark:ring-white/10"></div>
                      </div>

                      <p>{article.subtitle}</p>

                      {parse(article.content)}
                    </div>
                  </div>
                </article>
              )}
            </main>
          </div>
        </div>
      </div>
    </>
  );
}

export default Article;
