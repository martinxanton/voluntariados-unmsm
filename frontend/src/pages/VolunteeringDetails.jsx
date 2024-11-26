const VolunteeringDetails = () => {
  return (
    <div className="bg-gray-100 p-4">
      <div className="border-1 shadow-lg shadow-gray-700 rounded-lg">
        {/* Top content */}
        <div className="flex rounded-t-lg bg-top-color sm:px-2 w-full">
          <div className="h-40 w-40 overflow-hidden sm:rounded-full sm:relative sm:p-0 top-10 left-5 p-3">
            <img
              src="https://media.licdn.com/dms/image/C4D03AQH8qidO0nb_Ng/profile-displayphoto-shrink_800_800/0/1615696897070?e=2147483647&v=beta&t=ia3wfE2J7kVLdBy9ttkgUDAA_ul29fymykhQo0lABDo"
              alt="Profile"
            />
          </div>
          <div className="w-2/3 sm:text-center pl-5 mt-10 text-start">
            <p className="font-poppins font-bold text-heading sm:text-4xl text-2xl">
              Amit Pachange
            </p>
            <p className="text-heading">Software Engineer</p>
          </div>
        </div>

        {/* Main content */}
        <div className="p-5">
          <div className="flex flex-col sm:flex-row sm:mt-10">
            <div className="flex flex-col sm:w-1/3">
              {/* My Contact */}
              <div className="py-3 sm:order-none order-3">
                <h2 className="text-lg font-poppins font-bold text-top-color">
                  My Contact
                </h2>
                <div className="border-2 w-20 border-top-color my-3"></div>
                <div>
                  <div className="flex items-center my-1">
                    <div className="ml-2 truncate">amitpachange@gmail.com</div>
                  </div>
                  <div className="flex items-center my-1">
                    <div>4574358775</div>
                  </div>
                  <div className="flex items-center my-1">
                    <a
                      className="w-6 text-gray-700 hover:text-orange-600"
                      aria-label="Visit TrendyMinds Facebook"
                      href=""
                      target="_blank"
                      rel="noreferrer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 320 512"
                        className="h-4"
                      >
                        <path
                          fill="currentColor"
                          d="m279.14 288 14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
                        ></path>
                      </svg>
                    </a>
                    <div>sale galli latur</div>
                  </div>
                  <div className="flex items-center my-1">
                    <a
                      className="w-6 text-gray-700 hover:text-orange-600"
                      aria-label="Visit TrendyMinds Twitter"
                      href=""
                      target="_blank"
                      rel="noreferrer"
                    ></a>
                    <div>amitpachange21</div>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="py-3 sm:order-none order-2">
                <h2 className="text-lg font-poppins font-bold text-top-color">
                  Skills
                </h2>
                <div className="border-2 w-20 border-top-color my-3"></div>
                <div>
                  <div className="flex items-center my-1">
                    <div className="ml-2">Java</div>
                  </div>
                  <div className="flex items-center my-1">
                    <div className="ml-2">Android</div>
                  </div>
                  <div className="flex items-center my-1">
                    <div className="ml-2">Html, Css, JS</div>
                  </div>
                </div>
              </div>

              {/* Education Background */}
              <div className="py-3 sm:order-none order-1">
                <h2 className="text-lg font-poppins font-bold text-top-color">
                  Education Background
                </h2>
                <div className="border-2 w-20 border-top-color my-3"></div>
                <div className="flex flex-col space-y-1">
                  <div className="flex flex-col">
                    <p className="font-semibold text-xs text-gray-700">2021</p>
                    <p className="text-sm font-medium">
                      <span className="text-green-700">
                        B.E. (INFORMATION TECHNOLOGY)
                      </span>
                      , PIMPRI CHINCHWAD COLLEGE OF ENGINEERING, PUNE.
                    </p>
                    <p className="font-bold text-xs text-gray-700 mb-2">
                      Percentage: 76.61
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <p className="font-semibold text-xs text-gray-700">2017</p>
                    <p className="text-sm font-medium">
                      <span className="text-green-700">HSC</span>, RAJARSHI SHAHU
                      COLLEGE, LATUR.
                    </p>
                    <p className="font-bold text-xs text-gray-700 mb-2">
                      Percentage: 80.77
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <p className="font-semibold text-xs text-gray-700">2015</p>
                    <p className="text-sm font-medium">
                      <span className="text-green-700">SSC</span>, DNYANESHWAR
                      HIGH SCHOOL, LATUR.
                    </p>
                    <p className="font-bold text-xs text-gray-700 mb-2">
                      Percentage: 93.80
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:w-2/3 order-first sm:order-none sm:-mt-10">
              {/* About Me */}
              <div className="py-3">
                <h2 className="text-lg font-poppins font-bold text-top-color">
                  About Me
                </h2>
                <div className="border-2 w-20 border-top-color my-3"></div>
                <p>
                  To get a career opportunity which would help me to utilize my
                  academic background to assist me to gain experience, employ
                  my excellent skills, and enable me to make positive
                  contribution.
                </p>
              </div>

              {/* Professional Experience */}
              <div className="py-3">
                <h2 className="text-lg font-poppins font-bold text-top-color">
                  Professional Experience
                </h2>
                <div className="border-2 w-20 border-top-color my-3"></div>
                <div className="flex flex-col">
                  <div className="flex flex-col">
                    <p className="text-lg font-bold text-gray-700">
                      Netcracker Technology | Software Engineer
                    </p>
                    <p className="font-semibold text-sm text-gray-700">
                      2021 - Present
                    </p>
                    <p className="font-semibold text-sm text-gray-700 mt-2 mb-1">
                      Key Responsibilities
                    </p>
                    <ul className="text-sm list-disc pl-4 space-y-1">
                      <li>Working on customer facing product</li>
                      <li>Delivering highly efficient solutions</li>
                      <li>Solving critical bugs</li>
                    </ul>
                  </div>

                  <div className="flex flex-col mt-8">
                    <p className="text-lg font-bold text-gray-700">
                      TailwindFlex.com | Lead
                    </p>
                    <p className="font-semibold text-sm text-gray-700">
                      2020-2021
                    </p>
                    <p className="font-semibold text-sm text-gray-700 mt-2 mb-1">
                      Key Responsibilities
                    </p>
                    <ul className="text-sm list-disc pl-4 space-y-1">
                      <li>Developed usable components</li>
                      <li>Solving complex problems</li>
                      <li>Solving critical bugs</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Projects */}
              <div className="py-3">
                <h2 className="text-lg font-poppins font-bold text-top-color">
                  Projects
                </h2>
                <div className="border-2 w-20 border-top-color my-3"></div>
                <div className="flex flex-col">
                  <div className="flex flex-col">
                    <p className="text-lg font-semibold text-gray-700">
                      Used Books mobile app
                    </p>
                    <p className="font-normal text-sm text-gray-700 mb-1 pl-2">
                      A platform to sell as well as to buy used books only for
                      PCCoE College due to this reuse of books will be there
                      beneficial for environment also indirectly helps increase
                      communication between juniors and seniors.
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-lg font-semibold text-gray-700">
                      Parking Automation System
                    </p>
                    <p className="font-normal text-sm text-gray-700 mb-1 pl-2">
                      it’s a web application which helps you to book your slot
                      for your car just like booking a movie ticket from home.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteeringDetails;
