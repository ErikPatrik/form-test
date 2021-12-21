<template>
	<div class="col-lg-6 mx-auto mt-5">
		<h2 class="display-8 fw-normal text-center mb-3">
			Gráficos informativos - Regiões do mundo
		</h2>
		<span>Escolha a região </span>
		<select
			v-model="region"
			@change="searchRegion"
			class="form-select"
			aria-label="Default select example"
		>
			<option selected value="Selecione">Selecione</option>
			<option v-for="region in regionList" :key="region.name">
				{{ region }}
			</option>
		</select>
		<div>
			<apexchart
				ref="updateChart"
				type="bar"
				height="430"
				:options="chartOptions"
				:series="series"
			></apexchart>
		</div>
	</div>
</template>

<script>
export default {
	data: function () {
		return {
			errors: [],
			regionList: ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'],
			region: 'Selecione',
			series: [
				{
					data: [44, 55, 41, 64, 22, 43, 21],
				},
				{
					data: [53, 32, 33, 52, 13, 44, 32],
				},
			],
			chartOptions: {
				chart: {
					type: 'bar',
					height: 430,
				},
				plotOptions: {
					bar: {
						horizontal: true,
						dataLabels: {
							position: 'top',
						},
					},
				},
				dataLabels: {
					enabled: true,
					offsetX: -6,
					style: {
						fontSize: '12px',
						colors: ['#fff'],
					},
				},
				stroke: {
					show: true,
					width: 1,
					colors: ['#fff'],
				},
				tooltip: {
					shared: true,
					intersect: false,
				},
				xaxis: {
					categories: [],
				},
			},
		};
	},
	methods: {
		searchRegion() {
			if (this.chartOptions.xaxis.categories.length > 0) {
				this.chartOptions.xaxis.categories.pop();
			}
			let reg = this.region;
			this.$emit('region', reg);
			this.getRegionData(reg);
		},
		getRegionData(reg) {
			const baseData = `https://restcountries.com/v3.1/region/${reg}`;
			this.$http
				.get(baseData)
				.then((res) => {
					const commons = res.data.map((common) => {
						return common.name.common;
					});
					this.$refs.updateChart.updateOptions(
						[
							{
								data: this.chartOptions.xaxis.categories.push(
									commons
								),
							},
						],
						false,
						true
					);
				})
				.catch((error) => {
					this.errors = error;
				});
		},
	},
};
</script>
