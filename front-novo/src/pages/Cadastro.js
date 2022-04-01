import '../assets/styles/global.css'
import '../assets/styles/cadastro.css'
import 'react-toastify/dist/ReactToastify.css';

import logo from '../assets/img/logo.png'

import axios from 'axios';
import api from '../api';

import { ToastContainer, toast } from 'react-toastify';
import Input from "@material-tailwind/react/Input";
import Select from "../components/select/Select"

export default function Cadastro(){
    let numVetor = Math.floor(Math.random() * 3) + 1;
    let vetorEstados = ["UF", "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MG", "PA", "PB", "PE", "PI", "PR", "RJ", "RN", "RS", "RR", "SC", "SE", "SP", "TO"]
    let payload = {
        idLocalizacao: 0,
        nome: "",
        email: "",
        senha: "",
        confirmaSenha: "",
        telefone: "",
        cep: "",
        cidade: "",
        uf: "",
    }

    const notificaErro = (message) => toast.error(
        message, {
        position: "top-right",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: "error-toast"
        }
    );

    const apiViaCep = axios.create({
        baseURL: "https://viacep.com.br/ws/"
    }) 

    function getLocalizacao(cep){
        apiViaCep.get(`/${cep}/json`)
        .then((res) => {
            document.getElementById("cidade").value = res.data.localidade
            payload.cidade = res.data.localidade
            document.getElementById("uf").value = res.data.uf
        })
    }

    function confirmarSenha(){
        if(payload.senha === payload.confirmaSenha){
            return true;
        }else{
            notificaErro("Senhas não coincidem")
            return false;
        }
    }

    async function findLocalizacao(cep){
        if (cep === ""){
            notificaErro("CEP não deve estar vazio")
            return true;
        }

        await api.get(`/localizacoes/cep/${cep}`)
        .then((resposta) => {
            if(resposta.status === 200){
                payload.idLocalizacao = resposta.data.idLocalizacao
            }else{
                cadastrarLocalizacao()
            }
        }).catch(e =>{
            if(e.response.status === 405){
                notificaErro("CEP não pode ser vazio")
            }
        })
        
        return false;
    }

    async function cadastrarLocalizacao(){
        await api.post(`/localizacoes`, {
            cidade: payload.cidade,
            uf: payload.uf,
            cep: payload.cep
        })
        .then((resposta) => {
            findLocalizacao(payload.cep)
        }).catch(e => {
            console.log(e.response);
        })
    }

    const handleChangeCep = e =>{
        let cep = e.target.value
        if(cep.length === 8){
            if(/^[0-9]*$/.test(cep)){
                getLocalizacao(cep)
                payload.cep = document.getElementById("cep").value
            }else{
                notificaErro("CEP deve conter apenas números")
            }
        }
    }

    const handlePayload = e => {
        payload.nome = document.getElementById("nome").value;
        payload.email = document.getElementById("email").value;
        payload.senha = document.getElementById("senha").value;
        payload.confirmaSenha = document.getElementById("confirmaSenha").value;
        payload.telefone = document.getElementById("telefone").value;
        payload.cep = document.getElementById("cep").value;
        payload.cidade = document.getElementById("cidade").value;
    }

    async function submit(e){
        e.preventDefault();
        var uf = document.getElementById("uf");
        payload.uf = uf.value

        if(!confirmarSenha()){
            return;
        }

        if(!/^[0-9]*$/.test(payload.telefone)){
            notificaErro("Telefone deve conter apenas números")
            return;
        }

        if(findLocalizacao(payload.cep) === true){
            return;
        }

        setTimeout(function(){
            api.post("/usuarios", {
                nome: payload.nome,
                email: payload.email,
                senha: payload.senha,
                telefone: payload.telefone,
                localizacao: {
                    idLocalizacao: payload.idLocalizacao,
                },
              }).then((resposta) => {
                    toast.success('Usuário criado com sucesso!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
              }).catch(e => {
                console.log(e);
                if(e.response.status === 422){
                    var listaErros = e.response.data.split(",")
                    for(var i = 0; i < listaErros.length-1; i++){
                        notificaErro(listaErros[i])
                    }
                }else if(e.status !== 201){
                    notificaErro(e.response.data)
                }
              })
        }, 3000)
    }

    return <>
        <ToastContainer/>
        <div className="w60 banner-cadastro">
                <div className={`imgCadastro${numVetor} img-cadastro`}>
                    <div className="darkscreen">
                        <a href="/"><img src={logo} alt="Logo" className="logo"/></a>
                    </div>
                </div>
            </div>
            <div className="w40">
                <div className="section-cadastro">
                    <div className="items-cadastro">
                        <p className="h3">Que bom tê-lo conosco</p>
                        <p style={{ marginBottom: "8px"}}>Para começar faça seu cadastro</p>
                        <form className="form-cadastro">
                            <div className="input-cadastro">
                                <Input
                                    type="text"
                                    color="cyan"
                                    size="regular"
                                    outline={true}
                                    placeholder="Nome:"
                                    id="nome"
                                    onChange={handlePayload}
                                />
                            </div>
                            <div className="input-cadastro">
                                <Input
                                    type="email"
                                    color="cyan"
                                    size="regular"
                                    outline={true}
                                    placeholder="Email:"
                                    id="email"
                                    onChange={handlePayload}
                                />
                            </div>
                            <div className="input-cadastro">
                                <Input
                                    type="text"
                                    color="cyan"
                                    size="regular"
                                    outline={true}
                                    placeholder="Senha:"
                                    type="password"
                                    id="senha"
                                    onChange={handlePayload}
                                />
                            </div>
                            <div className="input-cadastro">
                                <Input
                                    type="text"
                                    color="cyan"
                                    size="regular"
                                    outline={true}
                                    placeholder="Confirmação de senha:"
                                    type="password"
                                    id="confirmaSenha"
                                    onChange={handlePayload}
                                />
                            </div>
                            <div className="input-cadastro">
                                <Input
                                    type="text"
                                    color="cyan"
                                    size="regular"
                                    outline={true}
                                    placeholder="Telefone:"
                                    id="telefone"
                                    onChange={handlePayload}
                                    maxLength="9"
                                />
                            </div>
                            <div className="text-line">
                                <hr />
                                <p>Informações de localização</p>
                                <hr />
                            </div>
                            <div className="input-cadastro">
                                <Input
                                    type="text"
                                    color="cyan"
                                    size="regular"
                                    outline={true}
                                    placeholder="CEP:"
                                    maxLength="8"
                                    onChange={handleChangeCep}
                                    id="cep"
                                />
                            </div>
                            <div className="input-cadastro">
                                <div className="w30">
                                    <Select items={vetorEstados} id="uf"/>
                                </div>
                                <div className="w70" style={{paddingLeft: "8px"}}>
                                    <div>
                                        <Input
                                            type="text"
                                            color="cyan"
                                            size="regular"
                                            outline={true}
                                            placeholder="Cidade:"
                                            id="cidade"
                                        />
                                    </div>
                                </div>
                                <div className="clear"></div>
                            </div>
                            <input value="Cadastrar" type="submit" onClick={(e) => submit(e)} className="button input-submit"/>
                            <p>Já possui uma conta? <a className="a" href="/login">Faça o login</a></p>
                        </form>
                    </div>
                </div>
            </div>
            <div className="clear"></div>
    </>
}