import React, { useEffect, useState } from "react";
import Vote from "../assets/vote.png";
import ProjectDescription from "../components/project-description";
import Grid from "../assets/Group 6.svg";
import Ball from "../components/ball";
import businessLogo from "../assets/businessbanner.jpg";
import axios from "axios";
import { BACKEND_ROUTES } from "../config/urls";
import { cleanUrl } from "../service/handleImage";
import Popup from "../components/popup";
import { useCookies } from "react-cookie";
import TechevinceLogoBar from "../components/techevince-logo";
import { Link } from "react-router-dom";
import { useMemo } from "react";

export default function BusinessVote() {
  const [projects, setProjects] = useState([]);
  const [selectedButton, setSelectedButton] = useState(null);
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["connect.sid"]);
  const [flag, setFlag] = useState(false);
  const [loggedBool, setLoggedBool] = useState(false);
  const [votedBusiness, setVotedBusiness] = useState(false);
  const [projectData, setProjectData] = useState({});
  const [votingAllowed, setVotingAllowed] = useState(false);

  const imagesPool = useMemo(() => {
    let images = projects.map((item) => {
      return item.images.map((image) => cleanUrl(image));
    });
    // deflating the array
    images = [].concat.apply([], images);
    images = images.filter((item) => item !== null);
    while (images.length < 2) {
      images.push(businessLogo);
    }
    return images;
  }, [projects]);

  const randomImage1 =
    imagesPool[
      Math.floor(((Math.random() + Math.random()) / 2) * imagesPool.length)
    ];
  const randomImage2 =
    imagesPool[Math.floor(Math.random() * imagesPool.length)];

  const loginHandler = () => {
    // set local storage
    localStorage.setItem("redirect", "/vote-business");
    window.location.href = BACKEND_ROUTES.login;
  };

  useEffect(() => {
    const getProjects = async () => {
      try {
        const res = await axios.get(`${BACKEND_ROUTES.project}/business`);
        setProjects(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProjects();
  }, []);

  useEffect(() => {
    const getVotingStatus = async () => {
      try {
        const res = await axios.get(`${BACKEND_ROUTES.vote}/allowed`);
        if (res.data.code === 200) {
          setVotingAllowed(true);
        } else {
          setVotingAllowed(false);
        }
      } catch (err) {
        setVotingAllowed(false);
      }
    };

    getVotingStatus();
  });

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`${BACKEND_ROUTES.auth}/current`, {
          withCredentials: true,
        });
        console.log(res.data);
        setUser(res.data);

        if (res.data) {
          setSelectedButton(res.data.businessVote);
          if (res.data.email) {
            setLoggedBool(true);
          }
          if (res.data.businessVote) {
            setVotedBusiness(true);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, []);

  const [showDescription, setShowDescription] = useState(false);
  const [data, setData] = useState({});
  function handleFunction(prop) {
     let prop1 = prop;
     prop1.images = prop1.images.map((item) => cleanUrl(item));
     prop1.images = prop1.images.filter((item) => item !== null);
     while (prop1.images.length < 3) {
       prop1.images.push(prop.club.icons);
     }
     setData(prop1);
    setShowDescription(true);
  }
  const handleVote = async (projectId) => {
    try {
      const res = await axios.post(
        BACKEND_ROUTES.vote,
        {
          projectId,
        },
        { withCredentials: true }
      );
      window.location.reload();
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='flex'>
      <Link to='/' className='items-center justify-center'>
        <div className='absolute flex my-4 mx-[10vw] md:mx-20 '>
          <TechevinceLogoBar />
        </div>
      </Link>
      <div className='w-full md:w-10/12 bg-customBlue-200 h-screen text-left'>
        <div className='absolute bottom-0 overflow-hidden  w-[100%] h-2/5 z-10'>
          <div className='bg-gradient-to-t from-transparent z-20 to-customBlue-200 w-full md:w-10/12 h-full absolute bottom-0 left-0'></div>
          <div
            style={{ background: `url("${Grid}") no-repeat` }}
            className='absolute bottom-0 left-0 w-full h-full'
          />
        </div>
        <div className=' relative h-5/6 w-8/12 mx-[15vw] md:mx-20 my-24 z-30'>
          <p className='text-3xl md:text-5xl font-semibold text-white -tracking-[0.01em] font-body'>
            Business Clubs
          </p>
          <div className='overflow-y-scroll h-4/6 scrollbar-hide mt-12'>
            {projects &&
              projects.map((item, index) => {
                return (
                  <div>
                    <div className='flex items-center'>
                      <div
                        key={index}
                        className='hover: cursor-pointer w-4/5'
                        onClick={() => {
                          handleFunction(item);
                        }}
                      >
                        <div className='flex my-4 text-white items-center '>
                          <img
                            className='h-8'
                            src={cleanUrl(item.club.icons)}
                          />
                          <div className='ml-4 md:ml-8'>
                            <p className='font-body font-semibold text-sm md:text-xl md:leading-8 -tracking-[0.01em]'>
                              {item.name}
                            </p>
                            <p className='text-sm md:text-normal'>
                              {item.club.name}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div
                        className={`flex justify-center w-20 h-12 items-center text-center md:w-32 ml-auto rounded-3xl`}
                        style={{
                          backgroundColor:
                            loggedBool === false
                              ? "grey"
                              : selectedButton === item._id
                              ? "#16a34a"
                              : votedBusiness === true
                              ? "grey"
                              : "#ffffff",
                          cursor:
                            loggedBool === false
                              ? "not-allowed"
                              : votedBusiness === true
                              ? "not-allowed"
                              : "pointer",
                        }}
                        onClick={() => {
                          if (votingAllowed === false) {
                            alert("Voting Not Allowed");
                            return;
                          }
                          if (loggedBool === false) return;
                          if (votedBusiness === false) {
                            handleVote(item._id);
                            return;
                          }
                          setProjectData(item._id);
                          setFlag(true);
                          setShowModal(true);
                        }}
                      >
                        <p
                          className='text-black font-body font-semibold text-base md:text-2xl -tracking-[0.01em] leading-8 m-2'
                          style={{
                            color:
                              selectedButton === item._id
                                ? "#ffffff"
                                : "#000000",
                          }}
                        >
                          {selectedButton === item._id ? "Voted" : "Vote"}
                        </p>
                        <img
                          className='h-0 md:h-fit'
                          style={{
                            filter:
                              selectedButton === item._id
                                ? "brightness(0) saturate(100%) invert(100%)"
                                : "",
                          }}
                          src={Vote}
                        />
                      </div>
                    </div>
                    <hr className='bg-white w-full' />
                  </div>
                );
              })}
            <ProjectDescription
              isVisible={showDescription}
              onClose={() => setShowDescription(false)}
              data={data}
              VoteHandler={handleVote}
              loggedBool={loggedBool}
              voteBool={votedBusiness}
              selectedButton={selectedButton}
              votingAllowed={votingAllowed}
            />
          </div>
          <Popup
            showModal={showModal}
            setShowModal={setShowModal}
            clearCookie={removeCookie}
            flag={flag}
            setFlag={setFlag}
            VoteHandler={handleVote}
            item={projectData}
          />
          <div className='flex justify-center bg-white w-[inherit] mx-auto md:mx-0 md:-ml-4 md:w-64 h-12 rounded-3xl mt-16 text-center'>
            <button
              onClick={() => {
                if (user && user.hasOwnProperty("name")) setShowModal(true);
                else loginHandler();
              }}
              className='text-black font-body font-semibold text-base md:text-2xl -tracking-[0.01em] leading-8 m-2'
            >
              {user && user.hasOwnProperty("name") ? user.name : "Login"}
            </button>
          </div>
        </div>
      </div>
      <div className='w-0 md:w-2/12 bg-white z-20'>
        <div className='-ml-[30%] mt-[45%] lg:mt-[20%] z-40'>
          <Ball image={randomImage1} bgColor={"white"} borderBool={true} />
        </div>
        <div className='-ml-[30%] mt-[35%] lg:mt-[20%] z-[10] relative'>
          <Ball image={randomImage2} bgColor={"white"} borderBool={true} />
        </div>
      </div>
    </div>
  );
}
