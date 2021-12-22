<template>
	<div class="col-lg-10 mx-auto mt-5">
		<h2 class="display-8 fw-normal text-center mb-3">API de países</h2>
		<div class="form-outline mt-5 mb-5">
			<input
				type="search"
				class="form-control"
				placeholder="Pesquisar"
				v-model="searchValue"
				@keyup="getUniqueCountry(searchValue)"
				aria-label="Search"
			/>
		</div>
		<table class="table">
			<thead class="thead-dark">
				<th scope="col">Bandeira</th>
				<th scope="col">País</th>
				<th scope="col">Capital</th>
				<th scope="col">Nome oficial</th>
				<th scope="col">Idiomas oficiais</th>
			</thead>
			<tbody>
				<tr v-for="(c, index) in table" :key="index">
					<td>
						<img :src="c.flags.png" />
					</td>
					<td>
						<a  title="Encontrar país no Google Maps" :href="c.maps.googleMaps" target="_blank">
							{{ c.name.common }}
						</a>
					</td>
					<td v-if="c.capital ? c.capital.join() : ''">
						{{ c.capital.join() }}
					</td>
					<td>
						{{ c.name.official }}
					</td>
					<td>
						<ul>
							<li v-for="(a, index) in c.languages" :key="index">
								<a
									class="country-by-language link-info"
									title="Listar país por idioma"
									@click="getCountryByLanguage(a)"
									>{{ a }}</a
								>
							</li>
						</ul>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
export default {
	data() {
		return {
			countryList: [],
			countryUniqueList: [],
			countryLanguageList: [],
			searchValue: '',
			table: null,
			errors: [],
		};
	},
	mounted() {
		this.getAll();
	},
	methods: {
		getAll() {
			const baseData = `https://restcountries.com/v3.1/region/ame`;
			this.$http
				.get(baseData)
				.then((res) => {
					this.countryUniqueList = [];
					this.countryList = res.data;
					this.table = this.countryList;
				})
				.catch((error) => {
					this.errors = error;
					this.countryList = [];
				});
		},
		getUniqueCountry(searchValue) {
			const urlData = `https://restcountries.com/v3.1/name/${searchValue}?fullText=false`;
			this.$http
				.get(urlData)
				.then((res) => {
                    console.log(res)
					urlData;
					this.countryList = [];
					this.countryUniqueList = res.data;
					this.table = this.countryUniqueList;
				})
				.catch((error) => {
					this.getAll();
					this.countryUniqueList = [];
					this.errors = error;
				});
		},
		getCountryByLanguage(language) {
			const languageData = `https://restcountries.com/v3.1/lang/${language}`;
			this.$http
				.get(languageData)
				.then((res) => {
					this.countryList = [];
					this.countryUniqueList = [];
					this.countryLanguageList = res.data;
					this.table = this.countryLanguageList;
				})
				.catch((error) => {
					this.countryLanguageList = [];
					this.errors = error;
				});
		},
	},
};
</script>

<style>
.container {
	display: flex;
	flex-wrap: wrap;
}

table td {
	padding: 1.5rem !important;
}

table {
	text-align: center;
}

table tr td img {
	width: 120px;
}

ul li {
	list-style: none;
}

a.country-by-language {
	cursor: pointer;
}
</style>
