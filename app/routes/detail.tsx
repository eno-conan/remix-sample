import { useState } from "react";
import { useLocation } from 'react-router-dom';

export default function Detail() {
    const location = useLocation();
    const [signedUrl, setSignedUrl] = useState<{ url: string }>(location.state as { url: string })
    return (
        <>
            {signedUrl ?
                <img className="h-64 cursor-pointer" src={signedUrl.url!} alt={"image"} width={250} height={250} />
                : <></>
            }
            Detail
        </>
    )
}