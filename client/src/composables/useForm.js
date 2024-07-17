import { ref } from 'vue';
import { z } from 'zod';
import axios from 'axios';

const useForm = (initialValues, schema, onSubmit) => {
  const form = ref({ ...initialValues });
  const errors = ref({});
  const isSubmitting = ref(false);
  const serverError = ref(null);
  let abortController = null;

  const validate = () => {
    try {
      schema.parse(form.value);
      errors.value = {};
      return true;
    } catch (e) {
      const validationErrors = {};
      e.errors.forEach((error) => {
        validationErrors[error.path[0]] = error.message;
      });
      errors.value = validationErrors;
      return false;
    }
  };

  const handleChange = (field, value) => {
    form.value[field] = value;

    if (field === 'nom') {
      form.value[field] = value.trim().toUpperCase();
    }
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    isSubmitting.value = true;
    serverError.value = null;

    abortController = new AbortController();

    try {
      await onSubmit(form.value, { signal: abortController.signal });
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Request was aborted');
      } else {
        serverError.value = error.message;
      }
    } finally {
      isSubmitting.value = false;
      abortController = null;
    }
  };

  const handleAbort = () => {
    if (abortController) {
      abortController.abort();
    }
  };

  return {
    form,
    errors,
    isSubmitting,
    serverError,
    handleChange,
    handleSubmit,
    handleAbort,
  };
};

export default useForm;
