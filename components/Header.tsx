'use client'
import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'
import Search from './Search'
import FileUploader from './FileUploader'
import { UserSignOut } from '@/lib/firebase/auth'

const Header = () => {
  return (
    <header className='header'>
        
        <Search />
        <div className='header-wrapper'>
            <FileUploader />
            
            <form>
                <Button type='submit' className='sign-out-button' onClick={async () => await UserSignOut()}>
                    <Image 
                        src="/assets/icons/logout.svg"
                        alt="logo"
                        width={24}
                        height={24}
                        className='w-6'
                    
                    />
                </Button>
            </form>

        </div>


    </header>
  )
}

export default Header