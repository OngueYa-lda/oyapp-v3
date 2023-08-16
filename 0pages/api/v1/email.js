/* eslint-disable no-undef */
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import sibV3 from "sib-api-v3-sdk";
import { withExceptionFilter, withLogging } from "./middleware";

export const config = {
  api: {
    bodyParser: true
  }
};

function initSibV3() {
  const apiKey = process.env.SIB_API_KEY || "";
  const client = sibV3.ApiClient.instance;
  const _apiKey = client.authentications["api-key"];
  _apiKey.apiKey = apiKey;
}

async function createContact(fields) {
  const contactsInstance = new sibV3.ContactsApi();
  const contactProfile = new sibV3.CreateContact();

  contactProfile.email = fields.email;
  contactProfile.attributes = {
    FIRSTNAME: fields.nome,
    LASTNAME: fields.sobrenome,
    SMS: fields.phone
  };

  const contactListId = 3;
  contactProfile.listIds = [contactListId];

  try {
    await contactsInstance.createContact(contactProfile);
  } catch (err) {
    const code = err.response?.body?.code || "";
    const isDup = code === "duplicate_parameter";
    if (!isDup) throw err;
    // pass
  }
}

async function sendEmail(fields) {
  const {
    nome,
    sobrenome,
    email: userEmail,
    nomePdf,
    attachment,
    reserva
  } = fields;

  const _rsv = reserva;
  const rpreco = `${_rsv.preco.currency} ${_rsv.preco.string}`;

  const transaction = new sibV3.TransactionalEmailsApi();

  const emailData = {
    to: [{
      email: userEmail,
      name: `${nome} ${sobrenome}`
    }],
    templateId: 3,
    params: {
      FIRSTNAME: nome,
      LASTNAME: sobrenome,
      reserva: {
        hotel: _rsv.name,
        quarto: _rsv.quarto,
        preco: rpreco,
        nq: _rsv.nquartos,
        checkin: _rsv.checkin,
        checkout: _rsv.checkout,
        data: _rsv.data,
        codigo: _rsv.codigo,
        duracao: _rsv.duracao,
        endereco: _rsv.endereco,
        horas: _rsv.horas
      }
    },
    headers: {
      "X-Mailin-custom": "custom_header_1:custom_value_1|custom_header_2:custom_value_2|custom_header_3:custom_value_3",
      charset: "iso-8859-1"
    },
    attachment: [{
      name: nomePdf,
      content: attachment
    }]
  };

  return transaction.sendTransacEmail(emailData);
}

async function email(req, res) {
  const fields = JSON.parse(req.body);
  const fieldKeys = Object.keys(fields);

  if (!fieldKeys.length) {
    res.status(400).json({
      statusCode: 400,
      message: "Erro 400: Sem conteudo",
      error: "Bad Request"
    });
    return;
  }

  for (const fieldKey of fieldKeys) {
    if (!fields[fieldKey]) {
      res.status(400).json({
        statusCode: 400,
        message: `Erro 400: Campo '${fieldKey}' está vazio`,
        error: "Bad Request"
      });
      return;
    }
  }

  initSibV3();
  await sendEmail(fields);
  await createContact(fields);

  res.status(200).json({
    statusCode: 200,
    message: "Email enviado com sucesso",
    error: ""
  });
}

export default withExceptionFilter(
  withLogging(email)
);
