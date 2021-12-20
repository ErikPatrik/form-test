<template>
    <div id="app">
        <div id="nav">
            <router-link to="/">Home</router-link>
            <router-link to="/PageForm">1ª Etapa - Formulário</router-link>
            <router-link to="/PageCountry">2ª Etapa - API de Países</router-link>
            <router-link to="/PageCountryChart">3ª Etapa - Gráficos comparativos de países</router-link>
        </div>
        <router-view />
    </div>
</template>

<script>

export default {
    name: 'App',
}
</script>

<style>
body  {
    align-items: center;
    padding-top: 40px;
    padding-bottom: 40px;
}
</style>
