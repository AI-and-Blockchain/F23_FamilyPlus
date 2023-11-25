import React from "react";
import "../Styles/About.css";

interface SolutionStepProps {
  title: string;
  description: string;
}

const SolutionStep: React.FC<SolutionStepProps> = ({ title, description }) => (
  <div>
    <h4>{title}</h4>
    <p>{description}</p>
  </div>
);

const About: React.FC = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-image-content">
        {/* <img src={Doctor} alt="Doctor Group" className="about-image1" /> */}
      </div>

      <div className="about-text-content">
        <h3 className="about-title">
          <span>About Us</span>
        </h3>
        <p className="about-description">
          Welcome to Family+, your trusted partner for accessible and
          personalized healthcare. Join us on
          this journey towards a healthier you.
        </p>

        <h4 className="about-text-title">Chatbot</h4>

        <SolutionStep
          title="Choose a Specialist"
          description="Find your perfect specialist and book with ease at Health Plus. Expert doctors prioritize your health, offering tailored care."
        />

        <SolutionStep
          title="Make a Schedule"
          description="Choose the date and time that suits you best, and let our dedicated team of medical professionals ensure your well-being with personalized care."
        />

        <SolutionStep
          title="Get Your Solutions"
          description="Our experienced doctors and specialists are here to provide expert advice and personalized treatment plans, helping you achieve your best possible health."
        />
      </div>
    </div>
  );
}

export default About;
