import PropTypes from "prop-types"

const SubmitBtn = ({ isPending , title ,pandingTitle}) => {
  return (
    <button
          type="submit"
          // disabled={isPending}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition duration-200 font-medium flex justify-center items-center"
        >
          {isPending ? (
            <>
              <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
              {pandingTitle}
            </>
          ) : (
            title
          )}
        </button>
  )
}
// proptypes
SubmitBtn.propTypes = {
  isPending: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  pandingTitle: PropTypes.string.isRequired,
}
export  {SubmitBtn}