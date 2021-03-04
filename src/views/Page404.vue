<template>
  <div id='page404'>
    <vue-particles
        color="#444444"
        :particleOpacity="0.7"
        :particlesNumber="50"
        shapeType="circle"
        :particleSize="3"
        linesColor="#E6E6FA"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.6"
        :linesDistance="150"
        :moveSpeed="6"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
    >
    </vue-particles>
  </div>
</template>

<script>
export default {
  name: "page404",
  data() {
  }
}
</script>

<style scoped>
#page404{
  background: url("../assets/image/404.png") fixed no-repeat top;
  background-size: cover;
  height: 100%;
  width: 100%;
  position: fixed;
  overflow: scroll;
}
</style>