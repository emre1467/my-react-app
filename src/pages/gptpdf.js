import React, { useState } from 'react';
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import QRCode from 'qrcode'
//import * as cors from 'cors';
//const corsHandler = cors({origin: true});
/*
function Deneme() {
         
  //const [qrcode, setQrcode] = useState('')
  const GenerateQRCode = () => {
    let url = "https://www.google.com/"
    QRCode.toDataURL(url, {
      width: 200,
      margin: 2
    }, (err, url) => {
      if (err) return console.error(err)

      console.log("url  " + url)
      //console.log("gr   "+qrcode)
      //qrc=url
      //setQrcode(url)
    })
  }
  }*/
class App extends React.Component {
   
  modifyPdf = async () => {
 
//Deneme()
   

    const url = 'https://firebasestorage.googleapis.com/v0/b/fir-tutorial-ca834.appspot.com/o/files%2FSun%20Sep%2011%202022%2018%3A28%3A06%20GMT%2B0300%20(GMT%2B03%3A00)q3fYgEncTrttfPKYQKcL?alt=media&token=dc5d99de-2fce-45cd-9d83-97057d7fec09';
    const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())
    //const existingPdfBytes = await fetch(url, { mode: 'no-cors' }).then(res => res.arrayBuffer())

    const pdfDoc = await PDFDocument.load(existingPdfBytes)
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)

    const pages = pdfDoc.getPages()
    const firstPage = pages[0]
    const { width, height } = firstPage.getSize()
    
   
    
    const jpgUrl = 'https://pdf-lib.js.org/assets/cat_riding_unicorn.jpg'
    const jpgImageBytes = await fetch(jpgUrl).then((res) => res.arrayBuffer())
    const jpgImage = await pdfDoc.embedJpg(jpgImageBytes)
    const jpgDims = jpgImage.scale(0.5)
    firstPage.drawImage(jpgImage, {
      x: firstPage.getWidth() / 2 - jpgDims.width / 2,
      y: firstPage.getHeight() / 2 - jpgDims.height / 2 + 250,
      width: jpgDims.width,
      height: jpgDims.height,
    })


/*
    firstPage.drawText('This text was added with JavaScript!', {
      x: 5,
      y: height / 2 + 300,
      size: 50,
      font: helveticaFont,
      color: rgb(0.95, 0.1, 0.1),
      rotate: degrees(-45),
    })*/
/*
    const pdfBytes = await pdfDoc.save()
    const pdfBase64 = btoa(String.fromCharCode(...new Uint8Array(pdfBytes)))
    
    const downloadLink = document.createElement('a')
    downloadLink.href = `data:application/pdf;base64,${pdfBase64}`
    downloadLink.download = 'example.pdf'
    downloadLink.click()
    */
    const pdfBytes = await pdfDoc.save();

    const fileName = 'example.pdf';
    const fileType = 'application/pdf';
  
    const blob = new Blob([pdfBytes], {type: fileType});
  
    const file = new File([blob], fileName, {type: fileType});
    console.log(file)
  
    // Dosyayı indirin
    const downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(file);
    downloadLink.download = fileName;
    downloadLink.click();

  }

  render() {
    return (
      <div>
        <button onClick={this.modifyPdf}>PDF'yi Güncelle ve İndir</button>
        
      </div>
    );
  }
}

export default App;