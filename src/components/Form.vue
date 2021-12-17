<template>
<div id="main">
    <h2>Formulário</h2>
    <Form @submit="verificarFormulario" novalidate="true">
        <input type="date" v-model="bornAge" />

        <input v-model="nomeCompleto" name="nomeCompleto" placeholder="Nome completo">

        <select v-model="selectSpecie" @change="choiceSpecie">
            <option v-for="(specie,index) in species" :value="index" :key="index">{{ specie.label }}</option>
        </select>

        <select v-model="selectedOption" v-if="selectSpecie != -1">
            <option v-for="option in species[selectSpecie].options" :value="option" :key="option">{{ option }}</option>
        </select>

        <input v-model="outraRaca" v-if="selectedOption === 'Outro'"/>

        <input v-model="rendaMensal" v-on:keypress="onlyNumber" placeholder="Renda mensal">

        <input type="submit" value="Enviar">
    </Form>
    <div class="errors">
        <p v-if="errors.length">
        <b>Por favor, corrija o(s) seguinte(s) erro(s):</b>
        <ul>
            <li v-for="error in errors" :key="error">
                {{ error }}
            </li>
        </ul>
    </p>
    </div>
</div>
</template>

<script>

export default({
    data: () => ({
        errors: [],
        bornAge: new Date(),
        nomeCompleto: '',
        species:
        [
            {
                label: 'Cão',
                options:['Pastor alemão', 'Salsicha', 'Boxer', 'Vira-lata', 'Bulldog', 'Outro']
            },
            {
                label: 'Gato',
                options: ['Persa', 'Siâmes', 'Maine Coon', 'Exótico', 'Gato birmanês', 'Outro']
            },
        ],
        outraRaca: '',
        selectSpecie:-1,
        selectedOption:'',
        rendaMensal: null
    }),
    methods: {
        verificarFormulario: function(e) {
            e.preventDefault()
            this.errors = []

            if (!this.nomeCompleto) {
                this.errors.push('O nome é obrigatório')
            }

            if (!this.rendaMensal) {
                this.errors.push('A renda mensal é obrigatória')
            } else if (this.rendaMensal < 1000) {
                this.errors.push('A renda mensal deve ser acima de R$ 1.000,00')
            }

            const currentAge = this.verifyAge(this.bornAge)
            console.log(currentAge)
            if (currentAge < 18 || currentAge > 65 ) {
                this.errors.push('A idade deve ser entre 18 e 65 anos')
            }

        },
        choiceSpecie: function() {
            this.selectedOption = '';
        },
        onlyNumber: function(e) {
            e = (e) ? e : window.event;
            var charCode = (e.which) ? e.which : e.keyCode;
            if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
                e.preventDefault();
            } else {
                return true;
            }
        },
        verifyAge: (bornAge) => {
            const birthDate = new Date(bornAge);

            const difference = Date.now() - birthDate.getTime();

            const ageDate = new Date(difference);
            let calculatedAge =  Math.abs(ageDate.getUTCFullYear() - 1970);
            return calculatedAge
        }
    },
})

</script>