

<script>
 /* eslint-disable */
// @ is an alias to /src
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// eslint-disable-next-line
import {getDatabase,get,ref, query, startAfter,child,limitToFirst,orderByChild,startAt, set} from 'firebase/database'
import {getCountFromServer,collection,getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCucqKo0ACrqf-rB4aJZnDH2LQDk2uoRU0",
  authDomain: "videowithrouter.firebaseapp.com",
  databaseURL: "https://videowithrouter-default-rtdb.firebaseio.com",
  projectId: "videowithrouter",
  storageBucket: "videowithrouter.appspot.com",
  messagingSenderId: "733614949906",
  appId: "1:733614949906:web:5dd2dba1a9619a49fefacb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app)
const dbfr = getFirestore(app)
let lastVisible = 0
// Get the last visible document
// const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
// console.log("last", lastVisible);

// // Construct a new query starting at this document,
// // get the next 25 cities.
// const next = query(collection(db, "cities"),
//     orderBy("population"),
//     startAfter(lastVisible),
//     limit(25));

export default {

  data() {
    return {
      links : [],
      count: undefined,
      loaded:false
    }
  },
  async created() {
    this.Getvids()
    fetch("https://videowithrouter-default-rtdb.firebaseio.com/vids/.json?print=pretty&shallow=true").then((response) => response.json()).then((response)=>{
      this.count = Object.keys(response).length
    })
  },
  name: 'HomeView',
  methods: {
   Getvids(){
    const first = query(ref(db, "vids"),limitToFirst(2),orderByChild('ts','desc'));
    get(first).then((snapshot =>{
      snapshot.val().forEach(element => {
        this.links.push(element)
      });
      lastVisible = snapshot.val().length-1
      console.log(lastVisible)
      this.loaded = true
    }))
  },
  LoadMore(event){
    event.target.disabled = true
    if(lastVisible < this.count){
    const next = query(ref(db, "vids"),orderByChild('ts','desc'),startAfter(lastVisible),limitToFirst(2));
    get(next).then((snapshot =>{
      var val = Object.values(snapshot.val())
      val.forEach(element => {
        setTimeout(() => {
        event.target.disabled = false
        }, 500);
        this.links.push(element)
        console.log(this.links)
      });
      lastVisible += Object.keys(snapshot.val()).length
    }))}else{console.log('no vidoe left')}
  },SrcIs(link){
    console.log(link)
    var youtube_video_id = /[^/]*$/.exec(link)[0]
    return '//img.youtube.com/vi/'+youtube_video_id+'/0.jpg'
  },whereTo(to){
    return '/vids/' + to
  }
  },
}
</script>
<template>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
  <div class="home">
    <h1>Home</h1>
    <!-- <button @click="Getvids()">Get first</button> -->
    
    <!-- <div class="Vcard" v-for="item in links">
      <RouterLink :to=whereTo(item.to)>
        <embed v-bind:src=SrcIs(item.link) style="width:500px; height: 490px;">
        </RouterLink>
        <div class="container">
          <h4><b>{{ item.title }}</b></h4>
        </div>
      </div> -->
      
      

      <p v-if="links.lengt < 0 ">Loading Video's</p>
      <div class="row g-3">
        
        <div class="col-12 col-md-6 col-lg-4 fit" v-for="item in links" style="width: fit-content;">
          <RouterLink :to=whereTo(item.to) style="text-decoration: none; color: black;">
            <div class="card">
              <img v-bind:src=SrcIs(item.link) class="card-img-top">
              <div class="card-body">
                <h5 class="card-title">{{ item.title }}</h5>
              </div>
            </div>
          </RouterLink>
        </div>
      </div>
      <button @click="LoadMore($event)" v-if="links.length < count & loaded != false">Load More</button>
    </div>
</template>


<style>
.home{
  display: flexbox;
  margin: 50px;
}
.card{
  width: 18rem;
}
.fit{
  width: fit-content;
}
</style>