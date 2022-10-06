const buscarOL = document.querySelector('.cart__items');
const totalHtml = document.querySelector('.total-price');
const items = document.querySelector('.items');
const inputPesquisa = document.querySelector('#especifico');

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

async function listaDeProdutos(param) {
  const response = await fetchProducts(param);
  const resultado = response.results;
  resultado.forEach((element) => {
    const obj = {
      sku: element.id,
      name: element.title,
      image: element.thumbnail,
    };
    items.appendChild(createProductItemElement(obj));
  });
}

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const totalSum = () => {
  const buscarLi = document.querySelectorAll('.cart__item');
  const nodeListaEmArray = Array.from(buscarLi);
  return nodeListaEmArray.reduce((acc, curr) => {
      const separaEmSifrao = curr.innerText.split('$');
      const test = acc + Number(separaEmSifrao[1]);
      return +test.toFixed(2);
    }, 0);
};

const totalPrice = () => {
  totalHtml.innerText = totalSum();
};

const cartItemClickListener = function () {
  this.remove();
  totalPrice();
  saveCartItems(buscarOL.innerHTML);
};

const createCartItemElement = ({ sku, name, salePrice, image }) => {
  const li = document.createElement('li');
  const img = document.createElement('img');
  const div = document.createElement('div');
  div.innerText = `${name} | PRICE: $${salePrice}`;
  img.src = image;
  li.className = 'cart__item';
  li.appendChild(img);
  li.appendChild(div);
  li.addEventListener('click', cartItemClickListener);
  return li;
};

async function carrinho(e) {
  const paiDoAlvoClicado = e.target.parentElement;
  const buscarId = getSkuFromProductItem(paiDoAlvoClicado);
  const response = await fetchItem(buscarId);
  const obj = {
    sku: response.id,
    name: response.title,
    salePrice: response.price,
    image: response.thumbnail,
  };
  buscarOL.appendChild(createCartItemElement(obj));
}

const test = async (e) => {
 await carrinho(e);
 totalPrice();
 const innerHtmlDoOL = buscarOL.innerHTML;
 saveCartItems(innerHtmlDoOL);
};

function addEventClickEmBtnAddCart() {
  const btn = document.querySelectorAll('.item__add');
  btn.forEach((element) => element.addEventListener('click', test));
}

const addEventoDeClickNaLiDpsDoLS = () => {
  const buscarLi = document.querySelectorAll('.cart__item');
  buscarLi.forEach((element) => {
    element.addEventListener('click', cartItemClickListener);
  });
};

const resgataDoLocalStorage = () => {
  const dados = getSavedCartItems();
  buscarOL.innerHTML = dados;
};

const clearCart = () => {
  buscarOL.innerHTML = '';
  saveCartItems(buscarOL.innerHTML);
  totalPrice();
};

const addEscutadorBtnClearCart = () => {
  const btnClearCart = document.querySelector('.empty-cart');
  btnClearCart.addEventListener('click', clearCart);
};

const carregandoApi = () => {
  const novoElemento = createCustomElement('h3', 'loading', 'carregando...');
  items.appendChild(novoElemento);
};

const depoisDaApiCarregar = () => {
  const buscaOLoading = document.querySelector('.loading');
  buscaOLoading.remove();
};

async function testa() {
  items.innerHTML = '';
  const aaa = inputPesquisa.value;
  await listaDeProdutos(aaa);
  addEventClickEmBtnAddCart();
  inputPesquisa.value = '';
}

inputPesquisa.addEventListener('change', testa);

window.onload = async () => {
  carregandoApi();
  await listaDeProdutos('computador');
  depoisDaApiCarregar();
  addEventClickEmBtnAddCart();
  resgataDoLocalStorage();
  addEventoDeClickNaLiDpsDoLS();
  addEscutadorBtnClearCart();
  totalPrice();
 };
