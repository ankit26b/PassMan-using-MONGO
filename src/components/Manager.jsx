import React from 'react'
import { useRef, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {

    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordsArray, setpasswordsArray] = useState([])

    const getPasswords = async()=>{
        let req = await fetch("https://localhost:3000/")
        let passwords = await req.json()
        setpasswordsArray(passwords)
    }

    useEffect(() => {
        getPasswords()
    }, [])


    const showPassword = () => {
        passwordRef.current.type = "text"
        console.log(ref.current.src)
        if (ref.current.src.includes("icons/visibility_off.png")) {
            ref.current.src = "icons/visibility.png"
            passwordRef.current.type = "password"
        } else {
            ref.current.src = "icons/visibility_off.png"
            passwordRef.current.type = "text"
        }

    }
    const savePassword = async() => {
        if(form.site.length>3 && form.username.length>3 && form.password.length>3){

            //if exisst delete previous entry
            await fetch("http://localhost:3000/", {method: "DELETE", headers: {"Content-Type": "application/json"},body: JSON.stringify({id: form.id})})



            setpasswordsArray([...passwordsArray, {...form, id:uuidv4()}])
            await fetch("http://localhost:3000/", {method: "POST", headers: {"Content-Type": "application/json"},body: JSON.stringify({...form, id:uuidv4()})})
            setform({ site: "", username: "", password: "" })
            toast('pass saved', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        }
        else{
            toast('pass not saved', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        }
    }
    const deletePassword = async(id) => {
        let c = confirm("Do you really want to delete this password?")
        if(c){
            setpasswordsArray(passwordsArray.filter(item=>item.id!==id))
            await fetch("http://localhost:3000/", {method: "DELETE", headers: {"Content-Type": "application/json"},body: JSON.stringify({id})})

            toast('Password Deleted!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true, 
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    const editPassword = (id) => {
        setform({...passwordsArray.filter(i=>i.id === id)[0], id: id})
        setpasswordsArray(passwordsArray.filter(item=>item.id!==id))
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const copyText = (text) => {
        toast('Copied to Clipboard!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
        navigator.clipboard.writeText(text)
    }

    return (
        <>
        <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            transition="Bounce"
        />
        <ToastContainer />    
            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"><div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div></div>


            <div className="p-2 md:mycontainer mx-auto min-h-[83.2vh]">
                <h1 className='text-3xl font-bold text-center py-2 w-32'>
                    <span className='text-green-700'>/&lt;</span>
                    PassMan
                    <span className='text-green-700'>/&gt;</span>
                </h1>


                <p className='text-green-900 text-lg text-center py-2 w-32'>Your own password manager</p>


                <div className="text-black flex flex-col p-4 gap-8 items-center">
                    <input value={form.site} onChange={handleChange} placeholder="Enter website URL" className='rounded-full border border-emerald-500 w-full p-4 py-1' type='text' name='site' id='site' />

                    <div className="flex flex-col md:flex-row w-full justify-between gap-8">

                        <input value={form.username} onChange={handleChange} placeholder="Enter Username" className='rounded-full border border-emerald-500 w-full p-4 py-1' type='text' name='username' id='username' />

                        <div className="relative">
                            <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder="Enter Password" className='rounded-full border border-emerald-500 w-full p-4 py-1' type='password' name='password' id='password' />
                            <span className='absolute right-2 py-1 invert cursor-pointer' onClick={showPassword}>
                                <img ref={ref} width={26} src="icons/visibility.png" alt="eye" />
                            </span>
                        </div>

                    </div>

                    <button onClick={savePassword} className='flex text-emerald-500 justify-center items-center gap-2 bg-slate-600 hover:bg-green-200 rounded-full px-4 py-2 w-fit border border-slate-900'>
                        <lord-icon
                            src="https://cdn.lordicon.com/zrkkrrpl.json"
                            trigger="hover">
                        </lord-icon>Save Password</button>
                </div>

                <div className="passwords">
                    <h2 className='font-bold text-2xl py-4'>
                        your passwords
                    </h2>

                    {passwordsArray.length === 0 && <div>No passwords to show</div>}
                    {passwordsArray.length != 0 &&

                        <table className="table-auto w-full rounded-md  overflow-hidden mb-10">
                            <thead className='bg-green-800 text-white py-2' >
                                <tr className=' justify-around'>
                                    <th className='py-2'>Site</th>
                                    <th className='py-2'>Username</th>
                                    <th className='py-2'>Password</th>
                                    <th className='py-2'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='bg-green-100'>
                                {passwordsArray.map((item, index) => {
                                    return <tr key={index}>
                                        <td className="text-center py-2 w-32">
                                            <div className='flex justify-between items-center px-16'>
                                                <a href={item.site} target="_blank">{item.site}</a>
                                                <img onClick={() => { copyText(item.site) }} width={20} className='invert cursor-pointer' src="/icons/copy.png" alt="cpy"/>
                                            </div>
                                        </td>
                                        <td className="text-center py-2 w-32 border-x">
                                            <div className='flex justify-between items-center px-16'>{item.username}
                                                <img onClick={() => { copyText(item.username) }} width={20} className='invert cursor-pointer' src="/icons/copy.png" alt="cpy"/>
                                            </div>
                                        </td>
                                        <td className="text-center py-2 w-32 border-x">
                                            <div className='flex justify-between items-center px-16'>
                                                {"*".repeat(item.password.length)}
                                                <img onClick={() => { copyText(item.password) }} width={20} className='invert cursor-pointer' src="/icons/copy.png" alt="cpy"/>
                                            </div>
                                        </td>
                                        <td className="text-center py-2 w-32">
                                            <div className='flex px-20 gap-5'>
                                                <span className='cursor-pointer'>
                                                  <img onClick={()=>{deletePassword(item.id)}} className='invert w-8' src="/icons/delete.png" alt=""/>
                                                </span>
                                                <span className='cursor-pointer'>
                                                  <img onClick={()=>{editPassword(item.id)}}  className='invert w-8' src="/icons/edit.png" alt=""/>
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                })}
                            </tbody>
                        </table>}
                </div>
            </div>

        </>

    )
}

export default Manager
