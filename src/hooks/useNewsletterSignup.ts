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

        let dbSuccess = false;
        let formspreeSuccess = false;

        try {
            // 1. Intento guardar en DB local (silencioso, si falla no bloquea Formspree)
            try {
                const dbResponse = await fetch('/api/newsletter/subscribe', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, source, leadMagnet }),
                });
                dbSuccess = dbResponse.ok;
            } catch (dbErr) {
                console.error('Local DB save failed, proceeding to Formspree:', dbErr);
            }

            // 2. Intento enviar a Formspree (Prioridad para notificación)
            const formspreeResponse = await fetch('https://formspree.io/f/mwvnwwgl', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    _subject: `Newsletter Signup: ${source}`,
                    source: source,
                    site: 'swisstechbriefing.ch'
                }),
            });
            formspreeSuccess = formspreeResponse.ok;

            if (formspreeSuccess || dbSuccess) {
                setStatus('success');
                setEmail('');
                trackEvent('newsletter_signup_success', { location: source });
            } else {
                setStatus('error');
                trackEvent('newsletter_signup_error', { location: source, type: 'network_failure' });
            }
        } catch (error) {
            console.error('Global newsletter error:', error);
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
