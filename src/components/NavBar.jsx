import React from 'react';
import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import logo from '../assets/images/logo.png';
import avatar from '../assets/images/avatar.png';
import { Link as BtnLink } from 'react-router-dom';
import { connect } from 'react-redux';
import userActions from '../redux/actions/userActions';
import toast from 'react-hot-toast';


const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Cities', href: '/cities' },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

function NavBar(props) {

    // console.log(props.user.photoUrl)

    const btnSignOut = async () => {

        // console.log('click');

        await props.signOutUser(); // llamo a mi action para borrar el token

        toast.success('you have logged out', { duration: 4500 });

    }

    const logInOut = {
        login: 'h-8 w-8 rounded-full border-2 border-green-500',
        logout: 'h-8 w-8 rounded-full border-2 border-red-400'
    }

    return (
        <Disclosure as="nav" className="header-navbar">
            {({ open }) => (
                <>
                    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 h-full">
                        <div className="relative flex items-center justify-between h-full">

                            {/* boton menu */}
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">

                                {/* Mobile menu button*/}
                                <Disclosure.Button className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">

                                    {open ? (
                                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                                    )}

                                </Disclosure.Button>

                            </div>

                            {/* logos y nav desktop */}
                            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start h-full">

                                {/* logos */}
                                <div className="flex-shrink-0 flex items-center">

                                    <BtnLink
                                        to={'/'}>

                                        <img
                                            className="block lg:hidden logo"
                                            src={logo}
                                            alt="logo"
                                        />

                                        <img
                                            className="hidden lg:block logo"
                                            src={logo}
                                            alt="logo"
                                        />
                                    </BtnLink>
                                </div>

                                {/* navegacion desktop*/}
                                <div className="hidden sm:block sm:ml-20 mt-5">
                                    <div className="flex space-x-4">
                                        {navigation.map((item) => (
                                            <BtnLink
                                                to={`${item.href}`}
                                                key={item.name}>

                                                <button
                                                    className={classNames(
                                                        item.current ? 'bg-gray-900 text-white' : 'text-gray-200 hover:text-yellow-400',
                                                        'px-3 py-2 rounded-md text-lg font-bold uppercase'
                                                    )}
                                                    aria-current={item.current ? 'page' : undefined}
                                                >
                                                    {item.name}
                                                </button>
                                            </BtnLink>
                                        ))}
                                    </div>
                                </div>

                            </div>

                            {/* menu avatar */}
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                                {/* Profile dropdown */}
                                <Menu as="div" className="ml-3 relative">

                                    <div>
                                        <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                            <img


                                                className={
                                                    localStorage.getItem('token') !== null
                                                        ? logInOut.login
                                                        : logInOut.logout
                                                }
                                                src={
                                                    props.user
                                                        ? props.user.photoUrl
                                                        : avatar
                                                }
                                                alt=""
                                            />
                                        </Menu.Button>
                                    </div>

                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">

                                            {

                                                localStorage.getItem('token') !== null

                                                    ?
                                                    // btn logout
                                                    <Menu.Item
                                                        onClick={btnSignOut}
                                                    >
                                                        {({ active }) => (
                                                            <p
                                                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 cursor-pointer')}
                                                            >
                                                                Sign out
                                                            </p>
                                                        )}
                                                    </Menu.Item>

                                                    :
                                                    // btn sign in y sign up
                                                    <>

                                                        <BtnLink
                                                            to={'/signin'}
                                                        >
                                                            <Menu.Item>
                                                                {({ active }) => (
                                                                    <p
                                                                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                                    >
                                                                        Sign In
                                                                    </p>
                                                                )}
                                                            </Menu.Item>

                                                        </BtnLink>

                                                        <BtnLink
                                                            to={'/signup'}
                                                        >
                                                            <Menu.Item>
                                                                {({ active }) => (
                                                                    <p
                                                                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                                    >
                                                                        Sign up
                                                                    </p>
                                                                )}
                                                            </Menu.Item>

                                                        </BtnLink>
                                                    </>
                                            }




                                        </Menu.Items>

                                    </Transition>
                                </Menu>
                            </div>
                        </div>
                    </div>

                    {/* navigation mobile */}
                    <Disclosure.Panel className="sm:hidden">

                        <div className="px-2 mt-1 pb-3 space-y-1">
                            {navigation.map(item => (

                                <BtnLink
                                    to={`${item.href}`}
                                    key={item.name}
                                    as="a"
                                    className={classNames(
                                        'text-white bg-gray-400 hover:bg-yellow-400',
                                        'block px-3 py-2 rounded-md text-base text-center font-medium uppercase mb-1'
                                    )}
                                >
                                    {item.name}

                                </BtnLink>
                            ))}
                        </div>

                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
}

const mapStateToProps = (state) => {
    return {
        user: state.usersReducer.user
    }
}

const mapDispatchToProps = {
    signOutUser: userActions.signOutUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
// export default NavBar;