import React from 'react';
import { Link } from 'react-router-dom';
import './InfoPage.css';

const Careers = () => {
    const positions = [
        { title: 'Frontend Developer', dept: 'Engineering', type: 'Full-time', location: 'Chennai / Remote' },
        { title: 'Backend Developer', dept: 'Engineering', type: 'Full-time', location: 'Chennai / Remote' },
        { title: 'UI/UX Designer', dept: 'Design', type: 'Full-time', location: 'Chennai' },
        { title: 'Customer Support Executive', dept: 'Operations', type: 'Full-time', location: 'Chennai' },
    ];

    return (
        <div className="info-page-container">
            <div className="info-page-card">
                <div className="info-page-hero" style={{ background: 'linear-gradient(135deg, #1a237e 0%, #3949ab 100%)' }}>
                    <span className="info-page-icon">💼</span>
                    <h1>Careers at FashionHub</h1>
                    <p className="info-subtitle">Join our team and shape the future of fashion</p>
                </div>

                <div className="info-content">
                    <p>
                        We are always looking for talented, passionate individuals to join the FashionHub family.
                        Whether you are a developer, designer, or customer champion — there's a place for you here.
                    </p>

                    <h2>Open Positions</h2>
                    <div className="jobs-list">
                        {positions.map((job, i) => (
                            <div className="job-card" key={i}>
                                <div className="job-left">
                                    <h3>{job.title}</h3>
                                    <span className="job-dept">{job.dept}</span>
                                </div>
                                <div className="job-right">
                                    <span className="job-tag">{job.type}</span>
                                    <span className="job-location">📍 {job.location}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="info-highlight-box">
                        <h3>How to Apply</h3>
                        <p>Send your resume and a brief cover letter to:</p>
                        <a href="mailto:careers@fashionhub.com" className="info-email-link">📧 careers@fashionhub.com</a>
                    </div>

                    <div className="info-back-row">
                        <Link to="/" className="info-back-btn">← Back to Shopping</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Careers;
