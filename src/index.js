/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

const baseUrl = "https://platzi-avo.vercel.app";

const appNode = document.querySelector("#app");

appNode.addEventListener('click', (event) => {
  if(event.target.nodeName === 'H2') {
    window.alert('clicked')
  }
})

const formatPrice = (price) => {

  const newPrice = new window.Intl.NumberFormat('en-EN', {
    style: 'currency',
    currency: 'USD'
  }).format(price)

  return newPrice
}



async function fetchData() {
  try {
    const response = await fetch(`${baseUrl}/api/avo`);
    const responseJson = await response.json();
    const { data: products } = responseJson;
    console.log(products);

    let fragment = document.createDocumentFragment();

    products.forEach(element => {
      const image = document.createElement('img')
      image.src = `${baseUrl}${element.image}`
      image.className = 'h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-6 place-self-center'

      const title = document.createElement('h2')
      title.textContent = element.name;
      title.className= 'text-2xl text-lime-700 place-self-center'
      

      const price = document.createElement('div')
      price.textContent = formatPrice(element.price);
      price.className = 'text-2xl place-self-center  '


      const container = document.createElement('div')
      container.append(image, title, price);
      container.className = 'w-64 h-52 flex flex-col   border rounded-lg p-4 '

      fragment.appendChild(container);

    });

    appNode.append(fragment);
  
  } catch (error) {
    console.log(error)
  }
}

fetchData()
