import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";

export default function Profile() {
  const id = useParams().userId;
  const [user, setUser] = useState({});
  const userId = JSON.parse(localStorage.getItem("u")).userId;
  useEffect(() => {
    axios
      .get("https://dummyjson.com/users/" + id)
      .then((res) => setUser(res.data));
  }, []);
  return (
    <>
      <main className="w-11/12 m-auto">
        <h1 className="font-semibold text-3xl text-blue-400">
          {user.id === userId ? "My Account" : "Account"}
        </h1>
        {Object.keys(user).length > 0 && (
          <section className="account-grid w-full mt-4">
            <div className="m-auto w-4/5 h-full flex justify-center gap-4 flex-wrap">
              <div className="profile-field bg-white w-60 max-md:w-80 rounded-sm shadow-xl h-full">
                <div className="w-11/12" style={{ height: "90%" }}>
                  <div className="profile-image h-1/2 aspect-square bg-gray-100 m-auto rounded-md">
                    <img
                      src={user.image}
                      className="w-full h-full object-cover"
                      alt=""
                    />
                  </div>
                  <div
                    className="profile-name text-center font-bold text-2xl"
                    style={{ height: "15%" }}
                  >
                    <h1>
                      {user.firstName} {user.maidenName} {user.lastName}
                    </h1>
                  </div>
                  <div
                    className="profile-place w-full flex justify-center items-center"
                    style={{ height: "35%" }}
                  >
                    <nav>
                      <ol>
                        <li className="flex gap-2 items-center pb-1">
                          <span>
                            <FaLocationDot />
                          </span>
                          <span> {user.address.city} </span>
                        </li>
                        <li className="flex gap-2 items-center pb-1">
                          <span>
                            <MdEmail />
                          </span>
                          <span> {user.email} </span>
                        </li>
                        <li className="flex gap-2 items-center pb-1">
                          <span>
                            <FaPhone />
                          </span>
                          <span> {user.phone} </span>
                        </li>
                      </ol>
                    </nav>
                  </div>
                </div>
              </div>
              <div className="profile-field bg-white w-80 h-full rounded-sm shadow-xl flex justify-center items-center">
                <p className="text-4xl font-bold">No Data</p>
              </div>
              <div className="profile-field bg-white w-80 h-full rounded-sm shadow-xl flex justify-center items-center">
                <p className="text-4xl font-bold">No Data</p>
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
}
