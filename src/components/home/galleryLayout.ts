import type { GalleryImage } from '../../type'

// The home grid has 8 slots of different shapes, so photos are not interchangeable:
//   desktop: 1, 2, 6, 8 wide · 3 very tall · 4, 5 squarish · 7 portrait
//   mobile:  1 wide · 2, 3, 4 square · 5 portrait (6, 7, 8 hidden)
export const GRID_SLOTS = 8

export interface GalleryPhoto extends GalleryImage {
    // CSS object-position keeping the subject in frame once the photo is cropped to its slot
    position: string
}

interface CuratedPhoto {
    id: string
    position: string
}

// Curated order for the OpenPlanner photos, keyed by file name (without extension).
// Each slot crops a photo along one axis only, so one position fits desktop and mobile.
// Photos missing here keep their OpenPlanner order after the curated ones, centered.
const CURATED_PHOTOS: CuratedPhoto[] = [
    // 1 - speaker on stage with the Sunny Tech sign
    { id: '4cc57b19-9f69-480b-b3e3-51a899c5a966', position: '50% 45%' },
    // 2 - audience faces, front rows sit right of center
    { id: 'd1a52051-2353-4e00-afed-2d57dde456b5', position: '60% 55%' },
    // 3 - portrait buffet, pastry basket bottom center
    { id: '261db734-b049-4cc4-a263-59471ac07e75', position: '55% 75%' },
    // 4 - volunteers briefing, organiser left of center, heads in the upper half
    { id: '21645587-8a13-47ac-ac89-0c033c2d194a', position: '40% 30%' },
    // 5 - muffins from above, any crop works
    { id: '789606d4-97cd-4883-9ff9-4345c04d2615', position: '50% 50%' },
    // 6 - attendees at the breakfast table, faces in the upper half
    { id: '01a8429f-d454-467f-885b-f110be2a0156', position: '50% 35%' },
    // 7 - outdoor buffet, people and jars in the lower half
    { id: '0a6fbaed-8fe4-4352-8401-5e003c596e5f', position: '50% 70%' },
    // 8 - raised hands in a workshop room
    { id: 'e373b1e3-3870-40f1-89b8-1dedb5c9cc96', position: '50% 60%' },
]

const DEFAULT_POSITION = '50% 50%'

const photoId = (url: string) => url.split('/').pop()?.split('.')[0] ?? url

export const arrangeGallery = (images: GalleryImage[]): GalleryPhoto[] => {
    const byId = new Map(images.map((image) => [photoId(image.url), image]))
    const curatedIds = new Set(CURATED_PHOTOS.map(({ id }) => id))

    const curated = CURATED_PHOTOS.flatMap(({ id, position }) => {
        const image = byId.get(id)
        return image ? [{ ...image, position }] : []
    })
    const others = images
        .filter((image) => !curatedIds.has(photoId(image.url)))
        .map((image) => ({ ...image, position: DEFAULT_POSITION }))

    return [...curated, ...others].slice(0, GRID_SLOTS)
}
