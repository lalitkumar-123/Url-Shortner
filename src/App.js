import axios from 'axios';
import React, {useState, useEffect} from 'react'

export default function App() {

  const [link,setLink] = useState();
  const [linkdelete,setLinkdelete] = useState();
  const [shortUrls,setshortUrls] = useState(); 

  useEffect(() => {
    return () => {
      console.log(link);
    }
  }, [{link}])

  useEffect(async() => {
    await axios.get("http://localhost:5000/")
    .then(res => {
      setshortUrls(res.data.shorturls);
    })
    .catch(() => {
        window.location = "/"
        console.log("Error");
      })
  }, [])

  async function submit()
  {
      if(link === undefined) return;
      if(link === null) return;

      await axios.post("http://localhost:5000/", {link})
      .then(res => {
        console.log("No Error");
      })
      .catch(() => {
        window.location = "/"
        console.log("Error");
      })

      await axios.get("http://localhost:5000/")
      .then(res => {
        setshortUrls(res.data.shorturls);
      })
      .catch(() => {
        window.location = "/"
        console.log("Error");
      })

  }

  async function submitdelete()
  {
      if(linkdelete === undefined) return;
      if(linkdelete === null) return;

      await axios.post("http://localhost:5000/delete", {linkdelete})
      .then(res => {
        console.log("No Error");
      })
      .catch(() => {
        window.location = "/"
        console.log("Error");
      })

      await axios.get("http://localhost:5000/")
      .then(res => {
        setshortUrls(res.data.shorturls);
      })
      .catch(() => {
        window.location = "/"
        console.log("Error");
      })

  }

  return (
    shortUrls ? shortUrls.forEach(shortUrl => {
            console.log(shortUrl.full);
            console.log(shortUrl.short);
        }) : null,
    <>
      <div style={{textAlign: 'center', justifyContent: 'center', marginTop: '50px'}}>
        <h1>Url Shortner</h1>
        <input type="text" placeholder="enter url" onChange={(e) => setLink(e.target.value)} required></input>
        <button className="mx-2" onClick={(e) => submit()}>Generate</button>
        <input type="text" placeholder="enter url" onChange={(e) => setLinkdelete(e.target.value)} required></input>
        <button className="mx-2" onClick={(e) => submitdelete()}>Generate</button>
        {shortUrls ? 
            <ul>
              {shortUrls.map(function(shorturl, index) {
                    return <tr key={ index }>
                      <td><a href="#">{shorturl.full}</a></td> 
                      <td><a href={shorturl.full} target="_blank">{shorturl.short}</a></td>
                    </tr> 
                })}
            </ul> : null}
      </div>
    </>
  )
}


