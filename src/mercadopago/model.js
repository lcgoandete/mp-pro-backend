const mercadopago = require('mercadopago');

async function payment(payer, product) {
  mercadopago.configure({
      access_token: process.env.ACCESS_TOKEN,
      integrator_id: 'dev_24c65fb163bf11ea96500242ac130004',
  });

  const preference = {
    items: [
      {
        id: product.id,
        title: product.title,
        currency_id: 'BRL',
        picture_url: product.pictureURL,
        description: product.description,
        category_id: 'electronics',
        quantity: product.quantity,
        unit_price: product.unitPrice,
      }
    ],
    payer: {
      name: payer.name,
      surname: payer.surname,
      email: payer.email,
      phone: {
          area_code: payer.phone.areaCode,
          number: payer.phone.number,
      },
      address: {
          street_name: payer.address.publicPlace,
          street_number: payer.address.number,
          zip_code: payer.address.zipCode
      }
    },
    back_urls: {
      success: 'https://mp-pro-frontend.herokuapp.com/success',
      failure: 'https://mp-pro-frontend.herokuapp.com/failure',
      pending: 'https://mp-pro-frontend.herokuapp.com/pending'
    },
    payment_methods: {
      excluded_payment_methods: [
        {
          id: 'amex',
        }
      ],
      installments: 6
    },
    auto_return: 'approved',
    external_reference: product.externalReference,
    notification_url: 'https://mp-pro-backend.herokuapp.com/ipn',
  };

  try {
    const result = await mercadopago.preferences.create(preference);
    return result.body.id;
    // const result = await mercadopago.preferences.findById("6024630-eebf90a2-5446-49df-9057-faa42258723e")
    // console.log('client_id', result.body.client_id)
    // console.log('id', result.body.id);
    // console.log('init_point', result.body.init_point)
    // console.log('date_created', result.body.date_created)
    // res.status(201).json(result);
  } catch (error) {
    console.log(error);
  }
}

module.exports = { payment }
