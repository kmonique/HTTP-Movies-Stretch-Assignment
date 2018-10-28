import React from "react";
import axios from "axios";

export default class MovieCreate extends React.Component {
   constructor(props){
      super(props)
      this.state = {
         title: "",
         director: "",
         metascore: 0,
         stars: [],
      }
   }

   componentDidMount() {
      axios
         .get("http://localhost:5000/api/movies")
         .then(response => console.log(response))
         .catch(err => console.log(err))
   }

   inputhandler = (e) => {
      if(e.target.name !== "stars") {
         this.setState({
            ...this.state,
            [e.target.name]: e.target.value, 
         })
      } else {
         const starsArr = []
         if(e.target.value.includes(",")){
            starsArr.push(e.target.value)
         }
         this.setState({
            [e.target.name]: starsArr
         })
         console.log(starsArr)
      }
   }
   addMovie = () => {
      axios
         .post("http://localhost:5000/api/movies", this.state)
         .then(response => console.log(response))
         .catch(err => console.log(err))
   }

   render(){
      console.log(this.state.stars)
      return(
         <form onSubmit={(e) => e.preventDefault()}>
            <input type="text" 
               placeholder="title" 
               name="title"
               // value={this.state.newMovie.title}
               onChange={this.inputhandler}/>
            <input type="text" 
               placeholder="director" 
               name="director"
               // value={this.state.newMovie.director}
               onChange={this.inputhandler}/>
            <input type="number" 
               placeholder="metascore" 
               name="metascore"
               // value={this.state.newMovie.metascore}
               onChange={this.inputhandler}/>
            <input type="text" 
               placeholder="stars" 
               name="stars"
               // value={this.state.newMovie.stars}
               onChange={this.inputhandler}/>
            <button onClick={() => this.addMovie()}>Add Movie</button>
         </form>
      )
   }
}