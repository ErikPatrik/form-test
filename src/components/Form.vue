<template>
    <div id="main">
        <div class="container">
        <h2>1ª Etapa - Formulário com validações</h2>
            <form @submit="verificarFormulario" novalidate="true" class="col-12">
                <div class="form-floating mb-3">
                    <input type="date" v-model="form.bornAge" class="form-control" id="floatingInput"/>
                    <label for="floatingInput">Data de nascimento</label>
                </div>

                <div class="form-floating mb-3">
                    <input v-model="form.nomeCompleto" placeholder="Nome completo" id="floatingInput" class="form-control" name="nomeCompleto">
                    <label for="floatingInput">Nome completo</label>
                    <small id="name-error"></small>
                </div>

                <div class="form-floating mb-3">
                    <input v-model="form.cpf" placeholder="CPF" v-mask="'###.###.###-##'" id="floatingInput" class="form-control" name="cpf">
                    <label for="floatingInput">CPF</label>
                    <small id="cpf-error"></small>
                </div>

                <select class="form-control mb-3 form-control-lg" data-width="fit" v-model="form.selectSpecie" @change="choiceSpecie">
                    <option v-for="(specie,index) in form.species" :value="index" :key="index">{{ specie.label }}</option>
                </select>

                <select class="form-select mb-3 form-control-lg" data-width="fit" v-model="form.selectedOption" v-if="form.selectSpecie != -1">
                    <option v-for="option in form.species[form.selectSpecie].options" :value="option" :key="option">{{ option }}</option>
                    <small id="specie-error"></small>
                </select>

                <div class="form-floating mb-3">
                    <input v-model="form.outraRaca" placeholder="Informe outra raça" id="floatingInput" class="form-control" v-if="form.selectedOption === 'Outro'"/>
                    <label for="floatingInput">Informe outra raça</label>

                </div>

                <div class="form-floating mb-3">
                    <input v-model="form.rendaMensal" v-on:keypress="onlyNumber" placeholder="Renda mensal" id="floatingInput" class="form-control">
                    <label for="floatingInput">Renda mensal</label>
                    <small id="renda-error"></small>
                </div>

                <div class="form-floating mb-3">
                    <input type="text" v-model="form.cep" v-mask="'#####-###'" @keyup="searchCep()" placeholder="CEP" id="floatingInput" class="form-control">
                    <label for="floatingInput">CEP</label>
                    <small id="cep-error"></small>
                </div>

                <div class="form-floating mb-3">
                    <input type="text" v-model="form.logradouro" placeholder="Logradouro" id="floatingInput" class="form-control">
                    <label for="floatingInput">Logradouro</label>
                    <small id="logradouro-error"></small>
                </div>

                <div class="form-floating mb-3">
                    <input type="text" v-model="form.bairro" placeholder="Bairro" id="floatingInput" class="form-control">
                    <label for="floatingInput">Bairro</label>
                    <small id="bairro-error"></small>
                </div>

                <div class="form-floating mb-3">
                    <input type="text" v-model="form.cidade" placeholder="Cidade" id="floatingInput" class="form-control">
                    <label for="floatingInput">Cidade</label>
                    <small id="cidade-error"></small>
                </div>

                <div class="form-floating mb-3">
                    <input type="text" v-model="form.uf" placeholder="UF" id="floatingInput" class="form-control">
                    <label for="floatingInput">UF</label>
                    <small id="uf-error"></small>
                </div>

                <button type="submit" class="w-100 btn btn-lg btn-primary">Enviar</button>
            </form>

            <!-- <div class="" v-if="validate">
                <h3>Informações do formulário</h3>
                <ul>
                    <li>Data de nascimento: {{form.bornAge}}</li>
                    <li>Nome completo: {{form.nomeCompleto}}</li>
                    <li>CPF: {{form.cpf}}</li>
                    <li>Renda mensal: {{form.rendaMensal}}</li>
                    <li>CEP: {{form.cep}}</li>
                    <li>Logradouro: {{form.logradouro}}</li>
                    <li>Bairro: {{form.bairro}}</li>
                    <li>Cidade: {{form.cidade}}</li>
                    <li>UF: {{form.uf}}</li>
                </ul>
            </div> -->
        </div>
    </div>
</template>

<script>

import { validateCPF , verifyAge } from '../functions/form-functions'

export default({
    data: () => ({
        errors: [],
        validate: false,
        form: {
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
        }
    }),
    methods: {
        verificarFormulario: function(e) {
            e.preventDefault()
            this.errors = []

            if (!this.form.nomeCompleto) document.getElementById('name-error').innerHTML = 'Campo obrigatório', this.errors.push('name-error')

            if (!this.form.rendaMensal) document.getElementById('renda-error').innerHTML = 'Campo obrigatório', this.errors.push('renda-error')
            else if (this.form.rendaMensal < 1000) document.getElementById('renda-error').innerHTML = 'A renda mensal deve ser acima de R$ 1.000,00', this.errors.push('name-error')

            if (this.form.bornAge) {
                const age = verifyAge(this.form.bornAge)

                if (age < 18 || age > 65 ) {
                    this.errors.push('A idade deve ser entre 18 e 65 anos'), this.errors.push('date-error')
                }
            } else {
                this.errors.push('A data de nascimento deve ser informada'), this.errors.push('date-error')
            }

            if (this.form.cpf) {
                let formatterCpf = this.form.cpf.replace(/[^\d]+/g,'')
                const checkCPF = validateCPF(formatterCpf)
                if (!checkCPF) {
                    document.getElementById('cpf-error').innerHTML = 'O CPF informado não é válido', this.errors.push('cpf-error')
                }
            } else {
                document.getElementById('cpf-error').innerHTML = 'Campo obrigatório', this.errors.push('cpf-error')
            }

            if (!this.form.cep) document.getElementById('cep-error').innerHTML = 'Campo obrigatório', this.errors.push('cep-error')

            if (!this.form.logradouro) document.getElementById('logradouro-error').innerHTML = 'Campo obrigatório', this.errors.push('logradouro-error')
            if (!this.form.bairro) document.getElementById('bairro-error').innerHTML = 'Campo obrigatório', this.errors.push('bairro-error')
            if (!this.form.cidade) document.getElementById('cidade-error').innerHTML = 'Campo obrigatório', this.errors.push('cidade-error')
            if (!this.form.uf) document.getElementById('uf-error').innerHTML = 'Campo obrigatório', this.errors.push('uf-error')

            if (this.errors.length === 0) {
                this.$router.Push("/contact")
            }
        },
        choiceSpecie: function() {
            this.form.selectedOption = '';
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
            let formatterCep = this.form.cep.replace(/[^\d]+/g,'')
            if (formatterCep.length === 8) {
                const baseData = `https://viacep.com.br/ws/${ this.form.cep }/json/`
				this.$http.get(baseData)
                .then((res) => {
                    this.form.data = res.data
                    this.form.logradouro = res.data.logradouro
                    this.form.bairro = res.data.bairro
                    this.form.cidade = res.data.localidade
                    this.form.uf = res.data.uf
                })
				.catch( error => console.log(error) )
			}
		},
    },
    watch: {
        cep: function (newCEP) {
            let formatterNewCep = newCEP.replace(/[^\d]+/g,'')
            if (formatterNewCep.length === 8) this.form.searchCep()
            else this.form.data = null
        }
    },
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