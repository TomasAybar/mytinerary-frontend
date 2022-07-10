import React, { useState } from 'react'
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import userActions from '../redux/actions/userActions';
import GoogleSignUp from '../components/GoogleSignUp';
import toast from 'react-hot-toast';

const SignUp = (props) => {

    const countries = [
        'unselected',
        'Argentina',
        'Brazil',
        'Colombia',
        'Chile',
        'Uruguay',
        'Venezuela',
        'Paraguay',
        'Ecuador'
    ]

    const [selectCountry, setSelectCountry] = useState('unselected');

    const navigate = useNavigate();

    const selected = (e) => setSelectCountry(e.target.value) // seteo el hook mediante un evento en el selector



    const handleSubmit = async (e) => {

        e.preventDefault();

        const data = {
            firstName: e.target[0].value,
            lastName: e.target[1].value,
            email: e.target[2].value,
            password: e.target[3].value,
            photoUrl: e.target[4].value,
            country: selectCountry,
            from: 'from-Signup',
        }
        const res = await props.signUpUser(data) // mando los datos del form a mi action

        if (res.data.success) { // Si sale todo bien, reinicio el form

            toast.success(`${res.data.message}`, { duration: 4500 })

            e.target[0].value = '';
            e.target[1].value = '';
            e.target[2].value = '';
            e.target[3].value = '';
            e.target[4].value = '';
            // e.target[5].value = ''; // country

            navigate('/signin')

        } else { // Si hay errores

            res.data.message.forEach(err => {
                toast.error(err.message, { duration: 4500 })
            })

        }
    }


    return (
        <div
            className="flex flex-col justify-center sm:py-12 flex-grow"
            style={{
                backgroundColor: '#3A5BA0',

            }}
        >

            {
                selectCountry !== 'unselected' ?

                    (

                        <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
                            {/* <h1 className="font-bold text-center text-2xl mb-5">Your Logo</h1> */}
                            <form
                                className="bg-white shadow w-full rounded-lg divide-y divide-gray-200"
                                onSubmit={handleSubmit}
                            >
                                <div className="px-5 py-7">
                                    <label className="font-semibold text-sm text-gray-600 pb-1 block">First Name</label>
                                    <input type="text" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />

                                    <label className="font-semibold text-sm text-gray-600 pb-1 block">Last Name</label>
                                    <input type="text" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />

                                    <label className="font-semibold text-sm text-gray-600 pb-1 block">E-mail</label>
                                    <input type="email" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />

                                    <label className="font-semibold text-sm text-gray-600 pb-1 block">Password</label>
                                    <input type="password" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />

                                    <label className="font-semibold text-sm text-gray-600 pb-1 block">Photo URL</label>
                                    <input type="text" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />

                                    {/* <label className="font-semibold text-sm text-gray-600 pb-1 block">Country</label>
                                <input type="text" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" /> */}

                                    <button
                                        type="submit"
                                        className="transition duration-200 bg-blue-700 hover:bg-yellow-400 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
                                        <span className="inline-block mr-2">Sign Up</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </button>
                                </div>

                                <div className="p-5">

                                    <div className="flex justify-center items-center">

                                        {/* <button
                                            className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center text-xs ease-linear transition-all duration-150" type="button">
                                            <img
                                                alt="github"
                                                className="w-5 mr-1"
                                                src="https://demos.creative-tim.com/notus-js/assets/img/github.svg"
                                            />Github</button> */}

                                        <GoogleSignUp country={selectCountry} />

                                    </div>
                                </div>

                            </form>

                        </div>

                    )

                    :

                    (


                        <div className='mx-auto w-full py-20 text-center'>

                            <h1
                                className='text-lg md:text-2xl text-yellow-400 uppercase font-bold mb-3'>Select a country to start registration</h1>
                            <select
                                className='uppercase p-2 px-4 rounded-md text-sm md:text-lg'
                                onChange={selected} // funcion que setea el cambio en mi hook
                            >
                                {

                                    countries.map((country, index) => (
                                        <option key={index}>{country}</option>
                                    ))

                                }
                            </select>
                        </div>



                    )

            }


        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        welcome: state.usersReducer.welcome,
        // cities: state.citiesReducer.cities
    }
}

const mapDispatchToProps = {
    signUpUser: userActions.signUpUser
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
