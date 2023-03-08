import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Link from 'next/link';
import { AiFillFacebook, AiFillTwitterCircle, AiFillGoogleCircle } from 'react-icons/ai';

export default Login;

function Login() {
    const router = useRouter();

    // form validation rules 
    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .required('Username is required'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState, reset } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit(data: any) {
        const { username, password } = data

        const userInf = {
            id: "admin",
            pw: "123456"
        }
        if (username === userInf.id && password === userInf.pw) {
            router.push('/cart')
            return (
                alert('Login success')
            )

        }
        return (alert('Please check your email, password and try again'))
    }

    return (
        <div className='mx-40 px-40  text-base font-normal bg-purple-600 py-20'>
            <div className='border-2 my-15 bg-purple-50 mx-40 rounded-[30px]'>
                <p className='flex justify-center text-[50px] pt-10 pb-10 font-bold'>Login</p>
                <div
                    className='form-control block w-full mx-auto px-20 py-1.5 text-base font-normal flex justify-center'>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div className="">
                            <label>Username</label>
                            <div className='form-control block w-full mx-auto px-20 py-1.5 text-base font-normal'>
                                <input
                                    placeholder='Type your usename'
                                    type="text "
                                    {...register('username')}
                                    className={`form-control ${errors.username ? 'is-invalid' : ''}`} />
                            </div>
                            <div className="invalid-feedback text-red-700">{errors.username?.message}</div>
                        </div>
                        <hr className='border-2 my-2'></hr>
                        <div className="">
                            <label>Password</label>
                            <div className='form-control block w-full mx-auto px-20 py-1.5 text-base font-normal'>
                                <input placeholder='Type your password' type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                            </div>
                            <div className="invalid-feedback text-red-700">{errors.password?.message}</div>
                        </div>
                        <hr className='border-2 my-2'></hr>

                        <button disabled={formState.isSubmitting}
                            className="m-2 border-2 h-[35px] w-full  border-sky-600 active:bg-sky-600 rounded-lg">
                            {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1 "></span>}
                            Login
                        </button>

                        <button
                            className="m-2 border-2 h-[35px] w-full border-sky-600 active:bg-sky-600 rounded-lg"
                            type="button"
                            onClick={() => reset()} >
                            Reset
                        </button>

                        <Link href="/" className='text-blue-500 float-right'>Forgot password</Link>

                        <div className='pb-20'>
                            <div className='pt-10 text-center'>Or Sign up Using</div>
                            <ul className='flex justify-center'>
                                <AiFillFacebook className='border-4 w-10 h-10 bg-blue-200 rounded-full' />
                                <AiFillTwitterCircle className='border-4 w-10 h-10 bg-blue-200 rounded-full' />
                                <AiFillGoogleCircle className='border-4 w-10 h-10 bg-blue-200 rounded-full' />
                            </ul>
                        </div>
                        <p className='pt-10 text-center'>Or Sign up Using</p>
                        <p className='pt-10 text-center pb-10'>SIGN UP</p>

                    </form>


                </div>
            </div >

        </div>);
}
