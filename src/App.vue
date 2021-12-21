<template>
	<div class="container py-3">
		<Header />
	</div>
</template>

<script>
import Header from './components/Header.vue';

export default {
	name: 'App',
	components: {
		Header,
	},
};
</script>

<style>
body {
	align-items: center;
	padding-top: 40px;
	padding-bottom: 40px;
	margin: 0;
	background-color: rgb(230, 225, 225);
}
</style>
