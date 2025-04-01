const express = require('express');
const app = express();
const path = require('path');
const { exec } = require('child_process');
const fs = require('fs');

// Configurações
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Middleware de CORS para desenvolvimento
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Rotas de Monitoramento
app.get('/ping', (req, res) => res.send('pong'));

app.get('/cpu', (req, res) => {
    exec("top -bn1 | grep '%Cpu(s)' | awk '{print $2 + $4}'", (error, stdout) => {
        if (error) return res.status(500).send
