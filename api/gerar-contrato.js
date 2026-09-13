// Intermediário seguro LB — gera o contrato de prestação de serviços em PDF, preenchido com os dados do cliente
// Usa pdfmake (gera PDF puro, sem precisar de navegador headless — mais confiável em ambiente serverless)
import PdfPrinter from 'pdfmake';

const fonts = {
  Helvetica: { normal: 'Helvetica', bold: 'Helvetica-Bold', italics: 'Helvetica-Oblique', bolditalics: 'Helvetica-BoldOblique' }
};
const printer = new PdfPrinter(fonts);

function gerarContratoPdf(dados) {
  const {
    nomeCliente, cnpjCpfCliente, emailCliente, whatsappCliente, enderecoCliente,
    duracaoMeses, dataInicio, dataFim,
    mensalidade, valorTotal, diaVencimento,
    dataAssinatura
  } = dados;
  const v = (x) => x || '___________________________';

  const secao = (num, titulo) => ({ text: `${num}. ${titulo}`, style: 'secao' });
  const p = (texto, opts = {}) => ({ text: texto, style: 'paragrafo', ...opts });

  const docDefinition = {
    pageSize: 'A4',
    pageMargins: [44, 130, 44, 60],
    background: function () {
      return {
        canvas: [
          { type: 'rect', x: 0, y: 0, w: 595, h: 108, color: '#0a0a09' },
          { type: 'rect', x: 0, y: 104, w: 595, h: 4, color: '#d4a94a' }
        ]
      };
    },
    content: [
      {
        columns: [
          {
            width: '*',
            stack: [
              { text: 'LB', font: 'Helvetica', bold: true, fontSize: 30, color: '#d4a94a', margin: [0, -90, 0, 0] },
              { text: 'M A R K E T P L A C E', fontSize: 9, color: '#d4a94a', margin: [0, 2, 0, 0] }
            ]
          },
          {
            width: 'auto',
            text: 'CONTRATO DE\nPRESTAÇÃO DE SERVIÇOS',
            fontSize: 11,
            color: '#f3f0e8',
            alignment: 'right',
            margin: [0, -80, 0, 0]
          }
        ]
      },
      { text: 'CONTRATO DE PRESTAÇÃO DE SERVIÇOS', style: 'tituloPrincipal', margin: [0, 20, 0, 2] },
      { text: 'Gestão Profissional de Marketplace', style: 'subtitulo', margin: [0, 0, 0, 18] },

      secao(1, 'QUALIFICAÇÃO DAS PARTES'),
      p('CONTRATADA: LB Marketplace', { bold: true }),
      p('CNPJ: 58.943.847/0001-90'),
      p('E-mail: lincoln@lbmarketplace.com.br'),
      p('WhatsApp: (11) 99127-7027'),
      p('CONTRATANTE: ' + nomeCliente, { bold: true, margin: [0, 8, 0, 4] }),
      p('CNPJ/CPF: ' + v(cnpjCpfCliente)),
      p('E-mail: ' + v(emailCliente)),
      p('WhatsApp: ' + v(whatsappCliente)),
      p('Endereço: ' + v(enderecoCliente)),

      secao(2, 'OBJETO DO CONTRATO'),
      p('O presente contrato tem por objeto a prestação de serviços especializados de gestão completa de marketplaces pela CONTRATADA à CONTRATANTE, abrangendo as plataformas e serviços definidos em comum acordo entre as partes.'),
      p('Os serviços incluem, sem limitação: criação e otimização de anúncios, SEO de marketplace, precificação estratégica, gestão de campanhas de mídia paga, monitoramento diário de métricas e entrega de relatórios mensais de desempenho até o dia 10 de cada mês.'),

      secao(3, 'PRAZO DE VIGÊNCIA'),
      p(`O presente contrato terá vigência de ${duracaoMeses || '___'} meses, com início em ${dataInicio || '___'} e término em ${dataFim || '___'}. Ao término do período, o contrato poderá ser renovado mediante acordo mútuo entre as partes, com antecedência mínima de 10 (dez) dias antes do vencimento.`),

      secao(4, 'VALOR E CONDIÇÕES DE PAGAMENTO'),
      p(`Mensalidade: R$ ${mensalidade || '___________'}`),
      p(`Valor total do contrato: R$ ${valorTotal || '___________'}`),
      p(`Vencimento: Todo dia ${diaVencimento || '___'} de cada mês`),
      p('Forma de pagamento: PIX / Boleto via Asaas'),
      p('Parágrafo único: O não pagamento na data acordada acarretará multa de 2% (dois por cento) sobre o valor da parcela, acrescida de juros de 1% (um por cento) ao mês. O atraso superior a 15 (quinze) dias enseja a suspensão imediata dos serviços pela CONTRATADA, sem prejuízo das demais medidas cabíveis.'),

      secao(5, 'OBRIGAÇÕES DA CONTRATADA'),
      p('5.1. Executar a gestão completa das lojas nas plataformas contratadas com dedicação técnica e estratégica de excelência;'),
      p('5.2. Criar e gerenciar campanhas de anúncios pagos com foco em conversão e retorno sobre investimento (ROI);'),
      p('5.3. Elaborar e entregar relatórios mensais de desempenho com análise comparativa até o dia 10 de cada mês;'),
      p('5.4. Monitorar métricas de performance diariamente e propor melhorias contínuas e proativas;'),
      p('5.5. Manter sigilo absoluto sobre todas as informações, dados de acesso e estratégias da CONTRATANTE;'),
      p('5.6. Prestar suporte consultivo via WhatsApp em horário comercial (segunda a sexta, 9h às 18h).'),

      secao(6, 'OBRIGAÇÕES DA CONTRATANTE'),
      p('6.1. Manter os acessos às plataformas gerenciadas ativos e com as permissões necessárias;'),
      p('6.2. Efetuar os pagamentos nas datas acordadas, conforme estabelecido na Cláusula 4;'),
      p('6.3. Manter estoque suficiente para atender à demanda gerada pelas campanhas executadas pela CONTRATADA;'),
      p('6.4. Comunicar previamente qualquer alteração no catálogo de produtos, regras comerciais ou mudanças estratégicas relevantes;'),
      p('6.5. Não realizar alterações nos anúncios ou configurações das lojas gerenciadas sem prévia comunicação e concordância da CONTRATADA.'),

      secao(7, 'CONFIDENCIALIDADE'),
      p('Ambas as partes comprometem-se a manter em absoluto sigilo todas as informações trocadas no âmbito deste contrato, incluindo dados estratégicos, financeiros, de clientes, de acesso às plataformas e metodologias de trabalho. Esta obrigação permanece em plena vigência por 24 (vinte e quatro) meses após o término ou rescisão deste instrumento.'),

      secao(8, 'RESCISÃO CONTRATUAL'),
      p('8.1. Rescisão pela CONTRATANTE: Poderá ser solicitada com aviso prévio mínimo de 30 (trinta) dias, ficando devidas as parcelas referentes ao período prestado. Não haverá devolução de valores já quitados.'),
      p('8.2. Rescisão pela CONTRATADA: Poderá ocorrer em caso de inadimplência superior a 15 (quinze) dias ou descumprimento das obrigações da CONTRATANTE, com notificação prévia de 15 (quinze) dias.'),
      p('8.3. Multa rescisória: A parte que der causa à rescisão imotivada antes do término do prazo contratual ficará sujeita ao pagamento de multa equivalente a 2 (duas) mensalidades vigentes.'),

      secao(9, 'DISPOSIÇÕES GERAIS'),
      p('9.1. O presente contrato não estabelece qualquer vínculo empregatício, societário ou de exclusividade entre as partes, sendo a CONTRATADA empresa autônoma prestadora de serviços especializados.'),
      p('9.2. A CONTRATADA não garante metas específicas de faturamento ou vendas, pois os resultados dependem de variáveis externas como algoritmos das plataformas, sazonalidade e comportamento do mercado.'),
      p('9.3. Este contrato é regido pelas leis da República Federativa do Brasil. Fica eleito o foro da comarca de São Paulo/SP para dirimir quaisquer controvérsias, com renúncia expressa a qualquer outro.'),
      p('9.4. Este instrumento é assinado eletronicamente, tendo plena validade jurídica nos termos da Medida Provisória nº 2.200-2/2001 e da Lei nº 14.063/2020.'),

      { text: `São Paulo/SP, ${dataAssinatura || '___ de ___________ de 2026'}.`, margin: [0, 20, 0, 20], fontSize: 10.5 },
      { text: 'LB Marketplace', bold: true, fontSize: 10.5, margin: [0, 0, 0, 2] },
      p('CNPJ: 58.943.847/0001-90'),
      p('CONTRATADA', { bold: true, margin: [0, 0, 0, 14] }),
      { text: nomeCliente, bold: true, fontSize: 10.5, margin: [0, 0, 0, 2] },
      p('CNPJ/CPF: ' + v(cnpjCpfCliente)),
      p('CONTRATANTE', { bold: true, margin: [0, 0, 0, 20] }),
      p('Testemunha 1: __________________________ CPF: ________________'),
      p('Testemunha 2: __________________________ CPF: ________________')
    ],
    footer: () => ({
      text: 'LB Marketplace Assessoria  ·  sistema.lbmarketplace.com.br',
      alignment: 'center',
      fontSize: 8,
      color: '#999999',
      margin: [0, 10, 0, 0]
    }),
    styles: {
      tituloPrincipal: { fontSize: 15, bold: true, alignment: 'center' },
      subtitulo: { fontSize: 10, italics: true, color: '#a8863c', alignment: 'center' },
      secao: { fontSize: 11.5, bold: true, color: '#a8863c', margin: [0, 14, 0, 6] },
      paragrafo: { fontSize: 9.7, alignment: 'justify', margin: [0, 0, 0, 5], lineHeight: 1.25 }
    },
    defaultStyle: { font: 'Helvetica' }
  };

  return printer.createPdfKitDocument(docDefinition);
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ erro: 'Método não permitido' });

  try {
    const { nomeCliente } = req.body || {};
    if (!nomeCliente) return res.status(400).json({ erro: 'nomeCliente é obrigatório.' });

    const pdfDoc = gerarContratoPdf(req.body);
    const chunks = [];
    pdfDoc.on('data', (chunk) => chunks.push(chunk));

    const buffer = await new Promise((resolve, reject) => {
      pdfDoc.on('end', () => resolve(Buffer.concat(chunks)));
      pdfDoc.on('error', reject);
      pdfDoc.end();
    });

    const nomeArquivo = `Contrato - ${nomeCliente}.pdf`.replace(/[\\/:*?"<>|]/g, '');
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(nomeArquivo)}"`);
    return res.status(200).send(buffer);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ erro: 'Erro ao gerar contrato: ' + (e.message || 'desconhecido') });
  }
}
