---
description: Workflow para Manutenção da Documentação Profissional do PrimeFlix
---

# 📝 Workflow de Documentação: PrimeFlix Standard

Este workflow define as etapas para manter a documentação (README, PANORAMA, LICENSE) sempre atualizada, técnica e impactante.

## 🚀 Princípios Core:
1. **Sempre Analítico**: Nunca diga apenas "o que" foi feito, explique "o porquê".
2. **Visual Prime**: Mantenha o contraste Black/Cyan e o tom profissional.
3. **Frequência**: Atualize a cada nova feature major (ex: novo hook de contexto ou integração de API).

---

## 🛠️ Passos para Atualização:

### 1. Atualizar o PANORAMA.md (Foco Técnico)
Sempre que uma nova funcionalidade técnica for adicionada:
- Localize a seção **`🧩 Panorama de Componentes`**.
- Especifique o componente/hook/service criado.
- Adicione a sub-seção: **O que foi feito** e **O Porquê**.
- Se necessário, atualize o **`📖 Glossário de Termos Técnicos`**.

### 2. Atualizar o README.md (Foco em Impacto/Vendas)
Se a funcionalidade for visível para o usuário final:
- Adicione na seção **`🚀 Funcionalidades de Elite`**.
- Use um tom persuasivo e use os termos: "Imersivo", "Instantâneo", "Premium".
- Se a funcionalidade foi inspirada em outra plataforma, cite como ela foi "Roubada como um Artista" (aperfeiçoada).

### 3. Sincronizar com a IA (Copiloto)
Ao pedir para a IA atualizar a documentação, use o seguinte prompt base:
> *"Aja como um Engenheiro Senior de Frontend. Atualize o PANORAMA.md e o README.md do projeto PrimeFlix seguindo o padrão de 'Screaming Architecture' e a filosofia 'Roubo Criativo'. Foco em performance percebida e justificativas técnicas profundas."*

### 4. Revisão Automática (Linters & Markdown)
Antes de commitar:
- Verifique se os links entre os arquivos (`[README.md](./README.md)`) não estão quebrados.
- Use um linter de Markdown para garantir a formatação correta.

---

## ⚖️ Mudanças na Licença
- A seção **`🎨 NOTA ARTÍSTICA`** na Licença **NUNCA** deve ser removida. Ela protege a integridade intelectual da abordagem de aprendizagem do projeto.

---

<sub>Documento Interno · Versão 1.0 · Mantenha este workflow atualizado nas `.agents/workflows/`</sub>
