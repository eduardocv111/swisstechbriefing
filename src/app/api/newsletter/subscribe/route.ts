import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, source, leadMagnet } = body;

        if (!email || !email.includes('@')) {
            return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
        }

        // Save to Database
        const subscription = await prisma.newsletterSubscription.create({
            data: {
                email,
                source: source || 'unknown',
                leadMagnet: leadMagnet || null,
            },
        });

        // ── Formspree Integration ──
        // Using your endpoint: mwvnwwgl
        const FORMSPREE_ID = "mwvnwwgl";
        if (FORMSPREE_ID) {
            try {
                await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                    body: JSON.stringify({
                        email,
                        source,
                        leadMagnet,
                        _subject: `SwissTech Briefing Newsletter DB-Sync [${source}]`
                    }),
                });
            } catch (err) {
                console.error("Formspree forward error:", err);
            }
        }

        return NextResponse.json({ ok: true, id: subscription.id });
    } catch (error) {
        console.error('Newsletter subscription error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
