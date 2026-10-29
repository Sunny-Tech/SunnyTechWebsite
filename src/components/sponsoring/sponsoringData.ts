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
            'Vos goodies dans le sac des participant·e·s',
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
            'Vos goodies dans le sac des participant·e·s',
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

/**
 * Comparison of the 7 offers, merging the two annex tables of the deck. Each
 * row lists one value per offer: Platinium, Gold, Silver, then the specials in
 * SPECIAL_OFFERS order.
 */
export const OFFER_COMPARISON: { group: string; rows: { label: string; values: string[] }[] }[] = [
    {
        group: 'Pendant l’événement',
        rows: [
            { label: 'Stand', values: ['15 m²', '9 m²', 'Espace partagé', '–', '–', '–', '–'] },
            {
                label: 'Billets pour votre équipe (accès aux conférences et au stand)',
                values: ['8', '6', '3', '2', '2', '2', '1'],
            },
            { label: 'Entrées soirée Networking en plus', values: ['4', '2', '1', '4', '–', '–', '–'] },
            { label: 'Entrées soirée Speakers', values: ['–', '–', '–', '–', '2', '–', '–'] },
            { label: 'Vos goodies dans le sac des participant·e·s', values: ['✔', '✔', '–', '–', '–', '–', '–'] },
            {
                label: 'Logo sur les supports physiques et la keynote',
                values: ['Premium', 'Classique', '✔', '✔', '✔', '✔', '✔'],
            },
            { label: 'Logo entre les talks + vidéo animée', values: ['Premium', 'Classique', '–', '–', '–', '–', '–'] },
            { label: 'Tirage de votre jeu-concours sur scène', values: ['✔', '–', '–', '–', '–', '–', '–'] },
            { label: 'Logo sur le gif de la borne OuiSnap !', values: ['✔', '–', '–', '–', '–', '–', '–'] },
            { label: 'Présentation pendant la soirée', values: ['–', '–', '–', '5 min', '10 min', '–', '–'] },
            {
                label: 'Kakémonos, flyers et stickers pendant la soirée ou dans l’espace',
                values: ['–', '–', '–', '✔', '✔', '✔', '–'],
            },
            { label: 'Décoration de l’espace détente à votre image', values: ['–', '–', '–', '–', '–', '✔', '–'] },
            { label: 'Tee-shirt spécial pendant la conférence', values: ['–', '–', '–', '–', '–', '–', '✔'] },
        ],
    },
    {
        group: 'Avant et après l’événement',
        rows: [
            { label: 'Logo sur le site Sunny Tech', values: ['✔', '✔', '✔', '✔', '✔', '✔', '✔'] },
            { label: 'Annonce du soutien sur les réseaux sociaux', values: ['✔', '✔', '–', '✔', '✔', '✔', '✔'] },
            { label: 'Logo sur nos bannières', values: ['✔', '✔', '✔', '–', '–', '–', '–'] },
            { label: 'Mise en avant dans la newsletter participants', values: ['✔', '✔', '–', '–', '–', '–', '–'] },
            { label: 'Logo sur les replays (chaîne YouTube)', values: ['✔', '–', '–', '–', '–', '–', '–'] },
            {
                label: 'Option recrutement : vos offres sur notre site et sur place',
                values: ['+500 €', '+500 €', '+500 €', '+500 €', '+500 €', '+500 €', '+500 €'],
            },
        ],
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

/**
 * Every sponsor since 2018, biggest companies first. Logos are self-hosted in
 * public/sponsoring/logos, copied from the archived edition sites.
 */
export const TRUSTED_BRANDS = [
    { name: 'Microsoft', logo: '/sponsoring/logos/microsoft.png' },
    { name: 'OVHcloud', logo: '/sponsoring/logos/ovhcloud.svg' },
    { name: 'Crédit Agricole', logo: '/sponsoring/logos/credit-agricole.png' },
    { name: 'La Poste', logo: '/sponsoring/logos/la-poste.png' },
    { name: 'MAIF', logo: '/sponsoring/logos/maif.svg' },
    { name: 'Groupama', logo: '/sponsoring/logos/groupama.svg' },
    { name: 'Sopra Steria', logo: '/sponsoring/logos/sopra-steria.png' },
    { name: 'Zendesk', logo: '/sponsoring/logos/zendesk.png' },
    { name: 'GitLab', logo: '/sponsoring/logos/gitlab.png' },
    { name: 'Elastic', logo: '/sponsoring/logos/elastic.svg' },
    { name: 'Rakuten', logo: '/sponsoring/logos/rakuten.png' },
    { name: 'SLB', logo: '/sponsoring/logos/slb.png' },
    { name: 'Talan', logo: '/sponsoring/logos/talan.png' },
    { name: 'Teads', logo: '/sponsoring/logos/teads.png' },
    { name: 'Septeo', logo: '/sponsoring/logos/septeo.png' },
    { name: 'Swile', logo: '/sponsoring/logos/swile.png' },
    { name: 'Clever Cloud', logo: '/sponsoring/logos/clever-cloud.svg' },
    { name: 'Smile', logo: '/sponsoring/logos/smile.png' },
    { name: 'Epitech', logo: '/sponsoring/logos/epitech.svg' },
    { name: 'CodinGame', logo: '/sponsoring/logos/codingame.png' },
    { name: 'CESI', logo: '/sponsoring/logos/cesi.png' },
    { name: 'SII', logo: '/sponsoring/logos/sii.png' },
    { name: 'Apside', logo: '/sponsoring/logos/apside.png' },
    { name: 'Meritis', logo: '/sponsoring/logos/meritis.png' },
    { name: 'Kaliop', logo: '/sponsoring/logos/kaliop.svg' },
    { name: 'Klanik', logo: '/sponsoring/logos/klanik.png' },
    { name: 'Weda', logo: '/sponsoring/logos/weda.svg' },
    { name: 'Scalingo', logo: '/sponsoring/logos/scalingo.svg' },
    { name: 'Smag', logo: '/sponsoring/logos/smag.svg' },
    { name: 'Namirial', logo: '/sponsoring/logos/namirial.svg' },
    { name: 'Agysoft', logo: '/sponsoring/logos/agysoft.png' },
    { name: 'Talkspirit', logo: '/sponsoring/logos/talkspirit.png' },
    { name: 'Netheos', logo: '/sponsoring/logos/netheos.png' },
    { name: 'Flint', logo: '/sponsoring/logos/flint.png' },
    { name: 'Inside', logo: '/sponsoring/logos/inside.png' },
    { name: 'AS-Tech Solutions', logo: '/sponsoring/logos/as-tech.svg' },
    { name: 'Believe IT', logo: '/sponsoring/logos/believe-it.png' },
    { name: 'DigitRE', logo: '/sponsoring/logos/digitre.png' },
    { name: 'Groupe ISIA', logo: '/sponsoring/logos/isia.png' },
    { name: 'Ikivia', logo: '/sponsoring/logos/ikivia.png' },
    { name: 'IP Formation', logo: '/sponsoring/logos/ip-formation.png' },
    { name: 'Fabriq', logo: '/sponsoring/logos/fabriq.svg' },
    { name: 'Spiriit', logo: '/sponsoring/logos/spiriit.svg' },
    { name: 'Externatic', logo: '/sponsoring/logos/externatic.png' },
    { name: 'Synanto', logo: '/sponsoring/logos/synanto.png' },
    { name: 'Objectif 3W', logo: '/sponsoring/logos/objectif-3w.png' },
    { name: 'Yupiik', logo: '/sponsoring/logos/yupiik.png' },
    { name: 'Codéin', logo: '/sponsoring/logos/codein.png' },
    { name: 'Edwyn', logo: '/sponsoring/logos/edwyn.svg' },
    { name: 'Frog', logo: '/sponsoring/logos/frog.png' },
    { name: 'Hiway', logo: '/sponsoring/logos/hiway.png' },
    { name: 'Lunatech', logo: '/sponsoring/logos/lunatech.png' },
    { name: 'Recherches & Horizons', logo: '/sponsoring/logos/recherches-horizons.png' },
    { name: 'Sequoiasoft', logo: '/sponsoring/logos/sequoiasoft.png' },
    { name: 'Sada Assurances', logo: '/sponsoring/logos/sada.png' },
    { name: 'ESII', logo: '/sponsoring/logos/esii.png' },
    { name: 'Idean', logo: '/sponsoring/logos/idean.png' },
    { name: 'Saagie', logo: '/sponsoring/logos/saagie.png' },
    { name: 'DecisionBrain', logo: '/sponsoring/logos/decisionbrain.png' },
    { name: 'Devensys', logo: '/sponsoring/logos/devensys.png' },
    { name: 'Smartview', logo: '/sponsoring/logos/smartview.png' },
    { name: 'Backelite', logo: '/sponsoring/logos/backelite.png' },
    { name: 'Adagio', logo: '/sponsoring/logos/adagio.png' },
    { name: 'IOcean', logo: '/sponsoring/logos/iocean.png' },
    { name: 'Aive', logo: '/sponsoring/logos/aive.png' },
    { name: 'Vitrine Media', logo: '/sponsoring/logos/vitrine-media.png' },
    { name: 'Winzana', logo: '/sponsoring/logos/winzana.png' },
    { name: 'Gamila', logo: '/sponsoring/logos/gamila.png' },
    { name: 'Nudibranches', logo: '/sponsoring/logos/nudibranches.svg' },
    { name: 'The Realm', logo: '/sponsoring/logos/the-realm.svg' },
    { name: 'Mon Job de Dev', logo: '/sponsoring/logos/mon-job-de-dev.svg' },
    { name: 'Dawp Engineering', logo: '/sponsoring/logos/dawp.png' },
    { name: 'exFabrica', logo: '/sponsoring/logos/exfabrica.png' },
    { name: 'ITK', logo: '/sponsoring/logos/itk.svg' },
]

export const STEPS = [
    {
        title: 'Remplissez le formulaire',
        text: 'Indiquez la formule qui vous intéresse, dans la limite des offres disponibles.',
    },
    {
        title: 'Recevez la confirmation et la facture',
        text: 'Nous confirmons la disponibilité de la formule et vous envoyons directement la facture.',
    },
    {
        title: 'Réglez la facture',
        text: 'Une fois le paiement reçu, votre logo apparaît sur notre site et vous pouvez récupérer vos places.',
    },
    { title: 'Choisissez votre stand', text: 'Les emplacements sont attribués selon la date de paiement.' },
]
