'use client'
import React from 'react'
import { signOut } from "next-auth/react";
import { Button } from '../ui/button'

const LogoutButton = () => {

    return (
        <Button className="text-white hover:bg-gray-500" onClick={() => signOut()}>
            Logout
        </Button>
    )
}

export default LogoutButton