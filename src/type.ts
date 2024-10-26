export type OpenPlannerType = {
    sponsors: {
        name: string
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
            url: string
        }[]
    }[]
    speakers: {
        name: string
        id: string
    }[]
}
