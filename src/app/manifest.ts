import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Kademya - Trouvez le professeur idéal',
        short_name: 'Kademya',
        description: 'La plateforme de référence pour le soutien scolaire en Côte d\'Ivoire.',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#1A3626',
        icons: [
            {
                src: '/images/kademya-app-icon.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/images/kademya-app-icon.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    };
}
