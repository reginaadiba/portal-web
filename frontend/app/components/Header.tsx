import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ThemeSwitcher from './ThemeSwitcher'

function Header() {
  return (
    <header className="header">
          <nav>
            <div className="logo">
                <Link href="/">
                    {/* <Image src="vercel.svg" width={30} height={30} alt="logo"></Image> */}
                    <Image src="https://www.drupal.org/files/project-images/nextjs-icon-dark-background.png" width={50} height={50} alt="logo"></Image>
                </Link>
            </div>
            <div className="nav-links">
                <Link href="/">Home</Link>
                <Link href="/categories">Categories</Link>
            </div>
            <ThemeSwitcher />
          </nav>
          
        </header>
  )
}

export default Header