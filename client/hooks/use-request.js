import axios from 'axios';
import { useState } from 'react';

export default ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null);

  const doRequest = async (props = {}) => {
    try {
      setErrors(null);
      const response = await axios[method](url, { ...body, ...props });

      if (onSuccess) {
        onSuccess(response.data);
      }

      return response.data;
    } catch (err) {
      setErrors(
        <div className="aler alert-danger">
          <h4>Oops...</h4>
          {err.response.data.errors.map((err) => (
            <li key={err.message}>{err.message}</li>
          ))}
        </div>
      );
    }
  };

  return { doRequest, errors };
};
