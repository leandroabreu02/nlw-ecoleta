function populateUFs(){
  const ufSelect = document.querySelector("select[name=uf]")

  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
  .then((res) => { return res.json()})
  .then( states => {
    for(const state of states){
      ufSelect.innerHTML = ufSelect.innerHTML +`<option value="${state.id}">${state.nome}</option>`
    }
  })
}

populateUFs()

function getCities(event){
  const citySelect = document.querySelector("select[name=city]")
  const stateInput = document.querySelector("input[name=state]")
  const ufValue = event.target.value

  const indexOfSelectedState = event.target.selectedIndex
  stateInput.value = event.target.options[indexOfSelectedState].text

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

  citySelect.innerHTML = ""
  citySelect.disabled = true
  fetch(url)
  .then((res) => { return res.json()})
  .then( cities => {
    for(const city of cities){
      citySelect.innerHTML = citySelect.innerHTML +`<option value="${city.nome}">${city.nome}</option>`
    }
    citySelect.disabled = false
  })
}

document
  .querySelector("select[name=uf]")
  .addEventListener("change", getCities)


//Itens de coleta
const itensToColect = document.querySelectorAll(".itens-grid li")

for (const item of itensToColect){
  item.addEventListener("click", handleSelectedItem)
}

const collectedItens = document.querySelector("input[name=items]")

let selectedItens = []
function handleSelectedItem(event){
  const itemLi = event.target

  //Adicionar ou remover uma classe com JavaScript: toggle
  itemLi.classList.toggle("selected")
  const itemId = itemLi.dataset.id

  // console.log('ITEM ID:', itemId)

  //Verificar se existem itens selecionados, se sim, pegar os itens selecionados
  const alreadySelected = selectedItens.findIndex(function(item){
    const itemFound = item == itemId //Isso será true ou false
    return itemFound
  })

  //Se já estiver selecionado
  if(alreadySelected >= 0){
    //Tirar da seleção
    const filteredItens = selectedItens.filter(item => {
      const itemIsDifferent = item != itemId
      return itemIsDifferent
    })
    selectedItens = filteredItens
  }else{
    //Se não estiver selecionado, adicionar a seleção
    selectedItens.push(itemId)
  }

  // console.log('selectedItems: ', selectedItens)

  //Atualizar o campo escondido com os itens selecionados
  collectedItens.value = selectedItens
}