import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import useMarvelService from '../../services/MarvelService';

import './charForm.scss';

const CharForm = () => {
  const [char, setChar] = useState(null);
  const [error, setError] = useState(false);

  const { getCharacterByName } = useMarvelService();

  const onCharLoaded = (char) => {
    setChar(char);
    setError(false);
  };

  const onError = () => {
    setChar(null);
    setError(true);
  };

  const loadChar = (name) => {
    getCharacterByName(name[0].toUpperCase() + name.slice(1))
      .then(onCharLoaded)
      .catch((res) => {
        onError();
      });
  };

  const block = char ? <Success char={char} /> : error ? <Error /> : null;

  // Создать состояние куда будет приходить персонаж (или нет) и по этому состоянию рендерить Success или null
  return (
    <Formik
      initialValues={{
        name: '',
      }}
      validationSchema={Yup.object({
        name: Yup.string().required('This field is required'),
      })}
      onSubmit={(values) => loadChar(values.name.toLowerCase())}
    >
      <Form className='char__form'>
        <h2 className='char__form-title'>Or find a character by name:</h2>
        <div className='char__form-wrapper'>
          <Field id='name' name='name' type='text' />
          <ErrorMessage
            className='char__form-error'
            name='name'
            component='div'
          />
          <button type='submit' className='button button__main'>
            <div className='inner'>FIND</div>
          </button>
        </div>
        {block}
      </Form>
    </Formik>
  );
};

const Success = ({ char }) => {
  return (
    <div className='char__form-success'>
      <div className='char__form-success_msg'>
        There is! Visit {char.name} page?
      </div>
      <Link to={`/${char.id}`} className='button button__secondary'>
        <div className='inner'>TO PAGE</div>
      </Link>
    </div>
  );
};

const Error = () => {
  return (
    <div className='char__form-error'>
      The character was not found. Check the name and try again
    </div>
  );
};

export default CharForm;
