//funcao para consultar os produtos
async function consultaProdutos(){
    //consome API no backend com o verbo get / rota product
   const produtos =  await fetch('http://localhost:3333/products') 
        .then(resposta =>{ 
            return resposta.json() 
        })
        .catch(error=> {
            alert('Erro ao consultar')
        })

   let linhastabela = ''
   produtos.forEach(produto => {
        linhastabela += 
        `<tr> <td> ${produto.description} </td> <td> ${produto.price} </td> 
        <td> ${produto.quantity} </td> <td> ${produto.type_price} </td> <td> ${produto.massa} </td> <td> ${produto.sabor} </td> <td>
        <div onclick="remover('${produto.id}')"> <i class="bi bi-trash2-fill"></i> </div>
        </td> <td> <div onclick="enviarid('${produto.id}', '${produto.description}', ${produto.price}, ${produto.quantity}, '${produto.type_price}', '${produto.massa}', '${produto.sabor}')"
        <i class="bi bi-pencil-fill"></i> </div> </td> </tr>` 
   })

   //colocar o conteúdo na tabela
   document.getElementById("linhastabela").innerHTML = linhastabela

}
//função para criar produto
async function cadastrarProduto(){
    //pegar dados do formulário
    const description = document.getElementById("description").value 
    const price = Number(document.getElementById("price").value)
    const quantity = Number(document.getElementById("quantity").value)
    const id = document.getElementById("id").value
    const type_price = document.getElementById("type_price").value
    const massa = document.getElementById("massa").value
    const sabor = document.getElementById("sabor").value

    let metodo
    let url
    
    metodo = 'POST' 
    url = `http://localhost:3333/product`
    //monta obj json
    const product = {description, price, quantity, type_price, massa, sabor}

    //consumir api
    const novoProduto = await fetch(url,{
        method: metodo, 
        body: JSON.stringify(product),
        headers: {
            'Content-Type': 'application/json;charset="UTF-8"'
        }
    })
  
    .then(resposta=>{
        alert('Produto cadastrado com sucesso')
    }) 
    .catch(error=>{
        alert ('Erro ao cadastrar produto')
    })
    window.location.replace('listproducts.html')
}

//função que remove um produto pelo seu id
async function remover(id){
    const  confirma = confirm('Deseja remover esse produto?')
    if(!confirma){
        return 
    } else {
        await fetch(`http://localhost:3333/product/id/${id}`,{
            method: 'DELETE'
        })
        .then(resposta=>{
            alert('Remoção com sucesso')
        })
        .catch(erro=>{
            alert('Problema na remoção')
        })
    }
    //mostra a nova lista de produtos atualizado
    consultaProdutos()
}

//função responsável por consultar os produtos e exibir na lista
async function consultProducts()
{
    var idprod = sessionStorage.getItem('id');

    //consome API no backend com o verbo get / rota product
    //precisa esperar resposta para continuar - await
    const produtos =  await fetch(`http://localhost:3333/product/${idprod}`)  // por definição métoddo get
        .then(resposta =>{ //quando trouxe a resposta 
            return resposta.json() // retorna dados do servidor
        })
        .catch(error=> {
            alert('Erro ao consultar')
        })

        document.getElementById("description").value = produtos.description
        document.getElementById("quantity").value = produtos.quantity
        document.getElementById("price").value = produtos.price
        document.getElementById("type_price").value = produtos.type_price
        document.getElementById("massa").value = produtos.massa
        document.getElementById("sabor").value = produtos.sabor
        document.getElementById("id-container").value = produtos.idprod
}

//função responsável por armazenar o id na sessão ao ir para página de atualização
function enviarid(idprod)
{
    sessionStorage.setItem('id', idprod);
    window.location.href = 'atualizar.html';
}

//função responsável por atualizar o produto no banco
async function atualizarProduct()
{
    //pegar dados do formulário
    const description = document.getElementById("description").value 
    const price = Number(document.getElementById("price").value)
    const quantity = Number(document.getElementById("quantity").value)
    const id = document.getElementById("id-container").textContent
    const type_price = document.getElementById("type_price").value
    const massa = document.getElementById("massa").value
    const sabor = document.getElementById("sabor").value

    let metodo
    let url
    //verifica o id que vem da sessao para atualizar produto
    if(id){
        metodo = 'PUT' //atualizar
        url = `http://localhost:3333/product/id/${id}`
        document.getElementById("id-container").textContent = ''
    }

    //monta obj json
    const product = {description, price, quantity, type_price, massa, sabor}

    //consumir api - verbo post
    const novoProduto = await fetch(url,{
        method: metodo, 
        body: JSON.stringify(product),
        headers: {
            'Content-Type': 'application/json;charset="UTF-8"'
        }
    })
    .then(resposta=>{
        alert('Atualizado com sucesso')

    }) 
    .catch(error=>{
        alert ('Erro durante a tentativa')
    })
    //volta para lista de produtos atualizada
    window.location.replace('listproducts.html')
}