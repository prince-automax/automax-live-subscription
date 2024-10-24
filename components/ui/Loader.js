import { ThreeDots,ProgressBar } from 'react-loader-spinner';

export default function Loader({ spinner }) {

    return (
        <div className="w-full mx-auto flex justify-center items-center my-24 py-24 text-indigo-700">
            {spinner ?
                <svg className="w-6 h-6 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                    </path>
                </svg>
                :
                <div className='flex justify-center items-center h-full  w-full space-x-2'>
                {/* <ThreeDots
                    ariaLabel="loading-indicator"
                    height={100}
                    width={100}
                    strokeWidth={5}
                    color="indigo"
                    secondaryColor="yellow"
                /> */}
                <ProgressBar
                    visible={true}
                    height="80"
                    width="80"
                    barColor="green" // Sets the border color to blue
                    ariaLabel="progress-bar-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    borderColor="black" // Changes the inside bar color to a lighter shade of blue
                />
                <p className=" text-lg text-black">Loading...</p> {/* Loading text */}
                </div>
            }
        </div >
    )

}

Loader.defaultProps = {
    spinner: false
};

export  function Loading({ spinner }) {

    return (
        <div className="w-full mx-auto flex justify-center items-center my-24 py-24 text-indigo-700">
            {spinner ?
                <svg className="w-6 h-6 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                    </path>
                </svg>
                :
                <ThreeDots
                    ariaLabel="loading-indicator"
                    height={100}
                    width={100}
                    strokeWidth={5}
                    color="indigo"
                    secondaryColor="yellow"
                />
            }
        </div >
    )

}

Loader.defaultProps = {
    spinner: false
};