import React, { useState } from "react";
import { Link } from "react-router-dom";
import PowerBIEmbed from "./components/PowerBIEmbed";
import { Checkout, useCheckout } from "@moneydevkit/replit";

const Dashboard: React.FC = () => {
    const [isPaymentOpen, setIsPaymentOpen] = useState(false);
    const [sessionId, setSessionId] = useState<string | undefined>(undefined);
    const { createCheckout, isLoading } = useCheckout();

    const handlePayClick = async () => {
        setIsPaymentOpen(true);
        const result = await createCheckout({
            type: 'AMOUNT',
            amount: 100,
            currency: 'SAT',
            title: 'Tenacious Data Access'
        });

        if (result.data) {
            // Extract session ID from URL: https://.../checkout/cs_123...
            const parts = result.data.checkoutUrl.split('/');
            const id = parts[parts.length - 1];
            if (id) {
                setSessionId(id);
            }
        }
    };

    return (
        <div style={{ backgroundColor: 'var(--bg-deep)', minHeight: '100vh', paddingBottom: '4rem' }}>
            {/* Top Navigation */}
            <header className="glass-panel" style={{
                margin: '1rem',
                borderRadius: '16px',
                border: '1px solid var(--glass-border)',
                position: 'sticky',
                top: '1rem',
                zIndex: 100
            }}>
                <div style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    padding: '0.75rem 1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <div className="display-text" style={{ fontSize: '1.25rem' }}>
                        TENACIOUS<span className="text-orange">DATA</span>
                    </div>

                    <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                        <Link to="/" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Landing</Link>
                        <button
                            className="btn btn-primary"
                            style={{ fontSize: '0.85rem', padding: '0.6rem 1.2rem', opacity: isLoading ? 0.7 : 1 }}
                            onClick={handlePayClick}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Preparing...' : 'Pay in Sats ⚡'}
                        </button>
                    </nav>
                </div>
            </header>

            <main style={{ maxWidth: '1200px', margin: '2rem auto', padding: '0 1.5rem' }}>
                {/* Dashboard Header */}
                <div style={{ marginBottom: '2.5rem' }} className="fade-in-up">
                    <h1 className="display-text" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
                        Command <span className="text-orange">Center</span>
                    </h1>
                    <p style={{ color: 'var(--text-muted)', maxWidth: '600px' }}>
                        Real-time intelligence from your business ecosystem. Scoped, secure, and sovereign.
                    </p>
                </div>

                {/* Main Stats / Info Bar */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '1.5rem',
                    marginBottom: '3rem'
                }} className="fade-in-up delay-1">
                    <div className="glass-panel" style={{ padding: '1.5rem' }}>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                            Data Status
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22c55e', boxShadow: '0 0 10px #22c55e88' }}></div>
                            <span style={{ fontWeight: 600 }}>Connected</span>
                        </div>
                    </div>

                    <div className="glass-panel" style={{ padding: '1.5rem', borderLeft: '4px solid var(--accent-orange)' }}>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                            Enterprise Tier
                        </div>
                        <div style={{ fontWeight: 600 }}>Standard PBI Embedded</div>
                    </div>
                </div>

                {/* The Report Section */}
                <section className="glass-panel fade-in-up delay-2" style={{ padding: '10px', height: '700px' }}>
                    <PowerBIEmbed key={sessionId} mdkSessionId={sessionId} />
                </section>
            </main>

            {/* MDK Payment Modal */}
            {isPaymentOpen && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.85)',
                    backdropFilter: 'blur(8px)',
                    zIndex: 1000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <div className="glass-panel" style={{ width: '90%', maxWidth: '500px', padding: '2rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <h2 className="display-text">Settle in <span className="text-orange">Sats</span></h2>
                            <button
                                onClick={() => setIsPaymentOpen(false)}
                                style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '1.5rem' }}
                            >
                                &times;
                            </button>
                        </div>

                        {sessionId ? (
                            <Checkout
                                id={sessionId}
                            />
                        ) : (
                            <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>
                                Generating Invoice...
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
