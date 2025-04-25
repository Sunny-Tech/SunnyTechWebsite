import {
    GoogleAuthProvider,
    getAuth,
    getRedirectResult,
    signInWithPopup,
    signInWithRedirect,
    signOut,
    useDeviceLanguage,
    type UserCredential,
} from 'firebase/auth'
import { app } from './client'

const provider = new GoogleAuthProvider()
provider.addScope('https://www.googleapis.com/auth/userinfo.email')

const auth = getAuth(app)
useDeviceLanguage(auth)

export const signIn = () => {
    const successCallback = (credential: UserCredential | null) => {
        return credential?.user
    }

    const errorCallback = (error: any) => {
        const errorCode = error.code
        const errorMessage = error.message
        const email = error.customData.email
        const credential = GoogleAuthProvider.credentialFromError(error)
        console.error('Error during sign-in:', errorCode, errorMessage, email, credential)
    }

    if (import.meta.env.DEV) {
        return signInWithPopup(auth, provider).then(successCallback).catch(errorCallback)
    } else {
        signInWithRedirect(auth, provider)
        getRedirectResult(auth).then(successCallback).catch(errorCallback)
    }
}

export const logout = () => {
    signOut(auth)
        .then(() => {
            console.log('User signed out')
        })
        .catch((error) => {
            console.error('Error during sign-out:', error)
        })
}
