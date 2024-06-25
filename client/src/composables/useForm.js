// useForm.js
import { ref, reactive } from 'vue';
import { z } from 'zod';
import axios from 'axios';

export default function useForm(schema, initialData, transform = null) {
  const data = reactive({ ...initialData });
  const errors = ref({});
  const isSubmitting = ref(false);
  const serverError = ref(null);
  const abortController = ref(null);

  const validate = () => {
    const result = schema.safeParse(data);
    if (!result.success) {
      errors.value = result.error.errors.reduce((acc, err) => {
        acc[err.path[0]] = err.message;
        return acc;
      }, {});
      return false;
    }
    errors.value = {};
    return true;
  };

  const handleChange = (field, value) => {
    if (transform && typeof transform[field] === 'function') {
      data[field] = transform[field](value);
    } else {
      data[field] = value;
    }
    validate();
  };

  const submit = async (url, method = 'POST') => {
    if (!validate()) return;
    isSubmitting.value = true;
    serverError.value = null;
    abortController.value = new AbortController();
    try {
      const response = await axios({
        method,
        url,
        data,
        signal: abortController.value.signal,
      });
      return response.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request canceled', error.message);
      } else {
        serverError.value = error.response ? error.response.data : error.message;
      }
    } finally {
      isSubmitting.value = false;
    }
  };

  const cancelRequest = () => {
    if (abortController.value) {
      abortController.value.abort();
    }
  };

  return {
    data,
    errors,
    isSubmitting,
    serverError,
    handleChange,
    submit,
    cancelRequest,
  };
}
