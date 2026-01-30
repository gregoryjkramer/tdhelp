import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import * as powerbi from 'powerbi-client';
import axios from 'axios';
import './FabricDemo.css';
import PaymentWidget from "./components/PaymentWidget";

const DEFAULT_WORKSPACE_ID = '3405b65d-7455-4ad5-ba0f-5db626cd8f3b';
const DEFAULT_REPORT_ID = '67d62ff9-7478-47dd-812a-a5ac24a1166f';

const FabricDemo: React.FC = () => {
    const reportRef = useRef<HTMLDivElement | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    useEffect(() => {
        // Handle payment redirects
        const params = new URLSearchParams(window.location.search);
        const status = params.get('status');
        if (status === 'success') {
            setStatusMessage({ type: 'success', text: "Payment Successful! Your Empire just got stronger. ⚡" });
        } else if (status === 'cancel') {
            setStatusMessage({ type: 'error', text: "Payment cancelled. Keep building! 🛠️" });
        }

        const loadReport = async () => {
            try {
                setIsLoading(true);
                setErrorMessage(null);

                const apiUrl = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5138';
                const workspaceId = import.meta.env.VITE_FABRIC_WORKSPACE_ID ?? DEFAULT_WORKSPACE_ID;
                const reportId = import.meta.env.VITE_FABRIC_REPORT_ID ?? DEFAULT_REPORT_ID;

                const response = await axios.get(`${apiUrl}/api/Reports/embed-token`, {
                    params: { workspaceId, reportId },
                });

                const { embedToken, reportId: embeddedReportId, embedUrl } = response.data;

                const models = powerbi.models;
                const config: powerbi.IEmbedConfiguration = {
                    type: 'report',
                    id: embeddedReportId,
                    embedUrl,
                    accessToken: embedToken,
                    tokenType: models.TokenType.Embed,
                    settings: {
                        panes: {
                            filters: { visible: false },
                            pageNavigation: { visible: true },
                        },
                        background: models.BackgroundType.Transparent,
                    },
                };

                const powerbiService = new powerbi.service.Service(
                    powerbi.factories.hpmFactory,
                    powerbi.factories.wpmpFactory,
                    powerbi.factories.routerFactory
                );

                if (reportRef.current) {
                    powerbiService.reset(reportRef.current);
                    reportRef.current.innerHTML = '';
                    powerbiService.embed(reportRef.current, config);
                }
            } catch (err) {
                console.error('Error loading Fabric report', err);
                setErrorMessage('Unable to load the report. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };

        loadReport();
    }, []);

    return (
        <div className="demo-wrapper">
            {/* Header */}
            <header className="demo-header">
                <div className="container nav-content">
                    <Link to="/" className="logo">
                        TENACIOUS<span className="text-orange">DATA</span>
                    </Link>
                    <nav className="demo-nav">
                        <Link to="/" className="nav-link">Home</Link>
                        <Link to="/demo" className="nav-link nav-link-active">Demo</Link>
                        <Link to="/app" className="btn btn-primary btn-sm">Dashboard</Link>
                    </nav>
                </div>
            </header>

            {/* Hero Banner */}
            <section className="demo-hero">
                <div className="demo-hero-glow"></div>
                <div className="container">
                    <div className="demo-hero-content fade-in-up">
                        <div className="demo-badge">LIVE DEMO</div>
                        <h1 className="demo-title">
                            Product Sales <span className="text-orange">Summary</span>
                        </h1>
                        <p className="demo-subtitle">
                            Interactive Power BI report powered by Microsoft Fabric DirectLake,
                            embedded with App-Owns-Data authentication. Explore sales revenue,
                            product performance, and geographic insights in real time.
                        </p>

                        {/* Status Message */}
                        {statusMessage && (
                            <div className={`status-alert status-${statusMessage.type} fade-in`}>
                                {statusMessage.text}
                            </div>
                        )}

                        {/* Bitcoin Payment Action */}
                        <div className="demo-actions fade-in-up">
                            <div className="payment-card">
                                <div className="payment-label">SOUND MONEY LAYER</div>
                                <h3 className="payment-title">Support Tenacious Data</h3>
                                <p className="payment-text">Fuel the development of world-class analytics. Pay a one-time listing fee in sats.</p>
                                <PaymentWidget
                                    title="Tenacious Data - Listing Fee"
                                    description="Supporting the deployment of multi-tenant Fabric analytics."
                                    amountSats={2100}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Report Section */}
            <section className="demo-report-section">
                <div className="container">
                    <div className="demo-report-container fade-in-up delay-1">
                        {isLoading && (
                            <div className="demo-loading">
                                <div className="demo-spinner"></div>
                                <p>Loading report...</p>
                            </div>
                        )}
                        {errorMessage && (
                            <div className="demo-error">
                                <p>{errorMessage}</p>
                            </div>
                        )}
                        <div ref={reportRef} className="demo-report-embed" />
                    </div>
                </div>
            </section>

            {/* Info Cards */}
            <section className="demo-info-section">
                <div className="container">
                    <div className="demo-info-grid fade-in-up delay-2">
                        <div className="demo-info-card">
                            <div className="demo-info-icon">&#9889;</div>
                            <h3>DirectLake</h3>
                            <p>Queries OneLake directly &mdash; no data import lag. Fresh data, every time.</p>
                        </div>
                        <div className="demo-info-card">
                            <div className="demo-info-icon">&#128274;</div>
                            <h3>App-Owns-Data</h3>
                            <p>Service Principal authentication. No per-user Power BI licenses required.</p>
                        </div>
                        <div className="demo-info-card">
                            <div className="demo-info-icon">&#9881;</div>
                            <h3>Fully Automated</h3>
                            <p>Workspace, lakehouse, notebook, semantic model, and report &mdash; deployed by code.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="demo-footer">
                <div className="container">
                    <p>&copy; 2026 Tenacious Data. All Rights Reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default FabricDemo;
