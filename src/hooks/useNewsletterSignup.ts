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
            console.warn('Bot detected via honeypot');
            setStatus('success'); // Pretend success to the bot
            return;
        }

        setStatus('submitting');

        // 1. Initial GA4 Track
        trackEvent('newsletter_cta_click', {
            location: source,
            lead_magnet: leadMagnet
        });

        try {
            // 2. Submit to Internal API (Database)
            // We still want to save it locally for high reliability
            const dbResponse = await fetch('/api/newsletter/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    source,
                    leadMagnet
                }),
            });

            // 3. Submit to Formspree (Email Notification)
            const formspreeResponse = await fetch('https://formspree.io/f/mwvnwwgl', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    _subject: `SwissTech Briefing Newsletter Signup [${source}]`,
                    source: source,
                    site: 'swisstechbriefing.ch',
                    leadMagnet: leadMagnet
                }),
            });

            if (formspreeResponse.ok || dbResponse.ok) {
                setStatus('success');
                setEmail('');
                trackEvent('newsletter_signup_success', {
                    location: source,
                    lead_magnet: leadMagnet
                });
            } else {
                throw new Error('Formspree/DB submission failed');
            }
        } catch (error) {
            console.error('Newsletter submission error:', error);
            setStatus('error');
            trackEvent('newsletter_signup_error', {
                location: source,
                error: String(error)
            });
        }
    };

    return {
        email,
        setEmail,
        company,
        setCompany,
        status,
        handleSubmit,
        isIdle: status === 'idle',
        isSubmitting: status === 'submitting',
        isSuccess: status === 'success',
        isError: status === 'error'
    };
}
