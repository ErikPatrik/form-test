<template>
    <div id="main">
        <div class="container">
        <h2>1ª Etapa - Formulário com validações</h2>
            <form @submit="verificarFormulario" novalidate="true" class="col-12">
                <div class="form-floating mb-3">
                    <input type="date" v-model="bornAge" class="form-control" id="floatingInput"/>
                    <label for="floatingInput">Data de nascimento</label>
                </div>

                <div class="form-floating mb-3">
                    <input v-model="nomeCompleto" placeholder="Nome completo" id="floatingInput" class="form-control" name="nomeCompleto">
                    <label for="floatingInput">Nome completo</label>
                    <small id="name-error"></small>
                </div>

                <div class="form-floating mb-3">
                    <input v-model="cpf" placeholder="CPF" v-mask="'###.###.###-##'" id="floatingInput" class="form-control" name="cpf">
                    <label for="floatingInput">CPF</label>
                    <small id="cpf-error"></small>
                </div>

                <select class="form-control mb-3 form-control-lg" data-width="fit" v-model="selectSpecie" @change="choiceSpecie">
                    <option v-for="(specie,index) in species" :value="index" :key="index">{{ specie.label }}</option>
                </select>

                <select class="form-select mb-3 form-control-lg" data-width="fit" v-model="selectedOption" v-if="selectSpecie != -1">
                    <option v-for="option in species[selectSpecie].options" :value="option" :key="option">{{ option }}</option>
                    <small id="specie-error"></small>
                </select>

                <div class="form-floating mb-3">
                    <input v-model="outraRaca" placeholder="Informe outra raça" id="floatingInput" class="form-control" v-if="selectedOption === 'Outro'"/>
                    <label for="floatingInput">Informe outra raça</label>

                </div>

                <div class="form-floating mb-3">
                    <input v-model="rendaMensal" v-on:keypress="onlyNumber" placeholder="Renda mensal" id="floatingInput" class="form-control">
                    <label for="floatingInput">Renda mensal</label>
                    <small id="renda-error"></small>
                </div>

                <div class="form-floating mb-3">
                    <input type="text" v-model="cep" v-mask="'#####-###'" @keyup="searchCep()" placeholder="CEP" id="floatingInput" class="form-control">
                    <label for="floatingInput">CEP</label>
                    <small id="cep-error"></small>
                </div>

                <div class="form-floating mb-3">
                    <input type="text" v-model="logradouro" placeholder="Logradouro" id="floatingInput" class="form-control">
                    <label for="floatingInput">Logradouro</label>
                    <small id="logradouro-error"></small>
                </div>

                <div class="form-floating mb-3">
                    <input type="text" v-model="bairro" placeholder="Bairro" id="floatingInput" class="form-control">
                    <label for="floatingInput">Bairro</label>
                    <small id="bairro-error"></small>
                </div>

                <div class="form-floating mb-3">
                    <input type="text" v-model="cidade" placeholder="Cidade" id="floatingInput" class="form-control">
                    <label for="floatingInput">Cidade</label>
                    <small id="cidade-error"></small>
                </div>

                <div class="form-floating mb-3">
                    <input type="text" v-model="uf" placeholder="UF" id="floatingInput" class="form-control">
                    <label for="floatingInput">UF</label>
                    <small id="uf-error"></small>
                </div>

                <button type="submit" class="w-100 btn btn-lg btn-primary">Enviar</button>
            </form>

            <div class="" v-if="validate">
                <h3>Informações do formulário</h3>
                <ul>
                    <li>Data de nascimento: {{bornAge}}</li>
                    <li>Nome completo: {{nomeCompleto}}</li>
                    <li>CPF: {{cpf}}</li>
                    <li>Animal de estimação: {{specie}}</li>
                    <li>Raça: {{selectSpecie}}</li>
                    <li>Renda mensal: {{outraRaca}}</li>
                    <li>CEP: {{outraRaca}}</li>
                    <li>Logradouro: {{logradouro}}</li>
                    <li>Bairro: {{bairro}}</li>
                    <li>Cidade: {{cidade}}</li>
                    <li>UF: {{uf}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>

import { validateCPF , verifyAge } from '../functions/form-functions'

export default({
    data: () => ({
        errors: [],
        validate: false,
        bornAge: new Date(),
        nomeCompleto: '',
        cpf: null,
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
        selectSpecie: -1,
        selectedOption: '',
        rendaMensal: null,
        cep: null,
        data: null,
        messageCep: null,
        logradouro: null,
        bairro: null,
        cidade: null,
        uf: null
    }),
    methods: {
        verificarFormulario: function(e) {
            e.preventDefault()
            this.errors = []

            if (!this.nomeCompleto) document.getElementById('name-error').innerHTML = 'Campo obrigatório', this.errors.push('name-error')

            if (!this.rendaMensal) document.getElementById('renda-error').innerHTML = 'Campo obrigatório', this.errors.push('renda-error')
            else if (this.rendaMensal < 1000) document.getElementById('renda-error').innerHTML = 'A renda mensal deve ser acima de R$ 1.000,00', this.errors.push('name-error')

            if (this.bornAge) {
                const age = verifyAge(this.bornAge)

                if (age < 18 || age > 65 ) {
                    this.errors.push('A idade deve ser entre 18 e 65 anos'), this.errors.push('date-error')
                }
            } else {
                this.errors.push('A data de nascimento deve ser informada'), this.errors.push('date-error')
            }

            if (this.cpf) {
                let formatterCpf = this.cpf.replace(/[^\d]+/g,'')
                const checkCPF = validateCPF(formatterCpf)
                if (!checkCPF) {
                    document.getElementById('cpf-error').innerHTML = 'O CPF informado não é válido', this.errors.push('cpf-error')
                }
            } else {
                document.getElementById('cpf-error').innerHTML = 'Campo obrigatório', this.errors.push('cpf-error')
            }

            if (!this.cep) document.getElementById('cep-error').innerHTML = 'Campo obrigatório', this.errors.push('cep-error')

            if (!this.logradouro) document.getElementById('logradouro-error').innerHTML = 'Campo obrigatório', this.errors.push('logradouro-error')
            if (!this.bairro) document.getElementById('bairro-error').innerHTML = 'Campo obrigatório', this.errors.push('bairro-error')
            if (!this.cidade) document.getElementById('cidade-error').innerHTML = 'Campo obrigatório', this.errors.push('cidade-error')
            if (!this.uf) document.getElementById('uf-error').innerHTML = 'Campo obrigatório', this.errors.push('uf-error')

            if (this.errors.length === 0) {
                this.validate = true
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
        searchCep() {
            let formatterCep = this.cep.replace(/[^\d]+/g,'')
            if (formatterCep.length === 8) {
                const baseData = `https://viacep.com.br/ws/${ this.cep }/json/`
				this.$http.get(baseData)
                .then((res) => {
                    this.data = res.data
                    this.logradouro = res.data.logradouro
                    this.bairro = res.data.bairro
                    this.cidade = res.data.localidade
                    this.uf = res.data.uf
                })
				.catch( error => console.log(error) )
			}
		},
    },
    watch: {
        cep: function (newCEP) {
            let formatterNewCep = newCEP.replace(/[^\d]+/g,'')
            if (formatterNewCep.length === 8) this.searchCep()
            else this.data = null
        }
    }
})

</script>

<style>
.form-signin {
    width: 100%;
    max-width: 430px;
    padding: 15px;
    margin: auto;
}

small {
    color: rgb(188, 32, 32);
    font-style: italic;
}
</style>