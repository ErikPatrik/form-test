<template>
    <div>
        <Header/>
        <router-view />
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
	padding-top: 20px;
	padding-bottom: 20px;
	margin: 0;
	background-color: rgb(230, 225, 225);
}
</style>
