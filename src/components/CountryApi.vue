<template>
    <div class="container mt-5">
        <h2>2ª Etapa - API de Países e suas informações</h2>
        <input
            placeholder="Busque por um país"
            v-model="searchValue"
            @keyup="getUniqueCountry(searchValue)"
        >
        <table>
            <thead>
                <th>Bandeira</th>
                <th>País</th>
                <th>Capital</th>
                <th>Nome correto</th>
                <th>Idiomais oficiais</th>
            </thead>
            <tbody>
                <tr v-for="(c, index) in table" :key="index">
                    <td>
                        <img :src="c.flags.png">
                    </td>
                    <td>
                        <a title="Encontrar país no Google Maps" :href="'https://www.google.com.br/maps/place/'+c.name.common" target="_blank">
                        {{c.name.common}}
                        </a>
                    </td>
                    <td>
                        {{c.capital}}
                    </td>
                    <td>
                        {{c.name.common}}
                    </td>
                    <td>
                        <ul>
                            <li v-for="(a, index) in c.languages" :key="index">
                                <a title="Listar país por idioma" @click="getCountryByLanguage(a)">{{a}}</a>
                            </li>
                        </ul>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>

export default({
    data() {
        return {
            countryList: [],
            countryUniqueList: [],
            countryLanguageList: [],
            searchValue: '',
            table: null,
            errors: []
        }
    },
    mounted() {
        this.getAll()
    },
    methods: {
        getAll() {
            const baseData = `https://restcountries.com/v3.1/region/ame`
            this.$http.get(baseData)
            .then(res => {
                this.countryUniqueList = []
                this.countryList = res.data;
                this.table = this.countryList
            })
            .catch(error => {
                this.errors = error
                this.countryList = []
            });
        },
        getUniqueCountry(searchValue) {
            const urlData = `https://restcountries.com/v3.1/name/${searchValue}?fullText=false`
            this.$http.get(urlData)
            .then(res => {urlData
                this.countryList = []
                this.countryUniqueList = res.data
                this.table = this.countryUniqueList
            })
            .catch(error => {
                this.getAll()
                this.countryUniqueList = []
                this.errors = error
            });
        },
        getCountryByLanguage(language) {
            const languageData = `https://restcountries.com/v3.1/lang/${language}`
            this.$http.get(languageData)
            .then((res) => {
                this.countryList = []
                this.countryUniqueList = []
                this.countryLanguageList = res.data
                this.table = this.countryLanguageList
            })
            .catch((error) => {
                this.countryLanguageList = []
                this.errors = error
            })
        }
    },
})

</script>

<style>
.container {
    display: flex;
    flex-wrap: wrap;
}
</style>