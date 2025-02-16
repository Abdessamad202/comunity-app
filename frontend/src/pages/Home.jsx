import { useEffect, useState } from "react";
import {  useNavigate } from "react-router"; // ✅ Fix import
import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/slices/userSlice";
import { logOut, getUser } from "../api/api"; // ✅ Add getUser

const Home = () => {
  const id = useSelector((state) => state.user["profileId"]) || null; // ✅ Handle undefined/null id

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState(null);

  const { mutate: logoutMutation, isPending: isLogout } = useMutation({
    mutationFn: logOut,
    onSuccess: () => {
      dispatch(logout());
      navigate("/login");
    },
    onError: (error) => {
      console.error("Error during logout:", error);
    },
  });

  const { mutate: fetchUser, isPending: isGettingUser } = useMutation({
    mutationFn: (id) => getUser(id),
    onSuccess: (data) => {
      setUserData(data.profile)
      console.log("User data fetched successfully:", data);
    },
    onError: (error) => {
      console.error("Error fetching user data:", error);
    },
  });

  useEffect(() => {
    // if (id) {
      fetchUser(id);
    // }
  }, [id]);

  return (
    <div className="p-6 flex flex-col items-center">
      {isGettingUser || isLogout ? ( // ✅ Improve spinner display
        <div className="mt-6 flex justify-center">
          <div className="w-10 h-10 border-4 border-indigo-500 border-dashed rounded-full animate-spin"></div>
        </div>
      ) : (
        userData && (
          <>
            <h1 className="text-2xl font-bold text-indigo-600">Welcome to the App</h1>
            <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-700">Profile Data:</h2>
              <p className="text-gray-600"><strong>Name:</strong> {userData.name}</p>
              <p className="text-gray-600"><strong>Email:</strong> {userData.user?.email || "Not available"}</p>
              <p className="text-gray-600"><strong>Sex:</strong> {userData.sex}</p>
              <p className="text-gray-600"><strong>Date of Birth:</strong> {userData.date_of_birth}</p>
            </div>
          </>
        )
      )}

      <button
        onClick={logoutMutation}
        className="mt-4 text-indigo-600 hover:text-indigo-500 font-medium cursor-pointer"
        disabled={isLogout} // ✅ Disable button while logging out
      >
        {isLogout ? "Logging out..." : "Logout"}
      </button>
    </div>
  );
};

export { Home };
