<template>
	<section class="container">
		<CountryApi />
	</section>
</template>

<script>
import CountryApi from '../components/CountryApi.vue';

export default {
	name: 'PageCountry',
	components: {
		CountryApi,
	},
};
</script>
