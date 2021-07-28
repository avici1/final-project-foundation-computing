import { apiKey, apiUrl } from './config.js';

const setElementAttribute = (element, att, val) => {
    element.setAttribute(att, val);
}

export const FillElements = async () => {
    const container = document.getElementById('menu-content');
    const query = document.getElementById('search-box').value;
    let MenuCards = [];
    MenuCards = FetchMeals(query, MenuCards, container);
}

export const addToCart = (id) => {
    console.log('called');
    window.localStorage.setItem(`item-${id}`, id);
}
function FetchMeals(query, MenuCards, container) {
    fetch(`${apiUrl}/food/menuItems/search?apiKey=${apiKey}&query=${query}`)
        .then(response => response.json())
        .then(data => data.menuItems)
        .then(items => {
            MenuCards = items.map(item => {
                const price = `$${Math.floor((Math.random() + 1) * 10)}`
                const card = document.createElement('div');
                setElementAttribute(card, 'class', 'card');
                setElementAttribute(card, 'style', 'width: 18rem');
                const img = document.createElement('img');
                setElementAttribute(img, 'src', item.image);
                setElementAttribute(img, 'class', 'card-img-top');
                setElementAttribute(img, 'alt', '...');
                const cardBody = document.createElement('div');
                setElementAttribute(cardBody, 'class', 'card-body');
                const h5Title = document.createElement('h5');
                setElementAttribute(h5Title, 'class', 'card-title');
                h5Title.innerText = item.title;
                const p = document.createElement('p');
                setElementAttribute(p, 'class', 'card-text');
                p.innerText = price;
                const cartBtn = document.createElement('button');
                setElementAttribute(cartBtn, 'class', 'btn cart-btn btn-primary');
                cartBtn.innerText = "Order now";
                setElementAttribute(cartBtn, 'value', `${item.id}-${price}`);
                setElementAttribute(cartBtn, 'id', item.id);
                card.append(img);
                card.append(cardBody);
                cardBody.append(h5Title);
                cardBody.append(p);
                cardBody.append(cartBtn);
                return card;
            });
            console.log(container.childElementCount);
            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }
            for (let i = 0; i < MenuCards.length; i++) {
                container.append(MenuCards[i]);
            }
        });
    return MenuCards;
}