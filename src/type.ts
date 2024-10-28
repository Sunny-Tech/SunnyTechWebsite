export type OpenPlannerType = {
    sponsors: {
        name: string
        order: number
        sponsors: {
            website: string
            name: string
            logoUrl: string
        }[]
    }[]
    team: {
        name: string
        photoUrl: string
        socials: {
            name: string
            icon: string
            link: string
        }[]
    }[]
    speakers: {
        name: string
        id: string
    }[]
}
