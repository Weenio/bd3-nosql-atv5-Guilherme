db.collection('tbl_alunos')
    .get()
    .then(
        (snapshot) => {
                      // console.log(snapshot.docs)
                      snapshot.docs.forEach(doc => {
                        renderList(doc)
            });
        }
    )

    const livroList = document.querySelector('#aluno-list')



function renderList(doc){
    let list            = document.createElement("li")
    let nome            = document.createElement("span")
    let turma           = document.createElement("span")
    let cpf             = document.createElement("span")
    let rg              = document.createElement("span")
    let telefoneAluno   = document.createElement("span")
    let telefoneRes     = document.createElement("span")
    let email           = document.createElement("span")
    let dataNasc        = document.createElement("span")
    let excluir         = document.createElement("div")

    excluir.textContent = "X"
    excluir.setAttribute("class", "exButton")
    list.setAttribute('data-id', doc.id)

    nome.textContent            = doc.data().nome
    turma.textContent           = doc.data().cod_turma
    cpf.textContent             = doc.data().cpf
    rg.textContent              = doc.data().rg
    telefoneAluno.textContent   = doc.data().telefoneAluno
    telefoneRes.textContent     = doc.data().telefoneRes
    email.textContent           = doc.data().email
    dataNasc.textContent        = doc.data().dataNasc
    
    list.appendChild(excluir)
    list.appendChild(nome)
    list.appendChild(turma)
    list.appendChild(cpf)
    list.appendChild(rg)
    list.appendChild(telefoneAluno)
    list.appendChild(telefoneRes)
    list.appendChild(email)
    list.appendChild(dataNasc)

    livroList.appendChild(list)

    excluir.addEventListener('click', (e) => {
        e.stopPropagation()

        let id = e.target.parentElement.getAttribute('data-id')
        //alert(id)

        db.collection('tbl_alunos').doc(id).delete()
        .then( () => window.location.reload())
    })
}

//--------------------------

const form = document.querySelector('#add-aluno-form')

form.addEventListener('submit', (event) => {
    event.preventDefault();

    db.collection('tbl_alunos')
        .add({
            nome: form.nome.value,
            cod_turma : form.turma.value,
            cpf: form.cpf.value,
            rg: form.rg.value,
            telefoneAluno: form.telefoneAluno.value,
            telefoneRes: form.telefoneRes.value,
            email: form.email.value,
            dataNasc: form.dataNasc.value
            
        })
        .then(()=>{
            form.nome.value = ""
            form.turma.value = ""
            form.cpf.value = ""
            form.rg.value = ""
            form.telefoneAluno.value = ""
            form.telefoneRes.value = ""
            form.email.value = ""
            form.dataNasc.value = ""
            alert("Dados cadastrados!")
            window.location.reload()
        })
})