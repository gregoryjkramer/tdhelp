import React, { useState } from 'react';
import { useCheckout, Checkout } from '@moneydevkit/replit';

interface PaymentWidgetProps {
    title: string;
    description: string;
    amountSats: number;
    buildingId?: string;
    tenantId?: string;
}

const PaymentWidget: React.FC<PaymentWidgetProps> = ({
    title,
    description,
    amountSats,
}) => {
    const { createCheckout, isLoading: isCreating } = useCheckout();
    const [isProcessing, setIsProcessing] = useState(false);
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handlePayInSats = async () => {
        try {
            setIsProcessing(true);
            setError(null);

            const result = await createCheckout({
                type: 'AMOUNT',
                amount: amountSats,
                currency: 'SAT',
                title: title,
                description: description
            });

            if (result.data) {
                const parts = result.data.checkoutUrl.split('/');
                const id = parts[parts.length - 1];
                setSessionId(id);
            } else if (result.error) {
                throw new Error(result.error.message);
            }

        } catch (err: any) {
            console.error("Payment error:", err);
            setError(err.message || "Payment session failed to initialize");
        } finally {
            setIsProcessing(false);
        }
    };

    if (sessionId) {
        return <Checkout id={sessionId} />;
    }

    return (
        <div className="payment-widget">
            <button
                className="btn btn-primary"
                onClick={handlePayInSats}
                disabled={isProcessing || isCreating}
            >
                {isProcessing || isCreating ? "Initializing..." : `Pay ${amountSats} Sats`}
            </button>
            {error && <div className="payment-error text-red" style={{ marginTop: '10px', fontSize: '0.8rem' }}>{error}</div>}
        </div>
    );
};

export default PaymentWidget;
