import { useRouter } from "next/router";
import Logo from "../ui/Logo";
import Link from "next/link";
// import become from "../../public/assets/"

export default function AuthTemplate({ children, heading, subHeading }) {
  const router=useRouter()
  return (
    <>
      <div
  className="min-h-full flex flex-col justify-center w-full py-12 sm:px-6 lg:px-8 space-y-4 mx-2 bg-[url('/assets/become.jpg')] bg-cover bg-center"
>
  <div className="sm:mx-auto sm:w-full text-center sm:max-w-md">
    {heading && (
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        {heading}
      </h2>
    )}
    {subHeading && (
      <p className="mt-2 text-center text-sm font-medium text-indigo-600 hover:text-indigo-500">
        {subHeading}
      </p>
    )}
  </div>

  <div
    className={`mt-8 sm:mx-auto sm:w-full ${
      router.pathname === '/register' ? 'sm:max-w-xl' : 'sm:max-w-lg'
    }`}
  >
    <div className="py-8 px-4 border border-gray-800 rounded-lg sm:px-10 bg-white">
      <div className="text-center -mt-4">
        <Logo />
      </div>

      <div>{children}</div>
    </div>
  </div>
</div>

    </>
  );
}

AuthTemplate.defaultProps = {
  heading: "",
  subHeading: "",
};
