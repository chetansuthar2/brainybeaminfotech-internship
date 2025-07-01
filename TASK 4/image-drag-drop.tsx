"use client"

import { useState, useRef, useEffect, type DragEvent, type ChangeEvent } from "react"
import { Upload, X, ImageIcon, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import StorageStatus from "@/components/storage-status"

interface DroppedImage {
  file?: File
  url: string
  id: string
  filename: string
  originalName: string
  size: number
  uploadDate?: Date
  isUploading?: boolean
}

export default function Component() {
  const [dragActive, setDragActive] = useState(false)
  const [images, setImages] = useState<DroppedImage[]>([])
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Load existing images from database on component mount
  useEffect(() => {
    loadImages()
  }, [])

  const loadImages = async () => {
    try {
      const response = await fetch('/api/images')
      const data = await response.json()

      if (data.success) {
        const formattedImages: DroppedImage[] = data.images.map((img: any) => ({
          id: img.id,
          url: img.url,
          filename: img.filename,
          originalName: img.originalName,
          size: img.size,
          uploadDate: new Date(img.uploadDate)
        }))
        setImages(formattedImages)
      }
    } catch (error) {
      console.error('Failed to load images:', error)
    }
  }

  const handleDrag = (e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleFiles = async (files: FileList) => {
    const imageFiles = Array.from(files).filter((file) => file.type.startsWith("image/"))

    for (const file of imageFiles) {
      // Create temporary image with loading state
      const tempId = Math.random().toString(36).substr(2, 9)
      const reader = new FileReader()

      reader.onload = (e) => {
        const tempImage: DroppedImage = {
          file,
          url: e.target?.result as string,
          id: tempId,
          filename: file.name,
          originalName: file.name,
          size: file.size,
          isUploading: true
        }
        setImages((prev) => [...prev, tempImage])
      }
      reader.readAsDataURL(file)

      // Upload to MongoDB
      try {
        const formData = new FormData()
        formData.append('file', file)

        const response = await fetch('/api/images/upload', {
          method: 'POST',
          body: formData,
        })

        const data = await response.json()

        if (data.success) {
          // Replace temporary image with uploaded image
          setImages((prev) => prev.map(img =>
            img.id === tempId
              ? {
                  id: data.image.id,
                  url: data.image.url,
                  filename: data.image.filename,
                  originalName: data.image.originalName,
                  size: data.image.size,
                  uploadDate: new Date(data.image.uploadDate),
                  isUploading: false
                }
              : img
          ))
        } else {
          // Remove failed upload
          setImages((prev) => prev.filter(img => img.id !== tempId))
          console.error('Upload failed:', data.error)
        }
      } catch (error) {
        // Remove failed upload
        setImages((prev) => prev.filter(img => img.id !== tempId))
        console.error('Upload error:', error)
      }
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files)
    }
  }

  const removeImage = async (id: string) => {
    try {
      const response = await fetch(`/api/images?id=${id}`, {
        method: 'DELETE',
      })

      const data = await response.json()

      if (data.success) {
        setImages((prev) => prev.filter((img) => img.id !== id))
      } else {
        console.error('Delete failed:', data.error)
      }
    } catch (error) {
      console.error('Delete error:', error)
    }
  }

  const clearAllImages = async () => {
    setLoading(true)
    try {
      // Delete all images from database
      for (const image of images) {
        await fetch(`/api/images?id=${image.id}`, {
          method: 'DELETE',
        })
      }
      setImages([])
    } catch (error) {
      console.error('Clear all error:', error)
    } finally {
      setLoading(false)
    }
  }

  const openFileDialog = () => {
    inputRef.current?.click()
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Image Drag & Drop</h2>
        <p className="text-muted-foreground">Drag and drop your images here or click to browse</p>
      </div>

      <StorageStatus />

      {/* Drop Zone */}
      <Card
        className={`relative border-2 border-dashed transition-colors duration-200 ${
          dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-muted-foreground/50"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <CardContent className="flex flex-col items-center justify-center py-12 px-6">
          <div className={`transition-colors duration-200 ${dragActive ? "text-primary" : "text-muted-foreground"}`}>
            <Upload className="w-12 h-12 mx-auto mb-4" />
            <div className="text-center space-y-2">
              <p className="text-lg font-medium">{dragActive ? "Drop your images here" : "Drag & drop images here"}</p>
              <p className="text-sm">
                or{" "}
                <button onClick={openFileDialog} className="text-primary hover:underline font-medium">
                  browse files
                </button>
              </p>
              <p className="text-xs text-muted-foreground">Supports: JPG, PNG, GIF, WebP</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hidden File Input */}
      <input ref={inputRef} type="file" multiple accept="image/*" onChange={handleInputChange} className="hidden" />

      {/* Image Preview Grid */}
      {images.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Uploaded Images ({images.length})</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((image) => (
              <Card key={image.id} className="relative group overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative aspect-square">
                    <img
                      src={image.url || "/placeholder.svg"}
                      alt={image.originalName}
                      className="w-full h-full object-cover"
                    />
                    {image.isUploading && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Loader2 className="w-8 h-8 text-white animate-spin" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeImage(image.id)}
                        className="bg-red-500 hover:bg-red-600"
                        disabled={image.isUploading}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium truncate">{image.originalName}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {(image.size / 1024 / 1024).toFixed(2)} MB
                      {image.uploadDate && (
                        <span className="ml-2">
                          • {image.uploadDate.toLocaleDateString()}
                        </span>
                      )}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="flex justify-center">
            <Button
              variant="outline"
              onClick={clearAllImages}
              disabled={loading}
              className="bg-white text-black border-gray-300 hover:bg-gray-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Clearing...
                </>
              ) : (
                'Clear All Images'
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
