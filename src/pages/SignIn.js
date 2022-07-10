import React from 'react'
import { connect } from 'react-redux';
// import { useDispatch } from 'react-redux';
import userActions from '../redux/actions/userActions';
import toast from 'react-hot-toast';
import GoogleSignIn from '../components/GoogleSignIn';
import { useNavigate } from 'react-router-dom'; 


const SignIn = (props) => {

    // const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {

        e.preventDefault();

        const data = {
            email: e.target[0].value, // email
            password: e.target[1].value, // pass
            from: 'from-Signup', // desde donde inicia sesion
        }

        // console.log(data)
        const res = await props.signInUser(data) // mando los datos del form a mi action
        // console.log(res.data.message)

        if (res.data.success) { // Si sale todo bien, reinicio el form

            toast.success(`${res.data.message}`, { duration: 4500 })

            e.target[0].value = '';
            e.target[1].value = '';

            // AGREGAR EL NAVIGATE QUE ME LLEVE AL SIGN IN
            navigate('/')

        } else { // Si hay errores
            
            res.data.message.forEach(err => {
                toast.error(err.message, { duration: 4500 })
            })

            // toast.error(`${res.data.message}`, { duration: 4500 })

        }
    }

    return (

        <div
            className="flex flex-col justify-center sm:py-12"
            style={{
                backgroundColor: '#3A5BA0',
                height: '75vh'
            }}
        >
            <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">

                <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">

                    <form
                        className="px-5 py-7"
                        onSubmit={handleSubmit}
                    >
                        <label className="font-semibold text-sm text-gray-600 pb-1 block">E-mail</label>
                        <input type="text" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
                        <label className="font-semibold text-sm text-gray-600 pb-1 block">Password</label>
                        <input type="password" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
                        <button
                            type="submit"
                            className="transition duration-200 bg-blue-700 hover:bg-yellow-400 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
                            <span className="inline-block mr-2">Login</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </button>
                    </form>

                    <div className="p-5">

                        <div className="flex justify-center items-center">
                            
                            <GoogleSignIn />
                            
                        </div>

                    </div>

                </div>

            </div>
        </div>

    )
}

const mapStateToProps = (state) => {
    return {
        welcome: state.usersReducer.welcome
    }
}

const mapDispatchToProps = {
    signInUser: userActions.signInUser
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);