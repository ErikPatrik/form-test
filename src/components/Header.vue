<template>
	<header class="container py-6">
		<div class="container py-6">
			<a
				href="/"
				class="d-flex align-items-center text-dark text-decoration-none"
			>
				<img
					src="https://cdn-icons-png.flaticon.com/512/25/25231.png" style="width: 80px;"
					alt="Teste - Erik Patrik Pittaluga"
					tile="Teste - Erik Patrik Pittaluga"
				/>
			</a>
			<nav class="d-inline-flex mt-2 mt-md-0 ms-md-auto pt-4">
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
					>API de países</router-link
				>
				<router-link
					class="me-3 py-2 text-dark text-decoration-none"
					to="/PageCountryChart"
					>API de países - Gráficos</router-link
				>
			</nav>
		</div>
	</header>
</template>

<script>
export default {
};
</script>
