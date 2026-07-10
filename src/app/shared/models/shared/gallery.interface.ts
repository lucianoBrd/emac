import {GalleryType} from "../../enum/gallery.type";

export interface Gallery {
    id: Readonly<string>,
    title: string,
    gallery: {
        image: string,
        thumb?: string,
        mimeType?: string,
        description?: string,
        type: GalleryType,
    }[];
}