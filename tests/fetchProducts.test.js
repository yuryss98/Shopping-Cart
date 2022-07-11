require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  it('testa se fetchProducts é uma função', ()=> {
    expect(typeof fetchProducts).toEqual('function');
  });
  it('verifica se ao chamar a função fetchProducts("computador"), a função fetch é chamada', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });
  it('verifica se ao chamar a função fetchProducts("computador"), a função fetch utiliza o endpoint: https://api.mercadolibre.com/sites/MLB/search?q=computador', () => {
    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(url);
  });
  it('Teste se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch, que já está importado no arquivo.', async () => {
    const retorna = await fetchProducts('computador');
    expect(retorna).toEqual(computadorSearch);
  });
  it('Teste se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: "You must provide an url"', async () => {
    const retorno = await fetchProducts();
    expect(retorno).toEqual(new Error('You must provide an url'));
  });
});
