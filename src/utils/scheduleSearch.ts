import type { Category, Session, Speaker, Track } from '../type'

export type AugmentedSession = Session & {
    track: Track | undefined
    speakers: Speaker[]
    category: Category | undefined
}

export type CrossDaySession = AugmentedSession & {
    dayUrl: string
    dayLabel: string
}

/**
 * Lower-cased haystack used by the client-side schedule search.
 * Single source of truth for which fields are searchable.
 */
export const buildSessionSearchString = (session: AugmentedSession): string =>
    [
        session.title,
        session.abstract,
        session.category?.name,
        session.track?.name,
        ...session.speakers.map((s) => s.name),
        ...(session.tags || []),
    ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
