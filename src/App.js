import {useEffect, useRef, useState} from "react";
import { useForm } from "react-hook-form";
import {FiChevronDown} from "react-icons/fi";

import './assets/main.css';
import "./assets/flexgrid.css";

import logo from './assets/images/logo.png'
import background from './assets/images/bg-banner.jpg';
import logoWhatsapp from './assets/images/whatsapp.svg';

function App() {

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const footer = useRef();
    const [inside, setInside] = useState(false);

    const onSubmit = (data) => {
        console.log(data);
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
                    <img className={"logo"} src={logo} alt={"Logotipo da BlueSea"}/>
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
                <a href={"#contact"} className={"scroll"}>
                    <FiChevronDown/>
                </a>
            </section>

            <section id={"contact"} className={"contact"}>
                <div className={"title"}>
                    <p>Deixe seus dados abaixo, e em breve</p>
                    <p>entraremos em contato!</p>
                </div>


                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={"row"}>
                        <div className={"col-xs-12 col-sm-6 col-dflex"}>
                            <div className={"formGroup"}>
                                <label htmlFor={"name"}>Nome:</label>
                                <input id={"name"} className={errors.nameRequired ? 'hasError' : ''} placeholder={"Digite o seu nome"} {...register("nameRequired", { required: true })} />
                                {errors.nameRequired && <p className={"error"}>Este campo é obrigatório</p>}
                            </div>
                            <div className={"formGroup"}>
                                <label htmlFor={"phone"}>Telefone:</label>
                                <input id={"phone"} placeholder={"Digite o seu telefone"}/>
                            </div>
                            <div className={"formGroup"}>
                                <label htmlFor={"email"}>E-mail:</label>
                                <input id={"email"} className={errors.emailRequired ? 'hasError' : ''} placeholder={"Digite o seu e-mail"} {...register("emailRequired", { required: true })}/>
                                {errors.emailRequired && <p className={"error"}>Este campo é obrigatório</p>}
                            </div>
                        </div>
                        <div className={"col-xs-12 col-sm-6 col-dflex"}>
                            <div className={"formGroup"}>
                                <label htmlFor={"subject"}>Assunto:</label>
                                <select id={"subject"} className={errors.subjectRequired ? 'hasError' : ''} defaultValue={"0"} name={"assunto"} {...register("subjectRequired", { required: true })}>
                                    <option disabled={true}>Qual o seu interesse?</option>
                                    <option value={"1"}>Orçamento</option>
                                    <option value={"2"}>Outros...</option>
                                </select>
                                {errors.subjectRequired && <p className={"error"}>Este campo é obrigatório</p>}
                            </div>
                            <div className={"formGroup fgrow"}>
                                <label htmlFor={"message"}>Mensagem:</label>
                                <textarea id={"message"} className={errors.messageRequired ? 'hasError' : ''} placeholder={"Digite a sua mensagem"} {...register("messageRequired", { required: true })} />
                                {errors.messageRequired && <p className={"error"}>Este campo é obrigatório</p>}
                            </div>
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={"col-xs-12"}>
                            <div className={"formGroup"}>
                                <button type={"submit"}>Enviar</button>
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
                                    <img className={"logo"} src={logo} alt={"Logotipo da BlueSea"}/>
                                </div>
                            </div>
                            <div className={"col-xs-12 col-md-8"}>
                                <ul className={"social"}>
                                    <li>
                                        <a href={"https://instagram.com"} target={"_blank"} rel={"noreferrer"}>Facebook</a>
                                    </li>
                                    <li>
                                        <a href={"https://instagram.com"} target={"_blank"} rel={"noreferrer"}>Youtube</a>
                                    </li>
                                    <li>
                                        <a href={"https://instagram.com"} target={"_blank"} rel={"noreferrer"}>Instagram</a>
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
                                    2022 © BlueSea Offshore Catering eireli, todos os direitos reservados.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            <div className={`whatsapp ${inside ? 'hide' : ''}`}>
                <a href={"https://whatsapp.com/"} target={"_blank"} rel={"noreferrer"}>
                    <img src={logoWhatsapp} alt={"link para contato via whatsapp"}/>
                </a>
            </div>
        </>
    );
}

export default App;
