import ArticlePreview from './components/ArticlePreview';
import Footer from './components/Footer';
import Header from './components/Header';
import './styles/main.css';

function App() {
  return (
    <div className="h-screen">
      <main className="max-w-[52rem] mx-auto px-4 pb-28">
        <header className="py-16 sm:text-center">
          <h1 className="mb-4 text-3xl tracking-tight text-slate-900 font-extrabold dark:text-slate-200">
            Latest Posts
          </h1>

          <p className="text-lg text-slate-700 dark:text-slate-400">
            All the latest posts from Flask + React Blog
          </p>
        </header>

        <div className="relative sm:pb-12 sm:ml-[calc(2rem+1px)] md:ml-[calc93.5rem+1px)] lg:ml-[max(calc(14.5rem+1px,calc(100%-48rem))]">
          <div className="hidden absolute top-3 bottom-0 right-full mr-7 md:mr-[3.25rem] w-px bg-slate-200 dark:bg-slate-800 sm:block"></div>

          <div className="space-y-16">
            <ArticlePreview />
            <ArticlePreview />
            <ArticlePreview />
            <ArticlePreview />
            <ArticlePreview />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;