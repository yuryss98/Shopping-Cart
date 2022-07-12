const buscarOL = document.querySelector('.cart__items');

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

async function listaDeProdutos() {
  const items = document.querySelector('.items');
  const response = await fetchProducts('computador');
  const resultado = response.results;
  resultado.forEach((element) => {
    items.appendChild(createProductItemElement(
      { sku: element.id, name: element.title, image: element.thumbnail },
      ));
  });
}

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const cartItemClickListener = (e) => {
  e.target.remove();
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

async function carrinho(e) {
  const pai = e.target.parentElement;
  const buscar = pai.querySelector('.item__sku');
  const response = await fetchItem(buscar.innerText);
  buscarOL.appendChild(createCartItemElement(
    { sku: response.id, name: response.title, salePrice: response.price },
    ));
}

function addEvent() {
  const btn = document.querySelectorAll('.item__add');
  btn.forEach((element) => element.addEventListener('click', async (e) => {
    await carrinho(e);
    const innerHtmlDoOL = buscarOL.innerHTML;
    saveCartItems(innerHtmlDoOL);
  }));
}
const addEventoDeClickNaLiDpsDoLS = () => {
  const li = document.querySelectorAll('.cart__item');
  li.forEach((element) => {
    element.addEventListener('click', cartItemClickListener);
  });
};

const resgataDoLocalStorage = () => {
  const dados = getSavedCartItems();
  buscarOL.innerHTML = dados;
};

window.onload = async () => {
  await listaDeProdutos();
  addEvent();
  resgataDoLocalStorage();
  addEventoDeClickNaLiDpsDoLS();
 };
