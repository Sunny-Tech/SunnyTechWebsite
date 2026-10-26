/**
 * Content of the 2027 sponsoring kit, laid out on /sponsors-new. Mirrors the
 * "Dossier Sponsoring 2027" deck: update here when the offers change.
 */
import type { ImageMetadata } from 'astro'
import standPlatinium from '../../assets/sponsoring/stand-platinium.jpg'
import standGold from '../../assets/sponsoring/stand-gold.jpg'
import standSilver from '../../assets/sponsoring/stand-silver.jpg'

export const SPONSORS_FORM_URL = 'https://sunny-tech.io/sponsors-form'
export const CONTACT_EMAIL = 'contact@sunny-tech.io'

export const KEY_FIGURES = [
    { value: '30+', label: 'bénévoles engagé·e·s' },
    { value: '65+', label: 'talks sur 2 jours' },
    { value: '2 000', label: 'followers sur LinkedIn et X' },
    { value: '7', label: 'formules de sponsoring' },
    { value: '8e', label: 'édition en 2027' },
    { value: '1', label: 'Flamy 🦩' },
]

export const BENEFITS = [
    {
        title: 'Notoriété',
        text: 'Associer votre ADN à un événement métier responsable et qualitatif, auprès d’un public averti et technique.',
    },
    {
        title: 'Visibilité',
        text: 'Engager la communauté digitale de Sunny Tech autour de votre activité et de vos valeurs, avant, pendant et après l’événement.',
    },
    {
        title: 'Recrutement',
        text: 'Rencontrer des profils inaccessibles, échanger lors des networkings et économiser sur la prestation d’un cabinet externe.',
    },
    {
        title: 'Formation',
        text: 'Offrir à vos collaborateurs de la veille technique et du développement personnel lors d’un moment de team-building unique.',
    },
    {
        title: 'Solidarité',
        text: 'Soutenir un projet qui contribue au rayonnement de Montpellier dans la tech.',
    },
]

export type ClassicOffer = {
    name: string
    price: string
    image: ImageMetadata
    imageCaption: string
    stand: string
    tickets: number
    networkingTickets: number
    perks: string[]
    highlighted?: boolean
}

export const CLASSIC_OFFERS: ClassicOffer[] = [
    {
        name: 'Platinium',
        price: '6 750 €',
        image: standPlatinium,
        imageCaption: 'Stand 15 m², arrivée électrique incluse',
        stand: 'Stand de 15 m²',
        tickets: 8,
        networkingTickets: 4,
        perks: [
            'Des goodies',
            'Supports physiques premium de l’événement',
            'Tirage de votre jeu-concours sur scène',
            'Logo premium entre les talks, sur la borne OuiSnap ! et sur les replays',
            'Newsletter, annonce du sponsoring, site et bannières Sunny Tech',
        ],
        highlighted: true,
    },
    {
        name: 'Gold',
        price: '4 700 €',
        image: standGold,
        imageCaption: 'Stand 9 m², arrivée électrique incluse',
        stand: 'Stand de 9 m²',
        tickets: 6,
        networkingTickets: 2,
        perks: [
            'Des goodies',
            'Supports physiques classiques de l’événement',
            'Logo entre les talks',
            'Newsletter, annonce du sponsoring, site et bannières Sunny Tech',
        ],
    },
    {
        name: 'Silver',
        price: '2 450 €',
        image: standSilver,
        imageCaption: 'Votre kakémono en avant, table et chaise fournies',
        stand: 'Espace partagé',
        tickets: 3,
        networkingTickets: 1,
        perks: [
            'Supports physiques de l’événement',
            'Mise en avant du sponsoring',
            'Logo sur le site et les bannières',
        ],
    },
]

/** Each row lists the Platinium, Gold and Silver values, in that order. */
export const CLASSIC_COMPARISON: { group: string; rows: { label: string; values: [string, string, string] }[] }[] = [
    {
        group: 'Pendant l’événement',
        rows: [
            { label: 'Stand', values: ['15 m²', '9 m²', 'Espace partagé'] },
            { label: 'Billets (conférences + stand)', values: ['8', '6', '3'] },
            { label: 'Entrées soirée Networking en plus', values: ['4', '2', '1'] },
            { label: 'Goodies', values: ['✔', '✔', '–'] },
            { label: 'Visibilité sur les supports physiques', values: ['Premium', 'Classique', '✔'] },
            { label: 'Logo entre les talks + vidéo animée', values: ['Premium', 'Classique', '–'] },
            { label: 'Tirage de votre jeu-concours sur scène', values: ['✔', '–', '–'] },
            { label: 'Logo sur le gif de la borne OuiSnap !', values: ['✔', '–', '–'] },
        ],
    },
    {
        group: 'Avant et après l’événement',
        rows: [
            { label: 'Logo sur le site Sunny Tech', values: ['✔', '✔', '✔'] },
            { label: 'Annonce du soutien sur les réseaux sociaux', values: ['✔', '✔', '–'] },
            { label: 'Mise en avant du sponsoring + logo sur nos bannières', values: ['✔', '✔', '✔'] },
            { label: 'Mise en avant dans la newsletter participants', values: ['✔', '✔', '–'] },
            { label: 'Logo sur les replays (chaîne YouTube)', values: ['✔', '–', '–'] },
        ],
    },
]

