require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  it('testa se fetchItem é uma função', () => {
    expect(typeof fetchItem).toBe('function')
  });
  it('ao exectar fetchItem com o argumento "MLB1615760527" testa se a função fetch foi chamada', () => {
    fetchItem('MLB1615760527')
    expect(fetch).toHaveBeenCalled();
  });
  it('ao exectar fetchItem com o argumento "MLB1615760527" testa se a função fetch utiliza o endpoint "https://api.mercadolibre.com/items/MLB1615760527"', () => {
    const url = 'https://api.mercadolibre.com/items/MLB1615760527';
    fetchItem('MLB1615760527')
    expect(fetch).toHaveBeenCalledWith(url);
  });
  it('Teste se o retorno da função fetchItem com o argumento do item "MLB1615760527" é uma estrutura de dados igual ao objeto item que já está importado no arquivo.', async () => {
    const retorno = await fetchItem('MLB1615760527');
    expect(retorno).toEqual(item);
  });
  it('Teste se, ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: "You must provide an url"', async () => {
    const resposta = await fetchItem();
    expect(resposta).toEqual(new Error('You must provide an url'));
  });
});
