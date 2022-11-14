"use strict";
class RegexValidator {
    get regex() {
        return new RegExp("");
    }
}
class EmailValidator extends RegexValidator {
    get regex() {
        return new RegExp(/^(\w{1,}@\w{1,}\.(\w{3})(\.\w{2}){0,1})$/gim);
    }
}
class PasswordValidator extends RegexValidator {
    get regex() {
        return new RegExp(/^\w{1,}$/gim);
    }
}
class NameValidator extends RegexValidator {
    get regex() {
        return new RegExp(/^([a-z]{1,})([ ]{1}[a-z]{1,}){0,}$/gim);
    }
}
class EmailInput extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        const input = document.createElement("input");
        input.setAttribute("id", "inputEmail");
        shadow.appendChild(input);
        input.addEventListener("change", () => {
            const email = new EmailValidator();
            const emailRegex = email.regex;
            try {
                if (!emailRegex.test(input.value)) {
                    input.value = "";
                    throw new Error("O formato do email está errado");
                } else {
                    console.log("email ok");
                }
            } catch (error) {
                input.value = "";
                console.log(error);
            }
        });
    }
    get valueEmail() {
        return (
            this.shadowRoot?.querySelector("#inputEmail") as HTMLInputElement
        ).value;
    }
}
class NameInput extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        const input = document.createElement("input");
        input.setAttribute("id", "inputName");
        shadow.appendChild(input);
        input.addEventListener("change", () => {
            const name = new NameValidator();
            const nameRegex = name.regex;
            try {
                if (!nameRegex.test(input.value)) {
                    input.value = "";
                    throw new Error("O formato do nome está errado");
                } else {
                    console.log("nome ok");
                }
            } catch (error) {
                input.value = "";
                console.log(error);
            }
        });
    }
    get valueName() {
        return (
            this.shadowRoot?.querySelector("#inputName") as HTMLInputElement
        ).value;
    }
}
class PasswordInput extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        const input = document.createElement("input");
        input.setAttribute("id", "inputPass");
        shadow.appendChild(input);
        input.addEventListener("change", () => {
            const pass = new PasswordValidator();
            const passRegex = pass.regex;
            try {
                if (!passRegex.test(input.value)) {
                    input.value = "";
                    throw new Error("O formato do senha está errado");
                } else {
                    console.log("senha ok");
                }
            } catch (error) {
                input.value = "";
                console.log(error);
            }
        });
    }
    get valuePass() {
        return (
            this.shadowRoot?.querySelector("#inputPass") as HTMLInputElement
        ).value;
    }
}

class buttonsCRUD extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        const buttonRegister = document.createElement("button");
        buttonRegister.textContent = "Cadastrar";
        const buttonLogin = document.createElement("button");
        buttonLogin.textContent = "Entrar";
        const buttonUpdate = document.createElement("button");
        buttonUpdate.textContent = "Atualizar";

        buttonRegister.addEventListener("click", () => {
            const emailValue = (
                document.querySelector("email-input") as EmailInput
            ).valueEmail;
            const nameValue = (
                document.querySelector("name-input") as NameInput
            ).valueName;
            const passValue = (
                document.querySelector("pass-input") as PasswordInput
            ).valuePass;

            if (emailValue != "" && nameValue != "" && passValue != "") {
                const emailValue = (
                    document.querySelector("email-input") as EmailInput
                ).valueEmail;

                const body = {
                    email: emailValue,
                    name: nameValue,
                    pass: passValue,
                };
                request<APIResponse<UserData>>("/accounts", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body),
                })
                    .then((res) => {
                        return res;
                    })
                    .then((data) => {
                        console.log(data);
                    })
                    .catch(function (error) {
                        console.log(
                            "Houve um erro na operação de busca: " +
                                error.message
                        );
                    });
            } else {
                throw new Error("Há campos vazios");
            }
        });

        buttonLogin.addEventListener("click", () => {
            const emailValue = (
                document.querySelector("email-input") as EmailInput
            ).valueEmail;
            const passValue = (
                document.querySelector("pass-input") as PasswordInput
            ).valuePass;

            if (emailValue != "" && passValue != "") {
                const body = {
                    email: emailValue,
                    pass: passValue,
                };
                request<APIResponse<LoginData>>("/accounts/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body),
                })
                    .then((res) => {
                        return res;
                    })
                    .then((data) => {
                        console.log(data);
                    })
                    .catch(function (error) {
                        console.log(
                            "Houve um erro na operação de busca: " +
                                error.message
                        );
                    });
            } else {
                throw new Error("Há campos vazios");
            }
        });

        buttonUpdate.addEventListener("click", () => {
            const emailValue = (
                document.querySelector("email-input") as EmailInput
            ).valueEmail;
            const nameValue = (
                document.querySelector("name-input") as NameInput
            ).valueName;
            const passValue = (
                document.querySelector("pass-input") as PasswordInput
            ).valuePass;
            if (emailValue != "" && nameValue != "" && passValue != "") {
                const body = {
                    email: emailValue,
                    name: nameValue,
                    pass: passValue,
                };
                request<APIResponse<UserData>>("/accounts", {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body),
                })
                    .then((res) => {
                        return res;
                    })
                    .then((data) => {
                        console.log(data);
                    })
                    .catch(function (error) {
                        console.log(
                            "Houve um erro na operação de busca: " +
                                error.message
                        );
                    });
            } else {
                throw new Error("Há campos vazios");
            }
        });

        shadow.appendChild(buttonRegister);
        shadow.appendChild(buttonLogin);
        shadow.appendChild(buttonUpdate);
    }
}

customElements.define("email-input", EmailInput);
customElements.define("name-input", NameInput);
customElements.define("pass-input", PasswordInput);
customElements.define("buttons-crud", buttonsCRUD);

interface APIResponse<T> {
    data: T;
    errors: Array<string>;
}

interface UserData {
    id: string;
    email: string;
    name: string;
}

interface LoginData {
    id: number;
}

function request<T>(url: string, config: RequestInit = {}): Promise<T> {
    return fetch(url, config)
        .then((response) => response.json())
        .then((data) => data as T);
}
