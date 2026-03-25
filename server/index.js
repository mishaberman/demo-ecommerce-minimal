const express = require('express');
const cookieParser = require('cookie-parser');
const { v4: uuidv4 } = require('uuid');
const { sendCapiEvent } = require('./capi');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cookieParser());

app.post('/api/checkout', (req, res) => {
  const { cart, userInfo, eventSourceUrl } = req.body;

  const eventId = `purchase_${uuidv4()}`;

  sendCapiEvent('Purchase', {
    userData: {
      client_ip_address: req.ip,
      client_user_agent: req.headers['user-agent'],
      fbp: req.cookies._fbp,
      fbc: req.cookies._fbc,
      email: userInfo.email,
      phone: userInfo.phone,
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
    },
    customData: {
      value: cart.totalPrice,
      currency: 'USD',
      content_ids: cart.items.map(item => item.product.id),
      contents: cart.items.map(item => ({ id: item.product.id, quantity: item.quantity })),
    },
    eventSourceUrl: eventSourceUrl,
    eventId: eventId,
  });

  res.status(200).json({ success: true, eventId: eventId });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
});
