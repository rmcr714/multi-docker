import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Fib = ()=> {
  


  const [seenIndexes,setSeenIndexes] = useState([])
  const [values,setValues] = useState({})
  const[index,setIndex] = useState('')

  useEffect(()=>{
   fetchValues()
   fetchIndexes() 
  },[])

  const fetchValues=async()=> {
    const values = await axios.get('/api/values/current');
    console.log('fetched values---->',values.data)
  setValues(values.data)
  }

  const fetchIndexes=async()=> {
    const seenIndexes = await axios.get('/api/values/all');
    console.log('seenIndexes------>',seenIndexes.data)
    setSeenIndexes(seenIndexes.data)
  }

 const  handleSubmit = async (event) => {
    event.preventDefault();

    await axios.post('/api/values', {
      index: index,
    });
   setIndex('')
  };

// const  renderSeenIndexes =()=> {
//     return seenIndexes.map(({ number }) => number).join(', ');
//   }

const  renderValues=async()=> {
    const entries = [];

    for (let key in values) {
      entries.push(
        <div key={key}>
          For index {key} I calculated {values[key]}
        </div>
      );
    }

    return entries;
  }

  
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <label>Enter your index:</label>
          <input
            value={index}
            onChange={(event) => setIndex(event.target.value)}
          />
          <button>Submit</button>
        </form>

        <h3>Indexes I have seen:</h3>
        {seenIndexes.length>0?seenIndexes.map((data)=>(
          <span>{data.number+","}</span>
        )):<div>No calculated values till now</div>}
      

        <h3>Calculated Values:</h3>
        {values==={}?<div>Processing...</div>:Object.keys(values).map((key)=><div>for index {key}| calculcated value: &nbsp; {values[key]}</div>)}
        
      </div>
    );
  
}

export default Fib;
