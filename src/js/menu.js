import { apiKey, apiUrl } from './config.js';

const setElementAttribute = (element, att, val) => {
    element.setAttribute(att, val);
}

export const FillElements = async (query, contName) => {
    const container = document.getElementById(contName);
    let MenuCards = [];
    MenuCards = FetchMeals(query, MenuCards, container);
    const title = document.createElement('span');
    setElementAttribute(title, 'class', 'header-title');
    title.innerText = `${query}`;
    container.append(title);
}

export const addToCart = (id, qty) => {
    const _id = id.split('-')[0];
    const el = document.getElementById(`qty-${_id}`);
    window.localStorage.setItem(`${id}-${el.value}`, `${id}-${el.value}`);
}
function FetchMeals(query, MenuCards, container) {
    fetch(`${apiUrl}/food/menuItems/search?apiKey=${apiKey}&query=${query}`)
        .then(response => response.json())
        .then(data => data.menuItems)
        .then(items => {
            const myItems = items.slice(0,4)
            MenuCards = myItems.map(item => {

                const price = `${Math.floor((Math.random() + 1) * 10)}`
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
                p.innerText = `$${price}`;
                const cartBtn = document.createElement('button');
                setElementAttribute(cartBtn, 'class', 'btn cart-btn btn-primary');
                cartBtn.innerText = "Order now";
                setElementAttribute(cartBtn, 'value', `${item.id}-${price}`);
                setElementAttribute(cartBtn, 'id', item.id);
                const qtyEl = document.createElement('input');
                setElementAttribute(qtyEl, 'type', 'number');
                setElementAttribute(qtyEl, 'class', 'form-control');
                setElementAttribute(qtyEl, 'placeholder', 'Qty');
                setElementAttribute(qtyEl, 'id', `qty-${item.id}`);
                card.append(img);
                card.append(cardBody);
                cardBody.append(h5Title);
                cardBody.append(p);
                cardBody.append(qtyEl);
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
    let total = 0;
    const container = document.getElementById('table-body');
    const priceContainer = document.getElementById('modal-footer-container');
    const wl = window.localStorage;
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    for (let i = 0; i < wl.length; i++) {
        const el = wl.key(i);
        console.log(el);
        console.log(el.split('-')[0]);
        if (el.split('-')[0] === 'loglevel' || el.split('-')[0] === 'totalPrice') {
            continue;
        }
        fetch(`${apiUrl}/food/menuItems/${el.split('-')[0]}?apiKey=${apiKey}`)
            .then(response => response.json())
            .then(item => {
                const tableRow = document.createElement('tr');
                const tableHeader = document.createElement('th');
                setElementAttribute(tableHeader, 'scope', 'row');
                const colId = document.createElement('td');
                colId.innerText = item.id;
                const colTitle = document.createElement('td');
                colTitle.innerText = item.title;
                const colQty = document.createElement('td');
                colQty.innerText = Number(el.split('-')[2]);
                const colPrice = document.createElement('td');
                colPrice.innerText = `$${el.split('-')[1]}`;
                console.log(el.split('-')[2]);
                total += Number(el.split('-')[1]) * Number(el.split('-')[2])
                const totalPrice = document.createElement('span');
                totalPrice.innerText = totalPrice;
                tableRow.append(colId);
                tableRow.append(colTitle);
                tableRow.append(colQty);
                tableRow.append(colPrice);
                container.append(tableRow);
                wl.setItem('totalPrice', total);
            })
        priceContainer.innerText = `Total: $${wl.getItem('totalPrice')}`
    }
}