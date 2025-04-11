const express = require('express');
const pool = require('./db'); 
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const PORT = 6666;

app.listen(PORT, () => {
  console.log('Servidor corriendo');
});

app.get('/api/prueba', (req, res) => {
  res.send('api funcionando');
});

app.post('/api/persona', async (req, res) => {
    const { nombre, apellido1, apellido2, dni } = req.body;
  
    try {
      const result = await client.query(
        `INSERT INTO persona (nombre, apellido1, apellido2, dni)
         VALUES ($1, $2, $3, $4)
         RETURNING *`,
        [nombre, apellido1, apellido2, dni]
      );
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Error al insertar persona:', error);
      res.status(500).json({ error: 'Error al insertar persona' });
    }
  });