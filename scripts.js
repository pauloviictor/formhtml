const formEl = document.getElementById("formulario");
var tableEl = document.getElementById("cadastros-table");
const idEl = document.getElementById("identificador");
const nomeEl = document.getElementById("nome");
const emailEl = document.getElementById("email");
const cpfEl = document.getElementById("cpf");
const escolaridadeEl = document.getElementById("schooling");
const cidadeEl = document.getElementById("city");
const estadoEl = document.getElementById("uf");
const logradouroEl = document.getElementById("street");
const complementoEl = document.getElementById("complement");
const divContato = document.getElementById("contato-alternativo");
const maskCpf = /(\d{3})\.(\d{3})\.(\d{3})-(\d{2})/;
var cadastros = [];
let id=0;
let cadastroOrigem;
let contadorContatos = 0;
let idAux;

formEl.addEventListener("submit", salvaDados)

function resetaCampo(){
  let contatoNomeEl;
  let contatoEmailEl;
  let contatoTelefoneEl;

  nomeEl.value = "";
  emailEl.value = "";
  cpfEl.value = "";
  escolaridadeEl.value = "";
  cidadeEl.value = "";
  estadoEl.value = "";
  logradouroEl.value = "";

  for(let i = 0; i <= contadorContatos; i++){

    contatoNomeEl = document.querySelector(`#nomeContato${i}`);
    contatoEmailEl = document.querySelector(`#emailContato${i}`);
    contatoTelefoneEl = document.querySelector(`#telefoneContato${i}`);

    contatoNomeEl.value = "";
    contatoEmailEl.value = "";
    contatoTelefoneEl.value = "";
  }

  divContato.innerHTML = "";



  complementoEl.value = "";
  nomeEl.style.cssText = "background-color: #ccc;' + 'border: 1px solid #ccc;";
  emailEl.style.cssText = "background-color: #ccc;' + 'border: 1px solid #ccc;";
  cpfEl.style.cssText = "background-color: #ccc;' + 'border: 1px solid #ccc;";

}

function valorInvalido(campo) {
  campo.style.cssText = 'background-color: #FEC7B3;' + 'border: 1px solid #B30C00;'

}

function valorValido(campo) {
  campo.style.cssText = 'background-color: #BCFFBA;' + 'border: 1px solid #73B370;'

}

function validaNome() {
  if (nomeEl.value.length === 0 || !nomeEl.value.trim()) {
    valorInvalido(nomeEl);
    nomeEl.value = ""
    return false;
  }else{
    valorValido(nomeEl);
    return true;
  }

}

function validaEmail() {

  let mask = /\S+@\S*\.\S*/;
  if (mask.test(emailEl.value)) {
    valorValido(emailEl)
    return true;
  } else {
    valorInvalido(emailEl);
    return false;
  }

}

function mascaraCpf() {

  validaCpf() ? valorValido(cpfEl) : valorInvalido(cpfEl);

}

function validaCpf() {
  let strCPF = document.getElementById("cpf").value;
  let Soma;
  let Resto;

  if (maskCpf.test(strCPF)) {
    strCPF = strCPF.replace(/(\d{3})\.(\d{3})\.(\d{3})-(\d{2})/, '$1$2$3$4');
  }

    Soma = 0;
    if (strCPF == "00000000000") {
      return false;
    }
    for (i = 1; i <= 9; i++) {
      Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    }

    Resto = (Soma * 10) % 11;
    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10))) {
      return false;
    }
    Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);

    Resto = (Soma * 10) % 11;
    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11))) {
      return false;
    }
    return true;
}

function adicionaContato(){
  let divFilho = document.createElement("div");
  divContato.appendChild(divFilho);

  divFilho.setAttribute("class", "contatos-child")
  let nomeContato = document.createElement("input");
  let telefoneContato = document.createElement("input");
  let emailContato = document.createElement("input");
  let divButton = document.createElement("div");
  let contadorAux = contadorContatos + 1;

  divFilho.appendChild(nomeContato);
  divFilho.appendChild(telefoneContato);
  divFilho.appendChild(emailContato);
  divFilho.appendChild(divButton);

  divFilho.setAttribute("id", `contato${contadorContatos+1}`)

  divButton.setAttribute("class", "btn")

  divButton.innerHTML = "<button class='btn-contato' type='button' onclick='removerContato(" + contadorAux + ")'>Deletar Campo</button>"

  nomeContato.setAttribute("placeholder", "Insira o nome do contato");
  nomeContato.setAttribute("id", `nomeContato${contadorContatos+1}`);
  nomeContato.setAttribute("required", "true");


  telefoneContato.setAttribute("placeholder", "Insira o telefone  com ddd");
  telefoneContato.setAttribute("id", `telefoneContato${contadorContatos+1}`);
  telefoneContato.setAttribute("required", "true");
  telefoneContato.setAttribute("class", "tell");

  emailContato.setAttribute("placeholder", "Insira o e-mail do contato");
  emailContato.setAttribute("id", `emailContato${contadorContatos+1}`);
  emailContato.setAttribute("required", "true");

  contadorContatos++;
}

