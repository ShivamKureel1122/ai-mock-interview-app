import React from 'react'
import { useState } from 'react'
import Image from 'next/image'

const Webcam = () => {
    const [enabled, setEnabled] = useState(false)

    return (
        <div className="w-xl bg-white rounded-2xl shadow-xl p-4 flex flex-col items-center border">
            {/* <h2 className="text-xl font-semibold mb-4">Camera Preview</h2> */}
            <div className="relative w-full h-90 rounded-xl overflow-hidden bg-gray-200 flex items-center justify-center">
            {enabled ? (
                <Webcam
                className="w-full h-full object-cover"
                onUserMedia={() => setEnabled(true)}
                onUserMediaError={() => setEnabled(false)}
                mirrored={true}
                videoConstraints={{
                    facingMode: "user",
                }}
                />
            ) : (
                <>
                <span className="text-gray-500">Camera Disabled</span>
                </>
            )}
            </div>

            <Button
            className="mt-6 w-full"
            onClick={() => setEnabled(!enabled)}
            variant={enabled ? "destructive" : "default"}
            >
            {enabled ? (
                <>
                <Image
                    src='/video-camera-off.svg'
                    alt="camera icon" 
                    height={20}
                    width={20}
                    className='mr-1'/>
                Disable Camera
                </>
            ) : (
                <>
                <Image
                    src='/video-camera-on.svg'
                    alt="camera icon" 
                    height={20}
                    width={20}
                    className='mr-1'/>
                Enable Camera
                </>
            )}
            </Button>
        </div>
    )
}

export default Webcam