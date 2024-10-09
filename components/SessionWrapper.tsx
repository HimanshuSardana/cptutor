"use client"

import { defaultMaxListeners } from "events"
import { SessionProvider } from "next-auth/react"
import React from 'react'
import { deflate } from "zlib"

const SessionWrapper = ({ children }: { children: React.ReactNode }) => {
        return (
                <SessionProvider>
                        {children}
                </SessionProvider>
        )
}

export default SessionWrapper;

