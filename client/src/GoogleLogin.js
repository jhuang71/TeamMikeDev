import React from 'react'
import GoogleLogin from 'react-google-login'

const responseGoogle = (res) => {
    console.log('[Login Success] currentUser:', res.profileObj)
}

export default function GoogleLogin() {
    return (
        <div>
            <GoogleLogin
                clientId="565992343976-3e8cljlucir10s24us3s667l3ujunk29.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    )
}
