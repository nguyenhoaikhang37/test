import axios, { AxiosResponse } from 'axios'
import { variblesConfig } from '../config'
import { lsActions } from '../utils/auth'

type UploadResponse = {
  Key: string
  Location: string
}

const uploadFile = async (file: File): Promise<UploadResponse> => {
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

    return {
      Key: response.data.Key,
      Location: response.data.Location
    }
  } catch (error) {
    console.log('Error:', error)
    throw error
  }
}

export default uploadFile
