import { useEffect, useState } from 'react';
import axios from 'axios';

const HeroList = () => {
    const [heroes, setHeroes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHeroes = async () => {
            try {
                const response = await axios.get('http://localhost:3100/hero/');
                setHeroes(response.data.result.data.heroes);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchHeroes();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="flex flex-wrap justify-center gap-8">
            {heroes.map((hero) => (
                <div key={hero.id} className="w-1/10 py-1 card-hero transition-transform duration-300 ease-in-out transform hover:scale-125 hover:cursor-pointer">
                    <img className="w-full" src={`https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/${hero.name}.png`} alt={hero.name_loc} />
                </div>
            ))}
        </div>
    );
};

export default HeroList;
