import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, source, leadMagnet } = body;

        if (!email || !email.includes('@')) {
            return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
        }

        let dbSuccess = false;
        let formspreeSuccess = false;

        // 1. Save to Local Database
        try {
            await prisma.newsletterSubscription.create({
                data: {
                    email,
                    source: source || 'unknown',
                    leadMagnet: leadMagnet || null,
                },
            });
            dbSuccess = true;
        } catch (dbError) {
            console.error('Local DB newsletter save error:', dbError);
        }

        // 2. Forward to Formspree (External Email Notification)
        const FORMSPREE_ID = "mwvnwwgl";
        if (FORMSPREE_ID) {
            try {
                const fsResponse = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        email,
                        source,
                        leadMagnet,
                        _subject: `SwissTech Briefing Newsletter [${source}]`,
                        _replyto: email
                    }),
                });
                formspreeSuccess = fsResponse.ok;
            } catch (err) {
                console.error("Formspree forward error:", err);
            }
        }

        // Return success if at least one storage method worked
        if (dbSuccess || formspreeSuccess) {
            return NextResponse.json({ ok: true });
        }

        throw new Error('Both database and Formspree submission failed');
    } catch (error) {
        console.error('Global newsletter subscription error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
