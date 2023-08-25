import React, { useState } from 'react'
import QRCode from 'qrcode'

export default function Karekod() {
    let abv=""
    const [url,setUrl]=useState('')
    const [qrcode,setQrcode]=useState('')
    const GenerateQRCode=()=>{
        QRCode.toDataURL(url,{
                width:200,
                margin:2
        },(err,url)=>{
            if(err) return console.error(err)

            console.log("url  "+url)
            console.log("gr   "+qrcode)
            setQrcode(url)
        })
    }

  return (
    <div>
        <input 
        style={{appearance:"none"}}
        type='text'
        value={url}
        onChange={(evt)=>setUrl(evt.target.value)}
        placeholder='"e.g. https://google.com'
        />
        <button onClick={GenerateQRCode}>Oluştur</button>
        {qrcode && <>
            <img src={qrcode} />
        <a href={qrcode} download="qrcode.jpg">indir</a>
       </> }
    </div>
  )
}
