// In-memory storage fallback when MongoDB is not available
interface StoredImage {
  id: string
  filename: string
  originalName: string
  mimeType: string
  size: number
  uploadDate: Date
  base64Data: string
  description?: string
}

class InMemoryStorage {
  private images: Map<string, StoredImage> = new Map()
  private idCounter = 1

  generateId(): string {
    return `img_${this.idCounter++}_${Date.now()}`
  }

  async saveImage(imageData: Omit<StoredImage, 'id'>): Promise<StoredImage> {
    const id = this.generateId()
    const image: StoredImage = {
      id,
      ...imageData,
    }
    this.images.set(id, image)
    console.log(`📁 Image saved to memory storage: ${image.originalName}`)
    return image
  }

  async getAllImages(): Promise<StoredImage[]> {
    return Array.from(this.images.values()).sort(
      (a, b) => b.uploadDate.getTime() - a.uploadDate.getTime()
    )
  }

  async deleteImage(id: string): Promise<boolean> {
    const deleted = this.images.delete(id)
    if (deleted) {
      console.log(`🗑️  Image deleted from memory storage: ${id}`)
    }
    return deleted
  }

  async getImage(id: string): Promise<StoredImage | null> {
    return this.images.get(id) || null
  }

  getImageCount(): number {
    return this.images.size
  }
}

// Singleton instance
const inMemoryStorage = new InMemoryStorage()

export { inMemoryStorage, type StoredImage }
