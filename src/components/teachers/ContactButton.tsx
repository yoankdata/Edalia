'use client';

import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';
import * as gtag from '@/lib/gtag';
import { cn } from '@/lib/utils';

interface ContactButtonProps {
    phoneNumber: string;
    teacherId: string;
    teacherName?: string;
    className?: string;
    label?: string;
}

export default function ContactButton({
    phoneNumber,
    teacherId,
    teacherName,
    className,
    label = "Contacter par WhatsApp",
}: ContactButtonProps) {
    const handleContact = () => {
        // 1. Envoyer l'événement à Google Analytics
        gtag.event({
            action: 'click_whatsapp',
            category: 'Contact',
            label: `Teacher_${teacherId}`,
            value: 1,
        });

        // 2. Ouvrir WhatsApp
        // Nettoyer le numéro (enlever les espaces, etc.)
        const cleanNumber = phoneNumber.replace(/\D/g, '');
        const whatsappUrl = `https://wa.me/${cleanNumber}?text=Bonjour, je vous contacte via Kademya.`;

        window.open(whatsappUrl, '_blank');
    };

    return (
        <Button
            onClick={handleContact}
            className={cn("gap-2", className)}
        >
            <Phone className="w-5 h-5" />
            {label}
        </Button>
    );
}
