// const xhr = new XMLHttpRequest();
// xhr.open('GET', 'https://supersimplebackend.dev');
// xhr.send();

const xhr = new XMLHttpRequest();

xhr.addEventListener('load', () => {
    // const price = JSON.parse(xhr.response);
    // console.log(`$${price.priceCents / 100}`);
    console.log(xhr.response);
    
});

xhr.open('GET', 'https://supersimplebackend.dev/');

xhr.send();