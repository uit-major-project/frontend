import styled from '@emotion/styled';
// import { CELL } from 'src/utils/constants';
import Router from 'next/router';

// import h1 from '../../../public/img/h1.jpg';

// console.log('h1', h1);

const StyledHero = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  // .hero-image-container {
  //   width: 50%;
  //   height: 100%;
  //   background-color: #fff;

  //   img {
  //     width: 100%;
  //     height: 100%;
  //   }
  // }
  .hero-content-div {
    width: 100%;
    height: 100%;
    background-color: ${(props) => props.theme.colors.background};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2em;
    margin: 0 auto;
    max-width: 120em;
    color: ${(props) => props.theme.colors.text};

    span {
      font-size: 0.95em;
      letter-spacing: 0.25em;
    }
    h1 {
      margin: 0.5em 0;
      font-size: 2.5em;
      font-weight: 700;
      letter-spacing: 0.15em;
    }
    p {
      margin: 0.5em 0;
      font-size: 1.25em;
      font-weight: 400;
      letter-spacing: 0.1em;
    }
    .action-buttons {
      width: 100%;
      display: flex;
      align-items: center;
      // justify-content: center;
      .book-now {
        margin: 0.5em 0;
        font-size: 1.25em;
        font-weight: 400;
        letter-spacing: 0.1em;
        background-color: ${(props) => props.theme.colors.primary};
        color: #fff;
        border: 1px solid transparent;
        border-radius: 0.25em;
        padding: 0.5em 1em;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
        &:hover {
          background-color: #fff;
          color: ${(props) => props.theme.colors.primary};
          border: 1px solid ${(props) => props.theme.colors.primary};
        }
      }
      .learn-more {
        margin: 0.5em 0;
        font-size: 1.25em;
        font-weight: 400;
        letter-spacing: 0.1em;
        background-color: #fff;
        color: ${(props) => props.theme.colors.primary};
        border: 1px solid ${(props) => props.theme.colors.primary};
        border-radius: 0.25em;
        padding: 0.5em 1em;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
        &:hover {
          background-color: ${(props) => props.theme.colors.primary};
          color: #fff;
          border: 1px solid transparent;
        }
        margin-left: 1em;
      }
    }
  }
`;

const Hero = () => {
  return (
    <StyledHero>
      {/* <div className="hero-image-container">
        <img src={h1.src} alt="" />
      </div> */}
      <div className="hero-content-div">
        <section>
          <span>HANDYMAN SERVICES</span>
          <h1>Quality services, on demand and fast</h1>
          <p>Experienced professionals to serve you anywhere anytime</p>

          <div className="action-buttons">
            <button className="book-now" onClick={() => Router.push('/login')}>
              Book Now
            </button>

            <button
              className="learn-more"
              onClick={() => Router.push('/how-it-works')}
            >
              Learn More
            </button>
          </div>
        </section>
      </div>
    </StyledHero>
  );
};

export default Hero;
