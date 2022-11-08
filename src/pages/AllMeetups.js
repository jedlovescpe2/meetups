
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import MeetupList from "../components/meetups/MeetupList";




function AllMeetupsPage(){

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [loadedMeetups, setLoadedMeetups] = useState([]);

    useEffect(()=>{
        setIsLoading(true)
        fetch('https://react-getting-started-ed5c8-default-rtdb.firebaseio.com/meetups.json')

        .then((response) =>{  
            return response.json();
          })
        .then((data) => {

            const meetups = [];
            
            for (const key in data){
              const meetup = {
                id: key,
                ...data[key]
              };
              
              meetups.push(meetup);
            }
            setIsLoading(false)
            setLoadedMeetups(meetups);
            // navigate('/');
        });
    },[]);

    
          

    if(isLoading){
      return (
        <p>Loading...</p>
      );
    }

    
    return (
        <div>
            <h1>All Meetups</h1>
            <MeetupList meetups={loadedMeetups}/>
        </div>
    );
}

export default AllMeetupsPage;