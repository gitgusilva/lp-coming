import {useEffect, useRef, useState} from "react";

import {useForm} from "react-hook-form";
import emailjs from '@emailjs/browser';

import {FiChevronDown} from "react-icons/fi";

import './assets/main.css';
import "./assets/flexgrid.css";

import logo from './assets/images/logo.png'
import background from './assets/images/bg-banner.jpg';
import logoWhatsapp from './assets/images/whatsapp.svg';
import {sendToast, ToastBody} from "./Toast";

function App() {

    const fields = {
        nameRequired: '',
        phoneRequired: '',
        emailRequired: '',
        subjectRequired: 'Orçamento',
        messageRequired: ''
    };

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm(fields);

    const form = useRef();
    const footer = useRef();
    const [inside, setInside] = useState(false);
    const [sending, setSending] = useState(false);

    const onSubmit = async (data, e) => {
        setSending(true);
        await emailjs.sendForm('service_a0nz8h9', 'template_x9m3gsl', form.current, 'FV9qRveDp6G6VYBjY')
            .then(() => {
                e.target.reset();
                sendToast('Formulário enviado com sucesso, entraremos em contato o mais breve possível!')
            }, () => sendToast('Ocorreu um erro ao enviar o formulário, tente novamente!', true));
        setSending(false);
    };

    const wpButton = () => {
        if (footer.current) {
            if (window.scrollY + window.innerHeight >= footer.current.offsetTop) {
                setInside(true)
            } else {
                setInside(false);
            }
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', wpButton);
        window.addEventListener('resize', wpButton);
        return () => {
            window.addEventListener('scroll', wpButton);
            window.addEventListener('resize', wpButton);
        }
    });

    return (
        <>
            <section className={"banner"} style={{backgroundImage: `url(${background})`}}>
                <div className={"info"}>
                    <img className={"logo"} src={logo} alt={"Logotipo da MfSeg"}/>
                    <p className={"description"}>
                        Em breve um novo site!
                    </p>
                    <div className={"progress-bar"}>
                        <div className={"bar"}>
                            <div className={"progress"}/>
                        </div>
                        <div className={"percents"}>
                            <span>0%</span>
                            <span>100%</span>
                        </div>
                    </div>
                </div>
                <a href={"#contact"} className={"scroll"} title={"Descer a página"}>
                    <FiChevronDown/>
                </a>
            </section>

            <section id={"contact"} className={"contact"}>
                <div className={"title"}>
                    <p>Deixe seus dados abaixo, e em breve</p>
                    <p>entraremos em contato!</p>
                </div>


                <form ref={form} onSubmit={handleSubmit(onSubmit)}>
                    <div className={"row"}>
                        <div className={"col-xs-12 col-sm-6 col-dflex"}>
                            <div className={"formGroup"}>
                                <label htmlFor={"name"}>Nome:</label>
                                <input id={"name"} name={"name"} className={errors.nameRequired ? 'hasError' : ''}
                                       placeholder={"Digite o seu nome"} {...register("nameRequired", {required: true})} />
                                {errors.nameRequired && <p className={"error"}>Este campo é obrigatório</p>}
                            </div>
                            <div className={"formGroup"}>
                                <label htmlFor={"phone"}>Telefone:</label>
                                <input id={"phone"} name={"phone"} placeholder={"Digite o seu telefone"} {...register("phoneRequired")} />
                            </div>
                            <div className={"formGroup"}>
                                <label htmlFor={"email"}>E-mail:</label>
                                <input id={"email"} name={"email"} className={errors.emailRequired ? 'hasError' : ''}
                                       placeholder={"Digite o seu e-mail"} {...register("emailRequired", {required: 'Este campo é obrigatório.', pattern: {
                                        value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                        message: 'Informe um e-mail válido.',
                                    }})}/>
                                {errors.emailRequired?.message && <p className={"error"}>{errors.emailRequired?.message}</p>}
                            </div>
                        </div>
                        <div className={"col-xs-12 col-sm-6 col-dflex"}>
                            <div className={"formGroup"}>
                                <label htmlFor={"subject"}>Assunto:</label>
                                <select id={"subject"} name={"subject"} className={errors.subjectRequired ? 'hasError' : ''}
                                        defaultValue={"Não Informado"}
                                        {...register("subjectRequired", {required: true})}>
                                    <option disabled={true}>Qual o seu interesse?</option>
                                    <option value={"Orçamento"}>Orçamento</option>
                                    <option value={"Outros..."}>Outros...</option>
                                </select>
                                {errors.subjectRequired && <p className={"error"}>Este campo é obrigatório</p>}
                            </div>
                            <div className={"formGroup fgrow"}>
                                <label htmlFor={"message"}>Mensagem:</label>
                                <textarea id={"message"} name={"message"} className={errors.messageRequired ? 'hasError' : ''}
                                          placeholder={"Digite a sua mensagem"} {...register("messageRequired", {required: true})} />
                                {errors.messageRequired && <p className={"error"}>Este campo é obrigatório</p>}
                            </div>
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={"col-xs-12"}>
                            <div className={"formGroup"}>
                                <button type={"submit"} disabled={sending}>{sending && <span className={"lds-dual-ring"}/>}Enviar</button>
                            </div>
                        </div>
                    </div>
                </form>
            </section>

            <footer ref={footer}>
                <div className={"top"}>
                    <div className={"container"}>
                        <div className={"row"}>
                            <div className={"col-xs-12 col-md-4"}>
                                <div className={"logo"}>
                                    <img className={"logo"} src={logo} alt={"Logotipo da MfSeg"}/>
                                </div>
                            </div>
                            <div className={"col-xs-12 col-md-8"}>
                                <ul className={"social"}>
                                    <li>
                                        <a href={"https://instagram.com"} target={"_blank"}
                                           rel={"noreferrer"}>Facebook</a>
                                    </li>
                                    <li>
                                        <a href={"https://instagram.com"} target={"_blank"}
                                           rel={"noreferrer"}>Youtube</a>
                                    </li>
                                    <li>
                                        <a href={"https://instagram.com"} target={"_blank"}
                                           rel={"noreferrer"}>Instagram</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"bottom"}>
                    <div className={"container"}>
                        <div className={"row"}>
                            <div className={"col-xs-12 col-md-12"}>
                                <div className={"copyright"}>
                                    2022 © MFseg, todos os direitos reservados.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            <div className={`whatsapp ${inside ? 'hide' : ''}`}>
                <a href={"https://api.whatsapp.com/send?phone=5547991081800&text=Ol%C3%A1%2C%20gostaria%20de%20saber%20um%20pouco%20mais%20sobre%20os%20seus%20servi%C3%A7os."} target={"_blank"} rel={"noreferrer"}>
                    <img src={logoWhatsapp} alt={"Link para contato via whatsapp"}/>
                </a>
            </div>

            <ToastBody/>
        </>
    );
}

export default App;
