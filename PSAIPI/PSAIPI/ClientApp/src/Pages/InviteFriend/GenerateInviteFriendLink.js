import { useState, useEffect } from "react"

const GenerateInviteFriendLink = () =>{
    const [link, setLink] = useState("");
    const [allLeagues, setAllLeagues] = useState([]);
    const [selectedLeague, setSelectedLeague] = useState();

    useEffect(async () => {
        const response = await fetch("https://localhost:7217/api/league");
        console.log(response);
        const data = await response.json();
        setAllLeagues(data);
        setSelectedLeague(data[0].id);
    }, [])

    const handleSelectChange = (e) => {
        setSelectedLeague(e.target.value);
    }

    const generateLink = async () => {
        const leagueTitle = allLeagues.filter((l) => l.id == selectedLeague);
        console.log(leagueTitle);
        const id = selectedLeague;
        const league = leagueTitle[0].title;
        const link = `http://localhost:3000/invite/${id}/${league}`
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({url: link})
          };
        const response = await fetch(`https://localhost:7217/api/friendInvite/`, requestOptions);
        console.log(link);
        setLink(link);
    }

    return (
        <>
            <h1>Pasirinkite lygą į kurią norima pakviesti</h1>
            { allLeagues.length > 0 && <select onChange={handleSelectChange} >
                {allLeagues.map((league) => {
                    return (
                        <option value={league.id}>{league.title}</option>
                    )
                })}
            </select>}
            <button onClick={generateLink}>Generuoti nuorodą</button>
            <span>{link}</span>
        </>
    )
}

export default GenerateInviteFriendLink;