function exibeContatos(id){

  let cadastroArr = [];
  for(let i = 0; i < cadastros.length; i++){
    cadastroArr[i] = JSON.parse(cadastros[i])
  }

  for(let i = 0; i < cadastros.length; i++){
    if(cadastroArr[i].id == id){
      contadorContatos = cadastroArr[i].contatos;
      for(let j = 0; j <= cadastroArr[i].contatos; j++){
        if(j==0){
          const nomeContatoEl = document.getElementById(`nomeContato0`);
          const telefoneContatoEl = document.getElementById('telefoneContato0');
          const emailContatoEl = document.getElementById('emailContato0');

          nomeContatoEl.value = cadastroArr[i].contato0.nome;
          telefoneContatoEl.value = cadastroArr[i].contato0.telefone;
          emailContatoEl.value = cadastroArr[i].contato0.email;
        }else {
          let divFilho = document.createElement("div");
          divContato.appendChild(divFilho);

          divFilho.setAttribute("class", "contatos-child")
          let nomeContato = document.createElement("input");
          let telefoneContato = document.createElement("input");
          let emailContato = document.createElement("input");

          divFilho.appendChild(nomeContato);
          divFilho.appendChild(telefoneContato);
          divFilho.appendChild(emailContato);

          divFilho.setAttribute("id", `contato${contadorContatos+1}`)

          nomeContato.setAttribute("placeholder", "Insira o nome do contato");
          nomeContato.setAttribute("id", `nomeContato${j}`);
          nomeContato.setAttribute("required", "true");

          telefoneContato.setAttribute("placeholder", "Insira o telefone  com ddd");
          telefoneContato.setAttribute("id", `telefoneContato${j}`);
          telefoneContato.setAttribute("required", "true");
          telefoneContato.setAttribute("class", "tell");

          emailContato.setAttribute("placeholder", "Insira o e-mail do contato");
          emailContato.setAttribute("id", `emailContato${j}`);
          emailContato.setAttribute("required", "true");

          nomeContato.value = cadastroArr[i][`contato${j}`].nome;
          telefoneContato.value = cadastroArr[i][`contato${j}`].telefone;
          emailContato.value = cadastroArr[i][`contato${j}`].email;

        }
      }
    }
  }


}

function salvaDados(e) {

  if(validaCpf() && validaNome() && validaEmail()) {

    let cadastro;
    let contato;
    let contatoArr = [];
    let json;
    let contatoNomeEl;
    let contatoEmailEl;
    let contatoTelefoneEl
    let jsonContato;

      cadastro = {
        id: id,
        nome: nomeEl.value,
        email: emailEl.value,
        cpf: cpfEl.value,
        escolaridade: escolaridadeEl.value,
        localizacao: {
          cidade: cidadeEl.value,
          estado: estadoEl.value,
          logradouro: logradouroEl.value,
          complemento: complementoEl.value
        },
        contatos: contadorContatos
      }

      for (let i = 0; i <= contadorContatos; i++) {

        contatoNomeEl = document.querySelector(`#nomeContato${i}`);
        contatoEmailEl = document.querySelector(`#emailContato${i}`);
        contatoTelefoneEl = document.querySelector(`#telefoneContato${i}`);

        contato = {
          nome: contatoNomeEl.value,
          email: contatoEmailEl.value,
          telefone: contatoTelefoneEl.value
        }

        jsonContato = JSON.stringify(contato);
        cadastro[`contato${i}`] = contato;
      }


      if (maskCpf.test(cadastro.cpf)) {
        cadastro.cpf = cadastro.cpf.replace(/(\d{3})\.(\d{3})\.(\d{3})-(\d{2})/, '$1$2$3$4');
      }
      json = JSON.stringify(cadastro);

      if (cadastros.includes(cadastroOrigem)) {
        // verificando se é uma edição
        editarArray(json);
        exibeCadastros();
        cadastroOrigem = "";
      } else {
        // adição de um novo elemento no Array
        cadastro.id = id;
        if (maskCpf.test(cadastro.cpf)) {
          cadastro.cpf = cadastro.cpf.replace(/(\d{3})\.(\d{3})\.(\d{3})-(\d{2})/, '$1$2$3$4');
        }
        let jsonNovoCadastro = JSON.stringify(cadastro);
        cadastros.push(jsonNovoCadastro);
        id++;
        exibeCadastros();
      }


    resetaCampo();
    console.log(cadastros);
    contadorContatos = 0;
  }else{
    if (!validaCpf()){
      alert("Por favor digite um CPF válido");
      cpfEl.focus();
    }
    if (!validaNome()){
      alert("Por favor digite um Nome válido");
      nomeEl.focus();
    }
    if (!validaEmail()){
      alert("Por favor digite um E-mail válido");
      emailEl.focus();
    }
  }
  cadastroOrigem = "";
  e.preventDefault(e);
}

