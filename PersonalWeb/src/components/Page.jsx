
import { useContext, useEffect } from 'react';
import '../styles/index.scss';
import Card from './Card';
const Page = (props) => {

    

    return (
        <div className="section-container-management" >
            <h1>Edit Menu</h1>
            <div className="card-management-wrapper">
                <Card title={"Perks"} description={"Diferentes estados o caracteristicas del personaje"}/>
                <Card title={"Quests"} description={"Diferentes estados o caracteristicas del personaje"}/>
                <Card title={"Items"} description={"Diferentes estados o caracteristicas del personaje"}/>
                <Card title={"Npcs"} description={"Diferentes estados o caracteristicas del personaje"}/>
                <Card title={"Player"} description={"Diferentes estados o caracteristicas del personaje"}/>
                <Card title={"Pages"} description={"Diferentes estados o caracteristicas del personaje"}/>  
                <Card title={"Story"} description={"Diferentes estados o caracteristicas del personaje"}/>
                <Card title={"Locations"} description={"Diferentes estados o caracteristicas del personaje"}/>
                <Card title={"Stores"} description={"Diferentes estados o caracteristicas del personaje"}/>    
                <Card title={"Mini-games"} description={"Diferentes estados o caracteristicas del personaje"}/>              
            </div>
        </div>
    );
}
export default Page;