import React , {useState , useEffect} from "react";
import axios from "axios";
import './App.css';


function Userscard(setusersinfo){
   return <div>
   <p>name={userinfo.name}</p>
   <p>dob={userinfo.dob} </p>
    </div>
}


function App() {
  const [name , setname] = useState("");
  const [ userdate , setuserdate ] = useState("");
  const [detailsname , setdetailsname] = useState("")
  const [detailsdob , setdetailsdob] = useState("")
  const [usersinfo , setusersinfo] = useState("")

useEffect(()=>{
  if(detailsname !== ""){
    axios.get("http://localhost:3000/allusers")
    .then(res=>{
      console.log(res);
      setusersinfo(res.data)
    }).catch((err)=>{
      if(err){
        console.log(err)
      }
    })
  }
}, [detailsname])


function handlename(e){
  setname(e.target.value)
}

function userdob(e){
  setuserdate(e.target.value)
}

function handleChange(e){
  e.preventDefault();
 let data = {
   name : name,
   dateofbirth : userdate
 }
 axios.post("http://localhost:3000/addusers" , data)
 .then(res=>{
   if(res){
  setdetailsname(res.data.name);
  console.log(res.data);
   } else {
     res.send("something went wrong")
   }
 })

}




  return (
    <div className="App">
     <div>
    <form className="" onSubmit={handleChange} action="" method="">
      <label for="">Enter Name:</label> <br />
      <input type="text" name="" value={name} onChange={handlename} /> <br />
      <label for="">Date-Of-Birth</label> <br />
      <input type="date" name="" value={userdate} onChange={userdob} /> <br />
      <button type="submit" name="button">Click me to submit</button>
    </form>
    </div>



<div>
   <p>{detailsname}</p>
   <p>{detailsdob}</p>
   <p>{usersinfo.map(Userscard)}</p>
    </div>




    </div>
  );
}

export default App;
