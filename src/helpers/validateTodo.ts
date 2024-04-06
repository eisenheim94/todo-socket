import { isEmpty, isString, validate } from 'validate.js';
import { toast } from 'react-toastify';

const validateTodo = (text: string, isTitle?: boolean) => {
  const naming = isTitle ? 'Title' : 'Description';
  if (isEmpty(text)) {
    toast.error(`Please enter a valid ${naming.toLowerCase()}.`);
    return false;
  }
  if (!isString(text)) {
    toast.error(`${naming} must be a string.`);
    return false;
  }
  if (validate({ text }, { text: { length: { minimum: 3, maximum: 100 } } })) {
    toast.error(`${naming} must be between 3 and 100 characters.`);
    return false;
  }
  return true;
};

export default validateTodo;
