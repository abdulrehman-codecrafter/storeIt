import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'
import FileUploader from './FileUploader'
import Search from './Search'
export default function Header() {
  return (
    <header className='header'>
        <Search />
        <div className="header-wrapper">
            <FileUploader />

            <form >
                <Button type="submit" className='sign-out-button'>
                    <Image 
                    src="/assets/icons/logout.svg"
                    alt="Logout"
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
