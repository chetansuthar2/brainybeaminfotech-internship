import mongoose from 'mongoose'

export interface IImage {
  _id?: string
  filename: string
  originalName: string
  mimeType: string
  size: number
  uploadDate: Date
  base64Data: string
  description?: string
}

const ImageSchema = new mongoose.Schema<IImage>({
  filename: {
    type: String,
    required: true,
  },
  originalName: {
    type: String,
    required: true,
  },
  mimeType: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  uploadDate: {
    type: Date,
    default: Date.now,
  },
  base64Data: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
})

// Prevent re-compilation during development
const Image = mongoose.models.Image || mongoose.model<IImage>('Image', ImageSchema)

export default Image
