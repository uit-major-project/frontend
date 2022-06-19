/*
  
 */
import type { NextPage } from 'next';
import styled from '@emotion/styled';
// import Head from 'next/head';
// import { Carousel } from 'antd';
import { MdAddTask } from 'react-icons/md';
import { IoCheckmarkDone } from 'react-icons/io5';
import { BsPersonCheck } from 'react-icons/bs';

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  // justify-content: center;
  margin: 0 auto;
  padding: 1.25em;
  height: calc(100vh - 3.5em);
  width: 100%;
  max-width: 90%;
  h1 {
    font-size: 2em;
    font-weight: bold;
    margin: 0.5em 0 0.25em 0;
    letter-spacing: 0.25rem;
    // width: 80%;
  }
  h2 {
    font-size: 1.5em;
    font-weight: 200;
    letter-spacing: 0.1rem;
    margin: 1.75em 0 0.5em 0;
  }
  p {
    font-size: 1.5rem;
    font-weight: 200;
    // text-transform: uppercase;
    margin: 0 0 1.5em 0;
  }
  .carousal {
    display: none;
    height: 160px;
    color: #fff;
    line-height: 160px;
    text-align: center;
    background: #364d79;
    div {
      height: 160px;
      color: #fff;
      line-height: 160px;
      text-align: center;
      background: #364d79;
    }
  }
  .process {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const About: NextPage = () => {
  return (
    <StyledDiv>
      <h1>How it Works</h1>
      <p>
        Handyman Services is a service provider that helps you Live Smarter;
        Live Better. With our website get your routine or periodic chores
        (tasks) done by outsourcing them to our in-house, trained, professional
        and trusted team of Taskman’s.
        <p>
          We provide wide range of doorstep services as per your convenience to
          your complete satisfaction. Our services include electrician, plumber,
          carpenter, High Definition Cleaning, Painting,car and bike services
          etc.
        </p>{' '}
        <p>
          We believe in a very simple philosophy - Provide Quality and
          Trustworthy Service which will help build your trust in Handyman
          Services and ultimately resulting in a long lasting relationship. Your
          Trust will inturn motivate us to serve you better every time! Handyman
          Services is different as we aim to provide our customer’s best
          –in-class service experience and to organise the unorganised sectors
          and provide employment opportunities and job security to talented
          people who share a common vision.
        </p>
        {/* <Carousel autoplay className="carousal"> */}
        <div className="process">
          <h2>Process</h2>
          <div>
            <MdAddTask />
            <h3>Pick a Task</h3>
            <p>
              Select a rask from the list of popular tasks and submit your
              request this allows us to match you instantly with available
              taskers in your area.
            </p>
          </div>
          <div>
            <BsPersonCheck />
            <h3>Get Matched</h3>
            <p>
              Choose same day or future time schedules and get a accurate
              arrival time, and we will match you with appropriate taskers.
            </p>
          </div>
          <div>
            <IoCheckmarkDone />
            <h3>Get it Done</h3>
            <p>
              Manage your booking directly in the app – chat with your Tasker,
              get accurate arrival times, and pay electronically when the task
              is complete.
            </p>
          </div>
        </div>
        {/* </Carousel> */}
      </p>
    </StyledDiv>
  );
};

export default About;
