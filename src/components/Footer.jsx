import React from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Link as BtnLink } from 'react-router-dom';


const Footer = () => {
    return (
        <div className='footer flex flex-col justify-center items-center'>

            <div className='container mx-auto w-full flex justify-around items-center'>

                <BtnLink
                    to={'/'}>
                    <button className='uppercase text-xl hover:text-yellow-400'>Home</button>
                </BtnLink>

                <div className='flex justify-center items-center'>

                    <a href="http://www.twitter.com/" target="_blank" rel="noopener noreferrer">
                        <TwitterIcon sx={{ fontSize: '2rem', marginRight: '5px' }} />
                    </a>

                    <a href="http://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                        <InstagramIcon sx={{ fontSize: '2rem', marginRight: '5px' }} />
                    </a>

                    <a href="http://www.github.com/" target="_blank" rel="noopener noreferrer">
                        <GitHubIcon sx={{ fontSize: '2rem', marginRight: '5px' }} />
                    </a>

                    <a href="http://www.whatsapp.com/" target="_blank" rel="noopener noreferrer">
                        <WhatsAppIcon sx={{ fontSize: '2rem', marginRight: '5px' }} />
                    </a>

                </div>

                <BtnLink
                    to={'/cities'}>
                    <button className='uppercase text-xl hover:text-yellow-400'>Cities</button>
                </BtnLink>

            </div>

            <p className=''>©My<span className='text-yellow-400'>Tinerary</span></p>
        </div>
    );
}

export default Footer;