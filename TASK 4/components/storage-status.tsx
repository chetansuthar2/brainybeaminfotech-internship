"use client"

import { useState, useEffect } from "react"
import { Database, HardDrive, AlertCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface StorageStatus {
  isMongoConnected: boolean
  imageCount: number
  storageType: 'mongodb' | 'memory'
}

export default function StorageStatus() {
  const [status, setStatus] = useState<StorageStatus | null>(null)

  useEffect(() => {
    checkStorageStatus()
  }, [])

  const checkStorageStatus = async () => {
    try {
      const response = await fetch('/api/storage-status')
      if (response.ok) {
        const data = await response.json()
        setStatus(data)
      }
    } catch (error) {
      console.error('Failed to check storage status:', error)
    }
  }

  if (!status) return null

  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          {status.storageType === 'mongodb' ? (
            <Database className="w-5 h-5 text-green-600" />
          ) : (
            <HardDrive className="w-5 h-5 text-blue-600" />
          )}
          
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-medium">
                {status.storageType === 'mongodb' ? 'MongoDB Connected' : 'Memory Storage'}
              </span>
              {status.storageType === 'memory' && (
                <AlertCircle className="w-4 h-4 text-amber-500" />
              )}
            </div>
            
            <p className="text-sm text-muted-foreground">
              {status.storageType === 'mongodb' 
                ? 'Images are stored permanently in MongoDB database'
                : 'Images are stored temporarily in memory (will be lost on server restart)'
              }
            </p>
          </div>
          
          {status.imageCount > 0 && (
            <div className="text-right">
              <div className="text-sm font-medium">{status.imageCount} images</div>
              <div className="text-xs text-muted-foreground">stored</div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
