import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Pokemon from "../Pokemon/pokemon";
import "./pokemonlist.css";
function PokemonList() {
    const [pokemonList,setpokemonList]=useState([]);
    const [isLoading,setIsLoading] = useState(true);

  async function downloadPokemons(){
    const response= await axios.get('https://pokeapi.co/api/v2/pokemon');//download list of 20 Pokemon
    const pokemonResults = response.data.results;//we get array of pokemon
    console.log(response.data);
    //iterating over array of pokemon and using their url, to create array of promises
    //that will download those 20 pokemon
     const pokemonResultPromise = pokemonResults.map((pokemon)=>axios.get(pokemon.url));
     //passing that 20 pokemon promise array to axios.all 
     const pokemonData = await axios.all(pokemonResultPromise);//detail data of 20 Pokemon
     console.log(pokemonData);
     //iterate on the data of each pokemon and extract id,name and image , types.
   const res =  pokemonData.map((pokemonData)=>{
      const pokemon = pokemonData.data;
      return {
        id:pokemon.id,
        name:pokemon.name,
        image:(pokemon.sprites.other)?pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny,
        types:pokemon.types
      }
 });
     console.log(res);
     setpokemonList(res);
    setIsLoading(false);
  }
    
    useEffect(()=>{
    downloadPokemons();
    },[]);

    return (
    <div className="pokemon-list-wrapper">
    
    <div className="pokemon-wrapper">
    {(isLoading)?"Loading.....":
    pokemonList.map((p)=><Pokemon name={p.name} image={p.image} key={p.id}/>)
    }
    </div>
    
    <div className="controls">
        <button>Prev</button>
        <button>Next</button>
    </div>

    </div>
  )
 }
export default PokemonList;