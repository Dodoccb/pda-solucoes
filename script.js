const toggle=document.querySelector('.menu-toggle');
const menu=document.querySelector('#menu');
toggle?.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')==='true';toggle.setAttribute('aria-expanded',String(!open));menu.classList.toggle('open',!open)});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu?.classList.contains('open')){menu.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.focus()}});
const form=document.querySelector('#contact-form');
if(form){
  form.addEventListener('input',()=>document.querySelector('#form-status').replaceChildren());
  const interest=new URLSearchParams(location.search).get('interesse');
  const select=form.elements.interesse;
  if(interest&&interest.length<150){
    if(!Array.from(select.options).some(o=>o.value===interest)){const option=document.createElement('option');option.textContent=interest;select.append(option)}
    select.value=interest;
  }
  form.addEventListener('submit',event=>{
    event.preventDefault();
    const name=form.elements.nome.value.trim();
    const challenge=form.elements.mensagem.value.trim();
    if(!name||challenge.length<10){document.querySelector('#form-status').textContent='Informe seu nome e descreva o desafio com pelo menos 10 caracteres.';return}
    const company=form.elements.empresa.value.trim();
    const message=`Olá, PDA! Meu nome é ${name}.${company?'\nEmpresa: '+company:''}\nInteresse: ${select.value}\n\nMeu desafio: ${challenge}`;
    const link=document.createElement('a');link.className='text-link';link.href='https://wa.me/5541998226732?text='+encodeURIComponent(message);link.target='_blank';link.rel='noopener noreferrer';link.textContent='Abrir mensagem no WhatsApp ↗';
    const status=document.querySelector('#form-status');status.replaceChildren(document.createTextNode('Mensagem preparada. '),link);link.focus();
  });
}
