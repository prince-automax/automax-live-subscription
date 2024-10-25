import Link from "next/link";
import DashboardTemplate from "../components/templates/DashboardTemplate";
import withPrivateRoute from "../utils/withPrivateRoute";
import maintaince from  "@assets/main2.jpg"
import Image from "next/image";

function Settings() {
    return (
      <DashboardTemplate heading="">
        <div className="min-h-screen flex   justify-center bg-gray-100">
          <div className="max-w-4xl w-full mt-20 text-center p-6 h-min bg-white shadow-lg rounded-md">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Settings Coming Soon</h2>
            <p className="text-base text-gray-600 mb-6">
              This page is currently under maintenance. We're working on something
              great, and it will be ready soon. Stay tuned for updates.
            </p>
            <Image
              src={maintaince}
              alt="Under maintenance"
              className="mx-auto mb-4 w-64"
            />
            <p className="text-gray-500 text-sm mb-6">Thank you for your patience!</p>
            <Link
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
              href='/dashboard'
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </DashboardTemplate>
    );
  }

  export default withPrivateRoute(Settings);
