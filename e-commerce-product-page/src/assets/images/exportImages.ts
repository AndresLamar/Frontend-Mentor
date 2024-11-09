import imageProduct1 from './image-product-1.jpg'
import imageProduct1Thumbnail from './image-product-1-thumbnail.jpg'
import imageProduct2 from './image-product-2.jpg'
import imageProduct2Thumbnail from './image-product-2-thumbnail.jpg'
import imageProduct3 from './image-product-3.jpg'
import imageProduct3Thumbnail from './image-product-3-thumbnail.jpg'
import imageProduct4 from './image-product-4.jpg'
import imageProduct4Thumbnail from './image-product-4-thumbnail.jpg'

export interface Image {
    id: string;
    src: string;
    alt: string;
}

export interface IThumbnail {
    id: string;
    src: string;
    alt: string
}

export const images = [
    {
        id: 'image-1',
        src: imageProduct1,
        alt: 'Image one of four of Limited Edition Sneakers'
    },
    {
        id: 'image-2',
        src: imageProduct2,
        alt: 'Image two of four of Limited Edition Sneakers'
    },
    {
        id: 'image-3',
        src: imageProduct3,
        alt: 'Image three of four of Limited Edition Sneakers'
    },
    {
        id: 'image-4',
        src: imageProduct4,
        alt: 'Image four of four of Limited Edition Sneakers'
    }
]

export const imagesThumbnails = [
    {
        id: 'image-1',
        src: imageProduct1Thumbnail,
        alt: 'Thumbnail image one of four of Limited Edition Sneakers'
    },
    {
        id: 'image-2',
        src: imageProduct2Thumbnail,
        alt: 'Thumbnail image two of four of Limited Edition Sneakers'
    },
    {
        id: 'image-3',        
        src: imageProduct3Thumbnail,
        alt: 'Thumbnail image three of four of Limited Edition Sneakers'
    },
    {
        id: 'image-4',
        src: imageProduct4Thumbnail,
        alt: 'Thumbnail image four of four of Limited Edition Sneakers'
    }
]