/**
 * Types et interfaces pour l'application
 */

export interface Ada {
    id: number;
    cityPromo: string;
}

export interface Promo {
    id: number;
    nomPromo: string;
    dateStart: string;
}

export interface studentProject {
    id: number;
    title: String;
    image: String;
    PersonnalLink: string
    DemoLink: String;
    DateCreat: String;
    PublicDate: String;
    PromoLink: String;
    ProjetLink: String;
}

// Type pour les paramètres de route API
export type RouteContext<T extends string> = {
    params: Promise<{ id: string }>;
};

