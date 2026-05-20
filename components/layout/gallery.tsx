'use client'

import { useState, useEffect } from 'react'
import { getGalleryItems, getImgLink } from '@/lib/data'
import Image from 'next/image'

interface GalleryItem {
  id: string
  date: string
  title: string
  description: string
  imageUrls: string[]
}

export default function Gallery() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([])
  const [selectedAlbum, setSelectedAlbum] = useState<GalleryItem | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [imageLoading, setImageLoading] = useState(false)

  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        const data = await getGalleryItems()
        console.log('Raw gallery data:', data)
        
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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedAlbum) return
      
      switch (e.key) {
        case 'ArrowRight':
          if (e.shiftKey) {
            handleNextAlbum()
          } else if (selectedAlbum.imageUrls.length > 1) {
            handleNext()
          }
          break
        case 'ArrowLeft':
          if (e.shiftKey) {
            handlePreviousAlbum()
          } else if (selectedAlbum.imageUrls.length > 1) {
            handlePrevious()
          }
          break
        case 'Escape':
          setSelectedAlbum(null)
          break
      }
    }

    if (selectedAlbum) {
      window.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedAlbum, currentImageIndex])

  const handleImageClick = (item: GalleryItem) => {
    setSelectedAlbum(item)
    setCurrentImageIndex(0)
    setImageLoading(true)
  }

  const handlePrevious = () => {
    if (!selectedAlbum || selectedAlbum.imageUrls.length <= 1) return
    const newIndex = currentImageIndex > 0 ? currentImageIndex - 1 : selectedAlbum.imageUrls.length - 1
    setCurrentImageIndex(newIndex)
    setImageLoading(true)
  }

  const handleNext = () => {
    if (!selectedAlbum || selectedAlbum.imageUrls.length <= 1) return
    const newIndex = currentImageIndex < selectedAlbum.imageUrls.length - 1 ? currentImageIndex + 1 : 0
    setCurrentImageIndex(newIndex)
    setImageLoading(true)
  }

  const handlePreviousAlbum = () => {
    if (!selectedAlbum) return
    const albumIndex = galleryItems.findIndex(item => item.id === selectedAlbum.id)
    if (albumIndex === -1) return
    const newIndex = albumIndex > 0 ? albumIndex - 1 : galleryItems.length - 1
    setSelectedAlbum(galleryItems[newIndex])
    setCurrentImageIndex(0)
    setImageLoading(true)
  }

  const handleNextAlbum = () => {
    if (!selectedAlbum) return
    const albumIndex = galleryItems.findIndex(item => item.id === selectedAlbum.id)
    if (albumIndex === -1) return
    const newIndex = albumIndex < galleryItems.length - 1 ? albumIndex + 1 : 0
    setSelectedAlbum(galleryItems[newIndex])
    setCurrentImageIndex(0)
    setImageLoading(true)
  }

  if (isLoading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4">Loading gallery...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="pb-16 pt-4">
      <div className="container mx-auto px-4">

        {galleryItems.length === 0 ? (
          <p className="text-center text-gray-500">No gallery items found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {galleryItems.map((item, index) => (
              <div
                key={item.id}
                className="group cursor-pointer relative overflow-hidden rounded-lg aspect-square"
                onClick={() => handleImageClick(item)}
              >
                {item.imageUrls.length > 0 && (
                  <Image
                    src={getImgLink(item.imageUrls[0])}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
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
                {/* Text overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-md sm:text-base md:text-lg font-semibold text-white mb-1">
                      {item.title}
                    </h3>
                    <p className="text-white/90 text-sm line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modern Lightbox Modal */}
        {selectedAlbum && selectedAlbum.imageUrls.length > 0 && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
            {/* Preload next and previous images */}
            {selectedAlbum.imageUrls[currentImageIndex - 1] && (
              <Image
                src={getImgLink(selectedAlbum.imageUrls[currentImageIndex - 1])}
                alt="preload"
                width={1}
                height={1}
                className="hidden"
                priority
              />
            )}
            {selectedAlbum.imageUrls[currentImageIndex + 1] && (
              <Image
                src={getImgLink(selectedAlbum.imageUrls[currentImageIndex + 1])}
                alt="preload"
                width={1}
                height={1}
                className="hidden"
                priority
              />
            )}
            {/* Close button */}
            <button
              className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors z-20"
              onClick={() => setSelectedAlbum(null)}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Album Info Header */}
            <div className="absolute top-6 left-6 right-20 z-10 text-white pointer-events-none">
              <h2 className="text-xl md:text-2xl font-bold drop-shadow-md mb-1">{selectedAlbum.title}</h2>
              {selectedAlbum.description && (
                <p className="text-sm md:text-base text-white/80 drop-shadow-md line-clamp-2">
                  {selectedAlbum.description}
                </p>
              )}
            </div>

            {/* Previous button */}
            {selectedAlbum.imageUrls.length > 1 && (
              <button
                className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
                onClick={handlePrevious}
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            {/* Next button */}
            {selectedAlbum.imageUrls.length > 1 && (
              <button
                className="absolute right-6 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
                onClick={handleNext}
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}

            {/* Main image */}
            <div className="w-full max-w-5xl h-[75vh] mx-auto px-12 md:px-16 relative flex items-center justify-center">
              {imageLoading && (
                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                </div>
              )}
              <Image
                src={getImgLink(selectedAlbum.imageUrls[currentImageIndex])}
                alt={selectedAlbum.title}
                width={1200}
                height={800}
                className={`w-auto h-auto max-w-full max-h-[75vh] object-contain transition-opacity duration-300 ${
                  selectedAlbum.imageUrls.length > 1 ? 'cursor-pointer' : ''
                } ${
                  imageLoading ? 'opacity-0' : 'opacity-100'
                }`}
                priority
                onClick={(e) => {
                  e.stopPropagation()
                  if (selectedAlbum.imageUrls.length > 1) handleNext()
                }}
                onLoad={() => setImageLoading(false)}
                onError={() => setImageLoading(false)}
              />
            </div>

            {/* Image counter and thumbnails */}
            {selectedAlbum.imageUrls.length > 1 && (
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
                <div className="text-white text-sm mb-4 text-center">
                  {currentImageIndex + 1} / {selectedAlbum.imageUrls.length}
                </div>
                
                {/* Thumbnail strip */}
                <div className="flex space-x-2 max-w-md overflow-x-auto scrollbar-hide py-2">
                  {selectedAlbum.imageUrls.map((url, index) => (
                    <button
                      key={`${selectedAlbum.id}-${index}`}
                      className={`relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                        index === currentImageIndex 
                          ? 'border-white' 
                          : 'border-transparent hover:border-white/50'
                      }`}
                      onClick={() => {
                        setCurrentImageIndex(index)
                        setImageLoading(true)
                      }}
                    >
                      <Image
                        src={getImgLink(url)}
                        alt={`${selectedAlbum.title} - Image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Previous Album button */}
            <button
              className="absolute bottom-6 left-6 text-white hover:text-gray-300 transition-colors z-10 flex items-center gap-2"
              onClick={(e) => { e.stopPropagation(); handlePreviousAlbum(); }}
              title="Previous Album (Shift + Left Arrow)"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="hidden md:inline font-medium">Prev Album</span>
            </button>

            {/* Next Album button */}
            <button
              className="absolute bottom-6 right-6 text-white hover:text-gray-300 transition-colors z-10 flex items-center gap-2"
              onClick={(e) => { e.stopPropagation(); handleNextAlbum(); }}
              title="Next Album (Shift + Right Arrow)"
            >
              <span className="hidden md:inline font-medium">Next Album</span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Click overlay to close */}
            <div 
              className="absolute inset-0 -z-10"
              onClick={() => setSelectedAlbum(null)}
            />
          </div>
        )}
      </div>
    </section>
  )
}
