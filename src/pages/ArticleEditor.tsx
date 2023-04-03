import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Form/Button';
import { Input } from '../components/Form/Input';
import { Textarea } from '../components/Form/TextArea';
import Header from '../components/Header';
import api from '../services/api';

function ArticleEditor() {
  const navigate = useNavigate();

  function handleCancel() {
    navigate('/');
  }

  async function handleCreateArticle(event: FormEvent) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    console.log('handleCreateArticle -> formData:', formData);
    // const data = Object.fromEntries(formData);
    // console.log('handleCreateArticle -> data:', data);

    try {
      await api.post('/article', formData);

      alert('Article created successfully!');
      navigate('/');
    } catch (error) {
      alert('Error creating article. Please try again.');
    }
  }

  return (
    <>
      <Header />

      <main className="max-w-[52rem] mx-auto px-4 pb-28 sm:px-6 md:px-8 xl:px-12 lg:max-w-6xl">
        <header className="py-16">
          <section className="mt-3 max-w-sm sm:mx-auto sm:px-4">
            <form onSubmit={handleCreateArticle}>
              <div className="space-y-12">
                <div className="border-b border-slate-900/10 dark:border-slate-200/10 pb-12">
                  <h2 className="text-base font-semibold leading-7 text-slate-900 dark:text-slate-200">
                    Profile
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    This information will be displayed publicly so be careful what you
                    share.
                  </p>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="col-span-full">
                      <label className="font-semibold" htmlFor="title">
                        Title
                      </label>

                      <Input id="title" name="title" type="text" placeholder="Title" />
                    </div>

                    <div className="col-span-full">
                      <label className="font-semibold" htmlFor="subtitle">
                        Subtitle
                      </label>

                      <Textarea id="subtitle" name="subtitle" placeholder="Subtitle" />
                    </div>

                    <div className="col-span-full">
                      <label className="font-semibold" htmlFor="author">
                        Author
                      </label>

                      <Input id="author" name="author" type="text" placeholder="Author" />
                    </div>

                    <div className="col-span-full">
                      <label className="font-semibold" htmlFor="content">
                        Content
                      </label>

                      <Textarea id="content" name="content" placeholder="Content" />
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <div>
                    <Button type="button" ghost onClick={handleCancel}>
                      Cancel
                    </Button>
                  </div>

                  <div>
                    <Button type="submit" status="sky">
                      Submit
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </section>
        </header>
      </main>
    </>
  );
}

export default ArticleEditor;
