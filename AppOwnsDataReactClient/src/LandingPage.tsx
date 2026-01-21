import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage: React.FC = () => {
    return (
        <div className="landing-wrapper">
            <header>
                <div className="container nav-content">
                    <div className="logo">TENACIOUS<span className="text-orange">DATA</span></div>
                    <div>
                        <Link to="/app" className="btn btn-primary" style={{ padding: '0.8rem 1.5rem' }}>Login</Link>
                    </div>
                </div>
            </header>

            <main>
                {/* Hero Section */}
                <section className="hero">
                    <div className="hero-bg"></div>
                    <div className="container hero-content">
                        <div className="fade-in-up">
                            <h1 className="display-text">
                                Build Your <br />
                                <span className="text-orange">Empire</span> of <br />
                                Intelligence
                            </h1>
                        </div>
                        <p className="lead fade-in-up delay-1">
                            Join the elite community of operators replacing manual grind with autonomous AI BI systems.
                            Reclaim your time. Own your data.
                        </p>
                        <div className="hero-actions fade-in-up delay-2">
                            <Link to="/app" className="btn btn-primary">Start Transformation</Link>
                            <a href="#learn" className="btn btn-outline">Explore The System</a>
                        </div>
                    </div>
                </section>

                {/* Stats */}
                <div className="stats-strip fade-in-up delay-3">
                    <div className="container">
                        <div className="stats-grid">
                            <div className="stat-item">
                                <h3>20+</h3>
                                <p>Hours Saved / Week</p>
                            </div>
                            <div className="stat-item">
                                <h3>40%</h3>
                                <p>Revenue Growth</p>
                            </div>
                            <div className="stat-item">
                                <h3>500+</h3>
                                <p>Empire Builders</p>
                            </div>
                            <div className="stat-item">
                                <h3>100%</h3>
                                <p>Self-Sovereign</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Narrative Section */}
                <section id="learn" style={{ padding: '8rem 0' }}>
                    <div className="container">
                        <div className="narrative-grid">
                            <div>
                                <h2 className="section-title">The Old Way <br />Is <span className="text-orange">Obsolete</span></h2>
                                <p className="lead" style={{ marginBottom: '2rem' }}>
                                    Manual reports, endless spreadsheets, and dependency on gatekeepers.
                                    It's a cage that limits your potential.
                                </p>
                                <p className="lead">
                                    Tenacious Data breaks the chains. We provide the infrastructure,
                                    the AI agents, and the blueprint to build a self-driving business intelligence system.
                                </p>
                            </div>
                            <div className="card">
                                <div className="feature-icon">⚡</div>
                                <h3>Autonomous Insights</h3>
                                <p style={{ color: '#888', marginTop: '1rem', lineHeight: 1.5 }}>
                                    Stop hunting for data. Let our AI agents surface the anomalies,
                                    opportunities, and threats while you sleep.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section style={{ background: 'linear-gradient(to top, var(--bg-card), transparent)', padding: '10rem 0', textAlign: 'center' }}>
                    <div className="container">
                        <h2 className="display-text" style={{ fontSize: '4rem', marginBottom: '2rem' }}>Ready to <span className="text-orange">Ascend?</span></h2>
                        <p className="lead" style={{ margin: '0 auto 3rem auto' }}>
                            The system is ready. The community is waiting. <br />
                            Your transformation begins with a single click.
                        </p>
                        <Link to="/app" className="btn btn-primary">Join Tenacious Data</Link>
                    </div>
                </section>
            </main>

            <footer>
                <div className="container" style={{ padding: '4rem 0', borderTop: '1px solid rgba(255,255,255,0.1)', textAlign: 'center', color: 'var(--text-muted)' }}>
                    <p>&copy; 2026 Tenacious Data. All Rights Reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
