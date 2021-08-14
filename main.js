import 'bootstrap/dist/css/bootstrap-reboot.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

window.onload = () => {
    let list = [
        '',
        ''
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
        delButton.addEventListener('click', delKegiatan);

        // Shuffle All Button
        const shuffleButton = document.getElementsByClassName('random-all-btn')[0];
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

    function addKegiatan() {
        list.push('');

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

        list[parseInt(index)] = e.currentTarget.value;

        update();
    }

    function renderList(){
        const renderElement = document.getElementsByClassName('item-list')[0];
        renderElement.innerHTML = '';

        list.map((value, i) => {
            const svg = `
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                    width="48px" height="9px">
                    <path fill-rule="evenodd" fill="rgb(192, 75, 75)"
                    d="M0.0,0.0 L47.999,0.0 L47.999,8.999 L0.0,8.999 L0.0,0.0 Z" />
                </svg>
            `;
            const newWrapper = createWrapper();

            const newInputEl = createInputEl({ value, i });
            newInputEl.onblur = handleBlur;
            newWrapper.appendChild(newInputEl);

            const newDelButton = createDelButton({ i });
            newDelButton.onclick = delKegiatan;
            newDelButton.innerHTML = svg;
            newWrapper.appendChild(newDelButton);

            renderElement.appendChild(newWrapper);
        });
    }

    function createWrapper() {
        const newElement = document.createElement('div');
        newElement.className = 'item-wrapper';
        return newElement;
    }

    function createDelButton({ i }) {
        const newDelButton = document.createElement('button');
        newDelButton.className = 'btn btn-delete-item';
        newDelButton.dataset.label = 'item';
        newDelButton.dataset.index = i;
        return newDelButton;
    }

    function createInputEl({ value, i }) {
        const newInputEl = document.createElement('input');
        newInputEl.className = 'form-control';
        newInputEl.placeholder = 'Ketik Kegiatan';
        newInputEl.dataset.index = i;
        newInputEl.value = value;
        newInputEl.type = 'text';

        return newInputEl;
    }
    
    function render() {
        const countEl = document.getElementsByClassName('count-number')[0];
        countEl.innerHTML = list.length;
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
    console.log(entries);
    entries.forEach(entry => {
        console.log({entry: entry.target, isIntersecting: entry.isIntersecting});
        if(!entry.isIntersecting){
            nav.classList.add('nav-scrolled');
        }else{
            nav.classList.remove('nav-scrolled');
        }
    });
}, sectionOption);

sectionObserver.observe(sectionIntersect);