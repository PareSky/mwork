<template>
  <div class='loading'>
	  <div class='ball-holder b1'>
	  	<div class='small-ball'></div>
	  </div>
	  <div class='ball-holder b2'>
	  	<div class='small-ball'></div>
	  </div>
	  <div class='ball-holder b3'>
	  	<div class='small-ball'></div>
	  </div>
	  <div class='ball-holder b4'>
	  	<div class='small-ball'></div>
	  </div>
 </div>
</template>


<script>
  export default {
    name: 'loading',
    props: [''],
    data () {
      return {
      // msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.loading{
	position: relative;
	display: flex;
    justify-content: center;
}
.ball-holder{
	position: absolute;
	width: 2rem;
	height: 2rem;
	animation: rollball 2s linear infinite;
}
.small-ball{
	position: absolute;
	background:#0ff;
	width: 0.3rem;
	height: 0.3rem;
	top: 0.3rem;
	left: 0.8rem;
	border-radius: 50%;
	animation: jump 0.5s ease-out 0s infinite alternate;
}
.b1{
	animation-delay:-1.5s;
}
.b2{
	animation-delay:-1s;
}
.b3{
	animation-delay:-0.5s;
}
.b4{
	animation-delay:0s;
}
@keyframes rollball{
	form{transform:rotate(0deg)}
	to{transform:rotate(360deg)}
}
@keyframes jump{
	from{transform:translateY(-0.6rem)}
	to{transform:translateY(0.2rem)}
}
</style>