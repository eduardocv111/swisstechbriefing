'use client';

import { useState } from 'react';
import { trackEvent } from '@/lib/ga';

type Status = 'idle' | 'submitting' | 'success' | 'error';

interface UseNewsletterSignupProps {
    source: string;
    leadMagnet?: string;
}

export function useNewsletterSignup({ source, leadMagnet = 'ai_report_pdf' }: UseNewsletterSignupProps) {
    const [status, setStatus] = useState<Status>('idle');
    const [email, setEmail] = useState('');
    const [company, setCompany] = useState(''); // Honeypot

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Anti-spam check
        if (company) {
            setStatus('success');
            return;
        }

        if (!email || !email.includes('@')) {
            setStatus('error');
            return;
        }

        setStatus('submitting');

        trackEvent('newsletter_cta_click', {
            location: source,
            lead_magnet: leadMagnet
        });

        try {
            // CENTRALIZADO: Llamamos a nuestra API que hace TODO (DB + Formspree)
            const response = await fetch('/api/newsletter/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    source,
                    leadMagnet
                }),
            });

            if (response.ok) {
                setStatus('success');
                setEmail('');
                trackEvent('newsletter_signup_success', { location: source });
            } else {
                setStatus('error');
                trackEvent('newsletter_signup_error', { location: source });
            }
        } catch (error) {
            console.error('Newsletter submission error:', error);
            setStatus('error');
        }
    };

    return {
        email, setEmail, company, setCompany, status, handleSubmit,
        isSubmitting: status === 'submitting',
        isSuccess: status === 'success',
        isError: status === 'error'
    };
}
