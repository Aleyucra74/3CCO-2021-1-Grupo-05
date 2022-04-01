import React, {useState, useContext } from 'react';
import logo from '../assets/img/logo.png'

import StoreContext from '../components/store/Context';

import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';
import api from '../api';

import { ToastContainer, toast } from 'react-toastify';
import Input from "@material-tailwind/react/Input";
import Button from "@material-tailwind/react/Button";

import '../assets/styles/global.css' 
import '../assets/styles/login.css'
import 'react-toastify/dist/ReactToastify.css';

export default function Login(){
    let numVetor = Math.floor(Math.random() * 3) + 1;
    // ERRROR HANDLER 
    let payload = {
        email: "",
        senha: "",
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

    const handlePayload = e => {
        payload.email = document.getElementById("email").value;
        payload.senha = document.getElementById("senha").value;
    }

    const history = useHistory();
    const {setToken} = useContext(StoreContext);
    const [usuario, setUsuario] = useState({});

    async function submit(e){
        e.preventDefault();

        const {email,senha} = payload;
        var token;

        // FUNCAO PARA FAZER O LOGIN
        // SE FOR TRUE - RETORNA UM TOKEN(SIMPLES) 
        await api.post("/usuarios/login", {
            email: email,
            senha: senha
        }).then((resposta) => {
            if(resposta.status === 200){
                sessionStorage.setItem('@Hireit/token',resposta.data);
                token = resposta.data;
            }
        }).catch(e => {
            if(e.response.status === 400){
                notificaErro("Usuário e/ou senha incorretos")
            }
        }) 

        // FUNCAO PARA PEGAR OS DADOS DO USUARIO LOGADO
        // ASSIM PODENDO FAZER CONSULTAS DPS USANDO SESSIONsTORAGE
        const getDadosUsuario = async () => {
            const response = await api.get(`usuarios/email/${email}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });

            sessionStorage.setItem('@Hireit/idUsuario',response.data.idUsuario);
            sessionStorage.setItem('@Hireit/nome',response.data.nome);
            sessionStorage.setItem('@Hireit/email',response.data.email);
        }

        getDadosUsuario();
        if(token){
            setToken(token);
            return history.push("/projetos");
        }
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
                        <p className="h3">Olá</p>
                        <p style={{ marginBottom: "8px"}}>Para fazer login, digitei seu e-mail e senha </p>
                        <form className="form-cadastro" onSubmit={(e) => submit(e)}>
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
                            <Button 
                                value="Cadastrar" 
                                type="submit" 
                                onClick={(e) => submit(e)} 
                                className="button input-submit"
                            >
                                Logar
                            </Button>
                            <p>Não possui conta? <a className="a" href="/Cadastro">Faça seu cadastro</a></p>
                        </form>
                    </div>
                </div>
            </div>
            <div className="clear"></div>
    </>
}