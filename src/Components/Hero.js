import React from 'react';
import styled from 'styled-components';
import PrimaryButton from './PrimaryButton';
import SmallText from './SmallText';

const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
margin: 0 5%;
padding: 0 0 30px 0;
font-family: var(--secondary-font);

  @media (max-width: 768px) {
  }
`;

const PreTitle = styled.div`
font-family: var(--primary-font);
color: var(--almost-black);
font-size: var(--text-big);
font-weight: 700;
text-align: center;

  @media (max-width: 768px) {
  }
`;

const Title = styled.div`
font-family: var(--primary-font);
color: var(--almost-black);
font-size: var(--text-verybig);
font-weight: 700;
text-align: center;
/* background: linear-gradient(to right, #F10096 0%, #21D7FF 100%); */
background: linear-gradient(-60deg, #F10096, #21D7FF);
background-size: 300%;
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
line-height: 11rem;
animation: flow 7s ease-in-out infinite;

@keyframes flow {
  0% {
    background-position: 0 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  110% {
    background-position: 0 50%;
  }
}

  @media (max-width: 768px) {
  }
`;

const SubTitle = styled.div`
font-family: var(--primary-font);
color: var(--almost-black);
font-size: var(--text-medium);
font-weight: 300;
text-align: center;
padding: 0 18%;

  @media (max-width: 768px) {
  }
`;






const Hero = props => {
    return (
<Container>
<PreTitle>Now you can finally invest like</PreTitle>
<Title>Ray Dalio</Title>
<SubTitle>The richest people in the worlds have gained 10% every year in the last 10 years. It's time for you to make some <strong>real money</strong> too.</SubTitle>
<PrimaryButton ButtonLabel="Get early access" />
<SmallText SmallContent="Reserved to the first 500 users only"/>

  </Container>
    );
  };
  
  export default Hero;