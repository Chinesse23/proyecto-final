const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = require('./middleware/auth');
const verifyRecaptchaToken = require('./middleware/verifyRecaptchaToken');

const authRouter = require('./controllers/authController');
const userRouter = require('./controllers/userController');
const adminRouter = require('./controllers/adminController');
const posadaRouter = require('./controllers/posadaController');
const actividadRouter = require('./controllers/actividadController');
const contactoController = require('./controllers/contactoController');
const registroRouter = require('./controllers/registroController');
const transactionRouter = require('./controllers/transactionController');
const claseController = require('./controllers/claseController');

const initializeData = require('./initData');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'views')));
// app.use(express.static(path.join(__dirname, 'views/principal')));

// Rutas para archivos estáticos
app.use('/css', express.static(path.join(__dirname, 'views/principal/css'), {
    setHeaders: (res, path) => {
        if (path.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css');
        }
    }
}));

app.use('/js', express.static(path.join(__dirname, 'views/principal/js'), {
    setHeaders: (res, path) => {
        if (path.endsWith('.js')) {
            res.setHeader('Content-Type', 'application/javascript');
        }
    }
}));

// Ruta general para archivos HTML estáticos
app.use('/principal', express.static(path.join(__dirname, 'views/principal')));
// Rutas para archivos estáticos y vistas
app.use('/js', express.static(path.join(__dirname, 'views/js')));
app.use('/css', express.static(path.join(__dirname, 'views/css')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/login', express.static(path.join(__dirname, 'views/login')));
app.use('/registro', express.static(path.join(__dirname, 'views/registro')));
app.use('/registro-admin', express.static(path.join(__dirname, 'views/registro-admin')));
app.use('/recuperar-password', express.static(path.join(__dirname, 'views/recuperar-password')));
app.get('/admin', (req, res) => {
  auth(req, res, async () => {
    res.sendFile(path.join(__dirname, 'views/admin/index.html'));
  })
}
);
app.get('/recorridos', (req, res) => {
  // auth(req, res, async () => {
    res.sendFile(path.join(__dirname, 'views/principal/recorridos.html'));
  // })
}
);
app.get('/soporte', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/principal/soporte.html'));
}
);
app.get('/reservas', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/principal/reservas.html'));
}
);
app.get('/disponibilidad', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/principal/linea.html'));
}
);
app.get('/excursiones', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/principal/excursiones.html'));
}
);
app.get('/clases', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/principal/clases.html'));
}
);

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log('MongoDB connected');
  initializeData(); // Ejecutar la inicialización de datos
})
.catch(err => {
  console.log(err);
});

// Rutas de la API
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
// app.use('/api/admin', adminRouter);
app.use('/posadas', posadaRouter);
app.use('/actividades', actividadRouter);
app.use('/api/contacto', contactoController);
app.use('/api/registrar', registroRouter); // Solo una configuración para la ruta
app.use('/api/transaccion', transactionRouter);
app.use('/api/clases', claseController);

app.post('/api/auth/login', verifyRecaptchaToken, (req, res) => {
  const recaptchaScore = req.recaptchaScore;

  if (recaptchaScore < 0.5) {
    return res.status(401).send('reCAPTCHA verification failed: low score');
  }

  // Aquí va tu lógica de autenticación
  res.send('Login successful');
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/principal/index.html'));
});

 // app.get('/user', (req, res) => {
  //res.sendFile(path.join(__dirname, 'views/principal/index.html'));
 // });

// app.get('/admin', (req, res) => {
//   res.sendFile(path.join(__dirname, 'views/admin/index.html'));
// })

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


