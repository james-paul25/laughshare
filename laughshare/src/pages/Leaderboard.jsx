import React, { useEffect, useState } from "react"
import useAuth from "../contexts/useAuth"
import db from "../firebase"

export default function Leaderboard(){
    const {user} = useAuth()
    const {jokes, setJokes} = useState([])

    useEffect(() => {
        const fetchJokes = async () => {
            const jokeCollection = await getDocs(collection(db, "jokes"));
            setJokes(
                jokeCollection.docs.map((doc) => ({
                id: doc.id,
                likedBy: [],
                ...doc.data(),
                }))
            );
        } 
    }, [])


    return(
        <div>
            <div className="flex flex-col items-center mb-4">
                <h1>Leadeboard</h1>
                <p className="text-sm text-gray-500 mt-2">Who got more more laugh ?</p>
            </div>

            <div></div>
        </div>
    )
}