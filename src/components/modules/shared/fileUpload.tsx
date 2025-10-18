'use client'

import * as React from 'react'
import Image from 'next/image'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Button } from '../../ui/button'
import { Card, CardContent } from '../../ui/card'
import { Badge } from '../../ui/badge'
import { Upload, File, Image as ImageIcon, Trash2, Loader } from 'lucide-react'

// File upload variants - simplified since we're using Card component
const fileUploadVariants = cva('transition-all duration-300 ease-in-out', {
  variants: {
    variant: {
      default: 'hover:bg-accent/10',
      compact: 'hover:bg-accent/5',
      minimal: 'hover:border-border',
    },
    size: {
      default: '',
      sm: '',
      lg: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
})

// Upload Status Badge Component
const UploadStatusBadge = ({ progress }: { progress?: number }) => {
  if (progress === undefined) return null

  if (progress === 100) {
    return (
      <Badge
        variant="default"
        className="text-xs bg-green-500 hover:bg-green-600"
      >
        ✓ Uploaded
      </Badge>
    )
  }

  if (progress > 0) {
    return (
      <Badge variant="secondary" className="text-xs">
        {progress}% uploaded
      </Badge>
    )
  }

  return (
    <Badge variant="outline" className="text-xs">
      Pending
    </Badge>
  )
}

// File Type Badge Component
const FileTypeBadge = ({ file }: { file: File }) => {
  const isImage = file.type.startsWith('image/')
  const isDocument =
    file.type.includes('pdf') ||
    file.type.includes('document') ||
    file.type.includes('text')

  if (isImage) {
    return (
      <Badge variant="secondary" className="text-xs">
        Image
      </Badge>
    )
  }

  if (isDocument) {
    return (
      <Badge variant="outline" className="text-xs">
        Document
      </Badge>
    )
  }

  return (
    <Badge variant="outline" className="text-xs">
      File
    </Badge>
  )
}
const ProgressBar = ({ progress }: { progress: number }) => (
  <div className="w-full bg-secondary rounded-full h-2 overflow-hidden border border-border/20">
    <div
      className="h-full bg-primary transition-all duration-300 ease-out rounded-full relative overflow-hidden"
      style={{ width: `${Math.min(progress, 100)}%` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
    </div>
  </div>
)

// File preview component
const FilePreview = ({
  file,
  onRemove,
  progress,
}: {
  file: File
  onRemove: () => void
  progress?: number
}) => {
  const isImage = file.type.startsWith('image/')
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (isImage) {
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
      return () => URL.revokeObjectURL(url)
    }
  }, [file, isImage])

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <Card className="p-3 transition-all duration-200 hover:shadow-sm border-border/50">
      <CardContent className="flex items-center gap-3 p-0">
        <div className="flex-shrink-0">
          {isImage && previewUrl ? (
            <Image
              src={previewUrl}
              alt={file.name}
              width={40}
              height={40}
              className="w-10 h-10 object-cover rounded-md border border-border"
            />
          ) : (
            <div className="w-10 h-10 bg-muted rounded-md border border-border flex items-center justify-center">
              {isImage ? (
                <ImageIcon className="w-5 h-5 text-muted-foreground" />
              ) : (
                <File className="w-5 h-5 text-muted-foreground" />
              )}
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground truncate">
            {file.name}
          </p>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <Badge variant="outline" className="text-xs border-border/50">
              {formatFileSize(file.size)}
            </Badge>
            <FileTypeBadge file={file} />
            <UploadStatusBadge progress={progress} />
          </div>
          {progress !== undefined && progress < 100 && progress > 0 && (
            <div className="mt-2">
              <ProgressBar progress={progress} />
            </div>
          )}
        </div>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onRemove}
          className="flex-shrink-0 text-muted-foreground hover:text-destructive h-8 w-8 transition-colors duration-200"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </CardContent>
    </Card>
  )
}

// Main FileUpload component interface
export interface FileUploadProps
  extends Omit<
      React.InputHTMLAttributes<HTMLInputElement>,
      'size' | 'value' | 'onChange'
    >,
    VariantProps<typeof fileUploadVariants> {
  onFilesChange?: (files: File[]) => void
  onUpload?: (files: File[]) => Promise<void>
  maxFiles?: number
  maxSize?: number // in bytes
  acceptedFileTypes?: string[]
  showPreview?: boolean
  uploadOnSelect?: boolean
  className?: string
  dropzoneText?: string
  buttonText?: string
  helperText?: string
  errorMessage?: string
}

const FileUpload = React.forwardRef<HTMLInputElement, FileUploadProps>(
  (
    {
      className,
      variant,
      size,
      onFilesChange,
      onUpload,
      maxFiles = 5,
      maxSize = 10 * 1024 * 1024, // 10MB default
      acceptedFileTypes = [],
      showPreview = true,
      uploadOnSelect = false,
      dropzoneText = 'Drag and drop files here, or click to select',
      buttonText = 'Choose Files',
      helperText,
      errorMessage,
      disabled,
      ...props
    },
    ref
  ) => {
    const [files, setFiles] = React.useState<File[]>([])
    const [dragActive, setDragActive] = React.useState(false)
    const [uploadProgress, setUploadProgress] = React.useState<{
      [key: string]: number
    }>({})
    const [error, setError] = React.useState<string | null>(null)
    const [uploading, setUploading] = React.useState(false)
    const dragCounter = React.useRef(0)

    const inputRef = React.useRef<HTMLInputElement>(null)

    React.useImperativeHandle(ref, () => inputRef.current!, [])

    const validateFile = React.useCallback(
      (file: File): string | null => {
        if (maxSize && file.size > maxSize) {
          return `File size must be less than ${(maxSize / 1024 / 1024).toFixed(
            1
          )}MB`
        }

        if (acceptedFileTypes.length > 0) {
          const fileExtension = file.name.split('.').pop()?.toLowerCase()
          const mimeType = file.type.toLowerCase()

          const isAccepted = acceptedFileTypes.some((type) => {
            if (type.startsWith('.')) {
              return fileExtension === type.slice(1).toLowerCase()
            }
            if (type.includes('/*')) {
              return mimeType.startsWith(type.split('/*')[0])
            }
            return mimeType === type.toLowerCase()
          })

          if (!isAccepted) {
            return `File type not accepted. Allowed types: ${acceptedFileTypes.join(
              ', '
            )}`
          }
        }

        return null
      },
      [maxSize, acceptedFileTypes]
    )

    const handleUpload = React.useCallback(
      async (filesToUpload: File[] = files) => {
        if (!onUpload || filesToUpload.length === 0) return

        setUploading(true)
        setError(null)

        try {
          // Simulate upload progress
          for (const file of filesToUpload) {
            setUploadProgress((prev) => ({ ...prev, [file.name]: 0 }))
          }

          // Progress simulation - replace with real upload logic
          const progressInterval = setInterval(() => {
            setUploadProgress((prev) => {
              const updated = { ...prev }
              for (const file of filesToUpload) {
                if (updated[file.name] < 100) {
                  updated[file.name] = Math.min(
                    100,
                    (updated[file.name] || 0) + 10
                  )
                }
              }
              return updated
            })
          }, 200)

          await onUpload(filesToUpload)

          clearInterval(progressInterval)

          // Set all to 100% complete
          setUploadProgress((prev) => {
            const updated = { ...prev }
            for (const file of filesToUpload) {
              updated[file.name] = 100
            }
            return updated
          })
        } catch (error) {
          setError(error instanceof Error ? error.message : 'Upload failed')
        } finally {
          setUploading(false)
        }
      },
      [files, onUpload]
    )

    const handleFiles = React.useCallback(
      (newFiles: FileList | null) => {
        if (!newFiles) return

        const fileArray = Array.from(newFiles)
        const validFiles: File[] = []
        const errorMessages: string[] = []

        // Check total file count
        if (files.length + fileArray.length > maxFiles) {
          setError(`Maximum ${maxFiles} files allowed`)
          return
        }

        // Validate each file
        for (const file of fileArray) {
          const validation = validateFile(file)
          if (validation) {
            errorMessages.push(`${file.name}: ${validation}`)
          } else {
            validFiles.push(file)
          }
        }

        if (errorMessages.length > 0) {
          setError(errorMessages.join('; '))
          return
        }

        setError(null)
        const updatedFiles = [...files, ...validFiles]
        setFiles(updatedFiles)
        onFilesChange?.(updatedFiles)

        if (uploadOnSelect && onUpload && validFiles.length > 0) {
          handleUpload(validFiles)
        }
      },
      [
        files,
        maxFiles,
        onFilesChange,
        onUpload,
        uploadOnSelect,
        handleUpload,
        validateFile,
      ]
    )

    const removeFile = (index: number) => {
      const updatedFiles = files.filter((_, i) => i !== index)
      setFiles(updatedFiles)
      onFilesChange?.(updatedFiles)

      // Clear upload progress for removed file
      const removedFile = files[index]
      if (removedFile) {
        setUploadProgress((prev) => {
          const updated = { ...prev }
          delete updated[removedFile.name]
          return updated
        })
      }
    }

    const handleDrag = React.useCallback((e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
    }, [])

    const handleDragIn = React.useCallback((e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      dragCounter.current++
      if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
        setDragActive(true)
      }
    }, [])

    const handleDragOut = React.useCallback((e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      dragCounter.current--
      if (dragCounter.current === 0) {
        setDragActive(false)
      }
    }, [])

    const handleDrop = React.useCallback(
      (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)
        dragCounter.current = 0

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
          handleFiles(e.dataTransfer.files)
        }
      },
      [handleFiles]
    )

    const openFileDialog = () => {
      inputRef.current?.click()
    }

    return (
      <div className="w-full space-y-4">
        <Card
          className={cn(
            'relative overflow-hidden border-dashed transition-all duration-500 ease-out cursor-pointer group will-change-transform',
            'hover:shadow-md hover:border-primary/50 hover:bg-accent/5',
            dragActive && [
              'border-primary bg-primary/10 border-solid shadow-xl transform scale-[1.02]',
              'ring-2 ring-primary/30 ring-offset-2 ring-offset-background',
            ],
            error && 'border-destructive bg-destructive/5 shadow-sm',
            uploadProgress &&
              Object.values(uploadProgress).some((p) => p === 100) &&
              'border-green-500 bg-green-500/5 shadow-sm',
            disabled &&
              'opacity-50 cursor-not-allowed hover:shadow-none hover:scale-100 hover:bg-transparent',
            variant === 'compact' && 'hover:bg-accent/5',
            variant === 'minimal' &&
              'border-border/50 bg-transparent hover:border-border hover:bg-accent/5',
            size === 'sm' && 'p-4',
            size === 'lg' && 'p-12',
            className
          )}
          onDragEnter={handleDragIn}
          onDragLeave={handleDragOut}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={openFileDialog}
        >
          <input
            ref={inputRef}
            type="file"
            multiple={maxFiles > 1}
            accept={acceptedFileTypes.join(',')}
            onChange={(e) => handleFiles(e.target.files)}
            className="hidden"
            disabled={disabled}
            {...props}
          />

          <CardContent className="flex flex-col items-center justify-center text-center p-8 relative z-10">
            <div
              className={cn(
                'mx-auto mb-4 transition-all duration-500 ease-out',
                dragActive ? 'scale-110 transform' : 'group-hover:scale-105'
              )}
            >
              <Upload
                className={cn(
                  'w-12 h-12 transition-all duration-500 ease-out',
                  dragActive
                    ? 'text-primary'
                    : 'text-muted-foreground group-hover:text-primary'
                )}
              />
            </div>

            <div className="space-y-2 min-h-[3rem] flex flex-col justify-center">
              <p
                className={cn(
                  'text-sm font-medium transition-all duration-500 ease-out',
                  dragActive
                    ? 'text-primary font-semibold transform scale-105'
                    : 'text-foreground'
                )}
              >
                {dragActive ? 'Drop files here!' : dropzoneText}
              </p>

              <div
                className={cn(
                  'transition-all duration-500 ease-out overflow-hidden',
                  dragActive ? 'max-h-0 opacity-0' : 'max-h-10 opacity-100'
                )}
              >
                {helperText && (
                  <p className="text-xs text-muted-foreground">{helperText}</p>
                )}
              </div>

              <div
                className={cn(
                  'transition-all duration-500 ease-out overflow-hidden',
                  dragActive ? 'max-h-10 opacity-100' : 'max-h-0 opacity-0'
                )}
              >
                <p className="text-xs text-primary font-medium">
                  Release to upload your files
                </p>
              </div>

              <div
                className={cn(
                  'transition-all duration-500 ease-out overflow-hidden',
                  dragActive
                    ? 'max-h-0 opacity-0 transform translate-y-2'
                    : 'max-h-20 opacity-100 transform translate-y-0'
                )}
              >
                <div className="flex flex-col sm:flex-row gap-2 items-center justify-center">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      openFileDialog()
                    }}
                    disabled={disabled}
                    className="text-xs"
                  >
                    {buttonText}
                  </Button>

                  {!uploadOnSelect && files.length > 0 && onUpload && (
                    <Button
                      type="button"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleUpload()
                      }}
                      disabled={uploading || disabled}
                      className="text-xs"
                    >
                      {uploading && (
                        <Loader className="w-3 h-3 mr-1 animate-spin" />
                      )}
                      {uploading ? 'Uploading...' : 'Upload Files'}
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {acceptedFileTypes.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1 justify-center">
                {acceptedFileTypes.map((type, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {type}
                  </Badge>
                ))}
              </div>
            )}

            <p className="mt-2 text-xs text-muted-foreground">
              Max {maxFiles} file{maxFiles > 1 ? 's' : ''}, up to{' '}
              {(maxSize / 1024 / 1024).toFixed(1)}MB each
            </p>
          </CardContent>
        </Card>

        {error && (
          <Card className="border-destructive/20">
            <CardContent className="p-3">
              <div className="flex items-center gap-2">
                <Badge variant="destructive" className="text-xs">
                  Error
                </Badge>
                <p className="text-sm text-destructive">{error}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {errorMessage && (
          <Card className="border-destructive/20">
            <CardContent className="p-3">
              <div className="flex items-center gap-2">
                <Badge variant="destructive" className="text-xs">
                  Error
                </Badge>
                <p className="text-sm text-destructive">{errorMessage}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {showPreview && files.length > 0 && (
          <Card>
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-foreground">
                  Selected Files
                </h4>
                <span className="text-xs text-muted-foreground">
                  {files.length}/{maxFiles}
                </span>
              </div>
              <div className="space-y-2">
                {files.map((file, index) => (
                  <FilePreview
                    key={`${file.name}-${index}`}
                    file={file}
                    onRemove={() => removeFile(index)}
                    progress={uploadProgress[file.name]}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    )
  }
)

FileUpload.displayName = 'FileUpload'

export { FileUpload, fileUploadVariants }
