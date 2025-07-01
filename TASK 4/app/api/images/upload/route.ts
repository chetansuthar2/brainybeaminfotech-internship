import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongoose'
import Image from '@/lib/models/Image'
import { inMemoryStorage } from '@/lib/storage'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Only image files are allowed' }, { status: 400 })
    }

    // Convert file to base64
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64Data = buffer.toString('base64')

    const imageData = {
      filename: `${Date.now()}-${file.name}`,
      originalName: file.name,
      mimeType: file.type,
      size: file.size,
      base64Data: base64Data,
      uploadDate: new Date(),
    }

    // Try MongoDB first, fallback to in-memory storage
    const dbConnection = await connectDB()
    let savedImage: any

    if (dbConnection) {
      // Use MongoDB
      const imageDoc = new Image(imageData)
      savedImage = await imageDoc.save()
      console.log('💾 Image saved to MongoDB')
    } else {
      // Use in-memory storage
      savedImage = await inMemoryStorage.saveImage(imageData)
      console.log('📁 Image saved to memory (MongoDB not available)')
    }

    return NextResponse.json({
      success: true,
      image: {
        id: savedImage._id || savedImage.id,
        filename: savedImage.filename,
        originalName: savedImage.originalName,
        mimeType: savedImage.mimeType,
        size: savedImage.size,
        uploadDate: savedImage.uploadDate,
        url: `data:${savedImage.mimeType};base64,${savedImage.base64Data}`
      }
    })

  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    )
  }
}
