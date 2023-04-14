import { useEffect, useState } from 'react';
import ArticlePreview from '../components/ArticlePreview';
import Footer from '../components/Footer';
import Header from '../components/Header';
import api from '../services/api';
import '../styles/main.css';
import { Button } from '../components/Buttons/Button';
import { useNavigate } from 'react-router-dom';

export interface IAuthorPreview {
  id: number;
  first_name: string;
  last_name: string;
  twitter_username: string;
  created_at: string;
  avatar_url: string;
  articles_count: number;
}

function Authors() {
  const navigate = useNavigate();
  const [authors, setAuthors] = useState<IAuthorPreview[]>([]);

  useEffect(() => {
    api.get('/authors').then(response => {
      setAuthors(response.data.authors);
    });
  }, []);

  return (
    <>
      <Header />

      <main className="max-w-[52rem] mx-auto px-4 pb-10 sm:px-6 md:px-8 xl:px-12 lg:max-w-6xl">
        <header className="py-16 sm:text-center">
          <h1 className="mb-4 text-3xl tracking-tight text-slate-900 font-extrabold dark:text-slate-200">
            Our Authors
          </h1>

          <p className="mb-4 text-lg text-slate-700 dark:text-slate-400">
            Stay up-to-date with our latest programming insights and discoveries.
          </p>

          <Button color="alternative" onClick={() => navigate('/new-author')}>
            Add new author
          </Button>
        </header>

        <div className="relative mt-3 max-w-4xl sm:mx-auto sm:px-4">
          <div className="space-y-16">
            <ul className="mt-10 grid grid-cols-1 gap-x-16 gap-y-8 xl:grid-cols-2 xl:gap-y-10">
              {authors &&
                authors.map(author => (
                  <li key={author.id} className="relative flex items-start">
                    <div className="w-16 h-16 p-[0.1875rem] rounded-full ring-1 ring-slate-900/10 shadow overflow-hidden flex-none dark:bg-indigo-500 dark:highlight-white/20">
                      <div className="aspect-w-1 aspect-h-1 bg-[length:100%]">
                        <img
                          src={author.avatar_url || '/images/avatar-placeholder.png'}
                          alt=""
                          className="rounded-full bg-slate-50 dark:bg-slate-800"
                          decoding="async"
                        />
                      </div>
                    </div>
                    <div className="peer group flex-auto ml-6">
                      <h3 className="mb-0 font-semibold text-slate-900 dark:text-slate-200">
                        <a
                          className="before:absolute before:-inset-3 before:rounded-2xl sm:before:-inset-4"
                          href={`/edit-author/${author.id}`}
                        >
                          {author.first_name} {author.last_name}
                        </a>
                      </h3>

                      <div className="mb-1">
                        <a
                          href={`https://twitter.com/${author.twitter_username}`}
                          className="text-sky-500 hover:text-sky-600 dar:text-sky-400"
                          target="_blank"
                          rel="noreferrer noopener"
                        >
                          @{author.twitter_username}
                        </a>
                      </div>

                      <div className="prose prose-slate prose-sm text-slate-600 dark:prose-dark">
                        <p>Articles: {author.articles_count}</p>
                      </div>
                    </div>
                    <div className="absolute -z-10 -inset-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 opacity-0 peer-hover:opacity-100 sm:-inset-4"></div>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        {authors.length === 0 && (
          <div className="py-16 sm:text-center text-slate-700 dark:text-slate-400">
            <h3 className="text-lg">No posts yet.</h3>
            <p className="text-base ">Click on Add New to create one</p>
          </div>
        )}
      </main>
    </>
  );
}

export default Authors;
