import { NextResponse } from "next/server";


export function proxy (req){
    if(!req.cookies.get('token-pfs2')){
        return NextResponse.redirect(new URL('/login', req.url))
    }
}

export const config = {
    matcher: ['/administrador/:path*', '/locatario/:path*']
}