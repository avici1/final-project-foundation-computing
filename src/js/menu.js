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
    window.localStorage.setItem(`${id}`, id);
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

export function populateCartData() {
    let arr = [];
    const wl = window.localStorage;
    for (let i = 0; i < wl.length - 1; i++) {
        const el = wl.key(i);
        console.log(el.split('-')[0]);
        if (el.split('-')[0] === 'loglevel') {
            continue;
        }
        fetch(`${apiUrl}/food/menuItems/${el.split('-')[0]}?apiKey=${apiKey}`)
            .then(response => response.json())
            .then(item => {
                arr.push({ id: el.split('-')[0], price: el.split('-')[1], title: item.title });
                console.log(item);
            })
            const container = document.getElementById('table-body');
            const cartData = arr.map(el => {
                const tableRow = document.createElement('tr');
                const tableHeader = document.createElement('th');
                setElementAttribute(tableHeader, 'scope', 'row');
                const colId = document.createElement('td');
                colId.innerText = el.id;
                const colTitle = document.createElement('td');
                colTitle.innerText = el.title;
                const colQty = document.createElement('td');
                colQty.innerText = el.qty;
                const colPrice = document.createElement('td');
                colPrice.innerText = el.price;
                tableRow.append(colId);
                tableRow.append(colTitle);
                tableRow.append(colQty);
                tableRow.append(colPrice);
                container.append(cartData);
            })

    }
}