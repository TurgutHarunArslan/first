<script>
import Get from '../GetData';
export default {
  data() {
    return {
      Zed: undefined,
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
    this.Zed = response['link']
    })
        }
      }
    }

</script>

<template>
    <div class="Video" v-if="Zed != undefined || null">
      <iframe  :src=Zed width="100%" height="100%" allowFullScreen="allowFullScreen" frameborder="0"> </iframe>
    </div>
    <p v-else style="font-size: 50px; text-align: center;">Loading..</p>
  </template>
<style>
/* body{
  height: 100vh;
  width: 100vw;
  overflow: hidden;
} */
.Video{
  position: relative;
  width: 100%;
  overflow-x: hidden;
  padding-top: 45%;
}
iframe{
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
}
@media screen and (max-width: 475px) {
  iframe{
    width: 100%;
  }
  .Video{
    padding-top: 60%;
  }
}
</style>