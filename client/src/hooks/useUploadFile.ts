import axios, { AxiosResponse } from 'axios'
import { useState } from 'react'
import { variblesConfig } from '../config'
import { lsActions } from '../utils/auth'

type UploadResponse = {
  data: string
  status: number
  statusText: string
}

type UseFileUploadResult = {
  loading: boolean
  response: UploadResponse | null
  uploadFile: (file: File) => Promise<void>
}

const useFileUpload = (): UseFileUploadResult => {
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState<UploadResponse | null>(null)

  const uploadFile = async (file: File): Promise<void> => {
    setLoading(true)
    setResponse(null)

    const token = lsActions.getToken()

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response: AxiosResponse = await axios.post(
        variblesConfig.upload_endpoint,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
          onUploadProgress: progressEvent => {
            console.log(`Upload progress: ${progressEvent}%`)
          }
        }
      )

      setLoading(false)
      setResponse({
        data: response.data,
        status: response.status,
        statusText: response.statusText
      })
    } catch (error) {
      setLoading(false)
      console.log('Error:', error)
    }
  }

  return { loading, response, uploadFile }
}

export default useFileUpload
