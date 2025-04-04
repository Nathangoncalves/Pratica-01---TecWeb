export function iniciarApp() {
  let itens = [];
  let nomeUsuario = '';
  let modoEscuro = true;

  function criarElemento(tag, atributos = {}, texto = '') {
    const el = document.createElement(tag);
    for (let chave in atributos) {
      el.setAttribute(chave, atributos[chave]);
    }
    if (texto) el.textContent = texto;
    return el;
  }

  function aplicarTema() {
    document.body.style.backgroundColor = modoEscuro ? '#121212' : '#ffffff';
    document.body.style.color = modoEscuro ? '#ffffff' : '#000000';
    document.body.style.fontFamily = 'Segoe UI, sans-serif';
    document.body.style.margin = '0';
    document.body.style.padding = '0';

    document.querySelectorAll('input, textarea').forEach(el => {
      el.style.backgroundColor = modoEscuro ? '#1e1e1e' : '#f9f9f9';
      el.style.color = modoEscuro ? '#fff' : '#000';
      el.style.border = '1px solid #00BFFF';
    });

    document.querySelectorAll('button').forEach(el => {
      el.style.backgroundColor = modoEscuro ? '#00BFFF' : '#0077cc';
      el.style.color = modoEscuro ? '#000' : '#fff';
    });

    document.querySelectorAll('.caixa-preta').forEach(caixa => {
      caixa.style.backgroundColor = modoEscuro ? '#1c1c1c' : '#f5f5f5';
    });
  }

  function criarBotaoTema() {
    const toggleBtn = criarElemento('button', {}, 'Alternar Tema ✨');
    toggleBtn.onclick = () => {
      modoEscuro = !modoEscuro;
      aplicarTema();
    };
    Object.assign(toggleBtn.style, {
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '8px 16px',
      borderRadius: '6px',
      border: 'none',
      fontWeight: 'bold',
      cursor: 'pointer'
    });
    document.body.appendChild(toggleBtn);
  }

  function mostrarLogin() {
    document.body.innerHTML = '';
    criarBotaoTema();

    const container = criarElemento('div');
    container.className = 'caixa-preta';
    Object.assign(container.style, {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px',
      padding: '24px',
      margin: '100px auto',
      width: '100%',
      maxWidth: '350px',
      borderRadius: '12px'
    });

    const titulo = criarElemento('h1', {}, 'Login');

    const input = criarElemento('input', { placeholder: 'Seu nome' });
    Object.assign(input.style, {
      width: '100%',
      padding: '10px',
      borderRadius: '8px',
      border: '1px solid #00BFFF',
      fontSize: '1rem',
      boxSizing: 'border-box'
    });

    const botao = criarElemento('button', {}, 'Entrar');
    Object.assign(botao.style, {
      padding: '10px',
      width: '100%',
      borderRadius: '8px',
      border: 'none',
      fontSize: '1rem',
      fontWeight: 'bold',
      cursor: 'pointer'
    });

    botao.onclick = () => {
      if (!input.value.trim()) return;
      nomeUsuario = input.value.trim();
      montarCadastro();
    };

    container.append(titulo, input, botao);
    document.body.appendChild(container);
    aplicarTema();
  }

  function montarCadastro() {
    document.body.innerHTML = '';
    criarBotaoTema();

    const container = criarElemento('div');
    container.className = 'caixa-preta';
    Object.assign(container.style, {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px',
      padding: '24px',
      margin: '60px auto',
      width: '100%',
      maxWidth: '400px',
      borderRadius: '12px'
    });

    const titulo = criarElemento('h2', {}, `Cadastro - Bem-vindo`);

    const nomeInput = criarElemento('input', { placeholder: 'Nome' });
    const descInput = criarElemento('textarea', { placeholder: 'Descrição' });
    const addBtn = criarElemento('button', {}, 'Adicionar');
    const verBtn = criarElemento('button', {}, 'Ver Itens →');

    [nomeInput, descInput].forEach(el => {
      Object.assign(el.style, {
        width: '100%',
        padding: '10px',
        borderRadius: '8px',
        border: '1px solid #00BFFF',
        fontSize: '1rem',
        boxSizing: 'border-box'
      });
    });

    Object.assign(addBtn.style, verBtn.style, {
      padding: '10px',
      width: '100%',
      borderRadius: '8px',
      border: 'none',
      fontSize: '1rem',
      fontWeight: 'bold',
      cursor: 'pointer'
    });

    addBtn.onclick = () => {
      const nome = nomeInput.value.trim();
      const desc = descInput.value.trim();
      if (!nome || !desc) return;
      itens.push({ nome, desc });
      nomeInput.value = '';
      descInput.value = '';
      atualizarLista();
    };

    verBtn.onclick = mostrarVerificacao;

    const lista = criarElemento('ul', { id: 'lista-itens' });
    lista.style.width = '100%';

    container.append(titulo, nomeInput, descInput, addBtn, verBtn, lista);
    document.body.appendChild(container);
    aplicarTema();
    atualizarLista();
  }

  function atualizarLista() {
    const lista = document.getElementById('lista-itens');
    if (!lista) return;
    lista.innerHTML = '';
    itens.forEach((item, i) => {
      const li = criarElemento('li');
      Object.assign(li.style, {
        margin: '8px 0',
        padding: '10px',
        border: '1px solid #00BFFF',
        borderRadius: '8px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      });

      const texto = criarElemento('div');
      texto.innerHTML = `<strong>${item.nome}</strong><br><small>${item.desc}</small>`;

      const removerBtn = criarElemento('button', {}, 'Remover');
      removerBtn.onclick = () => {
        itens.splice(i, 1);
        atualizarLista();
      };

      Object.assign(removerBtn.style, {
        padding: '6px 12px',
        borderRadius: '6px',
        border: 'none',
        cursor: 'pointer',
        fontWeight: 'bold'
      });

      li.append(texto, removerBtn);
      lista.appendChild(li);
    });
  }

  function mostrarVerificacao() {
    document.body.innerHTML = '';
    criarBotaoTema();

    const container = criarElemento('div');
    container.className = 'caixa-preta';
    Object.assign(container.style, {
      padding: '24px',
      margin: '60px auto',
      maxWidth: '500px',
      borderRadius: '12px',
      textAlign: 'center'
    });

    const titulo = criarElemento('h2', {}, 'Verificação de Itens');
    const voltarBtn = criarElemento('button', {}, '← Voltar');
    const limparBtn = criarElemento('button', {}, 'Remover tudo');

    voltarBtn.onclick = montarCadastro;
    limparBtn.onclick = () => {
      if (confirm('Tem certeza que quer apagar tudo?')) {
        itens = [];
        mostrarVerificacao();
      }
    };

    [voltarBtn, limparBtn].forEach(btn => {
      Object.assign(btn.style, {
        margin: '10px',
        padding: '10px',
        borderRadius: '8px',
        border: 'none',
        fontWeight: 'bold',
        cursor: 'pointer'
      });
    });

    const lista = criarElemento('ul');
    lista.style.marginTop = '20px';

    if (itens.length === 0) {
      const aviso = criarElemento('p', {}, 'Nenhum item encontrado.');
      container.append(titulo, voltarBtn, limparBtn, aviso);
    } else {
      itens.forEach(item => {
        const li = criarElemento('li');
        li.innerHTML = `<strong>${item.nome}</strong><br><small>${item.desc}</small>`;
        Object.assign(li.style, {
          padding: '10px',
          margin: '10px 0',
          border: '1px dashed #00BFFF',
          borderRadius: '8px'
        });
        lista.appendChild(li);
      });
      container.append(titulo, voltarBtn, limparBtn, lista);
    }

    document.body.appendChild(container);
    aplicarTema();
  }

  mostrarLogin();
}
