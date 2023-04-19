import { useFormikContext } from 'formik';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const SubmitBtn = ({ text, classes, isSubmitting }) => {
  const { dirty, isValid, errors } = useFormikContext();
  return (
    <button
      type='submit'
      className={` flex items-center bg-secondary disabled:opacity-60 disabled:cursor-not-allowed text-sm font-medium py-2.5 text-white rounded-md px-6 ${classes}`}
      disabled={!isValid || isSubmitting || !dirty}
    >
      <>
        {isSubmitting && (
          <AiOutlineLoading3Quarters className='animate-spin w-4 h-4 mr-2' />
        )}
        {text}
      </>
    </button>
  );
};

export default SubmitBtn;
