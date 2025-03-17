import logo from './logo.svg';
import { Fragment, useState } from 'react';
import './input.css';
import './output.css';
import { useEffect } from 'react';
import './App.css'
function App() {
const API="https://pokeapi.co/api/v2/pokemon"
const [set,newpokemon]=useState([])
const [oldmap,newmap]=useState([])
const [oldload,newload]=useState(true)
const fetchi=async()=>{
const rt=await fetch(API)
const data=await rt.json()
console.log(data.results)
const detailed=data.results.map(async(curr)=>{
  const rty=curr.url
  const first=await fetch(rty)
  const gh=await first.json()
     return gh
})
const final=await Promise.all(detailed)
newpokemon(final)
}
const enquire=(value)=>{
  const ert=set.filter((curr)=>{
  const rty=value.toLowerCase()
  if(curr.name.startsWith(rty)){
    return curr
  }
  }
  )
newmap(ert)
}
console.log(oldmap)
useEffect(()=>{
  setTimeout(() => {
    newload(false)
  },5000);
fetchi()
},[])
if(oldload){
  return <h1>LOADING.............</h1>
}
  return (
    <Fragment>  
<div class="flex justify-center">
  <h1 style={{fontSize:"30px"}}>Lets Catch Pokemon</h1>
</div>
<div class="flex justify-center"><input type='text' style={{border:"2px solid black"}} onChange={(event)=>enquire(event.target.value)}></input></div>
     <div class="flex justify-center mt-8">
     <div style={{border:"2px solid white",boxShadow: "4px 4px 0 white"}} class="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3">
      {oldmap.map((curr)=>{
        return(
<>
       <div style={{border:"2px solid black",width:"220px",backgroundColor:"yellow"}} class="mt-6 sm:ml-6">
        <div class="flex justify-center">
        <img src={curr.sprites.other.dream_world.front_default} style={{width:"150px"}}></img>
      </div>
         <div class="flex justify-center">{curr.name}</div>     
         <div class="flex justify-center"><button style={{backgroundColor:"lightgreen",borderRadius:"20px"}}>{curr.types[0].type.name}</button></div>   
       <div class="flex justify-between">
        <div>Height:{curr.height}</div>
      
<div class="">Weight:{curr.weight}</div>
       <div class="">speed:{curr.stats[5].base_stat}</div>
       </div>
    </div>
       </>
        )})}
     </div>
     </div>
    </Fragment>
    
  );
}

export default App;
