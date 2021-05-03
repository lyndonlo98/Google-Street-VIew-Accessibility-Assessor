import React from 'react';
import { ReactComponent as GithubIcon } from '../../icons/github.svg';

const About = () => {

    return (
        <div className="about-box">
            <p>
                This project is meant to highlight a possible solution for people with disabilities planning trips.
                This project lacks practicality as the data source, Google streetview images, is not up to date. However,
                we see the underlying model as a useful tool that could be extended to provide valuable insight to city
                planners as well.
            </p>
            <p>
                Additionally, we see a tool like this thriving with the rise of autonomous vehicles that could provide up-to-date
                crowd sourced data. Therefore, it being able to detect more transiet obstacles such as weather conditions.
            </p>
            <h3>How to use</h3>
            <p>
                Use the directions tab for setting a trip. Click the orange markers 
                along the route to view an accessibility summary of that point. 
            </p>
            <div className="github-box">
                <a href="https://github.com/lyndonlo98/Google-Street-View-Accessibility-Assessor/tree/master">
                    <GithubIcon />
                </a>
            </div>
        </div>
    )
}

export default About;