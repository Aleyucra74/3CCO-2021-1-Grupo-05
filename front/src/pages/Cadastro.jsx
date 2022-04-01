import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';

import NavBar from '../components/NavBar';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import api from '../api';
import axios from 'axios';

import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../styles/cadastro.css';

const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/

const validations = yup.object().shape({
    nome: yup.string()
        .min(3, "Nome muito curto, mínimo de 3 caracteres")
        .max(50, "Nome muito grande, máximo 50 caracteres")
        .required("O nome é obrigatório"),
    email: yup.string()
        .email('Email inválido')
        .required('O email é obrigatório'),
    telefone: yup.string()
        .required("O telefone é obrigatório").matches(phoneRegExp, 'Número inválido'),
    cep: yup.string()
        .min(8, "O CEP está errado")
        .required('O CEP é obrigatório'),
    senha: yup.string()
        .min(6, "A senha deve ter pelo menos 6 caracteres")
        .required('A senha é obrigatória'),
    confirmarSenha: yup.string()
    .test("confirmarSenha", "As senhas não são iguais",
          function (value) {
            return this.parent.senha === value;
          })
    .required('Confirmar senha é obrigatório'),
})

function Cadastro() {

    const notificaErro = () => toast.error(
            'Erro ao cadastrar, tente novamente', {
            poition: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            className: "error-toast"
            }
    );

    const history = useHistory();

    const [formData, setFormData] = useState({
        nome: "",
        email: "",
        cep: "",
        senha: "",
        telefone:""
    })

    const initialData = {}
    const {cep} = formData;

    const handleOnChange = e => {
        const newForm = { ...formData }
        newForm[e.target.id] = e.target.value;
        setFormData(newForm);
        console.log(newForm);
    }

    // FAZ A CONSULTA NO BANCO LOCAL DO CEP - SE NAO EXISTIR
    // RETORNA O COD:400 E VAI PARA A OUTRA FUNCAO
    const getCepLocal = async () => {
      const response = await api.get(`/localizacoes/cep?cep=${cep}`).catch(
          function(error){
              if(error.response){ return error.response; }
          }
      );
      if(response.status === 200){
          return response.data;
      }else{
          return getCepApi();        
      }
  }

  //ESSA FUNCAO PEGA O CEP LOCAL E FAZ A CONSULTA NA API
  //DEPOIS DE TER OS DADOS CADASTRA O NECESSARIO NO NOSSO BANCO
  const getCepApi = async () => {
      const responseDois = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

      var cepComHifen = responseDois.data.cep;

      var cepSemHifen = cepComHifen.replace("-","");

      const resposta = await api.post("/localizacoes/",{
          cidade: responseDois.data.localidade,
          uf: responseDois.data.uf,   
          cep: cepSemHifen,
      });
      return resposta.data;
  }

    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(validations)
    });

    async function enviar(e) {
      const cepLocal = await getCepLocal();
      const {nome,email,senha,telefone} = formData;
      const { idLocalizacao } = cepLocal;

      await api.post("/usuarios/", {
          nome: nome,
          email: email,
          senha: senha,
          telefone: telefone,
          localizacao: {
              idLocalizacao,
          },
        }).then((resposta) => {
            console.log("ok", resposta);
            if(resposta.status === 201){
                alert("usuário criado com sucesso");
                history.push("/login");
            }
        }).catch(e => {
            if(e.response.status !== 201){
                notificaErro()
            }
        }) 

    }

    return (
        <>
        <ToastContainer></ToastContainer>
            <NavBar/>
            <div className="container">
                <section className="section-cadastro">
                    <div className="div-cadastro">
                        <div className="div-titulo">
                            <h2>CADASTRE-SE</h2>
                        </div>
                        <form onSubmit={handleSubmit((e) => enviar(e))}>

                          <h2 className="input-h2">Nome Completo:</h2>
                          <input 
                            id="nome"
                            className="input-label"
                            placeholder="Nome Completo" 
                            {...register("nome")}
                            onChange={(e) => handleOnChange(e)} 
                          />
                          <p className="input-errors">{errors.nome?.message}</p>

                          <h2 className="input-h2">E-mail:</h2>
                          <input 
                            id="email"
                            className="input-label"
                            placeholder="Ex.: email@hireit.com"
                            {...register("email")}
                            onChange={(e) => handleOnChange(e)} 
                          />
                          <p className="input-errors">{errors.email?.message}</p>

                          <h2 className="input-h2">Telefone:</h2>
                          <input 
                            id="telefone"
                            className="input-label"
                            placeholder="Ex.: 00000-0000"
                            {...register("telefone")}
                            onChange={(e) => handleOnChange(e)} 
                          />
                          <p className="input-errors">{errors.telefone?.message}</p>

                          <h2 className="input-h2">CEP:</h2>
                          <input 
                            id="cep"
                            className="input-label"
                            placeholder="Ex.: 00.000-000"
                            {...register("cep")}
                            onChange={(e) => handleOnChange(e)} 
                          />
                          <p className="input-errors">{errors.cep?.message}</p>

                          <h2 className="input-h2">Senha:</h2>
                          <input 
                            id="senha"
                            type="password"
                            className="input-label"
                            placeholder="Ex.: **********"
                            {...register("senha")}
                            onChange={(e) => handleOnChange(e)} 
                          />
                          <p className="input-errors">{errors.senha?.message}</p>

                          <h2 className="input-h2">Confirmar senha:</h2>
                          <input 
                            id="confirmarSenha"
                            type="password"
                            className="input-label"
                            placeholder="Ex.: **********"
                            {...register("confirmarSenha")}
                            onChange={(e) => handleOnChange(e)} 
                          />
                          <p className="input-errors">{errors.confirmarSenha?.message}</p>

                          <Button 
                            classname="button-cadastrar" 
                            title="Cadastrar"
                            linkTo="/search-projects"
                            tipo="submit"
                            onClick={handleSubmit((e) => enviar(e))}
                          />
                        </form>
                    </div>
                </section>
                <section className="section-texto">
                    <h2>HIRE-IT</h2>
                    <p>
                        A HIRE-IT ajuda você a encontrar sua empresa ou freelancer ideal. <br />
                        Faça o cadastro para ter acesso ao nosso
                        <span id="Txtagora"> Teste de Personalidade</span> exclusivo, para melhorar cada vez mais sua experiência!</p>
                </section>
            </div>
        </>
    )
}

export default Cadastro;