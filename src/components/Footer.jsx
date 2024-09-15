import React from 'react'

const Footer = () => {
    return (
        <div className='bg-slate-900 text-white flex justify-between py-4 w-full bottom-0' >
            <div className='logo font-bold text-2xl'>
                <span className='text-green-700'>/&lt;</span>
                PassMan
                <span className='text-green-700'>/&gt;</span>
            </div>
            <div className='flex gap-2 items-center'>
                Developed by AnKit <img width='35' src="/icons/el.jpg" alt="" srcset="" />
            </div>
        </div>
    )
}

export default Footer
