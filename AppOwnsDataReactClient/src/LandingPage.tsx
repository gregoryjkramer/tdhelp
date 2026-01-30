import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage: React.FC = () => {
    return (
        <div className="landing-wrapper">
            <header className="fade-in-up">
                <div className="container nav-content">
                    <div className="display-text" style={{ fontSize: '1.5rem', letterSpacing: '-0.03em' }}>
                        TENACIOUS<span className="text-orange">DATA</span>
                    </div>
                    <nav style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
                        <Link to="/demo" style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 500 }}>Live Demo</Link>
                        <Link to="/app" className="btn btn-primary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.9rem' }}>Login</Link>
                    </nav>
                </div>
            </header>

            <main>
                {/* Hero Section */}
                <section className="hero">
                    <div className="hero-bg"></div>
                    {/* Animated Glow Orbs */}
                    <div className="glow-orb" style={{ top: '20%', left: '10%', width: '300px', height: '300px', background: 'radial-gradient(circle, var(--accent-orange-dim) 0%, transparent 70%)', opacity: 0.4 }}></div>
                    <div className="glow-orb" style={{ bottom: '10%', right: '5%', width: '400px', height: '400px', background: 'radial-gradient(circle, var(--accent-orange-dim) 0%, transparent 70%)', opacity: 0.3 }}></div>

                    <div className="container hero-content" style={{ position: 'relative', zIndex: 10 }}>
                        <div className="fade-in-up">
                            <h1 className="display-text" style={{ fontSize: '5rem', lineHeight: 1.0, marginBottom: '2rem' }}>
                                Build Your <br />
                                <span className="text-orange">Empire</span> of <br />
                                Intelligence
                            </h1>
                        </div>
                        <p className="lead fade-in-up delay-1" style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '600px', marginBottom: '3rem' }}>
                            Replacing manual grind with autonomous BI systems.
                            Reclaim your time. Own your data. Settle in sats.
                        </p>
                        <div className="hero-actions fade-in-up delay-2" style={{ display: 'flex', gap: '1rem' }}>
                            <Link to="/app" className="btn btn-primary" style={{ padding: '1rem 2rem' }}>Start Transformation</Link>
                            <Link to="/demo" className="btn glass-panel" style={{ padding: '1rem 2rem', background: 'rgba(255,255,255,0.03)' }}>Explore The System</Link>
                        </div>
                    </div>
                </section>

                {/* Stats */}
                <div className="stats-strip fade-in-up delay-3" style={{ borderTop: '1px solid var(--glass-border)', background: 'rgba(255,107,0,0.02)' }}>
                    <div className="container">
                        <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', padding: '4rem 0' }}>
                            <div className="stat-item">
                                <h3 className="display-text text-orange" style={{ fontSize: '2.5rem' }}>20+</h3>
                                <p style={{ color: 'var(--text-muted)' }}>Hours Saved / Week</p>
                            </div>
                            <div className="stat-item">
                                <h3 className="display-text text-orange" style={{ fontSize: '2.5rem' }}>40%</h3>
                                <p style={{ color: 'var(--text-muted)' }}>Revenue Growth</p>
                            </div>
                            <div className="stat-item">
                                <h3 className="display-text text-orange" style={{ fontSize: '2.5rem' }}>500+</h3>
                                <p style={{ color: 'var(--text-muted)' }}>Empire Builders</p>
                            </div>
                            <div className="stat-item">
                                <h3 className="display-text text-orange" style={{ fontSize: '2.5rem' }}>100%</h3>
                                <p style={{ color: 'var(--text-muted)' }}>Self-Sovereign</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <section style={{ padding: '8rem 0', textAlign: 'center', position: 'relative' }}>
                    <div className="container">
                        <div className="glass-panel" style={{ padding: '6rem 3rem', background: 'radial-gradient(circle at center, rgba(255,107,0,0.05) 0%, transparent 100%)' }}>
                            <h2 className="display-text" style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>Ready to <span className="text-orange">Ascend?</span></h2>
                            <p style={{ color: 'var(--text-muted)', maxWidth: '500px', margin: '0 auto 3rem auto' }}>
                                The system is ready. The community is waiting. <br />
                                Your transformation begins with a single click.
                            </p>
                            <Link to="/app" className="btn btn-primary" style={{ padding: '1rem 3rem' }}>Join Tenacious Data</Link>
                        </div>
                    </div>
                </section>
            </main>

            <footer>
                <div className="container" style={{ padding: '4rem 0', borderTop: '1px solid var(--glass-border)', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    <p>&copy; 2026 <span className="display-text" style={{ color: 'var(--text-main)', fontSize: '0.8rem' }}>TENACIOUS<span className="text-orange">DATA</span></span>. Settle globally, build locally.</p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
