import { Button } from '@chakra-ui/react';
import React, { useEffect } from 'react'
import styled from 'styled-components';

const Image = styled.img`
  height: 500px;
`;

interface Props {
  file: File | undefined;
  setFile(file: File | undefined): void;
  preview: string | undefined;
  setPreview(preview: string | undefined): void;
}

export const ImagePreview = ({ file, setFile, preview, setPreview }: Props) => {
  useEffect(() => {
    console.log("mounted")
    if (!file) {
      console.log("no file")
      setPreview(undefined)
      return
    }

    const fileUrl = URL.createObjectURL(file)
    setPreview(fileUrl)
    console.log(file.name)
    return () => URL.revokeObjectURL(fileUrl)
  }, [file, setPreview])

  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files![0])
  }

  return (
    <div>
      <input type="file" onChange={handleFile} />
      {preview && (
        <>
          <Button onClick={() => setPreview(undefined)}>Clear</Button>
          <Image src={preview} alt={file?.name} />
        </>
      )}
    </div>
  )
}