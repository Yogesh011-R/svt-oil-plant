import { useFormikContext } from 'formik';

const SubmitBtn = ({ text, classes, isSubmitting }) => {
  const { dirty, isValid, errors } = useFormikContext();
  return (
    <button
      type='submit'
      className={`bg-secondary disabled:opacity-60 disabled:cursor-not-allowed text-sm font-medium py-2.5 text-white rounded-md px-6 ${classes}`}
      disabled={!isValid || isSubmitting || !dirty}
    >
      {text}
    </button>
  );
};

export default SubmitBtn;
