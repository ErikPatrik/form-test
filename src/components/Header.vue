<template>
	<header class="container py-6">
		<div class="container py-6">
			<a
				href="/"
				class="d-flex align-items-center text-dark text-decoration-none"
			>
				<img
					src="https://suthub.com/wp-content/uploads/2021/09/LogoSite1-300x45.png"
					alt="Teste - Erik Patrik Pittaluga"
					tile="Teste - Erik Patrik Pittaluga"
				/>
			</a>
			<nav class="d-inline-flex mt-2 mt-md-0 ms-md-auto">
				<router-link
					class="me-3 py-2 text-dark text-decoration-none"
					to="/"
					>Home</router-link
				>
				<router-link
					class="me-3 py-2 text-dark text-decoration-none"
					to="/PageForm"
					>Formulário</router-link
				>
				<router-link
					class="me-3 py-2 text-dark text-decoration-none"
					to="/PageCountry"
					>API de Países</router-link
				>
				<router-link
					class="me-3 py-2 text-dark text-decoration-none"
					to="/PageCountryChart"
					>Gráficos comparativos de países</router-link
				>
			</nav>
		</div>
		<router-view />
	</header>
</template>

<script>
export default {
	name: 'header',
};
</script>