function exibeCadastros(){
  let cadastroArr = [];
  for(let i = 0; i < cadastros.length; i++){
    cadastroArr[i] = JSON.parse(cadastros[i])
  }
  tableEl.innerHTML = "";

    let trHead = document.createElement("tr");

    tableEl.appendChild(trHead);

    let thNome = document.createElement("th");
    let thEmail = document.createElement("th");
    let thEdit = document.createElement("th");
    let thDelete = document.createElement("th");

    trHead.appendChild(thNome);
    trHead.appendChild(thEmail);
    trHead.appendChild(thEdit);
    trHead.appendChild(thDelete);

    thNome.innerText = "Nome";
    thEmail.innerText = "Email";
    thEdit.innerText = "Editar";
    thDelete.innerText = "Excluir";


    for (let i = 0; i < cadastroArr.length; i++) {
      let trFilho = document.createElement("tr");

      tableEl.appendChild(trFilho);

      let tdNome = document.createElement("td");
      let tdEmail = document.createElement("td");
      let tdEdit = document.createElement("td");
      let tdDelete = document.createElement("td");

      trFilho.appendChild(tdNome);
      trFilho.appendChild(tdEmail);
      trFilho.appendChild(tdEdit);
      trFilho.appendChild(tdDelete);

      tdNome.innerText = cadastroArr[i].nome;
      tdEmail.innerText = cadastroArr[i].email;
      tdEdit.innerHTML = "<td class='icon-cell'><a href='#top' onclick='editaCadastro(" + cadastroArr[i].id + ")' ><i class=\"fa-solid fa-pen-to-square\"></i></a></td>";
      tdDelete.innerHTML = "<td class='icon-cell' ><a onclick='excluirCadastro(" + cadastroArr[i].id + ")'><i class=\"fa-solid fa-trash-can\"></i></a></td>";
    }
}

function editaCadastro(id){
  let cadastroArr = [];
  let cadastro;

  for(let i = 0; i < cadastros.length; i++){
    cadastroArr[i] = JSON.parse(cadastros[i])
  }
  for(let i=0; i < cadastroArr.length; i++){
    if(cadastroArr[i].id == id){
      cadastro = cadastroArr[i];
      idEl.value = cadastro.id;
      nomeEl.value = cadastro.nome;
      emailEl.value = cadastro.email;
      cpfEl.value = cadastro.cpf;
      escolaridadeEl.value = cadastro.escolaridade;
      cidadeEl.value = cadastro.localizacao.cidade;
      estadoEl.value = cadastro.localizacao.estado;
      logradouroEl.value = cadastro.localizacao.logradouro;
      complementoEl.value = cadastro.localizacao.complemento;

      exibeContatos(id);

    }
  }
  let json = JSON.stringify(cadastro);

  cadastroOrigem = json;

}

function editarArray(s){
  let index = cadastros.indexOf(cadastroOrigem);
  cadastros.splice(index, 1, s);

}

function excluirCadastro (id) {
  let cadastroArr = [];
  for(let i = 0; i < cadastros.length; i++){
    cadastroArr[i] = JSON.parse(cadastros[i])
  }

  for(let i = 0; i < cadastroArr.length; i++){
    if(id == cadastroArr[i].id){
      cadastros.splice(i, 1);
      tableEl.deleteRow(i+1);
    }
  }

  if(cadastros.length === 0){
    tableEl.deleteRow(0);
  }

}

function removerContato(cont) {
  let removido = document.querySelector(`#contato${cont}`);
  removido.remove();
  contadorContatos--;
}
