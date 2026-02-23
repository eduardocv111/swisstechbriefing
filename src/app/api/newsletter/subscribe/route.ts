import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, source, leadMagnet } = body;

        if (!email || !email.includes('@')) {
            return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
        }

        let dbOk = false;
        let formspreeOk = false;

        // ── 1. Guardar en Base de Datos Local (si funciona, genial; si no, seguimos) ──
        try {
            const { prisma } = await import('@/lib/db');
            await prisma.newsletterSubscription.create({
                data: {
                    email,
                    source: source || 'unknown',
                    leadMagnet: leadMagnet || null,
                },
            });
            dbOk = true;
        } catch (dbErr) {
            console.warn('[Newsletter] DB save failed (non-blocking):', dbErr);
        }

        // ── 2. Reenviar a Formspree (Notificación por email) ──
        try {
            const res = await fetch('https://formspree.io/f/mwvnwwgl', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    source: source || 'unknown',
                    leadMagnet: leadMagnet || null,
                    _subject: `SwissTech Newsletter [${source || 'web'}]`,
                    _replyto: email,
                }),
            });
            formspreeOk = res.ok;
            if (!formspreeOk) {
                console.warn('[Newsletter] Formspree returned non-OK:', res.status);
            }
        } catch (fsErr) {
            console.warn('[Newsletter] Formspree call failed:', fsErr);
        }

        // ── 3. Devolver éxito si AL MENOS UNO funcionó ──
        if (dbOk || formspreeOk) {
            return NextResponse.json({ ok: true });
        }

        // Si ambos fallaron, devolver error
        return NextResponse.json({ error: 'Subscription failed' }, { status: 502 });

    } catch (error) {
        console.error('[Newsletter] Unexpected error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
