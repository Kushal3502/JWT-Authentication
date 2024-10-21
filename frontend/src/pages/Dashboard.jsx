import React, { useEffect, useState } from 'react'

function Dashboard() {
    const [auth,setAuth] = useState(false)

    useEffect(() => {
      console.log(document.cookie)
        if(document.cookie) setAuth(true)
    },[])

  return (
    <div>{auth?"auth":"not auth"}</div>
  )
}

export default Dashboard