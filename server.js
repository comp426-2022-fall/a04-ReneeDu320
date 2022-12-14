#!/usr/bin/env node
import { roll } from "./lib/roll.js";
import minimist from "minimist";
import express from "express";

const args = minimist(process.argv.slice(2));
const port = args.port || 5000;

const app = express();

app.get('/app/', (req, res) => {
  res.send('200 OK');
})

app.get('/app/roll/', (req, res) => {
  res.send(roll(6, 2, 1));
})

app.post('/app/roll/', express.urlencoded({extended: true}), (req, res) => {
  res.send(roll(parseInt(req.body.sides), parseInt(req.body.dice), parseInt(req.body.rolls)));
})

app.get('/app/roll/:sides/', (req, res) => {
  res.send(roll(parseInt(req.params.sides), 2, 1));
})

app.get('/app/roll/:sides/:dice/', (req, res) => {
  res.send(roll(parseInt(req.params.sides), parseInt(req.params.dice), 1));
})

app.get('/app/roll/:sides/:dice/:rolls/', (req, res) => {
  res.send(roll(parseInt(req.params.sides), parseInt(req.params.dice), parseInt(req.params.rolls)));
})

app.get('*', (req, res) => {
  res.status(404).send('404 NOT FOUND');
})

app.listen(port);
