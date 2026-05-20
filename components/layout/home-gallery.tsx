'use client'

import { useState, useEffect } from 'react'
import { getGalleryItems, getImgLink } from '@/lib/data'
import Image from 'next/image'
import Marquee from 'react-fast-marquee'
import { useRouter } from 'next/navigation'

interface GalleryItem {
  id: string
  date: string
  title: string
  description: string
  imageUrls: string[]
}

export default function HomeGallery() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter();

  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        const data = await getGalleryItems()
        
        const items = data.map((item, index) => {
          const urls = (item[3] || '').split(',').map((u: string) => u.trim()).filter(Boolean);
          return {
            id: item[0] || `item-${index}`,
            date: item[0] || '',
            title: item[1] || 'Untitled',
            description: item[2] || '',
            imageUrls: urls.length > 0 ? urls : ['']
          };
        })
        
        setGalleryItems(items)
      } catch (error) {
        console.error('Error fetching gallery data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchGalleryData()
  }, [])

  if (isLoading || galleryItems.length === 0) {
    return null;
  }

  const marqParams = {
    autoFill: galleryItems.length >= 3,
    pauseOnHover: true,
    speed: 80,
    play: galleryItems.length >= 3,
  };

  return (
    <div className="py-2 bg-white">
      <h2 className="text-xl md:text-2xl ml-4 md:ml-16 font-bold mb-4 flex items-center">
        <span className="w-2 h-5 bg-blue-500 mr-2"></span>
        Gallery
      </h2>

      <div className="relative overflow-hidden py-1 flex">
        <Marquee {...marqParams} className="w-full">
          {galleryItems.map((item, index) => (
            <div
              key={item.id}
              className="w-[300px] min-w-[300px] h-[330px] mt-3 mb-10 mx-4 bg-white rounded-lg shadow-xl overflow-hidden border border-gray-250 hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative h-48 w-full cursor-pointer" onClick={()=> router.push("/gallery")}>
                {item.imageUrls.length > 0 && (
                  <Image
                    src={getImgLink(item.imageUrls[0])}
                    alt={item.title}
                    fill
                    className="object-cover"
                    priority={index < 3}
                    loading={index > 2 ? "lazy" : "eager"}
                    quality={75}
                  />
                )}
                {/* Album indicator badge */}
                {item.imageUrls.length > 1 && (
                  <div className="absolute top-3 right-3 bg-black/60 text-white text-xs px-2.5 py-1 rounded-md z-10 flex items-center gap-1.5 backdrop-blur-sm pointer-events-none">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {item.imageUrls.length}
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-base sm:text-md font-bold text-gray-800 mb-2 line-clamp-3">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="text-xs sm:text-sm text-gray-600 line-clamp-3">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  )
}
