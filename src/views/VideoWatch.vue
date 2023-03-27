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
    <div class="Video">
      <iframe v-if="Zed != undefined || null" :src=Zed width="640" height="480" allowFullScreen="allowFullScreen" frameborder="0"> </iframe>
      <p v-else style="font-size: 50px; text-align: center;">Loading..</p>
    </div>
  </template>