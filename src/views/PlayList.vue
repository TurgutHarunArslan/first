<script>
import Get from '../GetPlaylist';
export default {
  data() {
    return {
      Zed: undefined,
      list:[]
    }
  },
  created() {
    // watch the params of the route to fetch the data again
    this.$watch(
      () => this.$route.params,
      () => {
        // Get(this.$route.params.id)
        this.Zed = undefined
        this.fetchData()
      },
      // fetch the data when the view is created and the data is
      // already being observed
      { immediate: true }
    )
  },
  methods: {
    fetchData() {
      Get(this.$route.params.id).then((response) => {
        response = response.filter(n => n)
        response.forEach((element =>{
            this.list.push(element)
            console.log(this.list)
        }))
        this.Zed = response[0]['link']
    })
        },
    selectTheVid(event,link){
        if(!event.target.parentElement.classList.contains('active')){
            document.querySelectorAll('.active').forEach((element =>{element.classList.remove('active')}))
            event.target.parentElement.classList.add('active')
            this.Zed = link
        }
        console.log(event.target.parentElement)
    }
      }
    }

</script>

<template>
    <div class="Video" v-if="Zed != undefined || null">
      <iframe  :src=Zed width="100%" height="100%" allowFullScreen="allowFullScreen" frameborder="0"> </iframe>
    </div>
    <p v-else style="font-size: 50px; text-align: center;">Loading..</p>


    <div class="video-list-container" v-if="list.length > 0">
    <h1>Playlist</h1>
<div class="list" v-for="(item, index) in list" :aria-valuetext=item.link v-bind:key=item    v-bind:class="{'active': index === 0}" @click="selectTheVid($event,item.link)">
        <h3 class="list-title">{{ index }}. {{item.title}}</h3>
</div>
</div>
  </template>
<style>
/* body{
  height: 100vh;
  width: 100vw;
  overflow: hidden;
} */
.list{
    cursor: pointer;
}
.list:hover:not(.active){
    opacity: 0.6;
}
.Video{
  position: relative;
  width: 100%;
  overflow-x: hidden;
  padding-top: 40%;
}
iframe{
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 50%;
  height: 100%;
}
.active{
background-color: grey;
border-radius: 25px;
}
@media screen and (max-width: 475px) {
  iframe{
    width: 100%;
  }
  .Video{
    padding-top: 60%;
  }
  .video-list-container > h1{
    border-bottom: 1px rgba(128, 128, 128, 0.775) solid;
  }
  .video-list-container{
    background-color: rgba(128, 128, 128, 0.576);
    border-radius: 25px;
    margin-top: 20%;
    padding: 20px;
  }
}
@media screen and (min-width: 475px){

.video-list-container{
    width: 50%;
    right: 0;
    top: 15%;
    position: absolute;
}
}
</style>