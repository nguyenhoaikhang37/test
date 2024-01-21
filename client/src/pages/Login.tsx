import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import * as yup from 'yup'
import { User, useLoginUserMutation } from '../graphql/gen-types'
import { userAction } from '../redux/slices/user.slice'

type FormData = {
  email: string
  password: string
}

const schema = yup.object().shape({
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email format'),
  password: yup.string().required('Password is required')
})

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: ''
    }
  })
  const dispatch = useDispatch()

  const [login] = useLoginUserMutation({
    onCompleted(data) {
      const { access_token: token, __typename, ...user } = data.loginUser
      dispatch(
        userAction.loginSuccess({
          user: user as User,
          token
        })
      )
    }
  })

  const onSubmit: SubmitHandler<FormData> = data => {
    login({
      variables: {
        loginUserInput: data
      }
    })
  }

  return (
    <div className='flex h-screen items-center justify-center'>
      <div className='rounded bg-white p-8 shadow'>
        <h2 className='mb-4 text-2xl font-bold'>Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-4'>
            <label
              htmlFor='email'
              className='mb-2 block font-bold text-gray-700'
            >
              Email
            </label>
            <input
              type='email'
              id='email'
              {...register('email')}
              className='w-full rounded border border-gray-300 p-2'
            />
            {errors.email && (
              <p className='text-sm text-red-500'>{errors.email.message}</p>
            )}
          </div>
          <div className='mb-4'>
            <label
              htmlFor='password'
              className='mb-2 block font-bold text-gray-700'
            >
              Password
            </label>
            <input
              type='password'
              id='password'
              {...register('password')}
              className='w-full rounded border border-gray-300 p-2'
            />
            {errors.password && (
              <p className='text-sm text-red-500'>{errors.password.message}</p>
            )}
          </div>
          <button
            type='submit'
            className='rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
