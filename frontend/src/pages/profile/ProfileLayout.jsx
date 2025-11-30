import { SideBar, ProfileHeader } from "../../components";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export const ProfileLayout = () => {
  const user = useSelector((state) => state.User.Data);

  return (
    <>
      <section className="section">
        <ProfileHeader user={user} />
      </section>

      <section className="section">
        <div className="rounded-2xl max-w-7xl mx-auto flex flex-col md:flex-row gap-lg">
          <div className="p-md bg-dark rounded-2xl">
            <SideBar />
          </div>
          <div className="flex-1 bg-white shadow-2xl p-lg rounded-2xl">
            <Outlet />
          </div>
        </div>
      </section>
    </>
  );
};

export default ProfileLayout;
