// Intermediário seguro LB — gera o contrato de prestação de serviços em PDF, preenchido com os dados do cliente
// Usa Chromium headless (compatível com ambiente serverless da Vercel) pra transformar HTML estilizado em PDF
import chromium from '@sparticuz/chromium';
import puppeteer from 'puppeteer-core';

function montarHtml(dados) {
  const {
    nomeCliente, cnpjCpfCliente, emailCliente, whatsappCliente, enderecoCliente,
    duracaoMeses, dataInicio, dataFim,
    mensalidade, valorTotal, diaVencimento,
    dataAssinatura
  } = dados;

  const v = (x) => x || '___________________________';

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<style>
@page { size: A4; margin: 0; }
* { box-sizing: border-box; }
body { font-family: 'Helvetica', Arial, sans-serif; color: #1a1a1a; margin: 0; font-size: 10.5pt; line-height: 1.5; }
.header { background: linear-gradient(135deg, #0a0a09 0%, #1a1712 100%); padding: 28px 40px 24px; border-bottom: 4px solid #d4a94a; }
.logo-row { display: flex; align-items: center; gap: 14px; }
.logo-text { font-family: Georgia, serif; font-weight: bold; font-size: 30px; background: linear-gradient(135deg, #f0d791, #d4a94a, #a8863c); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.logo-sub { color: #d4a94a; font-size: 11px; letter-spacing: 3px; margin-top: 2px; }
.doc-title { color: #f3f0e8; font-size: 13px; text-align: right; margin-left: auto; letter-spacing: 1px; }
.content { padding: 28px 44px 40px; }
h1.main-title { text-align: center; font-size: 17px; color: #1a1a1a; margin: 0 0 2px; letter-spacing: 0.5px; }
p.subtitle { text-align: center; color: #a8863c; font-style: italic; font-size: 11px; margin: 0 0 22px; }
h2.section { color: #a8863c; font-size: 12.5px; border-bottom: 1.5px solid #d4a94a; padding-bottom: 4px; margin: 20px 0 10px; letter-spacing: 0.3px; }
p { margin: 0 0 8px; text-align: justify; }
.bold { font-weight: bold; }
.sign-block { margin-top: 26px; }
.sign-name { font-weight: bold; margin-top: 14px; }
.footer-line { border-top: 1px solid #ddd; margin-top: 30px; padding-top: 10px; font-size: 8.5pt; color: #999; text-align: center; }
</style>
</head>
<body>
  <div class="header">
    <div class="logo-row">
      <div>
        <div class="logo-text">LB</div>
        <div class="logo-sub">MARKETPLACE</div>
      </div>
      <div class="doc-title">CONTRATO DE<br>PRESTAÇÃO DE SERVIÇOS</div>
    </div>
  </div>
  <div class="content">
    <h1 class="main-title">CONTRATO DE PRESTAÇÃO DE SERVIÇOS</h1>
    <p class="subtitle">Gestão Profissional de Marketplace</p>

    <h2 class="section">1. QUALIFICAÇÃO DAS PARTES</h2>
    <p class="bold">CONTRATADA: LB Marketplace</p>
    <p>CNPJ: 58.943.847/0001-90</p>
    <p>E-mail: lincoln@lbmarketplace.com.br</p>
    <p>WhatsApp: (11) 99127-7027</p>
    <p class="bold">CONTRATANTE: ${nomeCliente}</p>
    <p>CNPJ/CPF: ${v(cnpjCpfCliente)}</p>
    <p>E-mail: ${v(emailCliente)}</p>
    <p>WhatsApp: ${v(whatsappCliente)}</p>
    <p>Endereço: ${v(enderecoCliente)}</p>

    <h2 class="section">2. OBJETO DO CONTRATO</h2>
    <p>O presente contrato tem por objeto a prestação de serviços especializados de gestão completa de marketplaces pela CONTRATADA à CONTRATANTE, abrangendo as plataformas e serviços definidos em comum acordo entre as partes.</p>
    <p>Os serviços incluem, sem limitação: criação e otimização de anúncios, SEO de marketplace, precificação estratégica, gestão de campanhas de mídia paga, monitoramento diário de métricas e entrega de relatórios mensais de desempenho até o dia 10 de cada mês.</p>

    <h2 class="section">3. PRAZO DE VIGÊNCIA</h2>
    <p>O presente contrato terá vigência de ${duracaoMeses || '___'} meses, com início em ${dataInicio || '___'} e término em ${dataFim || '___'}. Ao término do período, o contrato poderá ser renovado mediante acordo mútuo entre as partes, com antecedência mínima de 10 (dez) dias antes do vencimento.</p>

    <h2 class="section">4. VALOR E CONDIÇÕES DE PAGAMENTO</h2>
    <p>Mensalidade: R$ ${mensalidade || '___________'}</p>
    <p>Valor total do contrato: R$ ${valorTotal || '___________'}</p>
    <p>Vencimento: Todo dia ${diaVencimento || '___'} de cada mês</p>
    <p>Forma de pagamento: PIX / Boleto via Asaas</p>
    <p>Parágrafo único: O não pagamento na data acordada acarretará multa de 2% (dois por cento) sobre o valor da parcela, acrescida de juros de 1% (um por cento) ao mês. O atraso superior a 15 (quinze) dias enseja a suspensão imediata dos serviços pela CONTRATADA, sem prejuízo das demais medidas cabíveis.</p>

    <h2 class="section">5. OBRIGAÇÕES DA CONTRATADA</h2>
    <p>5.1. Executar a gestão completa das lojas nas plataformas contratadas com dedicação técnica e estratégica de excelência;</p>
    <p>5.2. Criar e gerenciar campanhas de anúncios pagos com foco em conversão e retorno sobre investimento (ROI);</p>
    <p>5.3. Elaborar e entregar relatórios mensais de desempenho com análise comparativa até o dia 10 de cada mês;</p>
    <p>5.4. Monitorar métricas de performance diariamente e propor melhorias contínuas e proativas;</p>
    <p>5.5. Manter sigilo absoluto sobre todas as informações, dados de acesso e estratégias da CONTRATANTE;</p>
    <p>5.6. Prestar suporte consultivo via WhatsApp em horário comercial (segunda a sexta, 9h às 18h).</p>

    <h2 class="section">6. OBRIGAÇÕES DA CONTRATANTE</h2>
    <p>6.1. Manter os acessos às plataformas gerenciadas ativos e com as permissões necessárias;</p>
    <p>6.2. Efetuar os pagamentos nas datas acordadas, conforme estabelecido na Cláusula 4;</p>
    <p>6.3. Manter estoque suficiente para atender à demanda gerada pelas campanhas executadas pela CONTRATADA;</p>
    <p>6.4. Comunicar previamente qualquer alteração no catálogo de produtos, regras comerciais ou mudanças estratégicas relevantes;</p>
    <p>6.5. Não realizar alterações nos anúncios ou configurações das lojas gerenciadas sem prévia comunicação e concordância da CONTRATADA.</p>

    <h2 class="section">7. CONFIDENCIALIDADE</h2>
    <p>Ambas as partes comprometem-se a manter em absoluto sigilo todas as informações trocadas no âmbito deste contrato, incluindo dados estratégicos, financeiros, de clientes, de acesso às plataformas e metodologias de trabalho. Esta obrigação permanece em plena vigência por 24 (vinte e quatro) meses após o término ou rescisão deste instrumento.</p>

    <h2 class="section">8. RESCISÃO CONTRATUAL</h2>
    <p>8.1. Rescisão pela CONTRATANTE: Poderá ser solicitada com aviso prévio mínimo de 30 (trinta) dias, ficando devidas as parcelas referentes ao período prestado. Não haverá devolução de valores já quitados.</p>
    <p>8.2. Rescisão pela CONTRATADA: Poderá ocorrer em caso de inadimplência superior a 15 (quinze) dias ou descumprimento das obrigações da CONTRATANTE, com notificação prévia de 15 (quinze) dias.</p>
    <p>8.3. Multa rescisória: A parte que der causa à rescisão imotivada antes do término do prazo contratual ficará sujeita ao pagamento de multa equivalente a 2 (duas) mensalidades vigentes.</p>

    <h2 class="section">9. DISPOSIÇÕES GERAIS</h2>
    <p>9.1. O presente contrato não estabelece qualquer vínculo empregatício, societário ou de exclusividade entre as partes, sendo a CONTRATADA empresa autônoma prestadora de serviços especializados.</p>
    <p>9.2. A CONTRATADA não garante metas específicas de faturamento ou vendas, pois os resultados dependem de variáveis externas como algoritmos das plataformas, sazonalidade e comportamento do mercado.</p>
    <p>9.3. Este contrato é regido pelas leis da República Federativa do Brasil. Fica eleito o foro da comarca de São Paulo/SP para dirimir quaisquer controvérsias, com renúncia expressa a qualquer outro.</p>
    <p>9.4. Este instrumento é assinado eletronicamente, tendo plena validade jurídica nos termos da Medida Provisória nº 2.200-2/2001 e da Lei nº 14.063/2020.</p>

    <div class="sign-block">
      <p>São Paulo/SP, ${dataAssinatura || '___ de ___________ de 2026'}.</p>
      <p class="sign-name">LB Marketplace</p>
      <p>CNPJ: 58.943.847/0001-90</p>
      <p class="bold">CONTRATADA</p>
      <p class="sign-name">${nomeCliente}</p>
      <p>CNPJ/CPF: ${v(cnpjCpfCliente)}</p>
      <p class="bold">CONTRATANTE</p>
      <p style="margin-top:18px">Testemunha 1: __________________________ CPF: ________________</p>
      <p>Testemunha 2: __________________________ CPF: ________________</p>
    </div>
    <div class="footer-line">LB Marketplace Assessoria · sistema.lbmarketplace.com.br</div>
  </div>
</body>
</html>`;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ erro: 'Método não permitido' });

  let browser = null;
  try {
    const { nomeCliente } = req.body || {};
    if (!nomeCliente) return res.status(400).json({ erro: 'nomeCliente é obrigatório.' });

    const html = montarHtml(req.body);

    browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless
    });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });
    const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });
    await browser.close();

    const nomeArquivo = `Contrato - ${nomeCliente}.pdf`.replace(/[\\/:*?"<>|]/g, '');
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(nomeArquivo)}"`);
    return res.status(200).send(pdfBuffer);
  } catch (e) {
    if (browser) await browser.close().catch(() => {});
    console.error(e);
    return res.status(500).json({ erro: 'Erro ao gerar contrato: ' + (e.message || 'desconhecido') });
  }
}
