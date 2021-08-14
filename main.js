import 'bootstrap/dist/css/bootstrap-reboot.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

window.onload = () => {
    let list = [
        { value: '', finished: false },
        { value: '', finished: false },
    ];

    function init() {
        onMount();
        render();
    }

    init();

    function onMount() {
        // Add listener to buttons

        // Add Button
        const addButton = document.getElementsByClassName('btn-tambah')[0];
        addButton.addEventListener('click', addKegiatan);

        // Remove All Button
        const delButton = document.getElementsByClassName('delete-all-btn')[0];
        shouldHideButton(delButton, list);
        delButton.addEventListener('click', delKegiatan);

        // Shuffle All Button
        const shuffleButton = document.getElementsByClassName('random-all-btn')[0];
        shouldHideButton(shuffleButton, list);
        shuffleButton.addEventListener('click', shuffle);
    }

    function update() {
        render();
    }

    function delKegiatan(e) {
        const { index, label = null } = e.currentTarget.dataset;

        if (label !== 'item' && label !== 'all') throw new Error('Unknown data label type');

        if (label === 'all') list = [];
        else list.splice(parseInt(index), 1);

        update();
    }

    function doneKegiatan(e) {
        const { index } = e.currentTarget.dataset;
        if (parseInt(index) >= list.length) return;

        list[parseInt(index)].finished = true;
        update();
    }

    function addKegiatan() {
        list.push({ value: '', finished: false });

        update();
    }

    function shuffle() {
        for (let i = list.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [list[i], list[j]] = [list[j], list[i]];
        }

        update();
    }

    function handleBlur(e) {
        const { index } = e.currentTarget.dataset;

        if (parseInt(index) >= list.length) return;

        list[parseInt(index)].value = e.currentTarget.value;

        update();
    }

    function renderList() {
        const renderElement = document.getElementsByClassName('item-list')[0];
        renderElement.innerHTML = '';

        list.map(({ value, finished }, i) => {

            const newWrapper = createWrapper();

            const newInputEl = createInputEl({ value, i, finished });
            newInputEl.onblur = handleBlur;
            newWrapper.appendChild(newInputEl);

            const newDelButton = createDelButton({ i });
            newDelButton.onclick = delKegiatan;
            newWrapper.appendChild(newDelButton);

            const newDoneButton = createDoneButton({ i });
            newDoneButton.onclick = doneKegiatan;
            newWrapper.appendChild(newDoneButton);

            renderElement.appendChild(newWrapper);
        });
    }

    function createWrapper() {
        const newElement = document.createElement('div');
        newElement.className = 'item-wrapper';
        return newElement;
    }

    function createDoneButton({ i, finished }) {
        const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path
            d="M0 12.116l2.053-1.897c2.401 1.162 3.924 2.045 6.622 3.969 5.073-5.757 8.426-8.678 14.657-12.555l.668 1.536c-5.139 4.484-8.902 9.479-14.321 19.198-3.343-3.936-5.574-6.446-9.679-10.251z" />
        </svg>
        `;

        const newDoneButton = document.createElement('button');
        newDoneButton.className = 'btn btn-done-item';
        newDoneButton.dataset.label = 'item';
        newDoneButton.dataset.index = i;
        newDoneButton.innerHTML = svg;
        newDoneButton.disabled = finished;
        return newDoneButton;
    }

    function createDelButton({ i }) {
        const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
            width="48px" height="9px">
            <path fill-rule="evenodd" fill="rgb(192, 75, 75)"
            d="M0.0,0.0 L47.999,0.0 L47.999,8.999 L0.0,8.999 L0.0,0.0 Z" />
        </svg>
        `;

        const newDelButton = document.createElement('button');
        newDelButton.className = 'btn btn-delete-item';
        newDelButton.dataset.label = 'item';
        newDelButton.dataset.index = i;
        newDelButton.innerHTML = svg;

        return newDelButton;
    }

    function createInputEl({ value, i, finished }) {
        const newInputEl = document.createElement('input');
        newInputEl.className = 'form-control';
        newInputEl.placeholder = 'Ketik Kegiatan';
        newInputEl.dataset.index = i;
        newInputEl.value = value;
        newInputEl.type = 'text';
        newInputEl.disabled = finished;

        return newInputEl;
    }

    function shouldHideButton(element, list) {
        if (list.length > 0) {
            element.classList.add('d-block');
            element.classList.remove('d-none');
        } else {
            element.classList.add('d-none');
            element.classList.remove('d-block');
        }
    }

    function render() {
        const countEl = document.getElementsByClassName('count-number')[0];
        countEl.innerHTML = list.length;

        const shuffleButton = document.getElementsByClassName('random-all-btn')[0];
        shouldHideButton(shuffleButton, list);

        const delButton = document.getElementsByClassName('delete-all-btn')[0];
        shouldHideButton(delButton, list);
        renderList();
    }
};


// Observer
const nav = document.querySelector('.navbar-main');
const sectionIntersect = document.querySelector('#about');

const sectionOption = {
    rootMargin: '-450px 0px 0px 0px'
};

const sectionObserver = new IntersectionObserver((entries, /* section */) => {
    entries.forEach(entry => {
        console.log({ entry: entry.target, isIntersecting: entry.isIntersecting });
        if (!entry.isIntersecting) {
            nav.classList.add('nav-scrolled');
        } else {
            nav.classList.remove('nav-scrolled');
        }
    });
}, sectionOption);

sectionObserver.observe(sectionIntersect);