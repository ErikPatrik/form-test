<template>
<div>
	<div class="col-lg-6 mx-auto mt-5">
		<h2 class="display-8 fw-normal text-center mb-3">
			Gráficos informativos - Regiões do mundo
		</h2>
		<select
			v-model="region"
			@change="searchRegion"
			class="form-select"
			aria-label="Default select example"
		>
			<option selected :value="region">Selecione a região</option>
			<option v-for="region in regionList" :key="region.name">
				{{ region }}
			</option>
		</select>
    </div>
        <div>
            <apexchart
                ref="updateChart"
                type="bar"
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
			region: 'Selecione a região',
			series: [
				{
					data: [],
                    name: "Área",
				},
				{
					data: [],
                    name: "População",
				},
			],
			chartOptions: {
				chart: {
					type: 'bar',
					height: "3000",
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
					enabled: false,
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
		}
	},
	methods: {
		searchRegion() {
			if (this.chartOptions.xaxis.categories.length > 0) {
                this.chartOptions.xaxis.categories.length = 0
                this.series[0].data.length = 0
                this.series[1].data.length = 0
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
						return common.name.common
					});
                    const areas = res.data.map((a) => {
                        return a.area
                    })
                    const populations = res.data.map((pop) => {
                        return pop.population
                    })
					this.$refs.updateChart.updateOptions(
						[
							{
								data: this.chartOptions.xaxis.categories.push(
									...commons
								),
							},
						],
						false,
						true
					);
                    this.$refs.updateChart.updateOptions(
						[
							{
								data: this.series[0].data.push(
									...areas
								),
							},
						],
						false,
						true
					);
                    this.$refs.updateChart.updateOptions(
						[
							{
								data: this.series[1].data.push(
									...populations
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

<style>
</style>