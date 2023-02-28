const ul = document.querySelector('ul');
const pre = document.querySelector('pre');

const setup = async()=> {
  const response = await fetch('/api/things');
  const things = await response.json();
  const html = things.map( thing => {
    return `
      <li>
        <a href='#${thing.id}'>
          ${ thing.name }
        </a>
      </li>
    `;
  }).join('');
  ul.innerHTML = html;
  showDetails();
};

setup();

const showDetails =  async ()=> {
  const id = window.location.hash.slice(1);
  document.querySelectorAll('li')
    .forEach( li => {
      li.classList.remove('selected');
    });
  if(id){
    const response = await fetch(`/api/things/${id}`);
    if(response.ok){
      const thing = await response.json();
      pre.innerText = thing.description;
      const link = document.querySelector(`a[href='#${thing.id}']`);
      link.parentNode.classList.add('selected');
    }
    //console.log(link);
  }
  else {
    pre.innerText = '';
  }
};

window.addEventListener('hashchange', showDetails);


