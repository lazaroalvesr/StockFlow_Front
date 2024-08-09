import { Poppins } from "next/font/google";

export const PoppinsFont = Poppins({
    weight: [ '400', '700'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--type-poppins'
})