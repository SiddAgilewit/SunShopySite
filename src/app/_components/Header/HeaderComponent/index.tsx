'use client'
import Link from "next/link"
import { Header } from "../../../../payload/payload-types"
import { Gutter } from "../../Gutter"
import SunshopyLogo from '../../../../../public/assets/images/SunshopyLogo.png'
import SunshopyLogowithTitle from '../../../../../public/assets/images/SunShopyPng.png'
import classes from './index.module.scss'
import Image from "next/image"
import { HeaderNav } from "../Nav"
import { noHeaderFooterUrls } from "../../../constants/index"
import { usePathname } from "next/navigation"

const HeaderComponent=({header}:{header:Header})=>{
    const pathname=usePathname()
    return(
       <nav className={[classes.header,noHeaderFooterUrls.includes(pathname)&& classes.hide].filter(Boolean).join(' ')}
       >
        <Gutter className={classes.wrap}>
            <Link href="/">
          <Image src={SunshopyLogowithTitle.src} className={classes.LaptopView} alt="Logo" width={180} height={120} />
          <Image src={SunshopyLogo.src} className={classes.Mobileview} alt="Logo" width={80} height={90} />
            </Link>

            <HeaderNav header={header}/>
            
        </Gutter>
       </nav>
    )
}

export default HeaderComponent