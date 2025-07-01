import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongoose'
import Image from '@/lib/models/Image'
import { inMemoryStorage } from '@/lib/storage'

export async function GET(request: NextRequest) {
  try {
    const dbConnection = await connectDB()
    let imageCount = 0
    let storageType: 'mongodb' | 'memory' = 'memory'

    if (dbConnection) {
      // MongoDB is connected
      storageType = 'mongodb'
      imageCount = await Image.countDocuments()
    } else {
      // Using memory storage
      storageType = 'memory'
      imageCount = inMemoryStorage.getImageCount()
    }

    return NextResponse.json({
      isMongoConnected: !!dbConnection,
      imageCount,
      storageType
    })

  } catch (error) {
    console.error('Storage status error:', error)
    return NextResponse.json({
      isMongoConnected: false,
      imageCount: inMemoryStorage.getImageCount(),
      storageType: 'memory'
    })
  }
}
