import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { FieldValues, useForm } from 'react-hook-form';

import { Button } from '../components/Buttons/Button';
import { Input } from '../components/Form/Input';
import { Textarea } from '../components/Form/TextArea';
import Header from '../components/Header';
import api from '../services/api';
import { ErrorWarning } from '../components/Form/ErrorWarning';
import { useToast } from '../hooks/toast';
import { GoBackButton } from '../components/Buttons/GoBackButton';

const INITIAL_VALUES = {
  title: '',
  subtitle: '',
  author: '',
  content: '',
};

function ArticleEditor() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { id } = useParams();
  const [isSubmitSuccessful, setSubmitSuccessful] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  /**
   * UseEffect chamado quando o componente é montado ou quando o pathname muda
   *
   * Se o pathname possuir o parâmetro 'id' o useEffect buscará os dados do
   * artigo pelo id no backend e preencherá o formulário com os dados.
   * Caso contrário, o useEffect apenas limpará o formulário.
   */
  useEffect(() => {
    if (!id) {
      reset(INITIAL_VALUES);

      return;
    }

    api.get(`/article/${id}`).then(response => reset(response.data));
  }, [useLocation().pathname]);

  /**
   * Função que envia os dados do formulário para o backend.
   *
   * @param data - Dados do formulário
   */
  function handleCreateArticle(data: FieldValues) {
    const formData = new FormData();

    // Se estiver editando, envia o id do artigo
    if (id) {
      formData.append('id', id);
    }

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    setLoadingSubmit(true);

    // Simula o tempo de espera para a requisição
    setTimeout(() => {
      submitArticle(formData);
    }, 2000);
  }

  async function submitArticle(formData: FormData) {
    try {
      const method = id ? 'put' : 'post';

      await api[method]('/article', formData);

      addToast({
        type: 'success',
        title: `Article ${id ? 'updated' : 'created'} successfully!`,
      });

      setSubmitSuccessful(true);
      setLoadingSubmit(false);

      navigate('/');
    } catch (error) {
      setLoadingSubmit(false);

      addToast({
        type: 'error',
        title: 'Error creating article!',
        description: 'Please try again',
      });
    }
  }

  // Reseta após o submit ser bem sucedido
  useEffect(() => {
    reset(INITIAL_VALUES);
  }, [isSubmitSuccessful]);

  return (
    <>
      <Header />

      <div className="max-w-8xl mx-auto">
        <div className="flex px-4 pt-8 pb-10 lg:px-8">
          <GoBackButton />
        </div>
      </div>

      <main className="max-w-[52rem] mx-auto px-4 pb-10 sm:px-6 md:px-8 xl:px-12 lg:max-w-6xl">
        <header className="py-16">
          <section className="mt-3 max-w-4xl sm:mx-auto sm:px-4">
            <form onSubmit={handleSubmit(handleCreateArticle)}>
              <div className="space-y-12">
                <div className="border-b border-slate-900/10 dark:border-slate-200/10 pb-12">
                  <h2 className="text-lg font-semibold leading-7 text-slate-900 dark:text-slate-200">
                    Article Editor
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Use the form below to create a new article. The 'Subtitle' and
                    'Content' fields support HTML.
                  </p>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="col-span-full">
                      <label
                        className="font-semibold block mb-1 required"
                        htmlFor="title"
                      >
                        Title
                      </label>

                      <Input
                        id="title"
                        type="text"
                        label="title"
                        register={register}
                        required
                        placeholder="Required"
                      />
                      {errors.title && (
                        <ErrorWarning>This field is required</ErrorWarning>
                      )}
                    </div>

                    <div className="col-span-full">
                      <label
                        className="font-semibold block mb-1 required"
                        htmlFor="subtitle"
                      >
                        Subtitle
                      </label>

                      <Textarea
                        id="subtitle"
                        label="subtitle"
                        register={register}
                        required
                        placeholder="Required"
                      />
                      {errors.subtitle && (
                        <ErrorWarning>This field is required</ErrorWarning>
                      )}
                    </div>

                    <div className="col-span-full">
                      <label
                        className="font-semibold block mb-1 required"
                        htmlFor="author"
                      >
                        Author
                      </label>

                      <Input
                        id="author"
                        label="author"
                        register={register}
                        required
                        type="text"
                        placeholder="Required"
                      />
                      {errors.author && (
                        <ErrorWarning>This field is required</ErrorWarning>
                      )}
                    </div>

                    <div className="col-span-full">
                      <label
                        className="font-semibold block mb-1 required"
                        htmlFor="content"
                      >
                        Content
                      </label>

                      <Textarea
                        id="content"
                        label="content"
                        register={register}
                        required
                        placeholder="Required"
                        rows={30}
                      />
                      {errors.content && (
                        <ErrorWarning>This field is required</ErrorWarning>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-3">
                  <div>
                    <Button
                      type="button"
                      color="alternative"
                      onClick={() => navigate(-1)}
                    >
                      Cancel
                    </Button>
                  </div>

                  <div>
                    <Button type="submit" color="default" loading={loadingSubmit}>
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
