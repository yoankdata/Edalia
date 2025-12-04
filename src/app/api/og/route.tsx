import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);

        // Récupération des paramètres
        const name = searchParams.get('name')?.slice(0, 100) || 'Enseignant Kademya';
        const subject = searchParams.get('subject')?.slice(0, 50) || 'Soutien scolaire';
        const photoUrl = searchParams.get('photo');
        const level = searchParams.get('level') || '';

        // Couleurs de la marque
        const emerald = '#1A3626';
        const gold = '#D4AF37'; // Un doré élégant

        return new ImageResponse(
            (
                <div
                    style={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'white',
                        border: `20px solid ${emerald}`,
                        position: 'relative',
                    }}
                >
                    {/* Logo Kademya (en haut) */}
                    <div style={{ position: 'absolute', top: 40, display: 'flex', alignItems: 'center' }}>
                        {/* Fallback texte stylisé si l'image ne charge pas, ou on peut utiliser une <img> si on a l'URL absolue */}
                        <span style={{ fontSize: 40, fontWeight: 900, color: emerald, letterSpacing: '-0.05em' }}>
                            KADEMYA
                        </span>
                    </div>

                    {/* Contenu Principal */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>

                        {/* Photo du Professeur */}
                        <div
                            style={{
                                width: 250,
                                height: 250,
                                borderRadius: '50%',
                                overflow: 'hidden',
                                border: `8px solid ${gold}`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#f3f4f6',
                            }}
                        >
                            {photoUrl ? (
                                <img
                                    src={photoUrl}
                                    alt={name}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            ) : (
                                <div style={{ fontSize: 80, color: '#9ca3af' }}>?</div>
                            )}
                        </div>

                        {/* Nom */}
                        <div
                            style={{
                                fontSize: 70,
                                fontWeight: 900,
                                color: emerald,
                                textAlign: 'center',
                                lineHeight: 1.1,
                                marginTop: 20,
                                padding: '0 40px',
                            }}
                        >
                            {name}
                        </div>

                        {/* Badge Matière & Niveau */}
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                backgroundColor: emerald,
                                color: 'white',
                                padding: '10px 40px',
                                borderRadius: 50,
                                fontSize: 30,
                                fontWeight: 600,
                                marginTop: 10,
                                boxShadow: '0 10px 30px -10px rgba(0,0,0,0.3)',
                            }}
                        >
                            {subject} {level ? `• ${level}` : ''}
                        </div>
                    </div>

                    {/* Footer / Décoration */}
                    <div
                        style={{
                            position: 'absolute',
                            bottom: 30,
                            fontSize: 24,
                            color: '#6b7280',
                            fontWeight: 500,
                        }}
                    >
                        Trouvez le professeur idéal sur kademya-ci.com
                    </div>
                </div>
            ),
            {
                width: 1200,
                height: 630,
            }
        );
    } catch (e: any) {
        console.log(`${e.message}`);
        return new Response(`Failed to generate the image`, {
            status: 500,
        });
    }
}
