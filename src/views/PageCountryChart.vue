<template>
	<section class="container">
		<CountryChart />
	</section>
</template>

<script>
import CountryChart from '../components/CountryChart.vue';

export default {
	name: 'PageCountryChart',
	components: {
		CountryChart,
	},
};
</script>
