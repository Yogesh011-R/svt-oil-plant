import { useFormikContext } from 'formik';

const AuthSubmitBtn = ({ text, classes, isSubmitting }) => {
  const { dirty, isValid, errors } = useFormikContext();

  return (
    <button
      type='submit'
      style={{
        boxShadow: `0px 4px 4px rgba(0, 0, 0, 0.3)`,
      }}
      className={`bg-secondary disabled:opacity-60 disabled:cursor-not-allowed font-medium py-3 text-white rounded-md px-6 ${classes} uppercase w-full font-semibold`}
      disabled={!isValid || isSubmitting || !dirty}
    >
      {text}
    </button>
  );
};

export default AuthSubmitBtn;
