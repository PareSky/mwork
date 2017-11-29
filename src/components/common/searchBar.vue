<template>
		<div class='searchItem'>
			<input v-model='inputVal'></input>
			<div class='search-btn' @click="search">
				<Icon type="ios-search" class='searchB'></Icon>
			</div>
		</div>
</template>


<script>
	export default {
		name: 'searchItem',
		props: [''],
		data () {
			return {
				inputVal:''
			}
		},
		methods:{
			search:function(){
				this.$emit('search',this.inputVal);
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

	.searchItem{
		display: flex;
		align-items: center;
		height: 1.5rem;
	}
	.searchItem img{
		margin: 0.2rem;
		vertical-align: middle;
	}
	.searchItem .search-btn{
		height: 1rem;
		width: 2rem;
		background: white;
		border-radius: 0 0.2rem 0.2rem 0 ;
	}
	.searchItem input{
		height: 1rem;
		border-radius:  0.2rem 0 0 0.2rem;
		box-sizing: border-box;
		padding-left: 2%;
		border: none;
		outline: none;
		font-size: 0.5rem;
	}
  .searchB{
    font-size: 1rem;
  }
</style>