export type SpecialOffer = {
    name: string
    price: string
    tagline: string
    audience?: string
    tickets: string
    perks: string[]
}

export const SPECIAL_OFFERS: SpecialOffer[] = [
    {
        name: 'Apéro Networking',
        price: '3 000 €',
        tagline: 'Votre marque auprès des acteurs de la région',
        audience: '300 participant·e·s',
        tickets: '2 billets + 4 entrées soirée Networking',
        perks: [
            'Soirée publique du jeudi soir, sur place',
            '5 minutes de présentation',
            'Présence physique (kakémonos, flyers, stickers…)',
        ],
    },
    {
        name: 'Soirée Speakers',
        price: '2 200 €',
        tagline: 'Votre marque auprès d’expert·e·s venu·e·s de toute la France',
        audience: '80+ speakers',
        tickets: '2 billets + 2 entrées soirée Speakers',
        perks: [
            'Soirée privée du mercredi soir',
            '10 minutes de présentation pendant la soirée',
            'Présence physique (kakémonos, flyers, stickers…)',
        ],
    },
    {
        name: 'Espace détente',
        price: '2 000 €',
        tagline: 'Dites tout fort quel travail rime avec confort',
        tickets: '2 billets',
        perks: [
            'Présence physique (kakémonos, flyers, stickers…)',
            'Décoration de l’espace avec du matériel à votre image : poufs, transats, serviettes de plage…',
        ],
    },
    {
        name: 'Soutien',
        price: '1 000 €',
        tagline: 'Un coup de pouce qui se voit',
        tickets: '1 billet',
        perks: ['Un tee-shirt spécial pour vous distinguer pendant la conférence'],
    },
]

/** Perks every special offer includes on top of its own, worded to follow "Chacune inclut". */
export const SPECIAL_COMMON_PERKS = [
    'votre logo pendant la keynote',
    'une mise en avant sur les réseaux sociaux',
    'votre soutien affiché sur le site Sunny Tech',
]

export const OPTIONS = [
    {
        name: 'Option recrutement',
        price: '500 €',
        badge: 'Nouveau',
        text: 'Communication sur vos postes à pourvoir auprès de nos 2 000 followers LinkedIn et X, sur notre site et sur place (kakémonos, flyers, stickers…). Option limitée.',
    },
    {
        name: 'Places supplémentaires',
        price: '130 € / place',
        text: 'Sponsors Platinium, Gold ou Silver : commandez des places hors du pool de billetterie classique, en plus de celles incluses dans votre pack.',
    },
]

export const FLASHBACK_FIGURES = [
    { value: '550', label: 'participant·e·s' },
    { value: '85', label: 'conférences' },
    { value: '75', label: 'speakers' },
    { value: '24', label: 'sponsors' },
    { value: '22', label: 'bénévoles' },
]

export const FLASHBACK_LINKS = [
    { label: 'Programme 2026', href: 'https://2026.sunny-tech.io/schedule/' },
    { label: 'Photos 2026', href: 'https://photos.app.goo.gl/BjqfEkdeMh1WzeNAA' },
    {
        label: 'Replays 2026',
        href: 'https://www.youtube.com/watch?v=v7JkOxSG4gI&list=PLz7aCyCbFOu8_3w6EydaKkjHDiZ9Az1XR',
    },
]

/** Best-known brands that sponsored a past edition, from the sponsors history. */
export const PAST_BRANDS = [
    'Microsoft',
    'OVHcloud',
    'MAIF',
    'Groupama',
    'La Poste',
    'Zendesk',
    'GitLab',
    'Elastic',
    'CGI',
    'Sopra Steria',
    'Talan',
    'SLB',
    'Rakuten',
    'Teads',
    'Smile',
    'CodinGame',
    'Epitech',
]

export const STEPS = [
    {
        title: 'Remplissez le formulaire',
        text: 'Indiquez la formule qui vous intéresse, dans la limite des offres disponibles.',
    },
    { title: 'Recevez notre confirmation', text: 'Nous vous confirmons par e-mail la disponibilité de la formule.' },
    { title: 'Récupérez vos billets', text: 'Via un code, 3 mois avant l’événement.' },
    { title: 'Choisissez votre stand', text: 'Les emplacements sont attribués selon la date de paiement.' },
]
