import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongoose'
import Image from '@/lib/models/Image'
import { inMemoryStorage } from '@/lib/storage'

export async function GET(request: NextRequest) {
  try {
    const dbConnection = await connectDB()
    let images: any[]

    if (dbConnection) {
      // Use MongoDB
      images = await Image.find({}).sort({ uploadDate: -1 })
      console.log(`📖 Loaded ${images.length} images from MongoDB`)
    } else {
      // Use in-memory storage
      images = await inMemoryStorage.getAllImages()
      console.log(`📖 Loaded ${images.length} images from memory storage`)
    }

    const formattedImages = images.map(image => ({
      id: image._id || image.id,
      filename: image.filename,
      originalName: image.originalName,
      mimeType: image.mimeType,
      size: image.size,
      uploadDate: image.uploadDate,
      url: `data:${image.mimeType};base64,${image.base64Data}`
    }))

    return NextResponse.json({
      success: true,
      images: formattedImages
    })

  } catch (error) {
    console.error('Get images error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch images' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const imageId = searchParams.get('id')

    if (!imageId) {
      return NextResponse.json({ error: 'Image ID is required' }, { status: 400 })
    }

    const dbConnection = await connectDB()
    let deleted = false

    if (dbConnection) {
      // Use MongoDB
      const deletedImage = await Image.findByIdAndDelete(imageId)
      deleted = !!deletedImage
      if (deleted) console.log(`🗑️  Image deleted from MongoDB: ${imageId}`)
    } else {
      // Use in-memory storage
      deleted = await inMemoryStorage.deleteImage(imageId)
    }

    if (!deleted) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: 'Image deleted successfully'
    })

  } catch (error) {
    console.error('Delete image error:', error)
    return NextResponse.json(
      { error: 'Failed to delete image' },
      { status: 500 }
    )
  }
}
