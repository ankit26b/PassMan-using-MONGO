import React from 'react'

const Navbar = () => {
    return (
        <nav className='bg-slate-800 text-white'>
            <div className=' flex justify-between
             items-center px-4 py-5 h-16 mycontainer'>

                <div className='logo font-bold text-2xl'>
                    <span className='text-green-700'>/ &lt;</span>
                    PassMan
                    <span className='text-green-700'>/ &gt;</span>
                </div>

                <div className='flex items-center font-bold text-xl cursor-pointer'>
                    <img className='invert p-1 w-9 ' src="/icons/github-mark.png" alt="ghlogo" srcset="" />
                    GitHub
                </div>

            </div>

        </nav>
    )
}

export default Navbar
