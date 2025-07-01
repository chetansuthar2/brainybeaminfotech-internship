# 🖼️ Drag & Drop Image Upload App

A modern, responsive image upload application built with Next.js, TypeScript, and MongoDB. Features drag-and-drop functionality, real-time upload progress, and persistent image storage.

## ✨ Features

- **🎯 Drag & Drop Interface** - Intuitive drag-and-drop image upload
- **📱 Responsive Design** - Works seamlessly on desktop and mobile
- **💾 Persistent Storage** - Images stored in MongoDB database
- **🔄 Real-time Updates** - Live upload progress and status indicators
- **🗑️ Image Management** - Delete individual images or clear all at once
- **📊 Storage Status** - Visual indicator of storage method and image count
- **⚡ Smart Fallback** - Automatic fallback to memory storage if MongoDB unavailable
- **🎨 Modern UI** - Built with Tailwind CSS and shadcn/ui components

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- MongoDB (local installation or MongoDB Atlas account)

### Installation

1. **Clone or download the project**
   ```bash
   cd "Drag & Drop task-4"
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Set up environment variables**
   - The `.env.local` file is already configured for local MongoDB
   - MongoDB should be running on `mongodb://127.0.0.1:27017/imageDB`

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   ```
   http://localhost:3000
   ```

## 🗄️ Database Setup

### Option 1: Local MongoDB (Current Setup)
Your app is configured to use local MongoDB. Make sure MongoDB is installed and running:

**Windows:**
```bash
# Start MongoDB service
net start MongoDB
```

**macOS/Linux:**
```bash
# Start MongoDB
brew services start mongodb/brew/mongodb-community
# or
sudo systemctl start mongod
```

### Option 2: MongoDB Atlas (Cloud)
To use MongoDB Atlas instead:

1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get your connection string
4. Update `.env.local`:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/imageDB?retryWrites=true&w=majority
   ```

## 📁 Project Structure

```
├── app/
│   ├── api/
│   │   ├── images/          # Image upload/delete APIs
│   │   └── storage-status/  # Storage status API
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/                  # shadcn/ui components
│   └── storage-status.tsx   # Storage status indicator
├── lib/
│   ├── models/
│   │   └── Image.ts         # MongoDB image model
│   ├── mongodb.ts           # MongoDB connection
│   ├── mongoose.ts          # Mongoose connection with fallback
│   ├── storage.ts           # In-memory storage fallback
│   └── utils.ts
├── image-drag-drop.tsx      # Main drag & drop component
└── .env.local              # Environment variables
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/images/upload` | Upload new image |
| `GET` | `/api/images` | Get all images |
| `DELETE` | `/api/images?id=<imageId>` | Delete specific image |
| `GET` | `/api/storage-status` | Get storage status |

## 💡 Usage

1. **Upload Images**
   - Drag and drop images onto the upload area
   - Or click "browse files" to select images
   - Supports: JPG, PNG, GIF, WebP

2. **View Images**
   - Uploaded images appear in a responsive grid
   - Shows filename, size, and upload date
   - Hover to see delete option

3. **Delete Images**
   - Click the X button on individual images
   - Use "Clear All Images" to remove all at once

4. **Storage Status**
   - Green database icon = MongoDB connected
   - Blue drive icon = Memory storage (temporary)
   - Shows total image count when > 0

## 🛠️ Technologies Used

- **Frontend:** Next.js 15, React 19, TypeScript
- **Styling:** Tailwind CSS, shadcn/ui
- **Database:** MongoDB, Mongoose
- **Icons:** Lucide React
- **File Handling:** Native File API

## 🔒 Environment Variables

```bash
# MongoDB connection string
MONGODB_URI=mongodb://127.0.0.1:27017/imageDB

# Next.js URL (for production)
NEXTAUTH_URL=http://localhost:3000
```

## 🚨 Troubleshooting

**MongoDB Connection Issues:**
- Ensure MongoDB service is running
- Check connection string in `.env.local`
- App will fallback to memory storage if MongoDB unavailable

**Upload Issues:**
- Check file size (large files may take longer)
- Ensure file is a valid image format
- Check browser console for error messages

**Port Already in Use:**
```bash
# Kill process on port 3000
npx kill-port 3000
```
