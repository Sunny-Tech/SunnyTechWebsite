export type OpenPlannerType = {
    event: {
        tracks: Track[]
        categories: Category[]
    }
    sponsors: {
        name: string
        order: number
        sponsors: {
            website: string
            name: string
            logoUrl: string
            jobPosts?: JobPost[]
        }[]
    }[]
    sessions: Session[]
    team: {
        name: string
        photoUrl: string
        socials: {
            name: string
            icon: string
            link: string
        }[]
    }[]
    speakers: Speaker[]
}

export interface Track {
    id: string
    name: string
}

export interface Category {
    id: string
    name: string
    color?: string
    colorSecondary?: string
}

export interface Session {
    id: string
    title: string
    abstract: string | null
    dateStart: string | null | undefined
    dateEnd: string | null | undefined
    durationMinutes: number
    speakerIds: string[]
    trackId: string | null
    language: string | null
    level: string | null
    imageUrl: string | null | undefined
    presentationLink: string | null | undefined
    videoLink: string | null | undefined
    tags: string[]
    formatId: string | null
    categoryId: string | null
    showInFeedback: boolean
    hideTrackTitle: boolean
    extendHeight: number | undefined
    extendWidth: number | undefined
    teaserVideoUrl: string | null | undefined
    teaserImageUrl: string | null | undefined
}

export interface Speaker {
    id: string
    name: string
    pronouns: string | null | undefined
    jobTitle: string | null | undefined
    bio: string | null
    company: string | null | undefined
    companyLogoUrl: string | null | undefined
    photoUrl: string | null | undefined
    socials: {
        name: string
        icon: string
        link: string
    }[]
}

export interface JobPost {
    id: string
    title: string
    description: string
    location: string
    externalLink: string
    salary: string | null
    contactEmail: string | null
    category: string
    createdAt: string
}
