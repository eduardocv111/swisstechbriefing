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
        // You can add your Formspree ID here to get email notifications too
        const FORMSPREE_ID = "xpzeozea"; // Replace with your Formspree ID
        if (FORMSPREE_ID) {
            try {
                await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email,
                        source,
                        leadMagnet,
                        message: `Neu Newsletter Anmeldung von ${email} via ${source}`
                    }),
                });
            } catch (err) {
                console.error("Formspree forward error:", err);
                // We don't fail the request if Formspree fails, as DB already saved it
            }
        }

        return NextResponse.json({ ok: true, id: subscription.id });
    } catch (error) {
        console.error('Newsletter subscription error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
