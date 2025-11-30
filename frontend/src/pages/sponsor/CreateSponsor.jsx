import { NavLink } from "react-router-dom";
import { act, useState } from "react";
import {
  Menu,
  XCircleIcon,
  BuildingIcon,
  ArrowUpRightFromCircle,
  LayoutDashboard,
  SlidersHorizontal,
  Share2Icon
} from "lucide-react";
import { SponsorOverviewForm, SponsorPreferencesForm,SponsorSocialsForm } from "../../components";
export const CreateSponsor = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const handleClick = () => {
    setOpenSidebar(!openSidebar);
  };

  return (
    <>
      <section className="section">
        <div className="container bg-white text-dark relative mt-10">
          <div className="absolute h-full w-full bg-dark -z-10 -top-10 left-0 rounded-2xl"></div>

          <div className="flex flex-col gap-md w-full">
            <div className="border-b-2 border-dark-lighter pb-(--space-md)">
              Header
            </div>

            <div className="flex md:gap-lg">
              <div className="md:border-r-2 md:border-dark-lighter pr-(--space-md)">
                {/* sidebar hamburger for mobile */}
                <div
                  onClick={handleClick}
                  className={`cursor-pointer md:hidden flex items-start justify-end w-12 top-0 right-0 p-sm h-12 absolute`}
                >
                  {!openSidebar ? <Menu size={40} /> : ""}
                </div>

                {/* For desktop */}
                <aside
                  className={`hidden md:flex flex-col h-full w-full md:w-64 bg-white`}
                >
                  <nav
                    className={`${
                      open ? "flex flex-col" : "hidden"
                    } md:visible md:flex md:flex-col gap-sm transition-all`}
                  >
                    <button
                      onClick={() => setActiveTab(0)}
                      className={`flex items-center p-sm gap-md rounded-lg text-dark transition-colors duration-200 hover:bg-white-hover ${
                        activeTab === 0 ? "bg-white-hover" : ""
                      }`}
                    >
                      <LayoutDashboard size={20} />
                      <span>Overview</span>
                    </button>

                    <button
                      onClick={() => setActiveTab(1)}
                      className={`flex items-center p-sm gap-md rounded-lg text-dark transition-colors duration-200 hover:bg-white-hover ${
                        activeTab === 1 ? "bg-white-hover" : ""
                      }`}
                    >
                      <SlidersHorizontal size={20} />
                      <span>Preferences</span>
                    </button>

                    <button
                      to="/sponsors/create"
                      onClick={() => setActiveTab(2)}
                      className={`flex items-center p-sm gap-md rounded-lg text-dark transition-colors duration-200 hover:bg-white-hover ${
                        activeTab === 2 ? "bg-white-hover" : ""
                      }`}
                    >
                      <Share2Icon size={20} />
                      <span>Links</span>
                    </button>
                  </nav>
                </aside>

                {/* For mobile */}
                {openSidebar ? (
                  <aside
                    className={`h-screen fixed top-0 left-0 md:invisible  ${
                      openSidebar ? "w-64" : "w-0"
                    } bg-white transition-all duration-300 z-50`}
                  >
                    <div className="flex flex-col w-64 p-md">
                      <div
                        onClick={handleClick}
                        className={`cursor-pointer md:hidden w-full h-max p-sm flex justify-end`}
                      >
                        {openSidebar ? (
                          <XCircleIcon size={40} />
                        ) : (
                          <Menu size={40} />
                        )}
                      </div>
                      <nav
                        className={`${
                          openSidebar ? "flex flex-col" : "hidden"
                        } md:invisible md:flex md:flex-col gap-sm transition-all`}
                      >
                        <button
                          onClick={() => setActiveTab(0)}
                          className={`flex items-center p-sm gap-md rounded-lg text-dark transition-colors duration-200 hover:bg-white-hover ${
                            activeTab === 0 ? "bg-white-hover" : ""
                          }`}
                        >
                          <LayoutDashboard size={20} />
                          <span>Overview</span>
                        </button>

                        <button
                          onClick={() => setActiveTab(1)}
                          className={`flex items-center p-sm gap-md rounded-lg text-dark transition-colors duration-200 hover:bg-white-hover ${
                            activeTab === 1 ? "bg-white-hover" : ""
                          }`}
                        >
                          <SlidersHorizontal size={20} />
                          <span>Preferences</span>
                        </button>

                        <button
                          onClick={() => setActiveTab(2)}
                          className={`flex items-center p-sm gap-md rounded-lg text-dark transition-colors duration-200 hover:bg-white-hover ${
                            activeTab === 2 ? "bg-white-hover" : ""
                          }`}
                        >
                          <Share2Icon size={20} />
                          <span>Links</span>
                        </button>
                      </nav>
                    </div>
                  </aside>
                ) : (
                  ""
                )}
              </div>
              <div className="w-full min-h-screen h-full">
                <SponsorOverviewForm activeTab={activeTab} />
                <SponsorPreferencesForm activeTab={activeTab} />
                <SponsorSocialsForm activeTab={activeTab}/>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CreateSponsor;
