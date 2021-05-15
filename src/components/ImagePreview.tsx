import React, { useEffect, useState } from 'react'
import { Button } from './Button';

export const ImagePreview: React.FC = () => {
  const [file, setFile] = useState<File | undefined>();
  const [preview, setPreview] = useState<string | undefined>();

  useEffect(() => {
    if (!file) {
      setPreview(undefined)
      return
    }

    const fileUrl = URL.createObjectURL(file)
    setPreview(fileUrl)

    return () => URL.revokeObjectURL(fileUrl)
  }, [file])

  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files![0])
  }

  return (
    <div>
      <input type="file" onChange={handleFile} />
      {preview && (
        <>
          <Button onClick={() => setPreview(undefined)}>Clear</Button>
          <img src={preview} alt={file?.name} />
        </>
      )}
    </div>
  )
}