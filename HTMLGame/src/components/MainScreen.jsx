import { DataContext } from '../context/DataContext';
import { useContext, useEffect } from 'react';
import '../styles/index.scss';
const MainScreen = () => {
    const {npcs, loadDataFile} = useContext(DataContext); 

    const handleFileChange = (e) => {
        
        loadDataFile(e);
    };

    return (
        <>
        <h1>NPCs</h1>
        <input type="file" accept=".json,application/json" onChange={handleFileChange} />
        <ul>
            {npcs.map((npc, index) => (
                <li key={index}>
                    <h2>{npc.name}</h2>
                    <p>{npc.description}</p>
                    <img src={npc.image} alt={npc.name} />
                </li>
            ))}
        </ul>
        </>
    );
}
export default MainScreen;